# coding=utf8
import os
import time
import json
import datetime

from flask import render_template, url_for, redirect, jsonify, session
import xlrd
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app, request, flash
from flask.ext.login import login_user, logout_user, login_required, \
    current_user
from . import main
from .. import db
from config import basedir
from .models import BPUser, BPProject, BPBedBox, BPUserProject, \
    BPModel, BPSurveyedData, ConstructionOrder, Status, Identify, BPNode, BPSegments, ControlLineData
from .forms import UserForm, OrganizationForm, ProjectForm, LoginForm, RegistrationForm, BedBoxForm, \
    OrganizationDetailForm, ChangePasswordForm, ChangeEmailForm, UserSettingForm
from .email import send_email
from excel_tool import find_index
import help_utils


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/logout')
@login_required
def logout():
    logout_user()
    session.pop('user_name', None)
    session.pop('project_id', None)
    session.pop('project_default_name', None)
    session.pop('project_list', None)
    session.pop('project_default_role', None)
    return redirect(url_for('main.index'))


@main.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if 'user_id' in session:
        return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))
    if form.validate_on_submit():
        user = BPUser.query.filter_by(user_email=form.email.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
            help_utils.set_session(current_user)
            return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))
        flash(u'无效的用户名或者密码.')
    return render_template('login.html', form=form)


@main.route('/user/individual_info_edit/<userId>', methods=['GET', 'POST'])
@login_required
def individual_info(userId):
    edit_flag = 1
    form = UserForm()
    user = BPUser.query.filter_by(user_id=userId).first()
    if form.validate_on_submit():
        user.user_name = form.username.data
        user.user_company = form.company.data
        user.user_phone = form.phone.data
        db.session.add(user)
        db.session.commit()
        edit_flag = 0
    form.username.data = user.user_name
    form.company.data = user.user_company
    form.phone.data = user.user_phone
    return render_template("admin_individual.html", form=form, edit_flag=edit_flag)


@main.route('/user/individual_info_show/')
@login_required
def individual_info_show():
    form = UserForm()
    user = BPUser.query.filter_by(user_id=current_user.user_id).first()
    form.username.data = user.user_name
    form.company.data = user.user_company
    form.phone.data = user.user_phone

    return render_template("admin_individual.html", form=form, edit_flag=0)


@main.route('/user/individual_info_display/<userId>', methods=['GET', 'POST'])
@login_required
def individual_info_display(userId):
    form = UserForm()
    user = BPUser.query.filter_by(user_id=userId).first()
    form.username.data = user.user_name
    form.company.data = user.user_company
    form.phone.data = user.user_phone
    return render_template("admin_individual.html", form=form, edit_flag=0)


# 加userID方便以后拓展，以后可能可以查看同一项目的其它成员信息
@main.route('/user/info/<userId>&<int:selected_id>', methods=['GET', 'POST'])
@login_required
def user_info(userId, selected_id):
    if current_user.user_role_type == Identify.ORGANIZATION:
        project_list = BPProject.query.filter_by(project_owner=current_user.user_id).all()
        project_id_list = []
        for project in project_list:
            project_id = project.project_id
            project_id_list.append(project_id)
        models = db.session.query(BPModel).filter(BPModel.model_project_id.in_(project_id_list)).all()
        surveyed_data = []
        for model in models:
            survey_datas = BPSurveyedData.query \
                .filter_by(surveyed_data_model_id=model.model_id) \
                .order_by(BPSurveyedData.surveyed_data_id.desc()) \
                .limit(3).all()
            for survey_data in survey_datas:
                if survey_data.surveyed_data_model_id == selected_id:
                    surveyed_data.append(survey_data)
        return render_template("user_info.html", surveyed_data=surveyed_data, models=models, projects=project_list,
                               proj_count=len(project_list), model_count=len(models), model_id=selected_id)
    items_user_projects = BPUserProject.query.filter_by(user_project_user_id=current_user.user_id).order_by(
        BPUserProject.user_project_project_id.desc()).all()
    items = []
    if current_user.user_role_type == Identify.ADMIN:
        users = BPUser.query.filter_by(user_role_type=Identify.USER).order_by(BPUser.user_id.desc()).all()
        organizations = BPUser.query.filter_by(user_role_type=Identify.ORGANIZATION).order_by(
            BPUser.user_id.desc()).all()
        return render_template("user_info.html", organizations=organizations, org_count=len(organizations),
                               user_count=len(users), model_id=selected_id)
    for items_user_project in items_user_projects:
        # if (items_user_project.user_project_permission & 1) == 1:
        # item = items_user_project.project
        # items.append(item)
        item = items_user_project.project
        items.append(item)
    models2 = BPModel.query.filter_by(model_project_id=session['project_id']).order_by(BPModel.model_id.desc()).all()
    surveyed_data = BPSurveyedData.query.filter_by(surveyed_data_model_id=selected_id,
                                                   surveyed_data_project_id=session['project_id']).all()
    return render_template("user_info.html", projects=items, proj_count=len(items), models=models2,
                           model_count=len(models2), surveyed_data=surveyed_data, model_id=selected_id)


@main.route('/change/password', methods=['GET', 'POST'])
@login_required
def change_password():
    form = ChangePasswordForm()
    if form.validate_on_submit():
        if current_user.verify_password(form.old_password.data):
            current_user.password = form.password.data
            db.session.add(current_user)
            flash(u'密码修改成功')
            return redirect(url_for('main.login'))
        else:
            flash(u'旧密码错误')
    return render_template("user_change_password.html", form=form)


@main.route('/change/email', methods=['GET', 'POST'])
@login_required
def change_email():
    form = ChangeEmailForm()
    if form.validate_on_submit():
        current_user.user_may_email = form.email.data
        db.session.add(current_user)
        db.session.commit()
        if current_user.verify_password(form.password.data):
            token = current_user.generate_confirmation_token()
            send_email(current_user.user_may_email, u'感谢您注册[桥+] -- 账号激活邮件', 'mail/change_email', user=current_user,
                       token=token)
            flash(u'请登录邮箱接收邮件')
            form.password.data = ''
            form.email.data = ''
    return render_template("user_change_email.html", email=current_user.user_email, form=form)


@main.route('/change/change_confirm/<token>')
@login_required
def email_change_confirm(token):
    if current_user.user_email == '':
        return redirect(url_for('main.change_email'))
    if current_user.change_email_confirm(token):  # 直接通过user_confirm方法来完成确认并返回确认结果
        flash(u'邮箱修改成功！')
    else:
        flash(u'无效链接或已过期')
    return redirect(url_for('main.change_email'))


# 切换用户所属项目
@main.route('/change/project/<projectId>', methods=['GET', 'POST'])
@login_required
def change_project(projectId):
    session.pop('project_id', None)
    session.pop('project_default_name', None)
    session.pop('project_default_role', None)
    session['project_id'] = projectId
    if current_user.user_role_type == Identify.ORGANIZATION:
        project_default = BPProject.query.filter_by(project_id=projectId).first()
        session['project_default_name'] = project_default.project_name
        session['project_default_role'] = u"公司管理员"
        return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))

    project_default = BPUserProject.query.filter_by(user_project_project_id=projectId,
                                                    user_project_user_id=current_user.user_id).first()
    session['project_default_name'] = project_default.project.project_name
    session['project_default_role'] = project_default.user_project_role
    return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))


@main.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user = BPUser(user_email=form.email.data,
                      user_name=form.username.data,
                      password=form.password.data)
        user.user_role_type = Identify.USER
        db.session.add(user)
        db.session.commit()
        token = user.generate_confirmation_token()
        send_email(user.user_email, u'感谢您注册[桥+] -- 账号激活邮件', 'mail/confirm', user=user, token=token)
        flash(u'请登录邮箱接收邮件')
        return redirect(url_for('main.login'))
    return render_template('register.html', form=form)


@main.route('/admin/projects/')
@login_required
def admin_project_list():
    if current_user.user_role_type == Identify.ORGANIZATION:
        url = url_for('main.change_project', projectId=0, _external=True)
        project_list = BPProject.query.filter_by(project_owner=current_user.user_id).order_by(
            BPProject.project_id.desc()).all()
        return render_template("admin_list_project.html", items=project_list, identify="organization", url=url)
    items_user_projects = BPUserProject.query.filter_by(user_project_user_id=current_user.user_id).order_by(
        BPUserProject.user_project_project_id.desc()).all()
    items = []
    for items_user_project in items_user_projects:
        if items_user_project.user_project_permission is not None:
            if (items_user_project.user_project_permission & 1) == 1:
                item = items_user_project.project
                items.append(item)
    return render_template("admin_list_project.html", items=items)


# 公司管理员在新建或者删除项目后，造成base模型中的session没更新，获得最新的项目列表
@main.route('/get/session/project/list/')
@login_required
def get_session_project_list():
    help_utils.prop_session()
    help_utils.set_session(current_user)
    project_list = BPProject.query.filter_by(project_owner=current_user.user_id).order_by(
        BPProject.project_id.desc()).all()
    result = help_utils.transfer_session_to_json(project_list)
    return jsonify(result=result)


@main.route('/admin/project/finish/<projectId>')
@login_required
def admin_finish_project(projectId):
    project = BPProject.query.filter_by(project_id=projectId).first()
    user = BPUser.query.filter_by(user_id=project.project_owner).first()
    project.project_status = Status.COMPLETED
    if project.project_pieces_left != 0:
        user.user_pieces_left += project.project_pieces_left
        project.project_pieces_left = 0
        db.session.add(user)
        db.session.add(project)
        db.session.commit()
    return redirect(url_for('main.admin_project_list'))


@main.route('/general_url/<projectId>', methods=['GET', 'POST'])
def general_url(projectId):
    s = Serializer(current_app.config['SECRET_KEY'], 3600)
    token = s.dumps({'projectId': projectId})
    result = url_for('main.confirm_url', token=token, _external=True)
    return jsonify(result=result)


# @login_required
# @main.route('/confirm_url/<token>')
# def confirm_url(token):
# s = Serializer(current_app.config['SECRET_KEY'])
# try:
# data = s.loads(token)
# project_id = data.get('projectId')
# user_project = BPUserProject.query.filter_by(user_project_user_id=current_user.user_id,
# user_project_project_id=project_id).first()
# if user_project is None:
# user_project = BPUserProject()
# user_project.user_project_project_id = project_id
# user_project.user_project_user_id = current_user.user_id
# db.session.add(user_project)
# except:
# flash('Your url has been out of date.')
# return redirect(url_for('main.login'))
# # projectId = data.get('projectId')
# # user_project = BPUserProject.query.filter_by(user_project_user_id=current_user.user_id,
# #                                                 user_project_project_id=projectId).first()
# # if user_project is None:
#     #     user_project = BPUserProject()
#     #     user_project.user_project_project_id = projectId
#     #     user_project.user_project_user_id = current_user.user_id
#     #     db.session.add(user_project)
#     return redirect(url_for('main.admin_project_list'))


@main.route('/confirm_url/<token>')
@login_required
def confirm_url(token):
    if current_user.confirm(token):
        help_utils.set_session(current_user)
        return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))
    return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))


@main.route('/user_confirm_url/<token>')
@login_required
def user_confirm_url(token):
    if current_user.user_confirmed:  # 如果账户已确认过
        return redirect(url_for('main.index'))
    if current_user.user_confirm(token):  # 直接通过user_confirm方法来完成确认并返回确认结果
        flash(u'账户已通过邮箱确认，感谢您的配合！')
    else:
        flash(u'无效链接或已过期')
    return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))


@main.route('/admin/projects/<projectId>', methods=['GET', 'POST'])
@login_required
def admin_edit_project(projectId):
    project = BPProject.query.get(projectId)
    session['organ_edit_project_id'] = projectId
    # project_user = BPUserProject.query.filter_by(user_project_project_id=projectId).first()
    # user = BPUser.query.filter_by(user_id=current_user.user_id).first()
    if project is None:
        if projectId == 'new':
            project = BPProject()
            user = BPUser.query.filter_by(user_id=current_user.user_id).first()
            project.project_pieces = 0
            project.project_pieces_left = 0

        else:
            return
    else:
        user = BPUser.query.filter_by(user_id=project.project_owner).first()
    form = ProjectForm()
    if form.validate_on_submit():
        project.project_name = form.name.data
        project.project_introduction = form.desc.data
        user.user_pieces_left = user.user_pieces_left + project.project_pieces - form.pieces.data
        project.project_pieces_left += form.pieces.data - project.project_pieces
        project.project_pieces = form.pieces.data
        project.project_status = Status.WAITING
        project.project_owner = user.user_id
        project.project_url = request.form.get("projectUrl")
        # help_utils.prop_session()
        # help_utils.set_session(current_user)
        db.session.add(user)
        db.session.add(project)
        db.session.commit()
        return redirect(url_for("main.admin_project_list"))
    form.name.data = project.project_name
    form.desc.data = project.project_introduction
    form.pieces.data = project.project_pieces
    form.pieces_left.data = project.project_pieces_left
    form.url.data = project.project_url
    if project.project_status == Status.COMPLETED:
        status = 1
    else:
        status = 0

    return render_template("admin_edit_project.html", form=form, projectId=projectId, pieces_left=user.user_pieces_left,
                           status=status)


@main.route('/admin/roles/', methods=['DELETE'])
@login_required
def admin_role_del():
    delete_item_name = request.form.get("delete_item_name")
    ids_string = request.form.get("ids")
    items = ids_string.split(',')
    # print items
    for item in items:
        # 回测数据不能删除，发否考虑用另外一个表做视图展示，只是删除展示表中的记录给用户删除体验
        if 'projects' in delete_item_name:
            project = BPProject.query.filter_by(project_id=int(item)).first()
            models = BPModel.query.filter_by(model_project_id=None).all()
            for model in models:
                db.session.delete(model)
            db.session.delete(project)
            db.session.commit()
        if 'beds' in delete_item_name:
            bed = BPBedBox.query.filter_by(bed_id=int(item)).first()
            db.session.delete(bed)
            db.session.commit()
        if 'models' in delete_item_name:
            model = BPModel.query.filter_by(model_id=int(item)).first()
            orders = ConstructionOrder.query.all()
            db.session.delete(model)
            for order in orders:
                if order.construction_order_model_id is None:
                    db.session.delete(order)
            db.session.commit()
        if 'bed/detail' in delete_item_name:
            model = BPModel.query.filter_by(model_id=int(item)).first()
            db.session.delete(model)
            db.session.commit()
        if 'organizations' in delete_item_name:
            user = BPUser.query.filter_by(user_id=int(item)).first()
            user.user_pieces_left = 0
            user.user_role_type = Identify.USER
            db.session.add(user)
            db.session.commit()
        if 'organizations/userlist' in delete_item_name:
            user = BPUser.query.filter_by(user_id=int(item)).first()
            db.session.delete(user)
            db.session.commit()

    return "ok", 200


@main.route('/admin/beds/')
@login_required
def admin_bed_list():
    if current_user.user_role_type == Identify.ORGANIZATION:
        project_list = BPProject.query.filter_by(project_owner=current_user.user_id).all()
        project_id_list = []
        for project in project_list:
            project_id = project.project_id
            project_id_list.append(project_id)
        items = db.session.query(BPBedBox).filter(
            BPBedBox.bed_project_id.in_(project_id_list)).all()
        return render_template("admin_list_bed_box.html", items=items)
    project = BPProject.query.filter_by(project_id=session['project_id']).first()
    items = BPBedBox.query.filter_by(bed_project_id=session['project_id']).order_by(BPBedBox.bed_id.desc()).all()
    return render_template("admin_list_bed_box.html", items=items, project=project)


@main.route('/admin/beds/new/', methods=['GET', 'POST'])
@login_required
def admin_bed_new():
    user = BPUser.query.get_or_404(current_user.user_id)
    project_id = session['project_id']
    # project = BPProject.query.filter_by(project_id=project_id).first()
    # if project.project_status == Status.COMPLETED:
    #     flash(u"项目已经完成，无法再新建台座")
    #     return redirect(url_for("main.admin_bed_list"))
    form = BedBoxForm(user=user, project_id=project_id)
    bed_box = BPBedBox()
    now = datetime.date.today()
    # now = datetime.datetime.now()
    # formate_now = now.strftime("%Y-%m-%d") mysql下传这种格式的时间数据formate_now到数据库中
    if form.validate_on_submit():
        bed_box.bed_default_period = form.period.data
        bed_box.bed_name = form.name.data
        time_str = request.form.get("startTime")
        timeArray = datetime.datetime.strptime(time_str, "%Y-%m-%d").date()
        # bed_box.bed_startTime = request.form.get("startTime")
        bed_box.bed_startTime = timeArray
        bed_box.bed_project_id = form.project.data
        db.session.add(bed_box)
        db.session.commit()
        return redirect(url_for("main.admin_bed_list"))
    return render_template("admin_add_bed_box.html", form=form, date_now=now)


@main.route('/admin/bed/detail/<bed_id>', methods=['GET', 'POST'])
@login_required
def admin_bed_detail(bed_id):
    bed_box = BPBedBox.query.get(bed_id)
    if bed_box is None:
        flash(u'未找到指定台座')
        # items = BPBedBox.query.all()
        # return render_template("admin_list_bed_box.html", items=items)
    items = BPModel.query.filter_by(model_bed_id=bed_box.bed_id).order_by(BPModel.model_expect_startTime.asc()).all()
    return render_template("admin_detail_bed_box.html", bed_box=bed_box, items=items)


@main.route('/admin/models/')
@login_required
def admin_model_list():
    if current_user.user_role_type == Identify.ORGANIZATION:
        project_list = BPProject.query.filter_by(project_owner=current_user.user_id).all()
        project_id_list = []
        for project in project_list:
            project_id = project.project_id
            project_id_list.append(project_id)
        # items = db.session.query(BPModel).filter(
        #     BPModel.model_project_id.in_(project_id_list)).all()
        items = BPModel.query.filter_by(model_project_id=session['project_id']).order_by(BPModel.model_id.desc()).all()
        project = BPProject.query.filter_by(project_id=session['project_id']).first()
        return render_template("admin_list_model.html", items=items, project=project)
    items = BPModel.query.filter_by(model_project_id=session['project_id']).order_by(
        BPModel.model_id.desc()).all()
    project = BPProject.query.filter_by(project_id=session['project_id']).first()
    return render_template("admin_list_model.html", items=items, project=project)


@main.route('/admin/detail/model/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_model(model_id):
    now = datetime.date.today()

    # 用于测试开发阶段,将model_id均设为模型1的id
    # model_id_set = BPModel.query.filter_by(model_number=u'一局桥梁公司宁波项目第一标段').first().model_id
    # model = BPModel.query.filter_by(model_id=model_id_set).first()  for test
    model = BPModel.query.filter_by(model_id=model_id).first()
    nodes = BPNode.query.filter_by(node_model_id=model_id).order_by(BPNode.node_number.asc()).all()
    result = [d.to_json() for d in nodes]
    # segments = BPSegments.query.filter_by(segment_model_id=model_id_set).all()  for test
    segments = BPSegments.query.filter_by(segment_model_id=model_id).order_by(BPSegments.segment_number.asc()).all()
    seg_thoretical = help_utils.get_seg_theoretical_data(segments)

    seg_actual = help_utils.get_seg_actual_data(segments)

    segments_data_control_setup = help_utils.seach_segment_data(segments, False, False)
    segment_control_lines = model.control_lines
    # for control_line in segment_control_lines:
    # print(control_line.control_line_data_id)
    # print(control_line.control_line_data_name)
    control_line = ControlLineData.query.filter_by(control_line_data_model_id=model_id,
                                                   control_line_data_name=u"浇筑曲线").first()
    if control_line is not None:
        control_line_setup = control_line.to_json(is_theoretical_value=True, is_offset=False, position="GP-C")
        control_line_survey = control_line.to_json(is_theoretical_value=False, is_offset=False, position="GP-C")
    # segments_data_control_setup = help_utils.calculate_seg_data(segments)
    else:
        control_line_setup = control_line
        control_line_survey = control_line
    return render_template("admin_detail_model.html", model=model, nodes=nodes, node_model_id=model_id, result=result,
                           segments=segments, seg_thoretical=seg_thoretical, seg_actual=seg_actual,
                           segments_data_control_setup=segments_data_control_setup,
                           segment_control_lines=segment_control_lines,
                           control_line_setup=control_line_setup,
                           control_line_survey=control_line_survey, date_now=now)


# @main.route('/admin/node/3d/data/<model_id>', methods=['GET', 'POST'])
# @login_required
# def admin_node_3d_data(model_id):
#     nodes = BPNode.query.filter_by(node_model_id=model_id).order_by(BPNode.node_number.asc()).all()
#     for item in nodes:

@main.route('/admin/detail/produre/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_process_finish(model_id):
    cast_time = request.args.get('castTime', 0, str)
    adjust_length = request.args.get('adjust_length', 0, int)
    print(cast_time)
    print(adjust_length)
    segment_casting = BPSegments.query.filter_by(segment_model_id=model_id, segment_status=Status.RUNNING).first()
    segment_casting.segment_status = Status.COMPLETED
    cast_time_hour = time.strftime('%H:%M', time.localtime(time.time()))
    segment_casting.segment_casted_date = cast_time + ' ' + cast_time_hour
    model = BPModel.query.filter_by(model_id=model_id).first()
    help_utils.calc_actual_value(model, segment_casting)
    segment_next = help_utils.find_next_segment(model_id, segment_casting.segment_number)
    project = model.get_project()
    if not project.project_status == Status.RUNNING:
        project.project_status = Status.RUNNING
        db.session.add(project)
    if segment_next is None:
        model.model_status = Status.COMPLETED
        # time_now = time.strftime('%Y-%m-%d', time.localtime(time.time()))
        cast_time = datetime.datetime.strptime(cast_time, "%Y-%m-%d").date()
        model.model_actual_endTime = cast_time
        db.session.add(model)
    else:
        db.session.add(segment_next)
        try:
            help_utils.create_construction_order(segment_next, adjust_length)  # 实际要生成施工指令
        except Exception, e:
            print(e)
            return jsonify(result={"status": -1})
        segment_next.segment_status = Status.RUNNING

    db.session.add(segment_casting)
    db.session.commit()
    return jsonify(result={"status": 1})


@main.route('/admin/detail/error_range_check/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_error_range_check(model_id):
    segment_casting = BPSegments.query.filter_by(segment_model_id=model_id, segment_status=Status.RUNNING).first()
    model = BPModel.query.filter_by(model_id=model_id).first()
    delta_v, delta_s = help_utils.calc_delta(model, segment_casting)
    segment_next = help_utils.find_next_segment(model_id, segment_casting.segment_number)
    print(segment_next)
    if segment_next is None:
        adjust_length = -1
    else:
        adjust_length = help_utils.find_next_segments_for_construction(model_id, segment_next.segment_number) + 1
    print(adjust_length)
    return jsonify(result={"status": 1, "model_v_range": model.model_v_range, "model_s_range": model.model_s_range,
                           "delta_v": delta_v, "delta_s": delta_s, "adjust_length": adjust_length})


@main.route('/admin/detail/create/construction/order<segment_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_create_construction_order(segment_id):
    segment = BPSegments.query.filter_by(segment_id=segment_id).first()
    next_segment = help_utils.find_next_segment(model_id=segment.segment_model_id, segment_number=segment_id)
    # construction_order = help_utils.create_construction_order(next_segment)
    construction_order = ConstructionOrder.query.filter_by(construction_order_segment_id=next_segment.segment_id)
    return jsonify(construction_order=construction_order)


@main.route('/admin/detail/process/surveydata/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_process_survey_data(model_id):
    segment_cast = BPSegments.query.filter_by(segment_model_id=model_id, segment_status=Status.RUNNING).first()
    survey_data = BPSurveyedData.query.filter_by(surveyed_data_segment_id=segment_cast.segment_id,
                                                 surveyed_data_status=Status.VERIFIED).first()
    # print(survey_data.surveyed_data_segment_id)
    if survey_data is None:
        return jsonify(survey_data=None)
    else:
        json_survey_data = help_utils.transform_survey_data_to_json(survey_data)
        return jsonify(survey_data=json_survey_data)


@main.route('/admin/detail/process/init/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_process_init(model_id):
    model = BPModel.query.filter_by(model_id=model_id).first()
    if model.model_status == Status.COMPLETED:  # 模型已经浇筑完了
        return jsonify(status={"status": 1})
    else:
        segment_casting = BPSegments.query.filter_by(segment_model_id=model_id, segment_status=Status.RUNNING).first()
        # print "start node:"+str(segment_casting.segment_start_node)
        # segment_casting = BPSegments.query.filter_by(segment_number=106).first()  # for test
        last_segment_number = segment_casting.segment_matching_id
        orders = segment_casting.construction_orders
        orders_json = help_utils.transform_order_to_json(orders[0])
        survey_data = BPSurveyedData.query.filter_by(surveyed_data_segment_id=segment_casting.segment_id,
                                                     surveyed_data_status=Status.VERIFIED).first()
        if survey_data is None:
            survey_data_json = None
        else:
            survey_data_json = help_utils.transform_survey_data_to_json(survey_data)
        return jsonify(status={"status": 0}, order_data=orders_json, survey_data=survey_data_json,
                       last_segment_number={"last_segment_number": last_segment_number})


@main.route('/admin/detail/control/gpchange/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_control_line_gpdata(model_id):
    flag_offset = request.args.get('offsetFlagInSelect', 0, int)

    segments = BPSegments.query.filter_by(segment_model_id=model_id).order_by(BPSegments.segment_number.asc()).all()
    if flag_offset == 0:
        # segments_data_control_setup = help_utils.calculate_seg_data(segments)
        segments_data_control_setup = help_utils.seach_segment_data(segments, False, False)

        return jsonify(segments_data_control_setup=segments_data_control_setup)
    if flag_offset == 1:
        # segments_data_control_setup = help_utils.calculate_seg_offset_data(segments)
        segments_data_control_setup = help_utils.seach_segment_data(segments, True, False)
        return jsonify(segments_data_control_setup=segments_data_control_setup)
    return "ok", 200


@main.route('/admin/detail/control/controlline/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_control_line_data(model_id):
    flag_offset = request.args.get('flag_offset', 0, int)
    flag_theoretical = request.args.get('flag_theoretical', 0, int)
    control_line_data_id = request.args.get('control_line_data_id', 0, int)
    position = request.args.get('position', 0, str)
    # print(model_id)
    # print(flag_offset)
    # print(flag_theoretical)
    # print(control_line_data_id)
    # print(position)
    control_line_data = ControlLineData.query.filter_by(control_line_data_id=control_line_data_id).first()
    # control_line_data = ControlLineData()
    ret1 = None
    ret2 = None
    if flag_theoretical == 1 or flag_theoretical == 2:
        ret1 = control_line_data.to_json(True, flag_offset == 1, position)
    if flag_theoretical == 0 or flag_theoretical == 2:
        ret2 = control_line_data.to_json(False, flag_offset == 1, position)
    # print(ret1)
    # print(ret2)
    # segments = BPSegments.query.filter_by(segment_model_id=model_id).order_by(BPSegments.segment_number.asc()).all()
    # if flag_offset == 0:
    #     # segments_data_control_setup = help_utils.calculate_seg_data(segments)
    #     segments_data_control_setup = help_utils.seach_segment_data(segments, False, False)
    #
    #     return jsonify(segments_data_control_setup=segments_data_control_setup)
    # if flag_offset == 1:
    #     # segments_data_control_setup = help_utils.calculate_seg_offset_data(segments)
    #     segments_data_control_setup = help_utils.seach_segment_data(segments, True, False)
    #     return jsonify(segments_data_control_setup=segments_data_control_setup)
    return jsonify(control_line_setup=ret1, control_line_survey=ret2)


@main.route('/admin/detail/control/offset/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_control_offset(model_id):
    flag_offset = request.args.get('controlLineOffsetStatus', 0, int)
    segments = BPSegments.query.filter_by(segment_model_id=model_id).order_by(BPSegments.segment_number.asc()).all()
    if flag_offset == 0:
        # segments_data_control_setup = help_utils.calculate_seg_data(segments)
        segments_data_control_setup = help_utils.seach_segment_data(segments, False, False)
        return jsonify(segments_data_control_setup=segments_data_control_setup)
    if flag_offset == 1:
        # segments_data_control_setup = help_utils.calculate_seg_offset_data(segments)
        segments_data_control_setup = help_utils.seach_segment_data(segments, True, False)
        return jsonify(segments_data_control_setup=segments_data_control_setup)
    return "ok", 200


@main.route('/admin/detail/node/camber/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_node_camber(model_id):
    nodes = BPNode.query.filter_by(node_model_id=model_id).order_by(BPNode.node_number.asc()).all()
    result = [d.to_json() for d in nodes]
    # result = help_utils.calculate_node_camber(nodes)
    return jsonify(result=result)


@main.route('/admin/detail/segment/data/<model_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_segment_data(model_id):
    flag_camber = request.args.get('camberCheckBoxStatus', 0, int)
    flag_offset = request.args.get('offsetCheckBoxStatus', 0, int)
    # flag_camber=1时，表示预拱后的值
    segments = BPSegments.query.filter_by(segment_model_id=model_id).order_by(BPSegments.segment_number.asc()).all()
    if flag_camber == 1 and flag_offset == 0:
        segments_data = help_utils.seach_segment_data(segments, False, True)
        # segments_data = help_utils.calculate_seg_camber_data(segments)
        return jsonify(segments_data=segments_data)
    # flag_camber=0时，表示预拱前的值
    if flag_camber == 0 and flag_offset == 0:
        # segments = BPSegments.query.filter_by(segment_model_id=model_id)
        segments_data = help_utils.seach_segment_data(segments, False, False)
        # segments_data = help_utils.calculate_seg_data(segments)
        return jsonify(segments_data=segments_data)

    if flag_camber == 0 and flag_offset == 1:
        # segments = BPSegments.query.filter_by(segment_model_id=model_id)
        segments_data = help_utils.seach_segment_data(segments, True, False)
        # segments_data = help_utils.calculate_seg_offset_data(segments)
        return jsonify(segments_data=segments_data)

    if flag_camber == 1 and flag_offset == 1:
        # segments = BPSegments.query.filter_by(segment_model_id=model_id)
        segments_data = help_utils.seach_segment_data(segments, True, True)
        # segments_data = help_utils.cal_seg_offset_camber_data(segments)
        return jsonify(segments_data=segments_data)

    return "ok", 200


@main.route('/admin/detail/segment/process/<segment_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_segment_process(segment_id):
    segment_show = BPSegments.query.filter_by(segment_id=segment_id).first()
    return render_template("admin_detail_segment_process.html", segment_show=segment_show)


@main.route('/admin/detail/segment/process/json/<segment_id>', methods=['GET', 'POST'])
@login_required
def admin_detail_segment_process_json(segment_id):
    segment_show = BPSegments.query.filter_by(segment_id=segment_id).first()
    last_segment_number = segment_show.segment_matching_id
    orders = segment_show.construction_orders
    orders_json = help_utils.transform_order_to_json(orders[0])
    survey_data = BPSurveyedData.query.filter_by(surveyed_data_segment_id=segment_id,
                                                 surveyed_data_status=Status.VERIFIED).first()
    survey_data_json = help_utils.transform_survey_data_to_json(survey_data)
    return jsonify(status={"status": 0}, order_data=orders_json, survey_data=survey_data_json,
                   last_segment_number={"last_segment_number": last_segment_number})


def allowed_file(filename):
    # ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'cast', 'xls', 'csv'])
    ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'cast', 'xls', 'csv'])
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@main.route('/admin/upload/model/result/<status>', methods=['GET', 'POST'])
@login_required
def upload_model_file_result(status):
    if status == "0":
        flash(u"导入模型文件失败")
        return redirect(url_for('main.admin_model_list'))
    if status == "1":
        flash(u"导入模型文件成功")
        return redirect(url_for('main.admin_model_list'))
    if status == "2":
        flash(u"项目剩余片数不够")
    if status == "3":
        flash(u"项目已经结束，无法再导入模型")
    if status == "4":
        flash(u"模型已经存在，如果要修改，请先删除")

    return redirect(url_for('main.admin_model_list'))


@main.route('/admin/model/upload/', methods=['GET', 'POST'])
@login_required
def admin_model_upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + file.filename
            # basedir2 = basedir + r'\app\static\modelFile'
            basedir2 = os.path.join(os.path.join(os.path.join(basedir, 'app'), 'static'), 'modelFile')
            if not os.path.exists(basedir2):
                os.mkdir(basedir2)
            file_path = os.path.join(basedir2, filename)
            file.save(file_path)
            result = help_utils.analyse_model_file(file_path, filename)
            # model = BPModel()
            # if current_user.user_role_type == Identify.ORGANIZATION:
            #     model.model_project_id = BPProject.query.filter_by(project_owner=current_user.user_id).first().project_id
            # else:
            #     model.model_project_id = session['project_id']
            # model.model_number = filename
            # model.model_filePath = os.path.join(basedir2, filename)
            # model.model_name = filename
            # model.model_status = Status.WAITING
            # db.session.add(model)
            # db.session.commit()
            if result == 4:
                return jsonify(result={"data": 4})  # 表示模型已经存在
            if result == 2:
                return jsonify(result={"data": 2})  # 表示模型片数不够错误
            if result == 3:
                return jsonify(result={"data": 3})  # 表示模型已经结束
            if result:
                return jsonify(result={"data": 1})  # 表示模型解析成功
            else:
                return jsonify(result={"data": 0})  # 表示模型解析成功
    return redirect(url_for('main.admin_model_list'))


@main.route('/admin/bed/upload/<bed_box_id>', methods=['GET', 'POST'])
@login_required
def admin_bed_upload_file(bed_box_id):
    if request.method == 'POST':
        try:
            file = request.files['file']
            if file and '.' in file.filename and \
                            file.filename.rsplit('.', 1)[1] in set(['xls']):
                filename = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time())) + file.filename
                # basedir2 = basedir + r'\app\static'
                basedir2 = os.path.join(os.path.join(basedir, 'app'), 'static')
                file.save(os.path.join(basedir2, filename))
                excel_file = xlrd.open_workbook(os.path.join(basedir2, filename))
                excel_model_file = excel_file.sheet_by_index(0)
                for rownum in range(1, excel_model_file.nrows):
                    excel_model_number = excel_model_file.cell(rownum, 0).value
                    count_bed_model = BPBedBox.query.filter_by(bed_id=bed_box_id).first().models.count()
                    bed_box = BPBedBox.query.filter_by(bed_id=bed_box_id).first()
                    if bed_box.project.project_status == Status.COMPLETED:
                        os.remove(os.path.join(basedir2, filename))
                        return jsonify(result={"data": 1})  # 表示项目已结束，无法再导入模型
                    model = BPModel.query.filter_by(model_number=str(excel_model_number)).first()
                    if model is None:
                        model = BPModel()
                        model.model_status = Status.WAITING
                    model.model_number = excel_model_number
                    model.model_name = excel_model_file.cell(rownum, 1).value
                    # model.model_pieces = excel_model_file.cell(rownum, 2).value
                    model.model_bed_id = bed_box_id
                    model.model_project_id = bed_box.bed_project_id
                    model.model_in_bedOrder = count_bed_model + 1
                    # count_bed_model += 1
                    model.model_expect_startTime = (bed_box.bed_startTime + datetime.timedelta(
                        days=count_bed_model * bed_box.bed_default_period))
                    model.model_expect_endTime = (bed_box.bed_startTime + datetime.timedelta(
                        days=(count_bed_model + 1) * bed_box.bed_default_period))
                    db.session.add(model)
                    db.session.commit()
                os.remove(os.path.join(basedir2, filename))
            else:
                # result = BPBedBox.query.filter_by(bed_id=bed_box_id).first()
                # print result
                # return jsonify(result=result)

                flash(u'文件格式错误')
        except:

            flash(u'文件格式错误')
    return redirect(url_for('main.admin_bed_list'))


@main.route('/admin/upload_surveyed/', methods=['GET', 'POST'])
@login_required
def upload_surveyed_data():
    if request.method == 'POST':
        try:
            file = request.files['file']
            if file and allowed_file(file.filename):
                model_id = request.form.get("model_id")
                if model_id is None:
                    return 'stop'
                current_model = BPModel.query.filter_by(model_id=model_id).first()
                # print current_model.project.project_status
                if current_model.project.project_status == Status.COMPLETED:
                    return 'finish'
                segments_list = current_model.segments
                tag = 0
                is_first_segment = False
                # 以下循环若执行 说明model中存在不少于一个segment
                segment_now = None
                for segment in segments_list:
                    tag = 1
                    if segment.segment_status == Status.RUNNING:
                        segment_now = segment
                        session['surveyed_data_segment_id'] = segment.segment_id
                        if segment.segment_matching_id == 0:
                            is_first_segment = True
                if tag == 0:
                    return 'stop'
                # print(tag)
                # print("segment %s first segment" % (is_first_segment and "is" or "is not"))
                # filename = current_model.model_number + file.filename
                filename = time.strftime('%Y-%m-%d-%H-%M', time.localtime(time.time())) + file.filename
                basedir2 = os.path.join(os.path.join(os.path.join(basedir, 'app'), 'static'), 'surveyedData')
                # basedir2 = basedir + r'\app\static\surveyedData'
                if not os.path.exists(basedir2):
                    os.mkdir(basedir2)
                file.save(os.path.join(basedir2, filename))
                excel_file = xlrd.open_workbook(os.path.join(basedir2, filename))
                excel_sheet = excel_file.sheet_by_index(0)
                # project_id未获取
                #  浮点数12位精度，当用22位精度时，数据库似乎不支持，跳成科学计数法了
                session['is_first_segment_surveyed_data'] = is_first_segment
                if excel_sheet.cell_value(0, 0) == "simplify":
                    construction_order = ConstructionOrder.query.filter_by(
                        construction_order_segment_id=segment_now.segment_id).first()
                    if is_first_segment:
                        row_begin = find_index('floating bulkhead', excel_sheet)
                        session['float_bulkhead_GP_R_offset'] = construction_order.float_bulkhead_GP_R_offset
                        session['float_bulkhead_GP_R_elevation'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 3, 1))
                        session['float_bulkhead_GP_R_length'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 5, 1))
                        session['float_bulkhead_GP_C_offset'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 1, 1))
                        session['float_bulkhead_GP_C_elevation'] = construction_order.float_bulkhead_GP_C_elevation
                        session['float_bulkhead_GP_C_length'] = construction_order.float_bulkhead_GP_C_length
                        session['float_bulkhead_GP_L_offset'] = construction_order.float_bulkhead_GP_L_offset
                        session['float_bulkhead_GP_L_elevation'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 2, 1))
                        session['float_bulkhead_GP_L_length'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 4, 1))
                    else:
                        row_begin = find_index(str(segment_now.segment_matching_id) + 'Match-cast', excel_sheet)
                        session['GP_R_offset_begin_match'] = construction_order.GP_R_offset_begin_match
                        session['GP_R_elevation_begin_match'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 3, 1))
                        session['GP_R_length_begin_match'] = construction_order.GP_R_length_begin_match
                        session['GP_C_offset_begin_match'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 1))
                        session['GP_C_elevation_begin_match'] = construction_order.GP_C_elevation_begin_match
                        session['GP_L_offset_begin_match'] = construction_order.GP_L_offset_begin_match
                        session['GP_L_elevation_begin_match'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 2, 1))
                        session['GP_L_length_begin_match'] = construction_order.GP_L_length_begin_match
                        session['GP_R_offset_end_match'] = construction_order.GP_R_offset_end_match
                        session['GP_R_elevation_end_match'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 1))
                        session['GP_R_length_end_match'] = construction_order.GP_R_length_end_match
                        session['GP_C_offset_end_match'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 1))
                        session['GP_C_elevation_end_match'] = construction_order.GP_C_elevation_end_match
                        session['GP_L_offset_end_match'] = construction_order.GP_L_offset_end_match
                        session['GP_L_elevation_end_match'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 1))
                        session['GP_L_length_end_match'] = construction_order.GP_L_length_end_match
                        if segment_now.is_at_begin():
                            session['GP_C_length_begin_match'] = construction_order.GP_C_length_begin_match
                            session['GP_C_length_end_match'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 7, 1))
                        else:
                            session['GP_C_length_begin_match'] = "%.12f" % float(
                                excel_sheet.cell_value(row_begin + 7, 1))
                            session['GP_C_length_end_match'] = construction_order.GP_C_length_end_match

                    row_begin = find_index(str(segment_now.segment_number) + 'Wet-cast', excel_sheet)
                    surveyed_data = BPSurveyedData()
                    session['GP_R_offset_begin'] = construction_order.GP_R_offset_begin
                    session['GP_R_elevation_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 3, 1))
                    session['GP_R_length_begin'] = construction_order.GP_R_length_begin

                    session['GP_C_offset_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 1))
                    session['GP_C_elevation_begin'] = construction_order.GP_C_elevation_begin
                    session['GP_C_length_begin'] = construction_order.GP_C_length_begin

                    session['GP_L_offset_begin'] = construction_order.GP_L_offset_begin
                    session['GP_L_elevation_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 1))
                    session['GP_L_length_begin'] = construction_order.GP_L_length_begin

                    session['GP_R_offset_end'] = construction_order.GP_R_offset_end
                    session['GP_R_elevation_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 1))
                    session['GP_R_length_end'] = construction_order.GP_R_length_end
                    session['GP_C_offset_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 1))
                    session['GP_C_elevation_end'] = construction_order.GP_C_elevation_end
                    session['GP_C_length_end'] = construction_order.GP_C_length_end
                    session['GP_L_offset_end'] = construction_order.GP_L_offset_end
                    session['GP_L_elevation_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 1))
                    session['GP_L_length_end'] = construction_order.GP_L_length_end

                    row_begin = find_index('fixed-bulkhead', excel_sheet)
                    session['bulkhead_GP_R_offset'] = construction_order.bulkhead_GP_R_offset
                    session['bulkhead_GP_R_elevation'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 3, 1))
                    session['bulkhead_GP_C_offset'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 1))
                    session['bulkhead_GP_C_elevation'] = construction_order.bulkhead_GP_C_elevation
                    session['bulkhead_GP_L_offset'] = construction_order.bulkhead_GP_L_offset
                    session['bulkhead_GP_L_elevation'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 1))
                else:
                    if is_first_segment:
                        row_begin = find_index('floating bulkhead', excel_sheet) + 2
                        session['float_bulkhead_GP_R_offset'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 1))
                        session['float_bulkhead_GP_R_elevation'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 1, 1))
                        session['float_bulkhead_GP_R_length'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 2, 1))
                        session['float_bulkhead_GP_C_offset'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 3))
                        session['float_bulkhead_GP_C_elevation'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 1, 3))
                        session['float_bulkhead_GP_C_length'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 2, 3))
                        session['float_bulkhead_GP_L_offset'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 5))
                        session['float_bulkhead_GP_L_elevation'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 1, 5))
                        session['float_bulkhead_GP_L_length'] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 2, 5))
                    else:
                        row_begin = find_index(str(segment_now.segment_matching_id) + 'Match-cast', excel_sheet) + 2
                        session['GP_R_offset_begin_match'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 1))
                        session["GP_R_elevation_begin_match"] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 1, 1))
                        session["GP_R_length_begin_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 1))
                        session["GP_C_offset_begin_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin, 3))
                        session["GP_C_elevation_begin_match"] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 1, 3))
                        session["GP_C_length_begin_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 3))
                        session["GP_L_offset_begin_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin, 5))
                        session["GP_L_elevation_begin_match"] = "%.12f" % float(
                            excel_sheet.cell_value(row_begin + 1, 5))
                        session["GP_L_length_begin_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 5))
                        session["GP_R_offset_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 1))
                        session["GP_R_elevation_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 1))
                        session["GP_R_length_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 1))
                        session["GP_C_offset_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 3))
                        session["GP_C_elevation_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 3))
                        session["GP_C_length_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 3))
                        session["GP_L_offset_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 5))
                        session["GP_L_elevation_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 5))
                        session["GP_L_length_end_match"] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 5))
                    row_begin = find_index(str(segment_now.segment_number) + 'Wet-cast', excel_sheet) + 2
                    surveyed_data = BPSurveyedData()
                    session['GP_R_offset_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 1))
                    session['GP_R_elevation_begin'] = ("%.12f" % float(excel_sheet.cell_value(row_begin + 1, 1)))
                    session['GP_R_length_begin'] = ("%.12f" % float(excel_sheet.cell_value(row_begin + 2, 1)))

                    session['GP_C_offset_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 3))
                    session['GP_C_elevation_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 3))
                    session['GP_C_length_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 3))

                    session['GP_L_offset_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 5))
                    session['GP_L_elevation_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 5))
                    session['GP_L_length_begin'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 2, 5))

                    session['GP_R_offset_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 1))
                    session['GP_R_elevation_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 1))
                    session['GP_R_length_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 1))
                    session['GP_C_offset_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 3))
                    session['GP_C_elevation_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 3))
                    session['GP_C_length_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 3))
                    session['GP_L_offset_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 4, 5))
                    session['GP_L_elevation_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 5, 5))
                    session['GP_L_length_end'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 6, 5))

                    row_begin = find_index('fixed-bulkhead', excel_sheet) + 2
                    session['bulkhead_GP_R_offset'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 1))
                    session['bulkhead_GP_R_elevation'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 1))
                    session['bulkhead_GP_C_offset'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 3))
                    session['bulkhead_GP_C_elevation'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 3))
                    session['bulkhead_GP_L_offset'] = "%.12f" % float(excel_sheet.cell_value(row_begin, 5))
                    session['bulkhead_GP_L_elevation'] = "%.12f" % float(excel_sheet.cell_value(row_begin + 1, 5))
                project_name = BPProject.query.filter_by(project_id=current_model.model_project_id).first().project_name
                # time_now = datetime.now()
                file_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
                session['surveyed_data_time'] = file_time
                # session['surveyed_data_time'] = str(time_now.year)+u'年'+str(time_now.month)+u"月"+str(time_now.day)+u'日'+u'-'+str(time_now.hour)+u":"+str(time_now.minute)
                session['surveyed_data_number'] = current_model.model_number + str(
                    segment_now.segment_number) + u'节段回测数据' + time.strftime('%Y-%m-%d-%H-%M',
                                                                            time.localtime(time.time()))
                session['surveyed_data_status'] = Status.VERIFYING
                session['surveyed_data_filename'] = filename
                session['surveyed_data_model_id'] = model_id
                session['surveyed_data_project_id'] = current_model.model_project_id
                surveyed_data.surveyed_data_model_id = request.args.get("model_id")
                # print(session['surveyed_data_filename'])
                #  return redirect(url_for('uploaded_file',
                #  filename=filename))
        except Exception, e:
            print(e)
            flash(u'文件格式错误')
            db.session.remove()
            return "ERROR"
    return 'OK'
    # return redirect(url_for('main.admin_project_list'))


@main.route('/admin/confirm_upload_suerveyed')
@login_required
def admin_confirm_surveyed_data_display():
    surveyed_data = BPSurveyedData()
    upload_time = time.strftime('%Y-%m-%d-%H-%M', time.localtime(time.time()))
    surveyed_data.surveyed_data_time = upload_time
    surveyed_data.is_first_segment_surveyed_data = bool(session["is_first_segment_surveyed_data"])
    if surveyed_data.is_first_segment_surveyed_data:
        surveyed_data.float_bulkhead_GP_R_offset = float(session['float_bulkhead_GP_R_offset'])
        surveyed_data.float_bulkhead_GP_R_elevation = float(session['float_bulkhead_GP_R_elevation'])
        surveyed_data.float_bulkhead_GP_R_length = float(session['float_bulkhead_GP_R_length'])
        surveyed_data.float_bulkhead_GP_C_offset = float(session['float_bulkhead_GP_C_offset'])
        surveyed_data.float_bulkhead_GP_C_elevation = float(session['float_bulkhead_GP_C_elevation'])
        surveyed_data.float_bulkhead_GP_C_length = float(session['float_bulkhead_GP_C_length'])
        surveyed_data.float_bulkhead_GP_L_offset = float(session['float_bulkhead_GP_L_offset'])
        surveyed_data.float_bulkhead_GP_L_elevation = float(session['float_bulkhead_GP_L_elevation'])
        surveyed_data.float_bulkhead_GP_L_length = float(session['float_bulkhead_GP_L_length'])

    else:
        surveyed_data.GP_R_offset_begin_match = float(session["GP_R_offset_begin_match"])
        surveyed_data.GP_R_elevation_begin_match = float(session["GP_R_elevation_begin_match"])
        surveyed_data.GP_R_length_begin_match = float(session["GP_R_length_begin_match"])
        surveyed_data.GP_C_offset_begin_match = float(session["GP_C_offset_begin_match"])
        surveyed_data.GP_C_elevation_begin_match = float(session["GP_C_elevation_begin_match"])
        surveyed_data.GP_C_length_begin_match = float(session["GP_C_length_begin_match"])
        surveyed_data.GP_L_offset_begin_match = float(session["GP_L_offset_begin_match"])
        surveyed_data.GP_L_elevation_begin_match = float(session["GP_L_elevation_begin_match"])
        surveyed_data.GP_L_length_begin_match = float(session["GP_L_length_begin_match"])
        surveyed_data.GP_R_offset_end_match = float(session["GP_R_offset_end_match"])
        surveyed_data.GP_R_elevation_end_match = float(session["GP_R_elevation_end_match"])
        surveyed_data.GP_R_length_end_match = float(session["GP_R_length_end_match"])
        surveyed_data.GP_C_offset_end_match = float(session["GP_C_offset_end_match"])
        surveyed_data.GP_C_elevation_end_match = float(session["GP_C_elevation_end_match"])
        surveyed_data.GP_C_length_end_match = float(session["GP_C_length_end_match"])
        surveyed_data.GP_L_offset_end_match = float(session["GP_L_offset_end_match"])
        surveyed_data.GP_L_elevation_end_match = float(session["GP_L_elevation_end_match"])
        surveyed_data.GP_L_length_end_match = float(session["GP_L_length_end_match"])

    surveyed_data.GP_R_offset_begin = float(session['GP_R_offset_begin'])
    surveyed_data.GP_R_elevation_begin = float(session['GP_R_elevation_begin'])
    surveyed_data.GP_R_length_begin = float(session['GP_R_length_begin'])
    surveyed_data.GP_C_offset_begin = float(session['GP_C_offset_begin'])
    surveyed_data.GP_C_elevation_begin = float(session['GP_C_elevation_begin'])
    surveyed_data.GP_C_length_begin = float(session['GP_C_length_begin'])
    surveyed_data.GP_L_offset_begin = float(session['GP_L_offset_begin'])
    surveyed_data.GP_L_elevation_begin = float(session['GP_L_elevation_begin'])
    surveyed_data.GP_L_length_begin = float(session['GP_L_length_begin'])
    surveyed_data.GP_R_offset_end = float(session['GP_R_offset_end'])
    surveyed_data.GP_R_elevation_end = float(session['GP_R_elevation_end'])
    surveyed_data.GP_R_length_end = float(session['GP_R_length_end'])
    surveyed_data.GP_C_offset_end = float(session['GP_C_offset_end'])
    surveyed_data.GP_C_elevation_end = float(session['GP_C_elevation_end'])
    surveyed_data.GP_C_length_end = float(session['GP_C_length_end'])
    surveyed_data.GP_L_offset_end = float(session['GP_L_offset_end'])
    surveyed_data.GP_L_elevation_end = float(session['GP_L_elevation_end'])
    surveyed_data.GP_L_length_end = float(session['GP_L_length_end'])

    surveyed_data.bulkhead_GP_R_offset = float(session['bulkhead_GP_R_offset'])
    surveyed_data.bulkhead_GP_R_elevation = float(session['bulkhead_GP_R_elevation'])
    surveyed_data.bulkhead_GP_C_offset = float(session['bulkhead_GP_C_offset'])
    surveyed_data.bulkhead_GP_C_elevation = float(session['bulkhead_GP_C_elevation'])
    surveyed_data.bulkhead_GP_L_offset = float(session['bulkhead_GP_L_offset'])
    surveyed_data.bulkhead_GP_L_elevation = float(session['bulkhead_GP_L_elevation'])

    surveyed_data.surveyed_data_number = session['surveyed_data_number']
    surveyed_data.surveyed_data_segment_id = session['surveyed_data_segment_id']
    surveyed_data.surveyed_data_status = session['surveyed_data_status']
    surveyed_data.filename = session['surveyed_data_filename']
    surveyed_data.surveyed_data_model_id = session['surveyed_data_model_id']
    surveyed_data.surveyed_data_project_id = session['surveyed_data_project_id']
    surveyed_data.surveyed_data_time = session['surveyed_data_time']
    model_id = session['surveyed_data_model_id']
    segment = BPSegments.query.filter_by(segment_model_id=model_id, segment_status=Status.RUNNING).first()
    order = ConstructionOrder.query.filter_by(construction_order_segment_id=segment.segment_id).first()
    return render_template("admin_confirm_surveyed_data.html", surveyed_data=surveyed_data,
                           is_first=session["is_first_segment_surveyed_data"], order=order)


@main.route('/admin/cancel_confirm_upload_surveyeddata/<filename>')
@login_required
def admin_cancel_upload_surveyeddata(filename):
    db.session.remove()
    basedir2 = os.path.join(os.path.join(os.path.join(basedir, 'app'), 'static'), 'surveyedData')
    # basedir2 = basedir + r'\app\static\surveyedData'
    os.remove(os.path.join(basedir2, filename))
    flash(u"已取消")
    return redirect(url_for("main.admin_surveyed_data_list", user_id=current_user.user_id,
                            selected_id=session['surveyed_data_model_id']))


# 检测回测数据是否超过范围
@main.route('/admin/check_survey_data_out')
@login_required
def admin_check_survey_data_out():
    if help_utils.check_survey_data():
        return jsonify(checkOut={"outRange": 0})
    else:
        return jsonify(checkOut={"outRange": 1})


@main.route('/admin/confirmed_upload_surveyed')
@login_required
def admin_confirmed_surveyed_data():
    surveyed_data = BPSurveyedData()
    upload_time = time.strftime('%Y-%m-%d-%H-%M', time.localtime(time.time()))
    surveyed_data.surveyed_data_time = upload_time
    surveyed_data.is_first_segment_surveyed_data = bool(session["is_first_segment_surveyed_data"])
    if surveyed_data.is_first_segment_surveyed_data:
        surveyed_data.float_bulkhead_GP_R_offset = float(session['float_bulkhead_GP_R_offset'])
        surveyed_data.float_bulkhead_GP_R_elevation = float(session['float_bulkhead_GP_R_elevation'])
        surveyed_data.float_bulkhead_GP_R_length = float(session['float_bulkhead_GP_R_length'])
        surveyed_data.float_bulkhead_GP_C_offset = float(session['float_bulkhead_GP_C_offset'])
        surveyed_data.float_bulkhead_GP_C_elevation = float(session['float_bulkhead_GP_C_elevation'])
        surveyed_data.float_bulkhead_GP_C_length = float(session['float_bulkhead_GP_C_length'])
        surveyed_data.float_bulkhead_GP_L_offset = float(session['float_bulkhead_GP_L_offset'])
        surveyed_data.float_bulkhead_GP_L_elevation = float(session['float_bulkhead_GP_L_elevation'])
        surveyed_data.float_bulkhead_GP_L_length = float(session['float_bulkhead_GP_L_length'])

    else:
        surveyed_data.GP_R_offset_begin_match = float(session["GP_R_offset_begin_match"])
        surveyed_data.GP_R_elevation_begin_match = float(session["GP_R_elevation_begin_match"])
        surveyed_data.GP_R_length_begin_match = float(session["GP_R_length_begin_match"])
        surveyed_data.GP_C_offset_begin_match = float(session["GP_C_offset_begin_match"])
        surveyed_data.GP_C_elevation_begin_match = float(session["GP_C_elevation_begin_match"])
        surveyed_data.GP_C_length_begin_match = float(session["GP_C_length_begin_match"])
        surveyed_data.GP_L_offset_begin_match = float(session["GP_L_offset_begin_match"])
        surveyed_data.GP_L_elevation_begin_match = float(session["GP_L_elevation_begin_match"])
        surveyed_data.GP_L_length_begin_match = float(session["GP_L_length_begin_match"])
        surveyed_data.GP_R_offset_end_match = float(session["GP_R_offset_end_match"])
        surveyed_data.GP_R_elevation_end_match = float(session["GP_R_elevation_end_match"])
        surveyed_data.GP_R_length_end_match = float(session["GP_R_length_end_match"])
        surveyed_data.GP_C_offset_end_match = float(session["GP_C_offset_end_match"])
        surveyed_data.GP_C_elevation_end_match = float(session["GP_C_elevation_end_match"])
        surveyed_data.GP_C_length_end_match = float(session["GP_C_length_end_match"])
        surveyed_data.GP_L_offset_end_match = float(session["GP_L_offset_end_match"])
        surveyed_data.GP_L_elevation_end_match = float(session["GP_L_elevation_end_match"])
        surveyed_data.GP_L_length_end_match = float(session["GP_L_length_end_match"])

    surveyed_data.GP_R_offset_begin = float(session['GP_R_offset_begin'])
    surveyed_data.GP_R_elevation_begin = float(session['GP_R_elevation_begin'])
    surveyed_data.GP_R_length_begin = float(session['GP_R_length_begin'])
    surveyed_data.GP_C_offset_begin = float(session['GP_C_offset_begin'])
    surveyed_data.GP_C_elevation_begin = float(session['GP_C_elevation_begin'])
    surveyed_data.GP_C_length_begin = float(session['GP_C_length_begin'])
    surveyed_data.GP_L_offset_begin = float(session['GP_L_offset_begin'])
    surveyed_data.GP_L_elevation_begin = float(session['GP_L_elevation_begin'])
    surveyed_data.GP_L_length_begin = float(session['GP_L_length_begin'])
    surveyed_data.GP_R_offset_end = float(session['GP_R_offset_end'])
    surveyed_data.GP_R_elevation_end = float(session['GP_R_elevation_end'])
    surveyed_data.GP_R_length_end = float(session['GP_R_length_end'])
    surveyed_data.GP_C_offset_end = float(session['GP_C_offset_end'])
    surveyed_data.GP_C_elevation_end = float(session['GP_C_elevation_end'])
    surveyed_data.GP_C_length_end = float(session['GP_C_length_end'])
    surveyed_data.GP_L_offset_end = float(session['GP_L_offset_end'])
    surveyed_data.GP_L_elevation_end = float(session['GP_L_elevation_end'])
    surveyed_data.GP_L_length_end = float(session['GP_L_length_end'])

    surveyed_data.bulkhead_GP_R_offset = float(session['bulkhead_GP_R_offset'])
    surveyed_data.bulkhead_GP_R_elevation = float(session['bulkhead_GP_R_elevation'])
    surveyed_data.bulkhead_GP_C_offset = float(session['bulkhead_GP_C_offset'])
    surveyed_data.bulkhead_GP_C_elevation = float(session['bulkhead_GP_C_elevation'])
    surveyed_data.bulkhead_GP_L_offset = float(session['bulkhead_GP_L_offset'])
    surveyed_data.bulkhead_GP_L_elevation = float(session['bulkhead_GP_L_elevation'])

    surveyed_data.surveyed_data_number = unicode(session['surveyed_data_number'])
    surveyed_data.surveyed_data_segment_id = session['surveyed_data_segment_id']
    surveyed_data.surveyed_data_model_id = session['surveyed_data_model_id']
    surveyed_data.surveyed_data_status = session['surveyed_data_status']
    surveyed_data.filename = session['surveyed_data_filename']
    surveyed_data.surveyed_data_project_id = session['surveyed_data_project_id']
    surveyed_data.surveyed_data_time = session['surveyed_data_time']
    last_surveyed_data = BPSurveyedData.query.filter_by(surveyed_data_status=Status.VERIFYING,
                                                        surveyed_data_segment_id=session[
                                                            'surveyed_data_segment_id']).filter_by(
        surveyed_data_model_id=session['surveyed_data_model_id']).first()
    if last_surveyed_data != None:
        db.session.delete(last_surveyed_data)
    surveyed_data.surveyed_data_upload_user = current_user.user_id
    db.session.add(surveyed_data)
    db.session.commit()
    flash(u"成功导入回测数据")
    if current_user.user_role_type == Identify.ORGANIZATION:
        project_id = 'organization_id'
    else:
        project_id = session['project_id']
    return redirect(url_for("main.admin_surveyed_data_list", user_id=current_user.user_id,
                            selected_id=session['surveyed_data_model_id']))


@main.route('/admin/surveyed/data/<int:user_id>', methods=["POST", "GET"])
@login_required
def admin_surveyed_data_list(user_id):
    user_role_type = BPUser.query.filter_by(user_id=user_id).first().user_role_type
    models = BPModel.query.filter_by(model_project_id=session['project_id']).order_by(BPModel.model_id.desc()).all()
    model_first = BPModel.query.filter_by(model_project_id=session['project_id'], model_status=Status.RUNNING).first()
    if model_first is None:
        model_first = BPModel.query.filter_by(model_project_id=session['project_id'],
                                              model_status=Status.COMPLETED).first()
    if model_first is None:
        model_id = 0
        items = None
    else:
        model_id = model_first.model_id
        items = BPSurveyedData.query.filter_by(surveyed_data_model_id=model_first.model_id).all()
    return render_template("admin_list_surveyed_data.html", items=items, models=models, model_id=model_id)


@main.route('/admin/surveyed/data/model/<int:user_id>&<int:selected_id>', methods=["POST", "GET"])
@login_required
def admin_surveyed_data_list_model(user_id, selected_id):
    user_role_type = BPUser.query.filter_by(user_id=user_id).first().user_role_type
    if user_role_type == Identify.ORGANIZATION:
        items = []
        models = []
        projects = BPProject.query.filter_by(project_owner=current_user.user_id).all()
        for project in projects:
            project_models = project.models
            for model in project_models:
                models.append(model)
                survey_datas = BPSurveyedData.query.filter_by(surveyed_data_model_id=model.model_id).all()
                for survey_data in survey_datas:
                    if survey_data.surveyed_data_model_id == selected_id:
                        items.append(survey_data)
        return render_template("admin_list_surveyed_data.html", items=items, models=models, model_id=selected_id)
    models = BPModel.query.filter_by(model_project_id=session['project_id']).order_by(BPModel.model_id.desc()).all()
    items = BPSurveyedData.query.filter_by(surveyed_data_model_id=selected_id,
                                           surveyed_data_project_id=session['project_id']).all()
    return render_template("admin_list_surveyed_data.html", items=items, models=models, model_id=selected_id)


@main.route('/admin/datas/detail/<int:surveyed_data_id>', methods=['GET', 'POST'])
@login_required
def admin_surveyed_data_detail(surveyed_data_id):
    surveyed_data = BPSurveyedData.query.get(surveyed_data_id)
    upload_user = BPUser.query.filter_by(user_id=surveyed_data.surveyed_data_upload_user).first()
    if surveyed_data is None:
        flash(u'无该回测数据')
        # items = BPSurveyedData.query.all()
        # return render_template("admin_list_surveyed_data.html", items=items)
    # dic = json.loads(surveyed_data.surveyed_data_GP_data)
    # filename = dic['filename']
    # print(filename)
    # print surveyed_data.filename
    segment_id = surveyed_data.surveyed_data_segment_id
    segment = BPSegments.query.filter_by(segment_id=segment_id).first()
    order = ConstructionOrder.query.filter_by(construction_order_segment_id=segment.segment_id).first()
    return render_template("admin_detail_surveyed_data.html", surveyed_data=surveyed_data,
                           filename=surveyed_data.filename,
                           is_first=surveyed_data.is_first_segment_surveyed_data, upload_user=upload_user, order=order)


@main.route('/admin/datas/detail/verifying/', methods=['GET', 'POST'])
@login_required
def admin_surveyed_data_verifying():
    surveyed_data_id = request.args.get('surveyed_data_id')
    modelid = BPSurveyedData.query.filter_by(surveyed_data_id=surveyed_data_id).first().segment.seg_model.model_id
    segmentid = BPSurveyedData.query.filter_by(surveyed_data_id=surveyed_data_id).first().segment.segment_id
    verifying_data = BPSurveyedData.query.filter_by(surveyed_data_status=Status.VERIFYING,
                                                    surveyed_data_segment_id=segmentid,
                                                    surveyed_data_model_id=modelid).first()
    verified_data = BPSurveyedData.query.filter_by(surveyed_data_status=Status.VERIFIED,
                                                   surveyed_data_segment_id=segmentid,
                                                   surveyed_data_model_id=modelid).first()
    if verified_data != None:
        verified_data.surveyed_data_status = Status.MODIFIED
        verified_data.surveyed_data_upload_checker = current_user.user_id
        db.session.add(verified_data)
        # print(u'已审核项现在的状态:' + verified_data.surveyed_data_status)
    verifying_data.surveyed_data_status = Status.VERIFIED
    verifying_data.surveyed_data_upload_checker = current_user.user_id
    db.session.add(verifying_data)
    db.session.commit()
    return jsonify(model=modelid)


@main.route('/admin/construction/order/', methods=['GET', 'POST'])
@login_required
def admin_construction_order_list():
    models = BPModel.query.filter_by(model_project_id=session['project_id']).order_by(BPModel.model_id.desc()).all()
    model_first = BPModel.query.filter_by(model_project_id=session['project_id'], model_status=Status.RUNNING).first()
    if model_first is None:
        model_first = BPModel.query.filter_by(model_project_id=session['project_id'],
                                              model_status=Status.COMPLETED).first()
    if model_first is None:
        model_id = 0
        orders = None
    else:
        model_id = model_first.model_id
        orders = ConstructionOrder.query.filter_by(construction_order_model_id=model_first.model_id).all()
    return render_template("admin_list_construction_order.html", models=models,
                           items=orders, model_id=model_id)


@main.route('/admin/construction/order/model_id=<int:model_id>')
@login_required
def admin_construction_order_list_model(model_id):
    models = BPModel.query.filter_by(model_project_id=session['project_id'], model_status=Status.RUNNING).all()
    items = ConstructionOrder.query.all()
    constructionorders = []
    for item in items:
        if item.segment.seg_model.model_id == model_id:
            constructionorders.append(item)
    return render_template("admin_list_construction_order.html", models=models,
                           items=constructionorders, model_id=model_id)


@main.route('/admin/order/detail/<int:construction_order_id>', methods=['GET', 'POST'])
@login_required
def admin_construction_order_detail(construction_order_id):
    construction_order = ConstructionOrder.query.get(construction_order_id)
    is_first = construction_order.is_first_segment_construction_order
    if construction_order is None:
        flash(u'指令未找到')
        # items = ConstructionOrder.query.all()
        # return render_template("admin_list_construction_order.html", items=items)
    return render_template("admin_detail_construction_order.html", item=construction_order, is_first=is_first,
                           filename=construction_order.filename,
                           simplify_filename="simplify" + construction_order.filename)


@main.route('/admin/users/')
@login_required
def admin_user_list():
    if current_user.user_role_type == Identify.ORGANIZATION:
        project_list = BPProject.query.filter_by(project_owner=current_user.user_id).all()
        project_id_list = []
        for project in project_list:
            project_id = project.project_id
            project_id_list.append(project_id)
        items = BPUserProject.query.filter_by(user_project_project_id=session['project_id']).all()
        # items = db.session.query(BPUserProject).filter(
        #     BPUserProject.user_project_project_id.in_(project_id_list)).all()
        return render_template("admin_list_user.html", items=items)
    items = BPUserProject.query.filter_by(user_project_project_id=session['project_id']).all()
    return render_template("admin_list_user.html", items=items)


@main.route('/admin/users/detail/<int:projectId>,<int:userId>', methods=['GET', 'POST'])
@login_required
def admin_user_detail(projectId, userId):
    user_detail = BPUserProject.query.filter_by(user_project_project_id=projectId,
                                                user_project_user_id=userId).first()
    user = BPUser.query.filter_by(user_id=userId).first()
    project = BPProject.query.filter_by(project_id=projectId).first()
    # print(user_detail.user_project_user_id)
    if user_detail is None:
        flash('user not found')
        return redirect(url_for('main.admin_user_list'))
    return render_template("admin_detail_user.html", item=user_detail, user=user, project=project)


@main.route('/admin/users/permission/<int:projectId>,<int:userId>', methods=['GET', 'POST'])
@login_required
def admin_user_permission(projectId, userId):
    permissions = request.form.getlist("permissions[]")
    role = request.form.get("role")
    user_project = BPUserProject.query.filter_by(user_project_user_id=userId,
                                                 user_project_project_id=projectId).first()
    a = 0
    for item in permissions:
        b = int(item)
        a = (b | a)
    user_project.user_project_permission = a
    user_project.user_project_role = role
    db.session.add(user_project)
    db.session.commit()
    return redirect(url_for('main.admin_user_list'))


@main.route('/admin/organizations/')
@login_required
def admin_organization_list():
    items = BPUser.query.filter_by(user_role_type=Identify.ORGANIZATION).order_by(BPUser.user_id.desc()).all()
    return render_template("admin_list_organization.html", items=items)


@main.route('/admin/organizations/userlist/', methods=['GET', 'POST'])
@login_required
def admin_users_list():
    items = BPUser.query.order_by(BPUser.user_id.desc()).all()
    # items = BPUser.query.filter_by(user_role_type=Identify.USER).order_by(BPUser.user_id.desc()).all()
    return render_template("admin_list_userlist.html", items=items)


@main.route('/admin/organizations/new/', methods=['GET', 'POST'])
@login_required
def admin_organization_new():
    form = OrganizationForm()
    show_name = "0"  # 显示name标签
    if form.validate_on_submit():
        organization = BPUser().query.filter_by(user_id=form.email.data).first()
        organization.user_role_type = Identify.ORGANIZATION
        organization.user_pieces = form.pieces.data
        organization.user_pieces_left = form.pieces.data
        db.session.add(organization)
        db.session.commit()
        return redirect(url_for("main.admin_organization_list"))
    return render_template("admin_add_organization.html", form=form, flag=show_name)


@main.route('/admin/organizations/<int:organizationId>', methods=['GET', 'POST'])
@login_required
def admin_edit_organization(organizationId):
    organization = BPUser.query.get(organizationId)
    if organization is None:
        organization = BPUser()
    form = OrganizationDetailForm()
    show_name = "1"
    if form.validate_on_submit():
        # organization.user_email = form.email.data
        organization.user_name = form.name.data
        if form.pieces.data > organization.user_pieces:
            organization.user_pieces_left += form.pieces.data - organization.user_pieces
            organization.user_pieces = form.pieces.data
        if organization.user_pieces_left < form.pieces.data < organization.user_pieces:
            organization.user_pieces_left -= organization.user_pieces - form.pieces.data
            organization.user_pieces = form.pieces.data
        if form.pieces.data < organization.user_pieces_left:
            flash(u'组织片数少于组织已经被使用的片数')
            return redirect(url_for("main.admin_organization_list"))
        db.session.add(organization)
        db.session.commit()
        return redirect(url_for("main.admin_organization_list"))
    form.name.data = organization.user_name
    # form.email.data = organization.user_email
    form.pieces.data = organization.user_pieces
    return render_template("admin_edit_organization.html", form=form,
                           organizationId=organizationId, flag=show_name)


@main.route('/admin/add/setting/', methods=['GET', 'POST'])
@login_required
def admin_add_setting():
    form = UserSettingForm()
    user = BPUser.query.filter_by(user_id=current_user.user_id).first()
    if form.validate_on_submit():
        user.user_range = form.range.data
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('main.user_info', userId=current_user.user_id, selected_id=1))
    form.range.data = user.user_range
    return render_template("admin_add_setting.html", form=form)
