# coding=utf8
from flask import session, render_template, url_for, redirect, request
from .models import BPUser, BPProject, BPBedBox, BPUserProject, \
    BPModel, BPSurveyedData, ConstructionOrder, Status, Identify, BPNode, \
    BPSegments, BPSegmentData, CrossSection, CrossSectionPoint, SegmentCrossSection, ControlLineData
from flask.ext.login import login_user, logout_user, login_required, \
    current_user
from excel_tool import read_excel, find_index
from .. import db
import xlrd, os
import time, datetime
from config import basedir
from xlwt import *
from .calculate3D import *

eps_format = '%.4f'


def check_survey_data():
    model_id = session['surveyed_data_model_id']
    segment = BPSegments.query.filter_by(segment_model_id=model_id, segment_status=Status.RUNNING).first()
    order = ConstructionOrder.query.filter_by(construction_order_segment_id=segment.segment_id).first()
    is_first_segment = order.is_first_segment_construction_order
    if is_first_segment:
        if check_first_segment_bulkhead_part(order) & check_segment_cast_part(order) & check_segment_bulkhead_end_part(
                order):
            return True
        else:
            return False
    else:
        if check_segment_match_part(order) & check_segment_cast_part(order) & check_segment_bulkhead_end_part(order):
            return True
        else:
            return False


def check_first_segment_bulkhead_part(order):
    if compare_order_survey_data(order.float_bulkhead_GP_R_elevation, float(session['float_bulkhead_GP_R_elevation'])) \
            & compare_order_survey_data(order.float_bulkhead_GP_R_length, float(session['float_bulkhead_GP_R_length'])) \
            & compare_order_survey_data(order.float_bulkhead_GP_C_offset, float(session['float_bulkhead_GP_C_offset'])) \
            & compare_order_survey_data(order.float_bulkhead_GP_L_elevation,
                                        float(session['float_bulkhead_GP_L_elevation'])) \
            & compare_order_survey_data(order.float_bulkhead_GP_L_length, float(session['float_bulkhead_GP_L_length'])):
        return True
    else:
        return False


def check_segment_match_part(order):
    if compare_order_survey_data(order.GP_R_elevation_begin_match, float(session['GP_R_elevation_begin_match'])) \
            & compare_order_survey_data(order.GP_R_elevation_end_match, float(session['GP_R_elevation_end_match'])) \
            & compare_order_survey_data(order.GP_L_elevation_begin_match, float(session['GP_L_elevation_begin_match'])) \
            & compare_order_survey_data(order.GP_L_elevation_end_match,
                                        float(session['GP_L_elevation_end_match'])) \
            & compare_order_survey_data(order.GP_C_offset_begin_match, float(session['GP_C_offset_begin_match'])) \
            & compare_order_survey_data(order.GP_C_offset_end_match, float(session['GP_C_offset_end_match'])) \
            & compare_order_survey_data(order.GP_C_length_end_match, float(session['GP_C_length_end_match'])):
        return True
    else:
        return False


def check_segment_cast_part(order):
    if compare_order_survey_data(order.GP_R_elevation_begin, float(session['GP_R_elevation_begin'])) \
            & compare_order_survey_data(order.GP_L_elevation_begin, float(session['GP_L_elevation_begin'])) \
            & compare_order_survey_data(order.GP_R_elevation_end, float(session['GP_R_elevation_end'])) \
            & compare_order_survey_data(order.GP_L_elevation_end,
                                        float(session['GP_L_elevation_end'])) \
            & compare_order_survey_data(order.GP_C_offset_begin, float(session['GP_C_offset_begin'])) \
            & compare_order_survey_data(order.GP_C_offset_end, float(session['GP_C_offset_end'])):
        return True
    else:
        return False


def check_segment_bulkhead_end_part(order):
    if compare_order_survey_data(order.bulkhead_GP_R_elevation, float(session['bulkhead_GP_R_elevation'])) \
            & compare_order_survey_data(order.bulkhead_GP_C_offset, float(session['bulkhead_GP_C_offset'])) \
            & compare_order_survey_data(order.bulkhead_GP_L_elevation, float(session['bulkhead_GP_L_elevation'])):
        return True
    else:
        return False


def compare_order_survey_data(order_data, survey_data):
    user_offset = current_user.user_range
    if abs(order_data - survey_data) > user_offset:
        return False
    else:
        return True


def create_order_path(filename):
    temp1 = os.path.join(os.path.join(basedir, 'app'), 'static')
    temp2 = os.path.join(temp1, 'constructionOrder')
    temp = os.path.join(os.path.join(temp1, 'constructionOrder'), filename)
    if not os.path.exists(temp2):
        os.mkdir(temp2)
    return temp


def write_one_point(sheet, name_idx, value_idx, row_idx, point_name, point):
    sheet.write(row_idx, name_idx, point_name)
    sheet.write(row_idx + 1, name_idx, "Offset:")
    sheet.write(row_idx + 1, value_idx, point[0])
    sheet.write(row_idx + 2, name_idx, "Elevation:")
    sheet.write(row_idx + 2, value_idx, point[1])
    if len(point) > 2:
        sheet.write(row_idx + 3, name_idx, "Length:")
        sheet.write(row_idx + 3, value_idx, point[2])


def write_construction_order(order, path, is_at_begin, is_simplify):
    w = Workbook()
    sheet = w.add_sheet('xlwt was here')
    segment = BPSegments.query.filter_by(segment_id=order.construction_order_segment_id).first()
    # print segment.segment_number
    file_time = time.strftime('%Y-%m-%d', time.localtime(time.time()))
    sheet.write(0, 6, "Date:")
    sheet.write(0, 7, file_time)
    r_name_idx, r_value_idx = 0, 1
    c_name_idx, c_value_idx = 2, 3
    l_name_idx, l_value_idx = 4, 5
    row_idx = 5
    if is_simplify:
        sheet.write(0, 0, "simplify")
        if order.is_first_segment_construction_order:
            sheet.write(row_idx, 0, "floating bulkhead")
            row_idx += 1
            sheet.write(row_idx, 0, "GP-C Offset:")
            sheet.write(row_idx, 1, order.float_bulkhead_GP_C_offset)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-L Elevation:")
            sheet.write(row_idx, 1, order.float_bulkhead_GP_L_elevation)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-R Elevation:")
            sheet.write(row_idx, 1, order.float_bulkhead_GP_R_elevation)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-L Length:")
            sheet.write(row_idx, 1, order.float_bulkhead_GP_L_length)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-R Length:")
            sheet.write(row_idx, 1, order.float_bulkhead_GP_R_length)
        else:
            sheet.write(row_idx, 0, str(segment.segment_matching_id) + "Match-cast")
            row_idx += 1
            sheet.write(row_idx, 0, "GP-C Begin Offset:")
            sheet.write(row_idx, 1, order.GP_C_offset_begin_match)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-L Begin Elevation:")
            sheet.write(row_idx, 1, order.GP_L_elevation_begin_match)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-R Begin Elevation:")
            sheet.write(row_idx, 1, order.GP_R_elevation_begin_match)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-C End Offset:")
            sheet.write(row_idx, 1, order.GP_C_offset_end_match)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-L End Elevation:")
            sheet.write(row_idx, 1, order.GP_L_elevation_end_match)
            row_idx += 1
            sheet.write(row_idx, 0, "GP-R End Elevation:")
            sheet.write(row_idx, 1, order.GP_R_elevation_end_match)
            row_idx += 1
            sheet.write(row_idx, 0, "Length:")
            if is_at_begin:
                sheet.write(row_idx, 1, order.GP_C_length_end_match)
            else:
                sheet.write(row_idx, 1, order.GP_C_length_begin_match)
        row_idx += 3

        sheet.write(row_idx, 0, str(segment.segment_number) + "Wet-cast")
        row_idx += 1
        sheet.write(row_idx, 0, "GP-C Begin Offset:")
        sheet.write(row_idx, 1, order.GP_C_offset_begin)
        row_idx += 1
        sheet.write(row_idx, 0, "GP-L Begin Elevation:")
        sheet.write(row_idx, 1, order.GP_L_elevation_begin)
        row_idx += 1
        sheet.write(row_idx, 0, "GP-R Begin Elevation:")
        sheet.write(row_idx, 1, order.GP_R_elevation_begin)
        row_idx += 1
        sheet.write(row_idx, 0, "GP-C End Offset:")
        sheet.write(row_idx, 1, order.GP_C_offset_end)
        row_idx += 1
        sheet.write(row_idx, 0, "GP-L End Elevation:")
        sheet.write(row_idx, 1, order.GP_L_elevation_end)
        row_idx += 1
        sheet.write(row_idx, 0, "GP-R End Elevation:")
        sheet.write(row_idx, 1, order.GP_R_elevation_end)
        row_idx += 3

        sheet.write(row_idx, 0, "fixed-bulkhead")
        row_idx += 1
        sheet.write(row_idx, 0, "GP-C Offset:")
        sheet.write(row_idx, 1, order.bulkhead_GP_C_offset)
        row_idx += 1
        sheet.write(row_idx, 0, "GP-L Elevation:")
        sheet.write(row_idx, 1, order.bulkhead_GP_L_elevation)
        row_idx += 1
        sheet.write(row_idx, 0, "GP-R Elevation:")
        sheet.write(row_idx, 1, order.bulkhead_GP_R_elevation)


    else:
        if order.is_first_segment_construction_order:
            sheet.write(row_idx, 0, "floating bulkhead")
            row_idx += 1
            write_one_point(sheet, r_name_idx, r_value_idx, row_idx, "GP-R", (
                order.float_bulkhead_GP_R_offset,
                order.float_bulkhead_GP_R_elevation,
                order.float_bulkhead_GP_R_length
            ))
            write_one_point(sheet, c_name_idx, c_value_idx, row_idx, "GP-C", (
                order.float_bulkhead_GP_C_offset,
                order.float_bulkhead_GP_C_elevation,
                order.float_bulkhead_GP_C_length
            ))
            write_one_point(sheet, l_name_idx, l_value_idx, row_idx, "GP-L", (
                order.float_bulkhead_GP_L_offset,
                order.float_bulkhead_GP_L_elevation,
                order.float_bulkhead_GP_L_length
            ))
            row_idx += 5
        else:
            sheet.write(row_idx, 0, str(segment.segment_matching_id) + "Match-cast")
            row_idx += 1
            write_one_point(sheet, r_name_idx, r_value_idx, row_idx, "GP-R Begin", (
                order.GP_R_offset_begin_match,
                order.GP_R_elevation_begin_match,
                order.GP_R_length_begin_match
            ))

            write_one_point(sheet, c_name_idx, c_value_idx, row_idx, "GP-C Begin", (
                order.GP_C_offset_begin_match,
                order.GP_C_elevation_begin_match,
                order.GP_C_length_begin_match
            ))

            write_one_point(sheet, l_name_idx, l_value_idx, row_idx, "GP-L Begin", (
                order.GP_L_offset_begin_match,
                order.GP_L_elevation_begin_match,
                order.GP_L_length_begin_match
            ))

            row_idx += 4
            write_one_point(sheet, r_name_idx, r_value_idx, row_idx, "GP-R End", (
                order.GP_R_offset_end_match,
                order.GP_R_elevation_end_match,
                order.GP_R_length_end_match
            ))

            write_one_point(sheet, c_name_idx, c_value_idx, row_idx, "GP-C End", (
                order.GP_C_offset_end_match,
                order.GP_C_elevation_end_match,
                order.GP_C_length_end_match
            ))

            write_one_point(sheet, l_name_idx, l_value_idx, row_idx, "GP-L End", (
                order.GP_L_offset_end_match,
                order.GP_L_elevation_end_match,
                order.GP_L_length_end_match
            ))
            row_idx += 5

        sheet.write(row_idx, 0, str(segment.segment_number) + "Wet-cast")
        row_idx += 1
        write_one_point(sheet, r_name_idx, r_value_idx, row_idx, "GP-R Begin", (
            order.GP_R_offset_begin,
            order.GP_R_elevation_begin,
            order.GP_R_length_begin
        ))

        write_one_point(sheet, c_name_idx, c_value_idx, row_idx, "GP-C Begin", (
            order.GP_C_offset_begin,
            order.GP_C_elevation_begin,
            order.GP_C_length_begin
        ))

        write_one_point(sheet, l_name_idx, l_value_idx, row_idx, "GP-L Begin", (
            order.GP_L_offset_begin,
            order.GP_L_elevation_begin,
            order.GP_L_length_begin
        ))
        row_idx += 4

        write_one_point(sheet, r_name_idx, r_value_idx, row_idx, "GP-R End", (
            order.GP_R_offset_end,
            order.GP_R_elevation_end,
            order.GP_R_length_end
        ))

        write_one_point(sheet, c_name_idx, c_value_idx, row_idx, "GP-C End", (
            order.GP_C_offset_end,
            order.GP_C_elevation_end,
            order.GP_C_length_end
        ))

        write_one_point(sheet, l_name_idx, l_value_idx, row_idx, "GP-L End", (
            order.GP_L_offset_end,
            order.GP_L_elevation_end,
            order.GP_L_length_end
        ))
        row_idx += 5

        sheet.write(row_idx, 0, "fixed-bulkhead")
        row_idx += 1
        write_one_point(sheet, r_name_idx, r_value_idx, row_idx, "GP-R", (
            order.bulkhead_GP_R_offset,
            order.bulkhead_GP_R_elevation,
        ))
        write_one_point(sheet, c_name_idx, c_value_idx, row_idx, "GP-C", (
            order.bulkhead_GP_C_offset,
            order.bulkhead_GP_C_elevation
        ))
        write_one_point(sheet, l_name_idx, l_value_idx, row_idx, "GP-L", (
            order.bulkhead_GP_L_offset,
            order.bulkhead_GP_L_elevation
        ))
    w.save(path)


def prop_session():
    session.pop('user_name', None)
    session.pop('project_id', None)
    session.pop('project_default_name', None)
    session.pop('project_list', None)
    session.pop('project_default_role', None)


def transfer_session_to_json(project_list):
    list_json_project = []
    for project in project_list:
        project_json = {'project_id': project.project_id,
                        'project_name': project.project_name}
        list_json_project.append(project_json)
    return list_json_project


# 用户登录后存储一些基本信息于session中，方便在admin_base根据用户权限来分离界面
def set_session(user):
    session['user_name'] = user.user_name

    if current_user.user_role_type == Identify.ORGANIZATION:
        project_default = BPProject.query.filter_by(project_owner=current_user.user_id).order_by(
            BPProject.project_id.desc()).first()
        project_in_base = BPProject.query.filter_by(project_owner=current_user.user_id).order_by(
            BPProject.project_id.desc()).all()
        list1 = []
        if project_in_base is not None:
            for item in project_in_base:
                project_list = {item.project_id: item.project_name}
                list1.append(project_list)
        if project_default is None:
            session['project_id'] = 0
            return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))
        session['project_list'] = list1
        session['project_id'] = project_default.project_id
        session['project_default_name'] = project_default.project_name
        session['project_default_role'] = u"公司管理员"
    else:
        # 得到系统用户默认所属的项目，选取ID最新的 一个
        project_default = BPUserProject.query.filter_by(
            user_project_user_id=user.user_id).order_by(BPUserProject.user_project_project_id.desc()).first()
        # 得到用户所属的所有项目
        project_in_base = BPUserProject.query.filter_by(
            user_project_user_id=user.user_id).order_by(BPUserProject.user_project_project_id.desc()).all()
        list1 = []
        if project_in_base is not None:
            for item in project_in_base:
                project_list = {item.project.project_id: item.project.project_name}
                list1.append(project_list)
        if project_default is None:
            session['project_id'] = 0
            return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))
        session['project_list'] = list1
        session['project_id'] = project_default.user_project_project_id
        session['project_default_name'] = project_default.project.project_name
        session['project_default_role'] = project_default.user_project_role


# 得到节段中理论segmentdata的list：
def get_seg_theoretical_data(segments):
    segment_datas = []
    for item in segments:
        segment_theoretical_value = BPSegmentData.query.filter_by(
            segment_id=item.segment_id,
            is_offset=False,
            is_camber=False,
            is_theoretical_value=True).first()
        segment_datas.append(segment_theoretical_value)
    return segment_datas


# 得到节段中实际segmentdata的list：
def get_seg_actual_data(segments):
    segment_datas = []
    for item in segments:
        segment_actual_value = BPSegmentData.query.filter_by(
            segment_id=item.segment_id,
            is_offset=False,
            is_camber=False,
            is_theoretical_value=False).first()
        # if segment_actual_value is None:
        # segment_actual_value = BPSegmentData()
        # segment_actual_value.segment_id = item.segment_id
        # db.session.add(segment_actual_value)
        segment_datas.append(segment_actual_value)
    return segment_datas


# 查找控制线数据
def search_control_line_data(control_line_data_id, is_theoretical_value, is_offset, position):
    control_line = ControlLineData.query.filter_by(control_line_data_id=control_line_data_id).first()
    return control_line.to_json(is_theoretical_value, is_offset, position)


# 查找节段数据
def seach_segment_data(segments, is_offset, is_camber):
    segments_data = []
    for segment in segments:
        segment_theoretical_value = BPSegmentData.query.filter_by(
            segment_id=segment.segment_id,
            is_offset=is_offset,
            is_camber=is_camber,
            is_theoretical_value=True).first()

        segment_actual_value = BPSegmentData.query.filter_by(
            segment_id=segment.segment_id,
            is_offset=is_offset,
            is_camber=is_camber,
            is_theoretical_value=False).first()
        if segment_actual_value is None:
            segment_actual_value = BPSegmentData()

        segment_data = {'segment_id': segment.segment_id,
                        'segment_number': segment.segment_number,
                        'segment_B_GP_C_X': segment_theoretical_value.segment_B_GP_C_X,
                        'segment_B_GP_C_Y': segment_theoretical_value.segment_B_GP_C_Y,
                        'segment_B_GP_C_Z': segment_theoretical_value.segment_B_GP_C_Z,
                        'segment_B_GP_L_X': segment_theoretical_value.segment_B_GP_L_X,
                        'segment_B_GP_L_Y': segment_theoretical_value.segment_B_GP_L_Y,
                        'segment_B_GP_L_Z': segment_theoretical_value.segment_B_GP_L_Z,
                        'segment_B_GP_R_X': segment_theoretical_value.segment_B_GP_R_X,
                        'segment_B_GP_R_Y': segment_theoretical_value.segment_B_GP_R_Y,
                        'segment_B_GP_R_Z': segment_theoretical_value.segment_B_GP_R_Z,
                        'segment_B_GP_D_X': segment_theoretical_value.segment_B_GP_D_X,
                        'segment_B_GP_D_Y': segment_theoretical_value.segment_B_GP_D_Y,
                        'segment_B_GP_D_Z': segment_theoretical_value.segment_B_GP_D_Z,
                        'segment_E_GP_C_X': segment_theoretical_value.segment_E_GP_C_X,
                        'segment_E_GP_C_Y': segment_theoretical_value.segment_E_GP_C_Y,
                        'segment_E_GP_C_Z': segment_theoretical_value.segment_E_GP_C_Z,
                        'segment_E_GP_L_X': segment_theoretical_value.segment_E_GP_L_X,
                        'segment_E_GP_L_Y': segment_theoretical_value.segment_E_GP_L_Y,
                        'segment_E_GP_L_Z': segment_theoretical_value.segment_E_GP_L_Z,
                        'segment_E_GP_R_X': segment_theoretical_value.segment_E_GP_R_X,
                        'segment_E_GP_R_Y': segment_theoretical_value.segment_E_GP_R_Y,
                        'segment_E_GP_R_Z': segment_theoretical_value.segment_E_GP_R_Z,
                        'segment_E_GP_D_X': segment_theoretical_value.segment_E_GP_D_X,
                        'segment_E_GP_D_Y': segment_theoretical_value.segment_E_GP_D_Y,
                        'segment_E_GP_D_Z': segment_theoretical_value.segment_E_GP_D_Z,
                        'seg_act_B_GP_C_X': segment_actual_value.segment_B_GP_C_X,
                        'seg_act_B_GP_C_Y': segment_actual_value.segment_B_GP_C_Y,
                        'seg_act_B_GP_C_Z': segment_actual_value.segment_B_GP_C_Z,
                        'seg_act_B_GP_L_X': segment_actual_value.segment_B_GP_L_X,
                        'seg_act_B_GP_L_Y': segment_actual_value.segment_B_GP_L_Y,
                        'seg_act_B_GP_L_Z': segment_actual_value.segment_B_GP_L_Z,
                        'seg_act_B_GP_R_X': segment_actual_value.segment_B_GP_R_X,
                        'seg_act_B_GP_R_Y': segment_actual_value.segment_B_GP_R_Y,
                        'seg_act_B_GP_R_Z': segment_actual_value.segment_B_GP_R_Z,
                        'seg_act_B_GP_D_X': segment_actual_value.segment_B_GP_D_X,
                        'seg_act_B_GP_D_Y': segment_actual_value.segment_B_GP_D_Y,
                        'seg_act_B_GP_D_Z': segment_actual_value.segment_B_GP_D_Z,
                        'seg_act_E_GP_C_X': segment_actual_value.segment_E_GP_C_X,
                        'seg_act_E_GP_C_Y': segment_actual_value.segment_E_GP_C_Y,
                        'seg_act_E_GP_C_Z': segment_actual_value.segment_E_GP_C_Z,
                        'seg_act_E_GP_L_X': segment_actual_value.segment_E_GP_L_X,
                        'seg_act_E_GP_L_Y': segment_actual_value.segment_E_GP_L_Y,
                        'seg_act_E_GP_L_Z': segment_actual_value.segment_E_GP_L_Z,
                        'seg_act_E_GP_R_X': segment_actual_value.segment_E_GP_R_X,
                        'seg_act_E_GP_R_Y': segment_actual_value.segment_E_GP_R_Y,
                        'seg_act_E_GP_R_Z': segment_actual_value.segment_E_GP_R_Z,
                        'seg_act_E_GP_D_X': segment_actual_value.segment_E_GP_D_X,
                        'seg_act_E_GP_D_Y': segment_actual_value.segment_E_GP_D_Y,
                        'seg_act_E_GP_D_Z': segment_actual_value.segment_E_GP_D_Z
                        }
        # if segment_actual_value.segment_B_GP_C_X is not None:
        # segments_data.append(segment_data)
        segments_data.append(segment_data)
    return segments_data


def create_construction_order(segment, adjust_length=1):
    """
        创建施工指令的时候有两种：
        1.首个节段的施工指令，是在模型导入的时候就创建了的。此时施工指令使用的是理论值的一部分
        2.其余节段的施工指令，是在上个节段完成后进行的，我们需要将上个节段的实际值获取，并计算出施工指令
    """
    order = ConstructionOrder()
    model = BPModel.query.filter_by(model_id=segment.segment_model_id).first()

    offset_vertical = model.get_offset_vertical()
    is_at_begin = segment.is_at_begin()
    is_first = segment.is_first()
    offset_horizontal = segment.get_offset_horizontal()
    shift_section, fixed_section = segment.get_shift_and_fixed_cross_section()
    shift_section_points = shift_section.to_list(reversed=not is_at_begin)
    fixed_section_points = fixed_section.to_list(reversed=not is_at_begin)
    shift_node, fixed_node = segment.get_shift_and_fixed_node()

    match_segment_another_node = segment.get_match_segment_another_node()

    if is_first:
        b_res, e_res, pre_res = get_construction_instruct(
            offset_vertical,
            offset_horizontal,
            shift_section_points,
            fixed_section_points,
            shift_node.camber_to_tuple(),
            fixed_node.camber_to_tuple(),
            is_first,
            is_at_begin,
            None,
            None
        )
        (order.float_bulkhead_GP_R_length,
         order.float_bulkhead_GP_R_elevation,
         order.float_bulkhead_GP_R_offset) = b_res.r
        (order.float_bulkhead_GP_C_length,
         order.float_bulkhead_GP_C_elevation,
         order.float_bulkhead_GP_C_offset) = b_res.c
        (order.float_bulkhead_GP_L_length,
         order.float_bulkhead_GP_L_elevation,
         order.float_bulkhead_GP_L_offset) = b_res.l
        (order.GP_R_length_begin,
         order.GP_R_elevation_begin,
         order.GP_R_offset_begin) = b_res.o_r
        (order.GP_C_length_begin,
         order.GP_C_elevation_begin,
         order.GP_C_offset_begin) = b_res.o_c
        (order.GP_L_length_begin,
         order.GP_L_elevation_begin,
         order.GP_L_offset_begin) = b_res.o_l
        (order.GP_R_length_end,
         order.GP_R_elevation_end,
         order.GP_R_offset_end) = e_res.o_r
        (order.GP_C_length_end,
         order.GP_C_elevation_end,
         order.GP_C_offset_end) = e_res.o_c
        (order.GP_L_length_end,
         order.GP_L_elevation_end,
         order.GP_L_offset_end) = e_res.o_l
        order.bulkhead_GP_C_elevation = e_res.c[1]
        order.bulkhead_GP_C_offset = e_res.c[2]
        order.bulkhead_GP_R_elevation = e_res.r[1]
        order.bulkhead_GP_R_offset = e_res.r[2]
        order.bulkhead_GP_L_elevation = e_res.l[1]
        order.bulkhead_GP_L_offset = e_res.l[2]
    else:
        # segment_bef = BPSegments.query.filter_by(segment_model_id=model.model_id,
        #                                          segment_number=segment.segment_matching_id).first()
        # surveyed_data = BPSurveyedData.query.filter_by(surveyed_data_segment_id=segment_bef.segment_id,
        #                                                surveyed_data_status=Status.VERIFIED).first()
        segment_actual_value = segment.get_match_segment().get_segment_data(is_offset=True, is_camber=True,
                                                                            is_theoretical_value=False)
        # print(segment_actual_value)
        nodes = segment.get_shift_and_fixed_node()
        fixed_points = fixed_node.camber_to_tuple()
        if adjust_length > 1:
            next_segment = find_next_segments_for_construction(segment.segment_model_id, segment.segment_number,
                                                               adjust_length=adjust_length - 1)
            if next_segment is not None:
                next_node = next_segment.get_shift_and_fixed_node()[1]
                fixed_points = get_twice_adjust_point(shift_node.real_to_tuple(),
                                                      fixed_node.camber_to_tuple(),
                                                      next_node.camber_to_tuple())

        b_res, e_res, pre_res = get_construction_instruct(
            offset_vertical,
            offset_horizontal,
            shift_section_points,
            fixed_section_points,
            shift_node.real_to_tuple(),
            fixed_points,
            is_first,
            is_at_begin,
            match_segment_another_node.camber_to_tuple(),
            segment_actual_value.to_dict(reversed=not is_at_begin)
        )
        (order.GP_R_length_begin_match,
         order.GP_R_elevation_begin_match,
         order.GP_R_offset_begin_match) = pre_res.o_r
        (order.GP_C_length_begin_match,
         order.GP_C_elevation_begin_match,
         order.GP_C_offset_begin_match) = pre_res.o_c
        (order.GP_L_length_begin_match,
         order.GP_L_elevation_begin_match,
         order.GP_L_offset_begin_match) = pre_res.o_l
        (order.GP_R_length_end_match,
         order.GP_R_elevation_end_match,
         order.GP_R_offset_end_match) = pre_res.r
        (order.GP_C_length_end_match,
         order.GP_C_elevation_end_match,
         order.GP_C_offset_end_match) = pre_res.c
        (order.GP_L_length_end_match,
         order.GP_L_elevation_end_match,
         order.GP_L_offset_end_match) = pre_res.l

        (order.GP_R_length_begin,
         order.GP_R_elevation_begin,
         order.GP_R_offset_begin) = b_res.o_r
        (order.GP_C_length_begin,
         order.GP_C_elevation_begin,
         order.GP_C_offset_begin) = b_res.o_c
        (order.GP_L_length_begin,
         order.GP_L_elevation_begin,
         order.GP_L_offset_begin) = b_res.o_l
        (order.GP_R_length_end,
         order.GP_R_elevation_end,
         order.GP_R_offset_end) = e_res.o_r
        (order.GP_C_length_end,
         order.GP_C_elevation_end,
         order.GP_C_offset_end) = e_res.o_c
        (order.GP_L_length_end,
         order.GP_L_elevation_end,
         order.GP_L_offset_end) = e_res.o_l
        order.bulkhead_GP_C_elevation = e_res.c[1]
        order.bulkhead_GP_C_offset = e_res.c[2]
        order.bulkhead_GP_R_elevation = e_res.r[1]
        order.bulkhead_GP_R_offset = e_res.r[2]
        order.bulkhead_GP_L_elevation = e_res.l[1]
        order.bulkhead_GP_L_offset = e_res.l[2]

    order_time = time.strftime('%Y-%m-%d-%H-%M', time.localtime(time.time()))
    path = create_order_path(str(segment.segment_number) + "order" + order_time + ".xls")
    path_simplify = create_order_path("simplify" + str(segment.segment_number) + "order" + order_time + ".xls")

    order.construction_order_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    # file_time = time.strftime('%Y-%m-%d', time.localtime(time.time()))
    order.construction_order_number = model.model_number + str(segment.segment_number) + u"节段施工指令" + order_time
    order.filename = str(segment.segment_number) + "order" + order_time + ".xls"
    order.construction_order_segment_id = segment.segment_id
    order.construction_order_model_id = model.model_id
    order.construction_order_project_id = model.project.project_id
    order.is_first_segment_construction_order = is_first

    db.session.add(order)
    db.session.commit()
    write_construction_order(order, path, is_at_begin, is_simplify=False)
    write_construction_order(order, path_simplify, is_at_begin, is_simplify=True)
    return "success"


def transform_order_to_json(order):
    segment = BPSegments.query.filter_by(segment_id=order.construction_order_segment_id).first()
    order_json = {'construction_order_number': order.construction_order_number,
                  'construction_order_id': order.construction_order_id,
                  'segment_number': segment.segment_number,
                  'segment_is_at_begin': segment.is_at_begin(),
                  'segment_is_first': segment.is_first(),

                  'GP_R_offset_begin': eps_format % float(order.GP_R_offset_begin),
                  'GP_R_elevation_begin': eps_format % float(order.GP_R_elevation_begin),
                  'GP_R_length_begin': eps_format % float(order.GP_R_length_begin),
                  'GP_C_offset_begin': eps_format % float(order.GP_C_offset_begin),
                  'GP_C_elevation_begin': eps_format % float(order.GP_C_elevation_begin),
                  'GP_C_length_begin': eps_format % float(order.GP_C_length_begin),
                  'GP_L_offset_begin': eps_format % float(order.GP_L_offset_begin),
                  'GP_L_elevation_begin': eps_format % float(order.GP_L_elevation_begin),
                  'GP_L_length_begin': eps_format % float(order.GP_L_length_begin),
                  'GP_R_offset_end': eps_format % float(order.GP_R_offset_end),
                  'GP_R_elevation_end': eps_format % float(order.GP_R_elevation_end),
                  'GP_R_length_end': eps_format % float(order.GP_R_length_end),
                  'GP_C_offset_end': eps_format % float(order.GP_C_offset_end),
                  'GP_C_elevation_end': eps_format % float(order.GP_C_elevation_end),
                  'GP_C_length_end': eps_format % float(order.GP_C_length_end),
                  'GP_L_offset_end': eps_format % float(order.GP_L_offset_end),
                  'GP_L_elevation_end': eps_format % float(order.GP_L_elevation_end),
                  'GP_L_length_end': eps_format % float(order.GP_L_length_end),
                  'bulkhead_GP_R_offset': eps_format % float(order.bulkhead_GP_R_offset),
                  'bulkhead_GP_R_elevation': eps_format % float(order.bulkhead_GP_R_elevation),
                  'bulkhead_GP_C_offset': eps_format % float(order.bulkhead_GP_C_offset),
                  'bulkhead_GP_C_elevation': eps_format % float(order.bulkhead_GP_C_elevation),
                  'bulkhead_GP_L_offset': eps_format % float(order.bulkhead_GP_L_offset),
                  'bulkhead_GP_L_elevation': eps_format % float(order.bulkhead_GP_L_elevation),
                  }
    if order.is_first_segment_construction_order:
        order_json['float_bulkhead_GP_R_offset'] = eps_format % float(order.float_bulkhead_GP_R_offset),
        order_json['float_bulkhead_GP_R_elevation'] = eps_format % float(order.float_bulkhead_GP_R_elevation),
        order_json['float_bulkhead_GP_R_length'] = eps_format % float(order.float_bulkhead_GP_R_length),
        order_json['float_bulkhead_GP_C_offset'] = eps_format % float(order.float_bulkhead_GP_C_offset),
        order_json['float_bulkhead_GP_C_elevation'] = eps_format % float(order.float_bulkhead_GP_C_elevation),
        order_json['float_bulkhead_GP_C_length'] = eps_format % float(order.float_bulkhead_GP_C_length),
        order_json['float_bulkhead_GP_L_offset'] = eps_format % float(order.float_bulkhead_GP_L_offset),
        order_json['float_bulkhead_GP_L_elevation'] = eps_format % float(order.float_bulkhead_GP_L_elevation),
        order_json['float_bulkhead_GP_L_length'] = eps_format % float(order.float_bulkhead_GP_L_length),
    else:
        order_json['GP_R_offset_begin_match'] = eps_format % float(order.GP_R_offset_begin_match),
        order_json['GP_R_elevation_begin_match'] = eps_format % float(order.GP_R_elevation_begin_match),
        order_json['GP_R_length_begin_match'] = eps_format % float(order.GP_R_length_begin_match),
        order_json['GP_C_offset_begin_match'] = eps_format % float(order.GP_C_offset_begin_match),
        order_json['GP_C_elevation_begin_match'] = eps_format % float(order.GP_C_elevation_begin_match),
        order_json['GP_C_length_begin_match'] = eps_format % float(order.GP_C_length_begin_match),
        order_json['GP_L_offset_begin_match'] = eps_format % float(order.GP_L_offset_begin_match),
        order_json['GP_L_elevation_begin_match'] = eps_format % float(order.GP_L_elevation_begin_match),
        order_json['GP_L_length_begin_match'] = eps_format % float(order.GP_L_length_begin_match),
        order_json['GP_R_offset_end_match'] = eps_format % float(order.GP_R_offset_end_match),
        order_json['GP_R_elevation_end_match'] = eps_format % float(order.GP_R_elevation_end_match),
        order_json['GP_R_length_end_match'] = eps_format % float(order.GP_R_length_end_match),
        order_json['GP_C_offset_end_match'] = eps_format % float(order.GP_C_offset_end_match),
        order_json['GP_C_elevation_end_match'] = eps_format % float(order.GP_C_elevation_end_match),
        order_json['GP_C_length_end_match'] = eps_format % float(order.GP_C_length_end_match),
        order_json['GP_L_offset_end_match'] = eps_format % float(order.GP_L_offset_end_match),
        order_json['GP_L_elevation_end_match'] = eps_format % float(order.GP_L_elevation_end_match),
        order_json['GP_L_length_end_match'] = eps_format % float(order.GP_L_length_end_match),
    return order_json


def transform_survey_data_to_json(survey_data):
    segment = BPSegments.query.filter_by(segment_id=survey_data.surveyed_data_segment_id).first()
    survey_data_json = {'surveyed_data_number': survey_data.surveyed_data_number,
                        'surveyed_data_id': survey_data.surveyed_data_id,
                        'segment_number': segment.segment_number,

                        'GP_R_offset_begin': eps_format % float(survey_data.GP_R_offset_begin),
                        'GP_R_elevation_begin': eps_format % float(survey_data.GP_R_elevation_begin),
                        'GP_R_length_begin': eps_format % float(survey_data.GP_R_length_begin),
                        'GP_C_offset_begin': eps_format % float(survey_data.GP_C_offset_begin),
                        'GP_C_elevation_begin': eps_format % float(survey_data.GP_C_elevation_begin),
                        'GP_C_length_begin': eps_format % float(survey_data.GP_C_length_begin),
                        'GP_L_offset_begin': eps_format % float(survey_data.GP_L_offset_begin),
                        'GP_L_elevation_begin': eps_format % float(survey_data.GP_L_elevation_begin),
                        'GP_L_length_begin': eps_format % float(survey_data.GP_L_length_begin),
                        'GP_R_offset_end': eps_format % float(survey_data.GP_R_offset_end),
                        'GP_R_elevation_end': eps_format % float(survey_data.GP_R_elevation_end),
                        'GP_R_length_end': eps_format % float(survey_data.GP_R_length_end),
                        'GP_C_offset_end': eps_format % float(survey_data.GP_C_offset_end),
                        'GP_C_elevation_end': eps_format % float(survey_data.GP_C_elevation_end),
                        'GP_C_length_end': eps_format % float(survey_data.GP_C_length_end),
                        'GP_L_offset_end': eps_format % float(survey_data.GP_L_offset_end),
                        'GP_L_elevation_end': eps_format % float(survey_data.GP_L_elevation_end),
                        'GP_L_length_end': eps_format % float(survey_data.GP_L_length_end),
                        'bulkhead_GP_R_offset': eps_format % float(survey_data.bulkhead_GP_R_offset),
                        'bulkhead_GP_R_elevation': eps_format % float(survey_data.bulkhead_GP_R_elevation),
                        'bulkhead_GP_C_offset': eps_format % float(survey_data.bulkhead_GP_C_offset),
                        'bulkhead_GP_C_elevation': eps_format % float(survey_data.bulkhead_GP_C_elevation),
                        'bulkhead_GP_L_offset': eps_format % float(survey_data.bulkhead_GP_L_offset),
                        'bulkhead_GP_L_elevation': eps_format % float(survey_data.bulkhead_GP_L_elevation),
                        }
    if survey_data.is_first_segment_surveyed_data:
        survey_data_json['float_bulkhead_GP_R_offset'] = eps_format % float(survey_data.float_bulkhead_GP_R_offset),
        survey_data_json['float_bulkhead_GP_R_elevation'] = eps_format % float(
            survey_data.float_bulkhead_GP_R_elevation),
        survey_data_json['float_bulkhead_GP_R_length'] = eps_format % float(survey_data.float_bulkhead_GP_R_length),
        survey_data_json['float_bulkhead_GP_C_offset'] = eps_format % float(survey_data.float_bulkhead_GP_C_offset),
        survey_data_json['float_bulkhead_GP_C_elevation'] = eps_format % float(
            survey_data.float_bulkhead_GP_C_elevation),
        survey_data_json['float_bulkhead_GP_C_length'] = eps_format % float(survey_data.float_bulkhead_GP_C_length),
        survey_data_json['float_bulkhead_GP_L_offset'] = eps_format % float(survey_data.float_bulkhead_GP_L_offset),
        survey_data_json['float_bulkhead_GP_L_elevation'] = eps_format % float(
            survey_data.float_bulkhead_GP_L_elevation),
        survey_data_json['float_bulkhead_GP_L_length'] = eps_format % float(survey_data.float_bulkhead_GP_L_length),
    else:
        survey_data_json['GP_R_offset_begin_match'] = eps_format % float(survey_data.GP_R_offset_begin_match),
        survey_data_json['GP_R_elevation_begin_match'] = eps_format % float(survey_data.GP_R_elevation_begin_match),
        survey_data_json['GP_R_length_begin_match'] = eps_format % float(survey_data.GP_R_length_begin_match),
        survey_data_json['GP_C_offset_begin_match'] = eps_format % float(survey_data.GP_C_offset_begin_match),
        survey_data_json['GP_C_elevation_begin_match'] = eps_format % float(survey_data.GP_C_elevation_begin_match),
        survey_data_json['GP_C_length_begin_match'] = eps_format % float(survey_data.GP_C_length_begin_match),
        survey_data_json['GP_L_offset_begin_match'] = eps_format % float(survey_data.GP_L_offset_begin_match),
        survey_data_json['GP_L_elevation_begin_match'] = eps_format % float(survey_data.GP_L_elevation_begin_match),
        survey_data_json['GP_L_length_begin_match'] = eps_format % float(survey_data.GP_L_length_begin_match),
        survey_data_json['GP_R_offset_end_match'] = eps_format % float(survey_data.GP_R_offset_end_match),
        survey_data_json['GP_R_elevation_end_match'] = eps_format % float(survey_data.GP_R_elevation_end_match),
        survey_data_json['GP_R_length_end_match'] = eps_format % float(survey_data.GP_R_length_end_match),
        survey_data_json['GP_C_offset_end_match'] = eps_format % float(survey_data.GP_C_offset_end_match),
        survey_data_json['GP_C_elevation_end_match'] = eps_format % float(survey_data.GP_C_elevation_end_match),
        survey_data_json['GP_C_length_end_match'] = eps_format % float(survey_data.GP_C_length_end_match),
        survey_data_json['GP_L_offset_end_match'] = eps_format % float(survey_data.GP_L_offset_end_match),
        survey_data_json['GP_L_elevation_end_match'] = eps_format % float(survey_data.GP_L_elevation_end_match),
        survey_data_json['GP_L_length_end_match'] = eps_format % float(survey_data.GP_L_length_end_match),
    return survey_data_json


# 解析模型文件中有关模型整体定义的信息：
def analyse_model(file_path):
    try:
        excel_sheet = read_excel(file_path)
        model_info_begin = find_index('model_define', excel_sheet)
    except Exception, e:
        print(e)
        return 0
    try:
        model_number_index = find_index("model_number", excel_sheet)
        model_number = excel_sheet.cell_value(model_number_index, 1)
        # print model_number
        model = BPModel.query.filter_by(model_number=model_number).first()
        if model is not None and model.model_filePath is not None:
            return 4
        if model is None:
            model = BPModel()
        model.model_number = model_number
        # 组织管理员默认使用第一个查到的project_id作为他的project_id，用于开发阶段，实际组织管理员是无法上传模型的，或者上传前让其选择项目
        if current_user.user_role_type == Identify.ORGANIZATION:
            # model.model_project_id = BPProject.query.filter_by(project_owner=current_user.user_id).first().project_id
            model.model_project_id = session['project_id']
        else:
            model.model_project_id = session['project_id']
        project = BPProject.query.filter_by(project_id=model.model_project_id).first()
        if project.project_status == Status.COMPLETED:
            return 3  # 表示项目已经结束，无法再导入模型
        model_name_index = find_index("model_name", excel_sheet)
        model.model_name = excel_sheet.cell_value(model_name_index, 1)
        model_offset_index = find_index("rivet_offset", excel_sheet)
        model.model_offset = excel_sheet.cell_value(model_offset_index, 1)
        model.model_evaluation = excel_sheet.cell_value(model_offset_index, 3)
        # model.model_pieces = excel_sheet.cell_value(model_info_begin + 4, 1)
        try:
            model_v_range_index = find_index("vertical_error_range")
            model.model_v_range = float(excel_sheet.cell_value(model_v_range_index, 1))
        except Exception, e:
            model.model_v_range = project.project_v_range
        try:
            model_s_range_index = find_index("vertical_error_range")
            model.model_s_range = float(excel_sheet.cell_value(model_s_range_index, 1))
        except Exception, e:
            model.model_s_range = project.project_s_range

        model.model_pieces = calculate_model_actual_pieces(file_path)
        # print model.model_pieces
        if model.model_pieces == 0:
            return 0
        if model.model_pieces > project.project_pieces_left:
            return 2  # 表示模型片数不够错误
        project.project_pieces_left = project.project_pieces_left - model.model_pieces
        model.model_filePath = file_path
        model.model_status = Status.WAITING
        project.project_status = Status.RUNNING
        db.session.add(project)
        db.session.add(model)
        db.session.commit()
    except Exception, e:
        print(e)
        return 0
    return 1


# 获取模型的唯一标识符model_number
def get_model_number(file_path):
    try:
        excel_sheet = read_excel(file_path)
        model_info_begin = find_index('model_define', excel_sheet)
        model_number = excel_sheet.cell_value(model_info_begin + 2, 1)
    except Exception, e:
        print(e)
        return None
    return model_number


# 解析模型文件中的横断面：
def analyse_cross_section(file_path):
    try:
        excel_sheet = read_excel(file_path)

        cross_section_begin = find_index('cross_section_define', excel_sheet)
        cross_section_end = find_index('cross_section_end', excel_sheet)
        model_number = get_model_number(file_path)
        model_id = BPModel.query.filter_by(model_number=model_number).first().model_id
        i = cross_section_begin + 1
        while i < cross_section_end:
            if excel_sheet.cell_value(i, 0) == 'cs_name_define':
                cs_name = excel_sheet.cell_value(i, 1)
                cross_section = CrossSection.query.filter_by(cross_section_model_id=model_id,
                                                             cross_section_name=cs_name).first()
                if cross_section is not None:
                    cross_section_points = CrossSectionPoint.query.filter_by(
                        cross_section_id=cross_section.cross_section_id).all()
                    for item in cross_section_points:
                        db.session.delete(item)
                if cross_section is None:
                    cross_section = CrossSection()
                cross_section.cross_section_name = cs_name
                cross_section.cross_section_model_id = model_id
                db.session.add(cross_section)
                db.session.commit()
                section_id = CrossSection.query.filter_by(cross_section_model_id=model_id,
                                                          cross_section_name=cs_name).first().cross_section_id
                i += 1
                while excel_sheet.cell_value(i, 0) != 'cs_name_end':
                    cross_section_point = CrossSectionPoint()
                    cross_section_point.point_name = excel_sheet.cell_value(i, 0)
                    cross_section_point.point_x = float(excel_sheet.cell_value(i, 1))
                    cross_section_point.point_y = float(excel_sheet.cell_value(i, 2))
                    cross_section_point.point_position = excel_sheet.cell_value(i, 3)
                    cross_section_point.point_direction = excel_sheet.cell_value(i, 4)
                    cross_section_point.cross_section_id = section_id
                    db.session.add(cross_section_point)
                    i += 1
                db.session.commit()
                i += 1
    except Exception, e:
        print e
        return False
    return True


# 初始化节点的所有值：
def calculate_node_camber(node, node_coord_dict, node_camber_dict):
    (node.node_x_coord,
     node.node_y_coord,
     node.node_z_coord) = node_coord_dict.get(node.node_number)
    (node.node_camber_x_coord,
     node.node_camber_y_coord,
     node.node_camber_z_coord,
     node.node_camber_phi_x,
     node.node_camber_phi_y,
     node.node_camber_phi_z) = node_camber_dict.get(node.node_number)
    # 在模型文件刚读入的时候，节点的理想位置和理想预拱位置是可以得到的，回测位置为空，等待回测数据读入后赋值
    point_3d = Point3D(node.node_x_coord,
                       node.node_y_coord,
                       node.node_z_coord)
    delta_3d = Point3D(node.node_camber_x_coord,
                       node.node_camber_y_coord,
                       node.node_camber_z_coord)
    (node.node_x_after_camber,
     node.node_y_after_camber,
     node.node_z_after_camber) = point_after_camber(point_3d, delta_3d)
    node.node_surveyed_x_coord = None
    node.node_surveyed_y_coord = None
    node.node_surveyed_z_coord = None
    node.node_surveyed_x_after_camber = None
    node.node_surveyed_y_after_camber = None
    node.node_surveyed_z_after_camber = None


def calculate_model_actual_pieces(file_path):
    try:
        excel_sheet = read_excel(file_path)
        node_row_begin = find_index('node_define', excel_sheet)
        node_row_end = find_index('node_end', excel_sheet)
        pieces = node_row_end - node_row_begin
        return pieces
    except Exception, e:
        print(e)
        return 0


# 解析模型文件中的节点信息：
def analyse_node(file_path):
    try:
        excel_sheet = read_excel(file_path)
        node_row_begin = find_index('node_define', excel_sheet)
        node_row_end = find_index('node_end', excel_sheet)
        camb_row_beg = find_index('node_camb_define', excel_sheet)
        camb_row_end = find_index('node_camb_end', excel_sheet)
        model_number = get_model_number(file_path)
        model_id = BPModel.query.filter_by(model_number=model_number).first().model_id
    except Exception, e:
        print(e)
        return False
    node_coord_dict = dict()
    node_camber_dict = dict()
    for i in range(node_row_begin + 1, node_row_end):
        node_number = int(excel_sheet.cell_value(i, 0))
        node_coord_dict[node_number] = (
            excel_sheet.cell_value(i, 1),
            excel_sheet.cell_value(i, 2),
            excel_sheet.cell_value(i, 3)
        )
    for i in range(camb_row_beg + 1, camb_row_end):
        node_number = int(excel_sheet.cell_value(i, 0))
        node_camber_dict[node_number] = (
            excel_sheet.cell_value(i, 1),
            excel_sheet.cell_value(i, 2),
            excel_sheet.cell_value(i, 3),
            excel_sheet.cell_value(i, 4),
            excel_sheet.cell_value(i, 5),
            excel_sheet.cell_value(i, 6)
        )

    for node_number in node_coord_dict:
        node = BPNode.query.filter_by(node_model_id=model_id, node_number=node_number).first()
        if node is None:
            node = BPNode()
            node.node_number = node_number
            node.node_model_id = model_id
        calculate_node_camber(node, node_coord_dict, node_camber_dict)
        db.session.add(node)
    db.session.commit()
    return True


# 解析模型文件中的节段信息：
def analyse_segment(file_path):
    try:
        excel_sheet = read_excel(file_path)
        seg_node_begin = find_index('seg_node_define', excel_sheet)
        seg_node_end = find_index('seg_node_end', excel_sheet)
        seg_match_begin = find_index('seg_match_define', excel_sheet)
        seg_match_end = find_index('seg_match_end', excel_sheet)
        seg_cross_begin = find_index('seg_cross_define', excel_sheet)
        seg_cross_end = find_index('seg_cross_end', excel_sheet)
        seg_offset_begin = find_index('seg_offset_define', excel_sheet)
        seg_offset_end = find_index('seg_offset_end', excel_sheet)

        model_number = get_model_number(file_path)
        model_id = BPModel.query.filter_by(model_number=model_number).first().model_id

        segment_node_dict = dict()
        segment_match_dict = dict()
        segment_cross_dict = dict()
        segment_offset_dict = dict()
        for i in range(seg_node_begin + 1, seg_node_end):
            segment_number = int(excel_sheet.cell_value(i, 0))
            segment_node_dict[segment_number] = (
                int(excel_sheet.cell_value(i, 1)),
                int(excel_sheet.cell_value(i, 2))
            )
        for i in range(seg_match_begin + 1, seg_match_end):
            segment_number = int(excel_sheet.cell_value(i, 0))
            match_segment = None
            if str(excel_sheet.cell_value(i, 1)).lower() != 'none':
                match_segment = int(excel_sheet.cell_value(i, 1))
            segment_match_dict[segment_number] = (
                match_segment,
                excel_sheet.cell_value(i, 2)
            )
        for i in range(seg_cross_begin + 1, seg_cross_end):
            segment_number = int(excel_sheet.cell_value(i, 0))
            segment_direction = excel_sheet.cell_value(i, 2)
            segment_cross_dict[tuple([segment_number, segment_direction])] = excel_sheet.cell_value(i, 1)

        for i in range(seg_offset_begin + 1, seg_offset_end):
            segment_number = int(excel_sheet.cell_value(i, 0))
            segment_offset_dict[segment_number] = (
                float(excel_sheet.cell_value(i, 1)),
                float(excel_sheet.cell_value(i, 2)),
                float(excel_sheet.cell_value(i, 3))
            )
        for segment_number in segment_node_dict:
            segment = BPSegments.query.filter_by(segment_model_id=model_id, segment_number=segment_number).first()
            if segment is None:
                segment = BPSegments()
                segment.segment_number = segment_number
            segment.segment_start_node = BPNode.query.filter_by(node_number=segment_node_dict.get(segment_number)[0],
                                                                node_model_id=model_id).first().node_id
            segment.segment_end_node = BPNode.query.filter_by(node_number=segment_node_dict.get(segment_number)[1],
                                                              node_model_id=model_id).first().node_id
            segment.segment_model_id = model_id
            if segment_match_dict.get(segment_number)[0] is None:
                segment.segment_matching_id = 0
                segment.segment_status = Status.RUNNING
            else:
                segment.segment_matching_id = segment_match_dict.get(segment_number)[0]
                segment.segment_status = Status.WAITING
            segment.segment_match_direction = segment_match_dict.get(segment_number)[1]
            (segment.segment_left_offset,
             segment.segment_right_offset,
             segment.segment_down_offset) = segment_offset_dict.get(segment_number)
            db.session.add(segment)
        db.session.commit()
        seg_cross1 = SegmentCrossSection.query.filter_by(segment_cross__model_id=model_id).all()
        if seg_cross1 is not None:
            for item in seg_cross1:
                db.session.delete(item)
        db.session.commit()
        for segment_number, segment_direction in segment_cross_dict:
            # print(segment_number)
            # print(segment_direction)
            # print(segment_cross_dict.get(tuple([segment_number, segment_direction])))
            seg_cross = SegmentCrossSection()
            seg_cross.segment_cross__model_id = model_id
            seg_cross.segment_cross_section_segment_id = BPSegments.query.filter_by(
                segment_model_id=model_id, segment_number=segment_number).first().segment_id
            seg_cross.segment_cross_section_cross_section_id = CrossSection.query.filter_by(
                cross_section_model_id=model_id,
                cross_section_name=segment_cross_dict.get(tuple([segment_number, segment_direction]))
            ).first().cross_section_id
            seg_cross.segment_position = segment_direction
            db.session.add(seg_cross)
            db.session.commit()
    except Exception, e:
        print(e)
        return False
    return True


def analyse_control_line(file_path):
    try:
        excel_sheet = read_excel(file_path)

        control_line_begin = find_index('seg_control_camber_define', excel_sheet)
        control_line_end = find_index('seg_control_camber_end', excel_sheet)
        model_number = get_model_number(file_path)
        model = BPModel.query.filter_by(model_number=model_number).first()
        model_id = model.model_id
        # 加入默认的浇筑曲线
        control_line = ControlLineData()
        control_line.control_line_data_name = u"浇筑曲线"
        control_line.control_line_data_content = "{}"
        control_line.control_line_data_model_id = model_id
        db.session.add(control_line)
        db.session.commit()

        node_dict = dict()
        for node in model.nodes:
            node_dict[node.node_number] = node.node_id
        i = control_line_begin + 1
        while i < control_line_end:
            if excel_sheet.cell_value(i, 0) == 'control_name_define':
                control_line = ControlLineData()
                control_line.control_line_data_name = excel_sheet.cell_value(i, 1)
                control_line.control_line_data_model_id = model_id
                i += 1
                control_camber_dict = dict()
                while excel_sheet.cell_value(i, 0) != 'control_name_end':
                    node_number = int(excel_sheet.cell_value(i, 0))
                    node_id = node_dict.get(node_number)
                    point_x = float(excel_sheet.cell_value(i, 1))
                    point_y = float(excel_sheet.cell_value(i, 2))
                    point_z = float(excel_sheet.cell_value(i, 3))
                    control_camber_dict[node_id] = tuple([point_x, point_y, point_z])
                    i += 1
                control_line.control_line_data_content = str(control_camber_dict)
                db.session.add(control_line)
                db.session.commit()

                i += 1
    except Exception, e:
        print e
        return False
    return True


# 整个模型文件的解析：
def analyse_model_file(file_path, filename):
    model_result = analyse_model(file_path)
    if model_result == 2:
        return 2  # 表示片数不够
    elif model_result == 3:
        return 3  # 表示项目已结束
    elif model_result == 4:
        return 4  # 表示模型已经存在
    elif model_result == 1:
        if analyse_node(file_path) & analyse_cross_section(file_path) & analyse_segment(
                file_path) & analyse_control_line(file_path):
            model_number = get_model_number(file_path)
            model = BPModel.query.filter_by(model_number=model_number).first()
            model.model_status = Status.RUNNING
            model.model_file_name = filename

            time_now = time.strftime('%Y-%m-%d', time.localtime(time.time()))
            cast_time = datetime.datetime.strptime(time_now, "%Y-%m-%d").date()
            model.model_actual_startTime = cast_time
            db.session.add(model)
            db.session.commit()
            calc_theoretical_value(model)
            segment = BPSegments.query.filter_by(segment_status=Status.RUNNING, segment_model_id=model.model_id).first()
            create_construction_order(segment)
            return 1
    # elif model_result & analyse_node(file_path) & analyse_cross_section(file_path) & analyse_segment(
    # file_path):
    # model_number = get_model_number(file_path)
    # model = BPModel.query.filter_by(model_number=model_number).first()
    # calc_theoretical_value(model)
    # segment = BPSegments.query.filter_by(segment_status=Status.RUNNING, segment_model_id=model.model_id).first()
    #     create_construction_order(segment, is_first=True)
    #     return True
    else:
        return 0


def calc_theoretical_value(model):
    """
        由于节段在建造时有atbeg和atend的区别，所以在进行计算时，需要将其对应shift端和fixed端的数据传入并计算
    """
    segments = BPSegments.query.filter_by(segment_model_id=model.model_id).all()
    offset_vertical = model.get_offset_vertical()
    for segment in segments:
        is_at_begin = segment.is_at_begin()
        is_first = segment.is_first()
        offset_horizontal = segment.get_offset_horizontal()
        shift_section, fixed_section = segment.get_shift_and_fixed_cross_section()
        shift_section_points = shift_section.to_list(reversed=not is_at_begin)
        fixed_section_points = fixed_section.to_list(reversed=not is_at_begin)
        shift_node, fixed_node = segment.get_shift_and_fixed_node()
        shift_theoretical_node_point = shift_node.to_tuple()
        shift_camber_theoretical_node_point = shift_node.camber_to_tuple()
        fixed_theoretical_node_point = fixed_node.to_tuple()
        fixed_camber_theoretical_node_point = fixed_node.camber_to_tuple()
        match_segment_another_node = segment.get_match_segment_another_node()
        if match_segment_another_node is not None:
            match_segment_another_theoretical_node_point = match_segment_another_node.to_tuple()
            match_segment_another_camber_theoretical_node_point = match_segment_another_node.camber_to_tuple()
        else:
            match_segment_another_theoretical_node_point = None
            match_segment_another_camber_theoretical_node_point = None

        b_gp, e_gp = theoretical_value(offset_vertical, offset_horizontal, shift_section_points, fixed_section_points,
                                       shift_theoretical_node_point, fixed_theoretical_node_point, is_first,
                                       is_at_begin, match_segment_another_theoretical_node_point
                                       )
        c_b_gp, c_e_gp = theoretical_value(offset_vertical, offset_horizontal, shift_section_points,
                                           fixed_section_points, shift_camber_theoretical_node_point,
                                           fixed_camber_theoretical_node_point, is_first, is_at_begin,
                                           match_segment_another_camber_theoretical_node_point)

        seg_data = BPSegmentData()
        seg_data.set_basic(segment.segment_id, is_offset=False, is_camber=False, is_theoretical_value=True)
        seg_data.set_point(b_gp_c=b_gp.c, b_gp_l=b_gp.l, b_gp_r=b_gp.r, b_gp_d=b_gp.d,
                           e_gp_c=e_gp.c, e_gp_l=e_gp.l, e_gp_r=e_gp.r, e_gp_d=e_gp.d)
        offset_seg_data = BPSegmentData()
        offset_seg_data.set_basic(segment.segment_id, is_offset=True, is_camber=False, is_theoretical_value=True)
        offset_seg_data.set_point(b_gp_c=b_gp.o_c, b_gp_l=b_gp.o_l, b_gp_r=b_gp.o_r, b_gp_d=b_gp.o_d,
                                  e_gp_c=e_gp.o_c, e_gp_l=e_gp.o_l, e_gp_r=e_gp.o_r, e_gp_d=e_gp.o_d)
        camber_seg_data = BPSegmentData()
        camber_seg_data.set_basic(segment.segment_id, is_offset=False, is_camber=True, is_theoretical_value=True)
        camber_seg_data.set_point(b_gp_c=c_b_gp.c, b_gp_l=c_b_gp.l, b_gp_r=c_b_gp.r, b_gp_d=c_b_gp.d,
                                  e_gp_c=c_e_gp.c, e_gp_l=c_e_gp.l, e_gp_r=c_e_gp.r, e_gp_d=c_e_gp.d)
        offset_camber_seg_data = BPSegmentData()
        offset_camber_seg_data.set_basic(segment.segment_id, is_offset=True, is_camber=True, is_theoretical_value=True)
        offset_camber_seg_data.set_point(b_gp_c=c_b_gp.o_c, b_gp_l=c_b_gp.o_l, b_gp_r=c_b_gp.o_r, b_gp_d=c_b_gp.o_d,
                                         e_gp_c=c_e_gp.o_c, e_gp_l=c_e_gp.o_l, e_gp_r=c_e_gp.o_r, e_gp_d=c_e_gp.o_d)
        db.session.add(seg_data)
        db.session.add(offset_seg_data)
        db.session.add(camber_seg_data)
        db.session.add(offset_camber_seg_data)
    db.session.commit()
    return


def calc_actual_value(model, segment):
    """
        在每个节段制造完成后，我们需要把当前节段的实际值计算出来以及对应节点的实际值，并将其存入数据库中，为显示以及以后节段的施工指令做准备
    """
    start_node = segment.get_start_node()
    end_node = segment.get_end_node()
    construction_order = ConstructionOrder.query.filter_by(construction_order_segment_id=segment.segment_id).first()
    surveyed_data = BPSurveyedData.query.filter_by(surveyed_data_segment_id=segment.segment_id,
                                                   surveyed_data_status=u"已审核").first()
    # print(surveyed_data)
    is_first = segment.is_first()
    is_at_begin = segment.is_at_begin()
    offset_horizontal = segment.get_offset_horizontal()
    offset_vertical = model.get_offset_vertical()
    nodes = segment.get_shift_and_fixed_node()
    if is_first:
        end_cross_section = segment.get_end_cross_section()
        c_e_gp, c_b_gp = get_surveyed_data_in_geodetic_coordinate(
            is_first,
            offset_horizontal,
            offset_vertical,
            [Point3D.value_of(nodes[0].camber_to_tuple()), Point3D.value_of(nodes[1].camber_to_tuple())],
            surveyed_data.to_dict(reversed=not is_at_begin),
            is_at_begin,
            None,
            end_cross_section.to_list(reversed=not is_at_begin)
        )
    else:
        segment_bef = segment.get_match_segment()
        segment_real_data = BPSegmentData.query.filter_by(
            segment_id=segment_bef.segment_id, is_offset=True, is_camber=True, is_theoretical_value=False).first()

        c_e_gp, c_b_gp = get_surveyed_data_in_geodetic_coordinate(
            is_first,
            offset_horizontal,
            offset_vertical,
            [Point3D.value_of(nodes[0].real_to_tuple())],
            surveyed_data.to_dict(reversed=not is_at_begin),
            is_at_begin,
            segment_real_data.to_dict(reversed=not is_at_begin),
            None
        )
    if segment.segment_match_direction == 'atbeg' or is_first:
        (end_node.node_surveyed_x_after_camber,
         end_node.node_surveyed_y_after_camber,
         end_node.node_surveyed_z_after_camber) = c_e_gp.node
        (end_node.node_surveyed_x_coord,
         end_node.node_surveyed_y_coord,
         end_node.node_surveyed_z_coord) = (
            Point3D.value_of(c_e_gp.node) - Point3D.value_of(end_node.camber_coord_to_tuple())).to_tuple()
        db.session.add(end_node)
    if segment.segment_match_direction == 'atend' or is_first:
        (start_node.node_surveyed_x_after_camber,
         start_node.node_surveyed_y_after_camber,
         start_node.node_surveyed_z_after_camber) = c_b_gp.node
        (start_node.node_surveyed_x_coord,
         start_node.node_surveyed_y_coord,
         start_node.node_surveyed_z_coord) = (
            Point3D.value_of(c_b_gp.node) - Point3D.value_of(start_node.camber_coord_to_tuple())).to_tuple()
        db.session.add(start_node)
    camber_seg_data = BPSegmentData()
    camber_seg_data.set_basic(segment.segment_id, is_offset=False, is_camber=True, is_theoretical_value=False)
    camber_seg_data.set_point(b_gp_c=c_b_gp.c, b_gp_l=c_b_gp.l, b_gp_r=c_b_gp.r, b_gp_d=c_b_gp.d,
                              e_gp_c=c_e_gp.c, e_gp_l=c_e_gp.l, e_gp_r=c_e_gp.r, e_gp_d=c_e_gp.d)
    offset_camber_seg_data = BPSegmentData()
    offset_camber_seg_data.set_basic(segment.segment_id, is_offset=True, is_camber=True, is_theoretical_value=False)
    offset_camber_seg_data.set_point(b_gp_c=c_b_gp.o_c, b_gp_l=c_b_gp.o_l, b_gp_r=c_b_gp.o_r, b_gp_d=c_b_gp.o_d,
                                     e_gp_c=c_e_gp.o_c, e_gp_l=c_e_gp.o_l, e_gp_r=c_e_gp.o_r, e_gp_d=c_e_gp.o_d)
    c_b_gp.remove_camber(start_node.camber_coord_to_tuple())
    c_e_gp.remove_camber(end_node.camber_coord_to_tuple())
    seg_data = BPSegmentData()
    seg_data.set_basic(segment.segment_id, is_offset=False, is_camber=False, is_theoretical_value=False)
    seg_data.set_point(b_gp_c=c_b_gp.c, b_gp_l=c_b_gp.l, b_gp_r=c_b_gp.r, b_gp_d=c_b_gp.d,
                       e_gp_c=c_e_gp.c, e_gp_l=c_e_gp.l, e_gp_r=c_e_gp.r, e_gp_d=c_e_gp.d)
    offset_seg_data = BPSegmentData()
    offset_seg_data.set_basic(segment.segment_id, is_offset=True, is_camber=False, is_theoretical_value=False)
    offset_seg_data.set_point(b_gp_c=c_b_gp.o_c, b_gp_l=c_b_gp.o_l, b_gp_r=c_b_gp.o_r, b_gp_d=c_b_gp.o_d,
                              e_gp_c=c_e_gp.o_c, e_gp_l=c_e_gp.o_l, e_gp_r=c_e_gp.o_r, e_gp_d=c_e_gp.o_d)
    db.session.add(seg_data)
    db.session.add(offset_seg_data)
    db.session.add(camber_seg_data)
    db.session.add(offset_camber_seg_data)
    db.session.commit()

    return


def find_next_segment(model_id, segment_number):
    """
        由于模型制造可能是从中间向两边制造，所以在搜索下一个制造的节段的时候，需要特别的查询下
        1.在第一个节段制造后，若发现两个节段的匹配节段是该节段，则选择atbegin的那个
        2.若节段制作完后发现没有节段的匹配节段是该节段，需要判断是完成了整个模型还是完成了一侧
    """
    segment_next_list = BPSegments.query.filter_by(segment_matching_id=segment_number, segment_model_id=model_id).all()
    # print(segment_next_list)
    if len(segment_next_list) == 1:
        return segment_next_list[0]
    elif len(segment_next_list) > 1:
        for segment_next in segment_next_list:
            if segment_next.segment_match_direction == "atbeg":
                return segment_next
        return segment_next_list[0]
    else:
        model = BPModel.query.filter_by(model_id=model_id).first()
        segment_dict = dict()
        for segment in model.segments:
            segment_dict[segment.segment_number] = segment
        for segment_next in model.segments:
            if segment_next.segment_status == Status.WAITING \
                    and segment_dict[segment_next.segment_matching_id].segment_status == Status.COMPLETED:
                return segment_next
        return None


def find_next_segments_for_construction(model_id, segment_number, adjust_length=0):
    next_segment = None
    if adjust_length != 0:
        for i in range(adjust_length):
            next_segment = find_next_segment(model_id, segment_number)
            segment_number = next_segment.segment_number
        return next_segment
    length = 0
    while True:
        next_segment = find_next_segment(model_id, segment_number)
        if (not next_segment) or next_segment.segment_matching_id != segment_number:
            return length
        length += 1
        segment_number = next_segment.segment_number


def calc_delta(model, segment):
    """
        在每个节段制造完成后，我们需要把当前节段的实际值计算出来以及对应节点的实际值，并将其存入数据库中，为显示以及以后节段的施工指令做准备
    """
    start_node = segment.get_start_node()
    end_node = segment.get_end_node()
    construction_order = ConstructionOrder.query.filter_by(construction_order_segment_id=segment.segment_id).first()
    surveyed_data = BPSurveyedData.query.filter_by(surveyed_data_segment_id=segment.segment_id,
                                                   surveyed_data_status=u"已审核").first()
    # print(surveyed_data)
    is_first = segment.is_first()
    is_at_begin = segment.is_at_begin()
    offset_horizontal = segment.get_offset_horizontal()
    offset_vertical = model.get_offset_vertical()
    nodes = segment.get_shift_and_fixed_node()
    if is_first:
        end_cross_section = segment.get_end_cross_section()
        c_e_gp, c_b_gp = get_surveyed_data_in_geodetic_coordinate(
            is_first,
            offset_horizontal,
            offset_vertical,
            [Point3D.value_of(nodes[0].camber_to_tuple()), Point3D.value_of(nodes[1].camber_to_tuple())],
            surveyed_data.to_dict(reversed=not is_at_begin),
            is_at_begin,
            None,
            end_cross_section.to_list(reversed=not is_at_begin)
        )
    else:
        segment_bef = segment.get_match_segment()
        segment_real_data = BPSegmentData.query.filter_by(
            segment_id=segment_bef.segment_id, is_offset=True, is_camber=True, is_theoretical_value=False).first()

        c_e_gp, c_b_gp = get_surveyed_data_in_geodetic_coordinate(
            is_first,
            offset_horizontal,
            offset_vertical,
            [Point3D.value_of(nodes[0].real_to_tuple())],
            surveyed_data.to_dict(reversed=not is_at_begin),
            is_at_begin,
            segment_real_data.to_dict(reversed=not is_at_begin),
            None
        )
    fixed_node_real_point = None
    float_node_real_point = None
    if segment.segment_match_direction == 'atbeg':
        fixed_node_real_point = c_e_gp.node
    else:
        fixed_node_real_point = c_b_gp.node
    float_node, fixed_node = segment.get_shift_and_fixed_node()
    if is_first and is_at_begin:
        float_node_real_point = c_b_gp.node
    elif is_first and (not is_at_begin):
        float_node_real_point = c_e_gp.node
    else:
        float_node_real_point = float_node.real_to_tuple()
    delta_v, delta_s = get_delta(float_node_real_point, fixed_node.camber_to_tuple(), fixed_node_real_point)
    return delta_v, delta_s
