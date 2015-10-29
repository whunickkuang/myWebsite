# coding=utf8

from datetime import *
from flask.ext.login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app, flash
import collections
from .. import db
from .. import login_manager


# 用户的身份
class Identify:
    USER = u'普通用户'
    ADMIN = u'平台管理员'
    ORGANIZATION = u'公司管理员'


# 项目，模型，回测数据，等等的状态
class Status:
    RUNNING = u'进行中'
    WAITING = u'未启动'
    COMPLETED = u'已完成'
    VERIFIED = u'已审核'
    VERIFYING = u'待审核'
    MODIFIED = u'已修改'


# 用户权限
class Permission:
    WATCH_PROJECT = 0x0001
    WATCH_BED = 0x0002
    WATCH_MODEL = 0x0004  # 查看模型，不能查看模型文件，可以查看一些节点节段信息。
    WATCH_SURVEYED_DATA = 0x0008
    WATCH_ORDER = 0x0010
    CHECK_SURVEYED_DATA = 0x0020
    UPLOAD_SURVEYED_DATA = 0x0040
    UPLOAD_MODEL = 0x0080  # 能够上传模型，并且查看一些理想浇筑信息。传统的监控人员权限
    MANAGE_USER = 0x0100


class BPUserProject(db.Model):
    __tablename__ = 'bp_user_projects'
    user_project_user_id = db.Column(db.Integer, db.ForeignKey('bp_user.user_id'), primary_key=True)
    user_project_project_id = db.Column(db.Integer, db.ForeignKey('bp_project.project_id'), primary_key=True)
    user_project_permission = db.Column(db.Integer)
    user_project_role = db.Column(db.String(64))


# 重写UserMixin中的get_id方法，因为UserMixin中默认得到id属性，而我们的表是user_id属性。
class UserMixin2(UserMixin):
    def get_id(self):
        try:
            return unicode(self.user_id)
        except AttributeError:
            raise NotImplementedError('No `id` attribute - override `get_id`')


class BPUser(UserMixin2, db.Model):
    __tablename__ = 'bp_user'
    user_id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(64), unique=True, index=True)
    user_may_email = db.Column(db.String(64))  # 用于暂存修改的email
    user_name = db.Column(db.String(64), index=True)
    user_password_hash = db.Column(db.String(128))
    user_confirmed = db.Column(db.Boolean, default=False)
    user_range = db.Column(db.Float, default=5.0)  # 用户允许的误差范围
    user_company = db.Column(db.String(64))
    user_role_type = db.Column(db.String(64))
    user_phone = db.Column(db.String(32))
    user_pieces = db.Column(db.Integer, default=0)
    user_pieces_left = db.Column(db.Integer, default=0)
    user_member_since = db.Column(db.DateTime(), default=datetime.utcnow)
    user_last_seen = db.Column(db.DateTime(), default=datetime.utcnow)
    project = db.relationship('BPProject', backref='owner', uselist=False)
    projects = db.relationship('BPUserProject', foreign_keys=[BPUserProject.user_project_user_id],
                               backref=db.backref('user', lazy='joined'),
                               lazy='dynamic',
                               cascade='all, delete-orphan')
    # 在用户模型中定义 生成确认令牌方法，该令牌默认1h内有效
    def generate_confirmation_token(self, expiration=3600):
        s = Serializer(current_app.config['SECRET_KEY'], expiration)
        return s.dumps({'confirm': self.user_id})

    # 在用户模型中定义 确认令牌方法，验证通过后将 用户.user_confirmed 属性改为True
    def user_confirm(self, token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return False
        if data.get('confirm') != self.user_id:
            return False
        self.user_confirmed = True
        db.session.add(self)
        return True

    def change_email_confirm(self, token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except:
            return False
        if data.get('confirm') != self.user_id:
            return False
        self.user_email = self.user_may_email
        self.user_may_email = ''
        db.session.add(self)
        return True

    def ping(self):
        self.user_last_seen = datetime.utcnow()
        db.session.add(self)

    def __init__(self, **kwargs):
        super(BPUser, self).__init__(**kwargs)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.user_password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.user_password_hash, password)

    def confirm(self, token):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
            project_id = data.get('projectId')
            user_project = BPUserProject.query.filter_by(user_project_user_id=self.user_id,
                                                         user_project_project_id=project_id).first()
            if user_project is None:
                user_project = BPUserProject()
                user_project.user_project_role = u'未分配权限'
                user_project.user_project_project_id = project_id
                user_project.user_project_user_id = self.user_id
                db.session.add(user_project)
            return True
        except:
            flash(u'你的url链接已经过期')
            return False

    def can(self, permissions, project_id):
        user_project = BPUserProject.query.filter_by(
            user_project_user_id=self.user_id, user_project_project_id=project_id).first()
        if user_project is None:
            user_permission = 0
            return (user_permission & permissions) == permissions
        if user_project.user_project_permission is None:
            return False
        return (user_project.user_project_permission & permissions) == permissions


class BPProject(db.Model):
    __tablename__ = 'bp_project'
    project_id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(64), index=True)
    project_pieces = db.Column(db.Integer, default=0)
    project_pieces_left = db.Column(db.Integer, default=0)
    project_status = db.Column(db.String(64))
    project_introduction = db.Column(db.String(256))
    project_url = db.Column(db.String(1024), default=None)
    project_v_range = db.Column(db.Float, default=1)
    project_s_range = db.Column(db.Float, default=1)
    project_owner = db.Column(db.Integer, db.ForeignKey('bp_user.user_id'))
    users = db.relationship('BPUserProject', foreign_keys=[BPUserProject.user_project_project_id],
                            backref=db.backref('project', lazy='joined'),
                            lazy='dynamic',
                            cascade='all, delete-orphan')
    surveyed_data = db.relationship('BPSurveyedData', backref='project', lazy='dynamic')
    orders = db.relationship('ConstructionOrder', backref='project', lazy='dynamic')
    bed_boxes = db.relationship('BPBedBox', backref='project', lazy='dynamic', cascade='all, delete-orphan')
    models = db.relationship('BPModel', backref='project', lazy='dynamic', cascade='all, delete-orphan')


class BPBedBox(db.Model):
    __tablename__ = 'bp_bed_box'
    bed_id = db.Column(db.Integer, primary_key=True)
    bed_project_id = db.Column(db.Integer, db.ForeignKey('bp_project.project_id'))
    bed_name = db.Column(db.String(64))
    bed_startTime = db.Column(db.DateTime())
    bed_default_period = db.Column(db.Integer)
    models = db.relationship('BPModel', backref='bedBox', lazy='dynamic', cascade='all, delete-orphan')


class BPModel(db.Model):
    __tablename__ = 'bp_model'
    model_id = db.Column(db.Integer, primary_key=True)
    model_number = db.Column(db.String(128), unique=True, index=True)
    model_name = db.Column(db.String(128))
    model_pieces = db.Column(db.Integer)
    model_filePath = db.Column(db.String(128))
    model_file_name = db.Column(db.String(128))
    model_status = db.Column(db.String(32))
    model_offset = db.Column(db.Float)  # 偏置
    model_cross = db.Column(db.String(32))
    model_evaluation = db.Column(db.Float)  # 高度
    model_actual_startTime = db.Column(db.DateTime(), default=None)
    model_actual_endTime = db.Column(db.DateTime(), default=None)
    model_in_bedOrder = db.Column(db.Integer)
    model_expect_startTime = db.Column(db.DateTime())
    model_expect_endTime = db.Column(db.DateTime())
    model_v_range = db.Column(db.Float, default=1)
    model_s_range = db.Column(db.Float, default=1)
    model_bed_id = db.Column(db.Integer, db.ForeignKey('bp_bed_box.bed_id'))
    model_project_id = db.Column(db.Integer, db.ForeignKey('bp_project.project_id'))
    segments = db.relationship('BPSegments', backref='seg_model', lazy='dynamic', cascade='all, delete-orphan')
    nodes = db.relationship('BPNode', backref='node_model', lazy='dynamic', cascade='all, delete-orphan')
    control_lines = db.relationship('ControlLineData', backref='control_line_model', lazy='dynamic',
                                    cascade='all,delete-orphan')
    survey_data = db.relationship('BPSurveyedData', backref='model', lazy='dynamic', cascade='all, delete-orphan')
    seg_cross = db.relationship('SegmentCrossSection', backref='seg_cross_model', lazy='dynamic',
                                cascade='all, delete-orphan')
    cross_section = db.relationship('CrossSection', backref='cross_section_model', lazy='dynamic',
                                    cascade='all, delete-orphan')

    construction_orders = db.relationship('ConstructionOrder', backref='model', lazy='dynamic',
                                          cascade='all, delete-orphan')

    def get_offset_vertical(self):
        """获取该模型统一的纵向偏置,以及高度"""
        return [self.model_offset, self.model_evaluation]

    def get_project(self):
        return BPProject.query.filter_by(project_id=self.model_project_id).first()


class SegmentCrossSection(db.Model):
    __tablename__ = 'bp_segment_cross_section'
    segment_cross_section_id = db.Column(db.Integer, primary_key=True)
    segment_cross__model_id = db.Column(db.Integer, db.ForeignKey('bp_model.model_id'))
    segment_cross_section_segment_id = db.Column(db.Integer,
                                                 db.ForeignKey('bp_segment.segment_id'))
    segment_cross_section_cross_section_id = db.Column(db.Integer, db.ForeignKey(
        'bp_cross_session.cross_section_id'))
    segment_position = db.Column(db.String(32))  # ATBEG,ATEND节段横截面位置


class BPSegments(db.Model):
    """
    节段表该表存储节段的详细信息，包含如下：
    节段id
    当前节段序号
    匹配节段序号
    匹配方向
    节段当前状态
    起始节点
    结束节点
    相对的左右下三个方向的偏置
    对应施工指令
    对应回测数据
    """
    __tablename__ = 'bp_segment'
    segment_id = db.Column(db.Integer, primary_key=True)
    segment_number = db.Column(db.Integer)
    # match_id 与number匹配，同一个model中，number唯一。
    segment_matching_id = db.Column(db.Integer)
    segment_match_direction = db.Column(db.String(32))
    segment_status = db.Column(db.String(32))
    segment_casted_date = db.Column(db.String(128))
    segment_start_node = db.Column(db.Integer, db.ForeignKey('bp_node.node_id'))
    segment_end_node = db.Column(db.Integer, db.ForeignKey('bp_node.node_id'))
    segment_left_offset = db.Column(db.Float)
    segment_right_offset = db.Column(db.Float)
    segment_down_offset = db.Column(db.Float)
    construction_orders = db.relationship('ConstructionOrder', backref='segment', lazy='dynamic')
    segment_datas = db.relationship('BPSegmentData', backref='segment', lazy='dynamic', cascade='all, delete-orphan')
    surveyed_data = db.relationship('BPSurveyedData', backref='segment', lazy='dynamic')
    cross_sections = db.relationship('SegmentCrossSection',
                                     foreign_keys=[SegmentCrossSection.segment_cross_section_segment_id],
                                     backref=db.backref('segment', lazy='joined'),
                                     lazy='dynamic')

    segment_model_id = db.Column(db.Integer, db.ForeignKey('bp_model.model_id'))

    def set_segment_casted_date(self):
        self.segment_casted_date = datetime.utcnow()
        db.session.add(self)

    def is_first(self):
        """判断当前节段是否为模型的第一个节段"""
        return self.segment_matching_id == 0

    def is_at_begin(self):
        """确定当前节段是否是在起始端进行匹配的"""
        return self.segment_match_direction.lower() == "atbeg"

    def get_start_node(self):
        """获取该节段的起始节点"""
        return BPNode.query.filter_by(node_id=self.segment_start_node).first()

    def get_end_node(self):
        """获取该节段的终止节点"""
        return BPNode.query.filter_by(node_id=self.segment_end_node).first()

    def get_shift_and_fixed_node(self):
        if self.is_at_begin():
            return tuple([self.get_start_node(), self.get_end_node()])
        else:
            return tuple([self.get_end_node(), self.get_start_node()])

    def get_offset_horizontal(self):
        """获取该节段的横向偏置（左右下）"""
        if self.is_at_begin():
            return [self.segment_left_offset, self.segment_right_offset, self.segment_down_offset]
        else:
            return [self.segment_right_offset * -1, self.segment_left_offset * -1, self.segment_down_offset]

    def get_start_cross_section(self):
        """获取起始端的截面"""
        for segment_cross_section in self.cross_sections:
            if segment_cross_section.segment_position.lower() == "atbeg":
                return CrossSection.query.filter_by(
                    cross_section_id=segment_cross_section.segment_cross_section_cross_section_id).first()

    def get_end_cross_section(self):
        """获取终止端的截面"""
        for segment_cross_section in self.cross_sections:
            if segment_cross_section.segment_position.lower() == "atend":
                return CrossSection.query.filter_by(
                    cross_section_id=segment_cross_section.segment_cross_section_cross_section_id).first()

    def get_shift_and_fixed_cross_section(self):
        if self.is_at_begin():
            return tuple([self.get_start_cross_section(), self.get_end_cross_section()])
        else:
            return tuple([self.get_end_cross_section(), self.get_start_cross_section()])

    def get_match_segment(self):
        """获取匹配节段"""
        if self.is_first():
            return None
        else:
            return BPSegments.query.filter_by(segment_number=self.segment_matching_id,
                                              segment_model_id=self.segment_model_id).first()

    def get_match_segment_another_node(self):
        """获取匹配节段的另一个节点"""
        match_segment = self.get_match_segment()
        if match_segment is None:
            return None
        if self.is_at_begin():
            return BPNode.query.filter_by(node_id=match_segment.segment_start_node).first()
        else:
            return BPNode.query.filter_by(node_id=match_segment.segment_end_node).first()

    def get_segment_data(self, is_offset, is_camber, is_theoretical_value):
        return BPSegmentData.query.filter_by(segment_id=self.segment_id,
                                             is_offset=is_offset,
                                             is_camber=is_camber,
                                             is_theoretical_value=is_theoretical_value).first()


class BPSegmentData(db.Model):
    """
    该表中存储了节段界面上所需要的各种点的坐标，包括是否加预拱，是否加测量钉偏置，是理论值还是实际值组合起来的8种显示方式
    """
    __tablename__ = 'bp_segment_data'
    segment_data_id = db.Column(db.Integer, primary_key=True)
    segment_id = db.Column(db.Integer, db.ForeignKey('bp_segment.segment_id'))
    is_offset = db.Column(db.Boolean)
    is_camber = db.Column(db.Boolean)
    is_theoretical_value = db.Column(db.Boolean)
    segment_B_GP_C_X = db.Column(db.Float, default=0)
    segment_B_GP_C_Y = db.Column(db.Float)
    segment_B_GP_C_Z = db.Column(db.Float)
    segment_B_GP_L_X = db.Column(db.Float)
    segment_B_GP_L_Y = db.Column(db.Float)
    segment_B_GP_L_Z = db.Column(db.Float)
    segment_B_GP_R_X = db.Column(db.Float)
    segment_B_GP_R_Y = db.Column(db.Float)
    segment_B_GP_R_Z = db.Column(db.Float)
    segment_B_GP_D_X = db.Column(db.Float)
    segment_B_GP_D_Y = db.Column(db.Float)
    segment_B_GP_D_Z = db.Column(db.Float)
    segment_E_GP_C_X = db.Column(db.Float)
    segment_E_GP_C_Y = db.Column(db.Float)
    segment_E_GP_C_Z = db.Column(db.Float)
    segment_E_GP_L_X = db.Column(db.Float)
    segment_E_GP_L_Y = db.Column(db.Float)
    segment_E_GP_L_Z = db.Column(db.Float)
    segment_E_GP_R_X = db.Column(db.Float)
    segment_E_GP_R_Y = db.Column(db.Float)
    segment_E_GP_R_Z = db.Column(db.Float)
    segment_E_GP_D_X = db.Column(db.Float)
    segment_E_GP_D_Y = db.Column(db.Float)
    segment_E_GP_D_Z = db.Column(db.Float)

    def set_basic(self, segment_id, is_offset, is_camber, is_theoretical_value):
        self.segment_id = segment_id
        self.is_camber = is_camber
        self.is_offset = is_offset
        self.is_theoretical_value = is_theoretical_value

    def set_point(self, b_gp_c, b_gp_l, b_gp_r, b_gp_d, e_gp_c, e_gp_l, e_gp_r, e_gp_d):
        (self.segment_B_GP_C_X, self.segment_B_GP_C_Y, self.segment_B_GP_C_Z) = b_gp_c
        (self.segment_B_GP_L_X, self.segment_B_GP_L_Y, self.segment_B_GP_L_Z) = b_gp_l
        (self.segment_B_GP_R_X, self.segment_B_GP_R_Y, self.segment_B_GP_R_Z) = b_gp_r
        (self.segment_B_GP_D_X, self.segment_B_GP_D_Y, self.segment_B_GP_D_Z) = b_gp_d
        (self.segment_E_GP_C_X, self.segment_E_GP_C_Y, self.segment_E_GP_C_Z) = e_gp_c
        (self.segment_E_GP_L_X, self.segment_E_GP_L_Y, self.segment_E_GP_L_Z) = e_gp_l
        (self.segment_E_GP_R_X, self.segment_E_GP_R_Y, self.segment_E_GP_R_Z) = e_gp_r
        (self.segment_E_GP_D_X, self.segment_E_GP_D_Y, self.segment_E_GP_D_Z) = e_gp_d

    def to_dict(self, reversed=False):
        ret = dict()
        ret['bc'] = (self.segment_B_GP_C_X, self.segment_B_GP_C_Y, self.segment_B_GP_C_Z)
        ret['bl'] = (self.segment_B_GP_L_X, self.segment_B_GP_L_Y, self.segment_B_GP_L_Z)
        ret['br'] = (self.segment_B_GP_R_X, self.segment_B_GP_R_Y, self.segment_B_GP_R_Z)
        ret['fc'] = (self.segment_E_GP_C_X, self.segment_E_GP_C_Y, self.segment_E_GP_C_Z)
        ret['fl'] = (self.segment_E_GP_L_X, self.segment_E_GP_L_Y, self.segment_E_GP_L_Z)
        ret['fr'] = (self.segment_E_GP_R_X, self.segment_E_GP_R_Y, self.segment_E_GP_R_Z)
        if reversed:
            ret['bc'], ret['fc'] = ret['fc'], ret['bc']
            ret['bl'], ret['fr'] = ret['fr'], ret['bl']
            ret['br'], ret['fl'] = ret['fl'], ret['br']
        return ret


class BPNode(db.Model, ):
    __tablename__ = 'bp_node'
    node_id = db.Column(db.Integer, primary_key=True)
    node_number = db.Column(db.Integer)
    node_x_coord = db.Column(db.Float)
    node_y_coord = db.Column(db.Float)
    node_z_coord = db.Column(db.Float)
    node_x_after_camber = db.Column(db.Float)
    node_y_after_camber = db.Column(db.Float)
    node_z_after_camber = db.Column(db.Float)

    node_surveyed_x_coord = db.Column(db.Float)
    node_surveyed_y_coord = db.Column(db.Float)
    node_surveyed_z_coord = db.Column(db.Float)
    node_surveyed_x_after_camber = db.Column(db.Float)
    node_surveyed_y_after_camber = db.Column(db.Float)
    node_surveyed_z_after_camber = db.Column(db.Float)

    node_camber_x_coord = db.Column(db.Float)
    node_camber_y_coord = db.Column(db.Float)
    node_camber_z_coord = db.Column(db.Float)
    node_camber_phi_x = db.Column(db.Float)
    node_camber_phi_y = db.Column(db.Float)
    node_camber_phi_z = db.Column(db.Float)
    node_model_id = db.Column(db.Integer, db.ForeignKey('bp_model.model_id'))

    segment_start = db.relationship('BPSegments',
                                    foreign_keys=[BPSegments.segment_start_node],
                                    backref=db.backref('start_node', lazy='joined'),
                                    uselist=False)
    segment_end = db.relationship('BPSegments',
                                  foreign_keys=[BPSegments.segment_end_node],
                                  backref=db.backref('end_node', lazy='joined'),
                                  uselist=False)

    def to_json(self):
        return {
            'node_id': self.node_id,
            'node_number': self.node_number,
            'node_x_coord': self.node_x_coord,
            'node_y_coord': self.node_y_coord,
            'node_z_coord': self.node_z_coord,
            'node_x_after_camber': self.node_x_after_camber,
            'node_y_after_camber': self.node_y_after_camber,
            'node_z_after_camber': self.node_z_after_camber,
            'node_surveyed_x_coord': self.node_surveyed_x_coord,
            'node_surveyed_y_coord': self.node_surveyed_y_coord,
            'node_surveyed_z_coord': self.node_surveyed_z_coord,
            'node_surveyed_x_after_camber': self.node_surveyed_x_after_camber,
            'node_surveyed_y_after_camber': self.node_surveyed_y_after_camber,
            'node_surveyed_z_after_camber': self.node_surveyed_z_after_camber,
            'node_camber_x_coord': self.node_camber_x_coord,
            'node_camber_y_coord': self.node_camber_y_coord,
            'node_camber_z_coord': self.node_camber_z_coord,
            'node_camber_phi_x': self.node_camber_phi_x,
            'node_camber_phi_y': self.node_camber_phi_y,
            'node_camber_phi_z': self.node_camber_phi_z,
            'node_model_id': self.node_model_id,
        }
        # node_segment_id = db.Column(db.Integer, db.ForeignKey('bp_segment.segment_id'))

    def to_tuple(self):
        """理论值"""
        return tuple([self.node_x_coord, self.node_y_coord, self.node_z_coord])

    def camber_to_tuple(self):
        """理论值预拱后坐标"""
        return tuple([self.node_x_after_camber, self.node_y_after_camber, self.node_z_after_camber])

    def real_to_tuple(self):
        """实际值"""
        return tuple(
            [self.node_surveyed_x_after_camber, self.node_surveyed_y_after_camber, self.node_surveyed_z_after_camber])

    def camber_coord_to_tuple(self):
        """预拱值"""
        return tuple([self.node_camber_x_coord, self.node_camber_y_coord, self.node_camber_z_coord])


class BPSurveyedData(db.Model):
    """
    回测数据分为两种
    1.若为模型第一块节段的回测数据
        数据中包含浮动端模三个点坐标 浇筑节段六个测量钉坐标，以及固定端模三个点坐标
    2.除第一个节段的回测数据
        数据包含匹配节段六个测量钉坐标，和浇筑节段六个测量钉坐标，以及固定端模三个点的坐标
    因此在数据中使用is_first_segment_surveyed_data来区别，并包含两种回测数据的所有字段
    """
    __tablename__ = 'bp_surveyed_data'
    surveyed_data_id = db.Column(db.Integer, primary_key=True)
    surveyed_data_number = db.Column(db.String(128))
    surveyed_data_GP_data = db.Column(db.Text)
    # 已审核"verified";待审核:"verifying";已修改："modified"
    surveyed_data_status = db.Column(db.String(32), default="verifying")
    surveyed_data_time = db.Column(db.String(128))

    is_first_segment_surveyed_data = db.Column(db.Boolean)
    float_bulkhead_GP_R_offset = db.Column(db.Float)
    float_bulkhead_GP_R_elevation = db.Column(db.Float)
    float_bulkhead_GP_R_length = db.Column(db.Float)
    float_bulkhead_GP_C_offset = db.Column(db.Float)
    float_bulkhead_GP_C_elevation = db.Column(db.Float)
    float_bulkhead_GP_C_length = db.Column(db.Float)
    float_bulkhead_GP_L_offset = db.Column(db.Float)
    float_bulkhead_GP_L_elevation = db.Column(db.Float)
    float_bulkhead_GP_L_length = db.Column(db.Float)

    GP_R_offset_begin_match = db.Column(db.Float)
    GP_R_elevation_begin_match = db.Column(db.Float)
    GP_R_length_begin_match = db.Column(db.Float)
    GP_C_offset_begin_match = db.Column(db.Float)
    GP_C_elevation_begin_match = db.Column(db.Float)
    GP_C_length_begin_match = db.Column(db.Float)
    GP_L_offset_begin_match = db.Column(db.Float)
    GP_L_elevation_begin_match = db.Column(db.Float)
    GP_L_length_begin_match = db.Column(db.Float)
    GP_R_offset_end_match = db.Column(db.Float)
    GP_R_elevation_end_match = db.Column(db.Float)
    GP_R_length_end_match = db.Column(db.Float)
    GP_C_offset_end_match = db.Column(db.Float)
    GP_C_elevation_end_match = db.Column(db.Float)
    GP_C_length_end_match = db.Column(db.Float)
    GP_L_offset_end_match = db.Column(db.Float)
    GP_L_elevation_end_match = db.Column(db.Float)
    GP_L_length_end_match = db.Column(db.Float)

    GP_R_offset_begin = db.Column(db.Float)
    GP_R_elevation_begin = db.Column(db.Float)
    GP_R_length_begin = db.Column(db.Float)
    GP_C_offset_begin = db.Column(db.Float)
    GP_C_elevation_begin = db.Column(db.Float)
    GP_C_length_begin = db.Column(db.Float)
    GP_L_offset_begin = db.Column(db.Float)
    GP_L_elevation_begin = db.Column(db.Float)
    GP_L_length_begin = db.Column(db.Float)
    GP_R_offset_end = db.Column(db.Float)
    GP_R_elevation_end = db.Column(db.Float)
    GP_R_length_end = db.Column(db.Float)
    GP_C_offset_end = db.Column(db.Float)
    GP_C_elevation_end = db.Column(db.Float)
    GP_C_length_end = db.Column(db.Float)
    GP_L_offset_end = db.Column(db.Float)
    GP_L_elevation_end = db.Column(db.Float)
    GP_L_length_end = db.Column(db.Float)

    bulkhead_GP_R_offset = db.Column(db.Float)
    bulkhead_GP_R_elevation = db.Column(db.Float)
    bulkhead_GP_C_offset = db.Column(db.Float)
    bulkhead_GP_C_elevation = db.Column(db.Float)
    bulkhead_GP_L_offset = db.Column(db.Float)
    bulkhead_GP_L_elevation = db.Column(db.Float)
    matched_surveyed_data_id = db.Column(db.String(128))
    filename = db.Column(db.String(128))
    surveyed_data_upload_user = db.Column(db.Integer)
    surveyed_data_upload_checker = db.Column(db.Integer)

    surveyed_data_model_id = db.Column(db.Integer, db.ForeignKey('bp_model.model_id'))
    surveyed_data_project_id = db.Column(db.Integer, db.ForeignKey('bp_project.project_id'))
    surveyed_data_segment_id = db.Column(db.Integer, db.ForeignKey('bp_segment.segment_id'))

    def to_dict(self, reversed=False):
        ret = dict()
        ret['float_bulkhead_c'] = (self.float_bulkhead_GP_C_length,
                                   self.float_bulkhead_GP_C_elevation,
                                   self.float_bulkhead_GP_C_offset)
        ret['float_bulkhead_l'] = (self.float_bulkhead_GP_L_length,
                                   self.float_bulkhead_GP_L_elevation,
                                   self.float_bulkhead_GP_L_offset)
        ret['float_bulkhead_r'] = (self.float_bulkhead_GP_R_length,
                                   self.float_bulkhead_GP_R_elevation,
                                   self.float_bulkhead_GP_R_offset)
        ret['bulkhead_c'] = (0,
                             self.bulkhead_GP_C_elevation,
                             self.bulkhead_GP_C_offset)
        ret['bulkhead_l'] = (0,
                             self.bulkhead_GP_L_elevation,
                             self.bulkhead_GP_L_offset)
        ret['bulkhead_r'] = (0,
                             self.bulkhead_GP_R_elevation,
                             self.bulkhead_GP_R_offset)
        ret['match_fc'] = (self.GP_C_length_end_match,
                           self.GP_C_elevation_end_match,
                           self.GP_C_offset_end_match)
        ret['match_fl'] = (self.GP_L_length_end_match,
                           self.GP_L_elevation_end_match,
                           self.GP_L_offset_end_match)
        ret['match_fr'] = (self.GP_R_length_end_match,
                           self.GP_R_elevation_end_match,
                           self.GP_R_offset_end_match)
        ret['match_bc'] = (self.GP_C_length_begin_match,
                           self.GP_C_elevation_begin_match,
                           self.GP_C_offset_begin_match)
        ret['match_bl'] = (self.GP_L_length_begin_match,
                           self.GP_L_elevation_begin_match,
                           self.GP_L_offset_begin_match)
        ret['match_br'] = (self.GP_R_length_begin_match,
                           self.GP_R_elevation_begin_match,
                           self.GP_R_offset_begin_match)
        ret['wet_fc'] = (self.GP_C_length_end,
                         self.GP_C_elevation_end,
                         self.GP_C_offset_end)
        ret['wet_fl'] = (self.GP_L_length_end,
                         self.GP_L_elevation_end,
                         self.GP_L_offset_end)
        ret['wet_fr'] = (self.GP_R_length_end,
                         self.GP_R_elevation_end,
                         self.GP_R_offset_end)
        ret['wet_bc'] = (self.GP_C_length_begin,
                         self.GP_C_elevation_begin,
                         self.GP_C_offset_begin)
        ret['wet_bl'] = (self.GP_L_length_begin,
                         self.GP_L_elevation_begin,
                         self.GP_L_offset_begin)
        ret['wet_br'] = (self.GP_R_length_begin,
                         self.GP_R_elevation_begin,
                         self.GP_R_offset_begin)
        if reversed:
            ret['wet_bc'], ret['wet_fc'] = ret['wet_fc'], ret['wet_bc']
            ret['wet_bl'], ret['wet_fr'] = ret['wet_fr'], ret['wet_bl']
            ret['wet_br'], ret['wet_fl'] = ret['wet_fl'], ret['wet_br']
            ret['match_bc'], ret['match_fc'] = ret['match_fc'], ret['match_bc']
            ret['match_bl'], ret['match_fr'] = ret['match_fr'], ret['match_bl']
            ret['match_br'], ret['match_fl'] = ret['match_fl'], ret['match_br']
            ret['float_bulkhead_l'], ret['float_bulkhead_r'] = ret['float_bulkhead_r'], ret['float_bulkhead_l']
            ret['bulkhead_l'], ret['bulkhead_r'] = ret['bulkhead_r'], ret['bulkhead_l']
        return ret


class ConstructionOrder(db.Model):
    """
    施工指令分为两种
    1.若为模型第一块节段的施工指令
        数据中包含浮动端模三个点坐标 浇筑节段六个测量钉坐标，以及固定端模三个点坐标
    2.除第一个节段的施工指令
        数据包含匹配节段六个测量钉坐标，和浇筑节段六个测量钉坐标，以及固定端模三个点的坐标
    因此在数据中使用is_first_segment_construction_order来区别，并包含两种施工指令的所有字段
    """
    __tablename__ = 'bp_construction_order'
    construction_order_id = db.Column(db.Integer, primary_key=True)
    construction_order_number = db.Column(db.String(128), unique=True, index=True)
    construction_order_time = db.Column(db.String(128))

    is_first_segment_construction_order = db.Column(db.Boolean)
    float_bulkhead_GP_R_offset = db.Column(db.Float)
    float_bulkhead_GP_R_elevation = db.Column(db.Float)
    float_bulkhead_GP_R_length = db.Column(db.Float)
    float_bulkhead_GP_C_offset = db.Column(db.Float)
    float_bulkhead_GP_C_elevation = db.Column(db.Float)
    float_bulkhead_GP_C_length = db.Column(db.Float)
    float_bulkhead_GP_L_offset = db.Column(db.Float)
    float_bulkhead_GP_L_elevation = db.Column(db.Float)
    float_bulkhead_GP_L_length = db.Column(db.Float)

    GP_R_offset_begin_match = db.Column(db.Float)
    GP_R_elevation_begin_match = db.Column(db.Float)
    GP_R_length_begin_match = db.Column(db.Float)
    GP_C_offset_begin_match = db.Column(db.Float)
    GP_C_elevation_begin_match = db.Column(db.Float)
    GP_C_length_begin_match = db.Column(db.Float)
    GP_L_offset_begin_match = db.Column(db.Float)
    GP_L_elevation_begin_match = db.Column(db.Float)
    GP_L_length_begin_match = db.Column(db.Float)
    GP_R_offset_end_match = db.Column(db.Float)
    GP_R_elevation_end_match = db.Column(db.Float)
    GP_R_length_end_match = db.Column(db.Float)
    GP_C_offset_end_match = db.Column(db.Float)
    GP_C_elevation_end_match = db.Column(db.Float)
    GP_C_length_end_match = db.Column(db.Float)
    GP_L_offset_end_match = db.Column(db.Float)
    GP_L_elevation_end_match = db.Column(db.Float)
    GP_L_length_end_match = db.Column(db.Float)

    GP_R_offset_begin = db.Column(db.Float)
    GP_R_elevation_begin = db.Column(db.Float)
    GP_R_length_begin = db.Column(db.Float)
    GP_C_offset_begin = db.Column(db.Float)
    GP_C_elevation_begin = db.Column(db.Float)
    GP_C_length_begin = db.Column(db.Float)
    GP_L_offset_begin = db.Column(db.Float)
    GP_L_elevation_begin = db.Column(db.Float)
    GP_L_length_begin = db.Column(db.Float)
    GP_R_offset_end = db.Column(db.Float)
    GP_R_elevation_end = db.Column(db.Float)
    GP_R_length_end = db.Column(db.Float)
    GP_C_offset_end = db.Column(db.Float)
    GP_C_elevation_end = db.Column(db.Float)
    GP_C_length_end = db.Column(db.Float)
    GP_L_offset_end = db.Column(db.Float)
    GP_L_elevation_end = db.Column(db.Float)
    GP_L_length_end = db.Column(db.Float)

    bulkhead_GP_R_offset = db.Column(db.Float)
    bulkhead_GP_R_elevation = db.Column(db.Float)
    bulkhead_GP_C_offset = db.Column(db.Float)
    bulkhead_GP_C_elevation = db.Column(db.Float)
    bulkhead_GP_L_offset = db.Column(db.Float)
    bulkhead_GP_L_elevation = db.Column(db.Float)
    filename = db.Column(db.String(128))
    construction_order_model_id = db.Column(db.Integer, db.ForeignKey('bp_model.model_id'))
    construction_order_project_id = db.Column(db.Integer, db.ForeignKey('bp_project.project_id'))
    construction_order_segment_id = db.Column(db.Integer, db.ForeignKey('bp_segment.segment_id'))
    construction_order_GP_data = db.Column(db.Text)
    construction_order_status = db.Column(db.String(32))


# 横断面表
class CrossSection(db.Model):
    __tablename__ = 'bp_cross_session'
    cross_section_id = db.Column(db.Integer, primary_key=True)
    cross_section_name = db.Column(db.String(32))
    cross_section_model_id = db.Column(db.Integer, db.ForeignKey('bp_model.model_id'))
    # cross_section_position = db.Column(db.String(32))#OUTER INNER 外部截面还是内部截面
    segments = db.relationship('SegmentCrossSection',
                               foreign_keys=[SegmentCrossSection.segment_cross_section_cross_section_id],
                               backref=db.backref('cross_section', lazy='joined'),
                               lazy='dynamic')
    cross_section_points = db.relationship('CrossSectionPoint', backref='cross_section')

    def to_list(self, reversed=False):
        # TODO:在每个截面上的点都是有序的，需要保证选取到的顺序和上传的模型文件相同！
        ret = []
        for point in self.cross_section_points:
            if point.is_up_outer():
                ret.append(point.to_tuple(reversed))
        return ret


# 横断面中的点坐标和定义
class CrossSectionPoint(db.Model):
    __tablename__ = 'bp_cross_section_point'
    cross_section_point_id = db.Column(db.Integer, primary_key=True)
    point_name = db.Column(db.String(32))
    point_x = db.Column(db.Float)
    point_y = db.Column(db.Float)
    point_position = db.Column(db.String(32))  # 上表面还是下表面，UP DOWN
    point_direction = db.Column(db.String(32))  # 外截面还是内界面 OUTER,INNER
    cross_section_id = db.Column(db.Integer, db.ForeignKey('bp_cross_session.cross_section_id'))

    def is_up_outer(self):
        return self.point_position.lower() == "up" and self.point_direction.lower() == "outer"

    def to_tuple(self, reversed=False):
        factor = reversed and -1 or 1
        return tuple([self.point_x * factor, self.point_y])


# 控制线数据
class ControlLineData(db.Model):
    __tablename__ = 'bp_control_line_data'
    control_line_data_id = db.Column(db.Integer, primary_key=True)
    control_line_data_model_id = db.Column(db.Integer, db.ForeignKey('bp_model.model_id'))
    control_line_data_name = db.Column(db.String(32))
    control_line_data_content = db.Column(db.Text)

    def to_json(self, is_theoretical_value, is_offset, position):
        control_line_dict = eval(self.control_line_data_content)
        gp_dict = collections.OrderedDict()
        node_dict = collections.OrderedDict()
        # model = BPModel.query.filter_by(model_id=self.control_line_data_model_id).first()
        nodes = BPNode.query.filter_by(node_model_id=self.control_line_data_model_id).order_by(
            BPNode.node_number.asc()).all()
        for node in nodes:

            if node.node_id in control_line_dict:
                lift_camber = control_line_dict.get(node.node_id)
            else:
                lift_camber = (0, 0, 0)
            if node.segment_start is not None:
                value = self.get_start(is_offset, is_theoretical_value, node, position, lift_camber)
                if value is not None:
                    self.add_dict(gp_dict, node.segment_start.segment_number, value, 0)
                    if is_theoretical_value:
                        node_dict[node.node_number] = node.camber_to_tuple()
                    else:
                        tmp = node.real_to_tuple()
                        if tmp[0] is None:
                            tmp = node.camber_to_tuple()
                        node_dict[node.node_number] = tmp
            if node.segment_end is not None:
                value = self.get_end(is_offset, is_theoretical_value, node, position, lift_camber)
                if value is not None:
                    self.add_dict(gp_dict, node.segment_end.segment_number, value, 1)
                    if is_theoretical_value:
                        node_dict[node.node_number] = node.camber_to_tuple()
                    else:
                        tmp = node.real_to_tuple()
                        if tmp[0] is None:
                            tmp = node.camber_to_tuple()
                        node_dict[node.node_number] = tmp

        return tuple([gp_dict, node_dict])

    def add_dict(self, dict, key, value, value_position):
        if key not in dict:
            dict[key] = [(0, 0, 0), (0, 0, 0)]
        dict[key][value_position] = value

    def get_start(self, is_offset, is_theoretical_value, node, postion, lift_camber):
        data = node.segment_start.get_segment_data(is_offset=is_offset,
                                                   is_camber=True,
                                                   is_theoretical_value=is_theoretical_value)
        if data is None:
            # return None
            data = node.segment_start.get_segment_data(is_offset=is_offset,
                                                       is_camber=True,
                                                       is_theoretical_value=not is_theoretical_value)
        if postion == "GP-C":
            return tuple([data.segment_B_GP_C_X + lift_camber[0],
                          data.segment_B_GP_C_Y + lift_camber[1],
                          data.segment_B_GP_C_Z + lift_camber[2]])
        elif postion == "GP-L":
            return tuple([data.segment_B_GP_L_X + lift_camber[0],
                          data.segment_B_GP_L_Y + lift_camber[1],
                          data.segment_B_GP_L_Z + lift_camber[2]])
        elif postion == "GP-R":
            return tuple([data.segment_B_GP_R_X + lift_camber[0],
                          data.segment_B_GP_R_Y + lift_camber[1],
                          data.segment_B_GP_R_Z + lift_camber[2]])
        else:
            return tuple([data.segment_B_GP_D_X + lift_camber[0],
                          data.segment_B_GP_D_Y + lift_camber[1],
                          data.segment_B_GP_D_Z + lift_camber[2]])

    def get_end(self, is_offset, is_theoretical_value, node, postion, lift_camber):
        data = node.segment_end.get_segment_data(is_offset=is_offset,
                                                 is_camber=True,
                                                 is_theoretical_value=is_theoretical_value)
        if data is None:
            # return None
            data = node.segment_end.get_segment_data(is_offset=is_offset,
                                                     is_camber=True,
                                                     is_theoretical_value=not is_theoretical_value)

        if postion == "GP-C":
            return tuple([data.segment_E_GP_C_X + lift_camber[0],
                          data.segment_E_GP_C_Y + lift_camber[1],
                          data.segment_E_GP_C_Z + lift_camber[2]])
        elif postion == "GP-L":
            return tuple([data.segment_E_GP_L_X + lift_camber[0],
                          data.segment_E_GP_L_Y + lift_camber[1],
                          data.segment_E_GP_L_Z + lift_camber[2]])
        elif postion == "GP-R":
            return tuple([data.segment_E_GP_R_X + lift_camber[0],
                          data.segment_E_GP_R_Y + lift_camber[1],
                          data.segment_E_GP_R_Z + lift_camber[2]])
        else:
            return tuple([data.segment_E_GP_D_X + lift_camber[0],
                          data.segment_E_GP_D_Y + lift_camber[1],
                          data.segment_E_GP_D_Z + lift_camber[2]])


@login_manager.user_loader
def load_user(user_id):
    return BPUser.query.get(int(user_id))
