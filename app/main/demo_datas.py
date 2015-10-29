# coding=utf8
from models import BPUserProject, BPProject, \
    BPModel, BPBedBox, BPNode, \
    BPSegments, BPSurveyedData, BPUser, Status, Identify, ConstructionOrder, BPSegmentData
from .. import db
import os
import datetime
import xlrd
import time, help_utils
from excel_tool import read_excel, find_index
from app.main.help_utils import analyse_model_file


def seed_user():
    admin_system = BPUser(user_email='admin@example.com',
                          user_name='admin', password='123', user_role_type=Identify.ADMIN)
    organization = BPUser(user_email='organization@example.com', user_pieces=256, user_pieces_left=256,
                          user_name='organization', password='123', user_role_type=Identify.ORGANIZATION)
    user1 = BPUser(user_email='user1@example.com',
                   user_name=u'张工', password='123', user_role_type=Identify.USER)
    user2 = BPUser(user_email='user2@example.com',
                   user_name=u'李功', password='123', user_role_type=Identify.USER)
    user3 = BPUser(user_email='user3@example.com',
                   user_name=u'赵工', password='123', user_role_type=Identify.USER)
    user4 = BPUser(user_email='user4@example.com',
                   user_name=u'王小二', password='123', user_role_type=Identify.USER)
    user5 = BPUser(user_email='user5@example.com',
                   user_name=u'李建', password='123', user_role_type=Identify.USER)
    user6 = BPUser(user_email='user6@example.com',
                   user_name=u'周工', password='123', user_role_type=Identify.USER)
    user7 = BPUser(user_email='user7@example.com',
                   user_name=u'何工', password='123', user_role_type=Identify.USER)
    user8 = BPUser(user_email='user8@example.com',
                   user_name=u'王尼玛', password='123', user_role_type=Identify.USER)
    db.session.add(admin_system)
    db.session.add(organization)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.commit()


def seed_project():
    project1 = BPProject(project_name=u'一局桥梁公司洪湖项目',
                         project_pieces=128,
                         project_pieces_left=128,
                         project_status=Status.WAITING,
                         project_s_range=1,
                         project_v_range=1,
                         project_owner=BPUser.query.filter_by(
                             user_email='organization@example.com').first().user_id)
    project2 = BPProject(project_name=u'一局桥梁公司宁波项目',
                         project_pieces=128,
                         project_pieces_left=128,
                         project_status=Status.WAITING,
                         project_s_range=1,
                         project_v_range=1,
                         project_owner=BPUser.query.filter_by(
                             user_email='organization@example.com').first().user_id)
    project3 = BPProject(project_name=u'一局桥梁公司武汉项目',
                         project_pieces=128,
                         project_pieces_left=128,
                         project_status=Status.WAITING,
                         project_s_range=1,
                         project_v_range=1,
                         project_owner=BPUser.query.filter_by(
                             user_email='organization@example.com').first().user_id)
    db.session.add(project1)
    db.session.add(project2)
    db.session.add(project3)
    db.session.commit()


def seed_user_project():
    user_project1 = BPUserProject(user_project_user_id=BPUser.query.filter_by(
        user_email='user1@example.com').first().user_id,
                                  user_project_project_id=BPProject.query.filter_by(
                                      project_name=u'一局桥梁公司洪湖项目').first().project_id)
    user_project2 = BPUserProject(user_project_user_id=BPUser.query.filter_by(
        user_email='user2@example.com').first().user_id,
                                  user_project_project_id=BPProject.query.filter_by(
                                      project_name=u'一局桥梁公司洪湖项目').first().project_id)
    user_project3 = BPUserProject(user_project_user_id=BPUser.query.filter_by(
        user_email='user3@example.com').first().user_id,
                                  user_project_project_id=BPProject.query.filter_by(
                                      project_name=u'一局桥梁公司洪湖项目').first().project_id)
    user_project4 = BPUserProject(user_project_user_id=BPUser.query.filter_by(
        user_email='user4@example.com').first().user_id,
                                  user_project_project_id=BPProject.query.filter_by(
                                      project_name=u'一局桥梁公司洪湖项目').first().project_id)
    user_project5 = BPUserProject(user_project_user_id=BPUser.query.filter_by(
        user_email='user1@example.com').first().user_id,
                                  user_project_project_id=BPProject.query.filter_by(
                                      project_name=u'一局桥梁公司宁波项目').first().project_id)
    user_project6 = BPUserProject(user_project_user_id=BPUser.query.filter_by(
        user_email='user1@example.com').first().user_id,
                                  user_project_project_id=BPProject.query.filter_by(
                                      project_name=u'一局桥梁公司武汉项目').first().project_id)

    db.session.add(user_project1)
    db.session.add(user_project2)
    db.session.add(user_project3)
    db.session.add(user_project4)
    db.session.add(user_project5)
    db.session.add(user_project6)
    db.session.commit()


def seed_bed_box():
    bed1 = BPBedBox(bed_name=u'台座1', bed_project_id=BPProject.query.filter_by(
        project_name=u'一局桥梁公司武汉项目').first().project_id, bed_startTime=datetime.date(2014, 11, 28), bed_default_period=8)
    bed2 = BPBedBox(bed_name=u'台座2', bed_project_id=BPProject.query.filter_by(
        project_name=u'一局桥梁公司武汉项目').first().project_id, bed_startTime=datetime.date(2015, 02, 18),
                    bed_default_period=120)
    bed3 = BPBedBox(bed_name=u'台座3', bed_project_id=BPProject.query.filter_by(
        project_name=u'一局桥梁公司武汉项目').first().project_id, bed_startTime=datetime.date(2014, 03, 28),
                    bed_default_period=16)
    bed4 = BPBedBox(bed_name=u'台座1', bed_project_id=BPProject.query.filter_by(
        project_name=u'一局桥梁公司宁波项目').first().project_id, bed_startTime=datetime.date(2014, 11, 28), bed_default_period=8)
    bed5 = BPBedBox(bed_name=u'台座2', bed_project_id=BPProject.query.filter_by(
        project_name=u'一局桥梁公司宁波项目').first().project_id, bed_startTime=datetime.date(2015, 02, 18),
                    bed_default_period=120)
    bed6 = BPBedBox(bed_name=u'台座3', bed_project_id=BPProject.query.filter_by(
        project_name=u'一局桥梁公司宁波项目').first().project_id, bed_startTime=datetime.date(2014, 03, 28),
                    bed_default_period=16)
    db.session.add(bed1)
    db.session.add(bed2)
    db.session.add(bed3)
    db.session.add(bed4)
    db.session.add(bed5)
    db.session.add(bed6)
    db.session.commit()


def seed_model():
    model1 = BPModel(model_number=u'一局桥梁公司宁波项目第一标段', model_in_bedOrder=1, model_pieces=6, model_name=u'模型1',
                     model_status=Status.RUNNING,
                     model_project_id=BPProject.query.filter_by(project_name=u'一局桥梁公司宁波项目').first().project_id,
                     model_bed_id=BPBedBox.query.filter_by(bed_project_id=BPProject.query.filter_by(
                         project_name=u'一局桥梁公司宁波项目').first().project_id).first().bed_id)
    model2 = BPModel(model_number=u'一局桥梁公司宁波项目第二标段', model_in_bedOrder=2, model_pieces=3, model_name=u'模型2',
                     model_status=Status.WAITING,
                     model_project_id=BPProject.query.filter_by(project_name=u'一局桥梁公司宁波项目').first().project_id,
                     model_bed_id=BPBedBox.query.filter_by(bed_project_id=BPProject.query.filter_by(
                         project_name=u'一局桥梁公司宁波项目').first().project_id).first().bed_id)
    model3 = BPModel(model_number=u'一局桥梁公司宁波项目第三标段', model_in_bedOrder=3, model_pieces=2, model_name=u'模型3',
                     model_status=Status.WAITING,
                     model_project_id=BPProject.query.filter_by(project_name=u'一局桥梁公司宁波项目').first().project_id,
                     model_bed_id=BPBedBox.query.filter_by(bed_project_id=BPProject.query.filter_by(
                         project_name=u'一局桥梁公司宁波项目').first().project_id).first().bed_id)
    model4 = BPModel(model_number=u'一局桥梁公司宁波项目第四标段', model_in_bedOrder=4, model_pieces=2, model_name=u'模型4',
                     model_status=Status.WAITING,
                     model_project_id=BPProject.query.filter_by(project_name=u'一局桥梁公司宁波项目').first().project_id,
                     model_bed_id=BPBedBox.query.filter_by(bed_project_id=BPProject.query.filter_by(
                         project_name=u'一局桥梁公司宁波项目').first().project_id).first().bed_id)
    model5 = BPModel(model_number=u'一局桥梁公司宁波项目第五标段', model_in_bedOrder=5, model_pieces=2, model_name=u'模型5',
                     model_status=Status.WAITING,
                     model_project_id=BPProject.query.filter_by(project_name=u'一局桥梁公司宁波项目').first().project_id,
                     model_bed_id=BPBedBox.query.filter_by(bed_project_id=BPProject.query.filter_by(
                         project_name=u'一局桥梁公司宁波项目').first().project_id).first().bed_id)
    model6 = BPModel(model_number=u'一局桥梁公司宁波项目第六标段', model_in_bedOrder=6, model_pieces=2, model_name=u'模型6',
                     model_status=Status.WAITING,
                     model_project_id=BPProject.query.filter_by(project_name=u'一局桥梁公司宁波项目').first().project_id,
                     model_bed_id=BPBedBox.query.filter_by(bed_project_id=BPProject.query.filter_by(
                         project_name=u'一局桥梁公司宁波项目').first().project_id).first().bed_id)
    db.session.add(model1)
    db.session.add(model2)
    db.session.add(model3)
    db.session.add(model4)
    db.session.add(model5)
    db.session.add(model6)
    db.session.commit()


def seed_segment():
    segments_data = BPSegmentData.query.all()
    segment1 = BPSegments(segment_number=101, segment_data_id=segments_data[0].segment_data_id,
                          segment_status=Status.WAITING,
                          segment_model_id=BPModel.query.filter_by(
                              model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    segment2 = BPSegments(segment_number=102, segment_data_id=segments_data[1].segment_data_id,
                          segment_status=Status.WAITING, segment_matching_id=101,
                          segment_model_id=BPModel.query.filter_by(
                              model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    segment3 = BPSegments(segment_number=103, segment_data_id=segments_data[2].segment_data_id,
                          segment_status=Status.WAITING, segment_matching_id=102,
                          segment_model_id=BPModel.query.filter_by(
                              model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    segment4 = BPSegments(segment_number=104, segment_data_id=segments_data[3].segment_data_id,
                          segment_status=Status.WAITING, segment_matching_id=103,
                          segment_model_id=BPModel.query.filter_by(
                              model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    segment5 = BPSegments(segment_number=105, segment_data_id=segments_data[4].segment_data_id,
                          segment_status=Status.WAITING, segment_matching_id=104,
                          segment_model_id=BPModel.query.filter_by(
                              model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    segment6 = BPSegments(segment_number=106, segment_data_id=segments_data[5].segment_data_id,
                          segment_status=Status.WAITING, segment_matching_id=105,
                          segment_model_id=BPModel.query.filter_by(
                              model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    db.session.add(segment1)
    db.session.add(segment2)
    db.session.add(segment3)
    db.session.add(segment4)
    db.session.add(segment5)
    db.session.add(segment6)
    db.session.commit()


def seed_segment_data():
    for i in range(6):
        segment_data = BPSegmentData()
        segment_data.segment_data_B_GP_C_X = 1.0 + i
        segment_data.segment_data_B_GP_C_Y = 2.0 + i
        segment_data.segment_data_B_GP_C_Z = 3.0 + i
        segment_data.segment_data_B_GP_L_X = 1.5 + i
        segment_data.segment_data_B_GP_L_Y = 2.5 + i
        segment_data.segment_data_B_GP_L_Z = 3.5 + i
        segment_data.segment_data_B_GP_R_X = 1.8 + i
        segment_data.segment_data_B_GP_R_Y = 2.8 + i
        segment_data.segment_data_B_GP_R_Z = 3.8 + i
        segment_data.segment_data_B_GP_D_X = 1.9 + i
        segment_data.segment_data_B_GP_D_Y = 2.9 + i
        segment_data.segment_data_B_GP_D_Z = 3.9 + i
        segment_data.segment_data_E_GP_C_X = 11.0 + i
        segment_data.segment_data_E_GP_C_Y = 21.0 + i
        segment_data.segment_data_E_GP_C_Z = 31.0 + i
        segment_data.segment_data_E_GP_L_X = 11.5 + i
        segment_data.segment_data_E_GP_L_Y = 21.5 + i
        segment_data.segment_data_E_GP_L_Z = 31.5 + i
        segment_data.segment_data_E_GP_R_X = 11.6 + i
        segment_data.segment_data_E_GP_R_Y = 21.6 + i
        segment_data.segment_data_E_GP_R_Z = 11.6 + i
        segment_data.segment_data_E_GP_D_X = 11.6 + i
        segment_data.segment_data_E_GP_D_Y = 11.6 + i
        segment_data.segment_data_E_GP_D_Z = 11.7 + i

        segment_data.seg_act_data_B_GP_C_X = 1.0 + i
        segment_data.seg_act_data_B_GP_C_Y = 2.0 + i
        segment_data.seg_act_data_B_GP_C_Z = 3.0 + i
        segment_data.seg_act_data_B_GP_L_X = 1.5 + i
        segment_data.seg_act_data_B_GP_L_Y = 2.5 + i
        segment_data.seg_act_data_B_GP_L_Z = 3.5 + i
        segment_data.seg_act_data_B_GP_R_X = 1.6 + i
        segment_data.seg_act_data_B_GP_R_Y = 2.6 + i
        segment_data.seg_act_data_B_GP_R_Z = 3.6 + i
        segment_data.seg_act_data_B_GP_D_X = 1.7 + i
        segment_data.seg_act_data_B_GP_D_Y = 2.7 + i
        segment_data.seg_act_data_B_GP_D_Z = 3.7 + i
        segment_data.seg_act_data_E_GP_C_X = 1.8 + i
        segment_data.seg_act_data_E_GP_C_Y = 2.8 + i
        segment_data.seg_act_data_E_GP_C_Z = 3.8 + i
        segment_data.seg_act_data_E_GP_L_X = 1.9 + i
        segment_data.seg_act_data_E_GP_L_Y = 2.9 + i
        segment_data.seg_act_data_E_GP_L_Z = 3.9 + i
        segment_data.seg_act_data_E_GP_R_X = 1.11 + i
        segment_data.seg_act_data_E_GP_R_Y = 2.11 + i
        segment_data.seg_act_data_E_GP_R_Z = 1.22 + i
        segment_data.seg_act_data_E_GP_D_X = 1.12 + i
        segment_data.seg_act_data_E_GP_D_Y = 1.14 + i
        segment_data.seg_act_data_E_GP_D_Z = 1.16 + i
        db.session.add(segment_data)
        db.session.commit()


def seed_node():
    node1 = BPNode(node_number=101, node_x_coord=0, node_y_coord=0, node_z_coord=0, node_x_after_camber=1,
                   node_y_after_camber=1, node_z_after_camber=1, node_surveyed_x_coord=1.0,
                   node_surveyed_y_coord=1.0, node_surveyed_z_coord=1.0, node_surveyed_x_after_camber=2,
                   node_surveyed_y_after_camber=2, node_surveyed_z_after_camber=2, node_camber_x_coord=0,
                   node_camber_y_coord=0,
                   node_camber_z_coord=0, node_camber_phi_x=0, node_camber_phi_y=0, node_camber_phi_z=-0.00045,
                   node_model_id=BPModel.query.filter_by(
                       model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    node2 = BPNode(node_number=102, node_x_coord=3, node_y_coord=0, node_z_coord=0, node_x_after_camber=4,
                   node_y_after_camber=1, node_z_after_camber=1, node_surveyed_x_coord=1.0,
                   node_surveyed_y_coord=1.0, node_surveyed_z_coord=1.0, node_surveyed_x_after_camber=2,
                   node_surveyed_y_after_camber=2, node_surveyed_z_after_camber=2, node_camber_x_coord=-0.00177,
                   node_camber_y_coord=0,
                   node_camber_z_coord=0, node_camber_phi_x=0, node_camber_phi_y=0, node_camber_phi_z=-0.0040,
                   node_model_id=BPModel.query.filter_by(
                       model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    node3 = BPNode(node_number=103, node_x_coord=6, node_y_coord=0, node_z_coord=0, node_x_after_camber=7,
                   node_y_after_camber=1, node_z_after_camber=1, node_surveyed_x_coord=1.0,
                   node_surveyed_y_coord=1.0, node_surveyed_z_coord=1.0, node_surveyed_x_after_camber=2,
                   node_surveyed_y_after_camber=2, node_surveyed_z_after_camber=2, node_camber_x_coord=-0.00319,
                   node_camber_y_coord=0,
                   node_camber_z_coord=0, node_camber_phi_x=0, node_camber_phi_y=0, node_camber_phi_z=-0.0068,
                   node_model_id=BPModel.query.filter_by(
                       model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    node4 = BPNode(node_number=104, node_x_coord=9, node_y_coord=0, node_z_coord=0, node_x_after_camber=10,
                   node_y_after_camber=1, node_z_after_camber=1, node_surveyed_x_coord=1.0,
                   node_surveyed_y_coord=1.0, node_surveyed_z_coord=1.0, node_surveyed_x_after_camber=2,
                   node_surveyed_y_after_camber=2, node_surveyed_z_after_camber=2, node_camber_x_coord=-0.00430,
                   node_camber_y_coord=0,
                   node_camber_z_coord=0, node_camber_phi_x=0, node_camber_phi_y=0, node_camber_phi_z=-0.0090,
                   node_model_id=BPModel.query.filter_by(
                       model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    node5 = BPNode(node_number=105, node_x_coord=12, node_y_coord=0, node_z_coord=0, node_x_after_camber=13,
                   node_y_after_camber=1, node_z_after_camber=1, node_surveyed_x_coord=1.0,
                   node_surveyed_y_coord=1.0, node_surveyed_z_coord=1.0, node_surveyed_x_after_camber=2,
                   node_surveyed_y_after_camber=2, node_surveyed_z_after_camber=2, node_camber_x_coord=-0.00513,
                   node_camber_y_coord=0,
                   node_camber_z_coord=0, node_camber_phi_x=0, node_camber_phi_y=0, node_camber_phi_z=-0.0107,
                   node_model_id=BPModel.query.filter_by(
                       model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)
    node6 = BPNode(node_number=106, node_x_coord=15, node_y_coord=0, node_z_coord=0, node_x_after_camber=16,
                   node_y_after_camber=1, node_z_after_camber=1, node_surveyed_x_coord=1.0,
                   node_surveyed_y_coord=1.0, node_surveyed_z_coord=1.0, node_surveyed_x_after_camber=2,
                   node_surveyed_y_after_camber=2, node_surveyed_z_after_camber=2, node_camber_x_coord=-0.00573,
                   node_camber_y_coord=0,
                   node_camber_z_coord=0, node_camber_phi_x=0, node_camber_phi_y=0, node_camber_phi_z=-0.0119,
                   node_model_id=BPModel.query.filter_by(
                       model_number=u'一局桥梁公司宁波项目第一标段').first().model_id)

    db.session.add(node1)
    db.session.add(node2)
    db.session.add(node3)
    db.session.add(node4)
    db.session.add(node5)
    db.session.add(node6)
    db.session.commit()


def seed_model_from_file(path1):
    # 模型文件的路径，修改成自己的路径
    filename = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + "kuang"
    temp1 = os.path.join(os.path.join(path1, 'docs'), 'model_file')
    model_path = os.path.join(temp1, 'model.xls')
    analyse_model_file(model_path, filename)
    print ("add model_file success")


def seed_surveyed_data_from_file(path1, segment_number):
    # basedir1 = path1 + r'\docs' + str1
    # path = path1 + r'\docs' + str1 + '\match-forward2015-03-04-01.xls'
    temp1 = os.path.join(os.path.join(path1, 'docs'), 'surveyed_data_file')
    path_src = os.path.join(temp1, 'match-forward2015-03-04-01.xls')
    file1 = open(path_src)
    all_text = file1.read()
    file1.close()
    filename = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + 'match-forward2015-03-04-01.xls'
    temp2 = os.path.join(os.path.join(os.path.join(path1, 'app'), 'static'), 'surveyedData')
    # basedir4 = path1 + r'\app\static\surveyedData'
    path_dest = os.path.join(temp2, filename)
    file2 = open(path_dest, 'w')
    file2.write(all_text)
    file2.close()
    excel_file = xlrd.open_workbook(path_src)
    excel_sheet = excel_file.sheet_by_index(0)
    # project_id未获取
    row_begin = find_index('Wet-cast', excel_sheet) + 2
    surveyed_data = BPSurveyedData()
    # 浮点数12位精度，当用22位精度时，数据库似乎不支持，跳成科学计数法了
    surveyed_data.GP_R_offset_begin = "%.12f" % float(excel_sheet.cell_value(row_begin, 1))
    surveyed_data.GP_R_elevation_begin = ("%.12f" % float(excel_sheet.cell_value(row_begin + 1, 1)))
    surveyed_data.GP_R_length_begin = ("%.12f" % float(excel_sheet.cell_value(row_begin + 2, 1)))

    surveyed_data.GP_C_offset_begin = "%.12f" % float(excel_sheet.cell_value(row_begin, 3))
    surveyed_data.GP_C_elevation_begin = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 3))
    surveyed_data.GP_C_length_begin = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 3))

    surveyed_data.GP_L_offset_begin = "%.12f" % float(excel_sheet.cell_value(row_begin, 5))
    surveyed_data.GP_L_elevation_begin = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 5))
    surveyed_data.GP_L_length_begin = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 5))

    surveyed_data.GP_R_offset_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 1))
    surveyed_data.GP_R_elevation_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 1))
    surveyed_data.GP_R_length_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 1))

    surveyed_data.GP_C_offset_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 3))
    surveyed_data.GP_C_elevation_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 3))
    surveyed_data.GP_C_length_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 3))

    surveyed_data.GP_L_offset_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 5))
    surveyed_data.GP_L_elevation_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 5))
    surveyed_data.GP_L_length_end = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 5))

    row_begin = find_index('Fixed bulkhead', excel_sheet) + 2
    surveyed_data.bulkhead_GP_R_offset = "%.12f" % float(excel_sheet.cell_value(row_begin, 1))
    surveyed_data.bulkhead_GP_R_elevation = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 1))
    surveyed_data.bulkhead_GP_C_offset = "%.12f" % float(excel_sheet.cell_value(row_begin, 3))
    surveyed_data.bulkhead_GP_C_elevation = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 3))
    surveyed_data.bulkhead_GP_L_offset = "%.12f" % float(excel_sheet.cell_value(row_begin, 5))
    surveyed_data.bulkhead_GP_L_elevation = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 5))
    segment = BPSegments.query.filter_by(segment_number=segment_number).first()

    surveyed_data.surveyed_data_number = time.time()  # for test
    surveyed_data.surveyed_data_segment_id = segment.segment_id  # for test
    surveyed_data.surveyed_data_status = "submit"  # for test
    surveyed_data.filename = filename
    db.session.add(surveyed_data)
    db.session.commit()


def seed_surveyed_data():
    str1 = '{"Fixed bulkhead": {"GP-R": {"Offset:": -0.8, "Elevation:": -6.34340963589813e-18}, "GP-C": {"Offset:": -0.0, "Elevation:": 0.0}, "GP-L": {"Offset:": 0.8, "Elevation:": 6.34340963589813e-18}}, "Match-cast": {"GP-C End": {"Length:": 3.2486504532865514, "Offset:": 1.527959973102069e-15, "Elevation:": 0.0007758000064825542}, "GP-L End": {"Length:": 3.248650453286552, "Offset:": 0.8000000000000016, "Elevation:": 0.0007758000064825536}, "GP-C Begin": {"Length:": 5.746841167031039, "Offset:": 1.4306476170529381e-16, "Elevation:": 0.008831093969051806}, "GP-R Begin": {"Length:": 5.746841167031039, "Offset:": -0.7999999999999999, "Elevation:": 0.00883109396905181}, "GP-R End": {"Length:": 3.248650453286551, "Offset:": -0.7999999999999985, "Elevation:": 0.0007758000064825582}, "GP-L Begin": {"Length:": 5.746841167031039, "Offset:": 0.8000000000000002, "Elevation:": 0.008831093969051806}}, "Wet-cast": {"GP-C End": {"Length:": 0.2500000000000001, "Offset:": 1.389415755514812e-16, "Elevation:": 1.1188966420050406e-16}, "GP-L End": {"Length:": 0.2500000000000001, "Offset:": 0.8000000000000002, "Elevation:": 1.1476701368370214e-16}, "GP-C Begin": {"Length:": 2.7486513370194134, "Offset:": 1.5276077896286508e-15, "Elevation:": 1.2108369862318114e-15}, "GP-R Begin": {"Length:": 2.748651337019413, "Offset:": -0.7999999999999985, "Elevation:": 1.2131638071765436e-15}, "GP-R End": {"Length:": 0.2500000000000001, "Offset:": -0.7999999999999999, "Elevation:": 1.0554286776535236e-16}, "GP-L Begin": {"Length:": 2.748651337019414, "Offset:": 0.8000000000000016, "Elevation:": 1.208510165287079e-15}}, "filename": "20150422211233match-forward2015-03-04-01.xls"}'

    data1 = BPSurveyedData(surveyed_data_number=u'回测数据1', surveyed_data_GP_data=str1,
                           surveyed_data_segment_id=BPSegments.query.filter_by(
                               segment_number=101).first().segment_id, surveyed_data_status=Status.RUNNING)
    data2 = BPSurveyedData(surveyed_data_number=u'回测数据2', surveyed_data_GP_data=str1,
                           surveyed_data_segment_id=BPSegments.query.filter_by(
                               segment_number=101).first().segment_id, surveyed_data_status=Status.WAITING)
    data3 = BPSurveyedData(surveyed_data_number=u'回测数据3', surveyed_data_GP_data=str1,
                           surveyed_data_segment_id=BPSegments.query.filter_by(
                               segment_number=101).first().segment_id, surveyed_data_status=Status.WAITING)
    data4 = BPSurveyedData(surveyed_data_number=u'回测数据4', surveyed_data_GP_data=str1,
                           surveyed_data_segment_id=BPSegments.query.filter_by(
                               segment_number=102).first().segment_id, surveyed_data_status=Status.WAITING)
    data5 = BPSurveyedData(surveyed_data_number=u'回测数据5', surveyed_data_GP_data=str1,
                           surveyed_data_segment_id=BPSegments.query.filter_by(
                               segment_number=102).first().segment_id, surveyed_data_status=Status.WAITING)
    db.session.add(data1)
    db.session.add(data2)
    db.session.add(data3)
    db.session.add(data4)
    db.session.add(data5)
    db.session.commit()


def seed_order():
    segment = BPSegments.query.filter_by(segment_number=101).first()
    segment.segment_status = Status.RUNNING
    segment.segment_matching_id = 0
    db.session.add(segment)
    db.session.commit()
    help_utils.create_construction_order(segment)
    # data1 = ConstructionOrder(construction_order_number=u'施工指令1',
    #                           construction_order_segment_id=BPSegments.query.filter_by(
    #                               segment_number=101).first().segment_id, construction_order_status=Status.WAITING)
    # data2 = ConstructionOrder(construction_order_number=u'施工指令2',
    #                           construction_order_segment_id=BPSegments.query.filter_by(
    #                               segment_number=101).first().segment_id, construction_order_status=Status.WAITING)
    # data3 = ConstructionOrder(construction_order_number=u'施工指令3',
    #                           construction_order_segment_id=BPSegments.query.filter_by(
    #                               segment_number=101).first().segment_id, construction_order_status=Status.WAITING)
    # data4 = ConstructionOrder(construction_order_number=u'施工指令4',
    #                           construction_order_segment_id=BPSegments.query.filter_by(
    #                               segment_number=101).first().segment_id, construction_order_status=Status.WAITING)
    #
    # db.session.add(data1)
    # db.session.add(data2)
    # db.session.add(data3)
    # db.session.add(data4)
    # db.session.commit()
