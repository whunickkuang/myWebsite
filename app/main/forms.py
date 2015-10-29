# coding=utf8

from flask.ext.wtf import Form
from wtforms import FloatField, IntegerField, SelectField
from wtforms.validators import DataRequired, Length, InputRequired
from flask.ext.wtf import Form
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import Required, Length, Email, Regexp, EqualTo
from wtforms import ValidationError
from .models import BPUser, BPUserProject, BPProject, Identify
from flask.ext.login import current_user
from flask import session


class UserSettingForm(Form):
    class Meta:
        locales = ["zh_CN"]
    range = FloatField(u'误差范围(米)', default=5.0, validators=[
        InputRequired(message=u'误差范围不为空')])

    def validate_range(self, field):
        if field.data is None:
            raise ValidationError(u'误差范围不为空')



class UserForm(Form):
    class Meta:
        locales = ["zh_CN"]

    username = StringField(u'用户名', validators=[
        DataRequired(message=u'用户名不为空'), Length(1, 64)])
    company = StringField(u'所属公司')
    phone = StringField(u'联系方式')


class OrganizationForm(Form):
    class Meta:
        locales = ["zh_CN"]

    name = StringField(u"组织名称")
    email = SelectField(u"邮箱", coerce=int)
    pieces = IntegerField(u"片数", validators=[
        DataRequired(message=u'片数不为空')])

    def __init__(self, *args, **kwargs):
        super(OrganizationForm, self).__init__(*args, **kwargs)
        users = BPUser.query.filter_by(user_role_type=Identify.USER).all()
        self.email.choices = [(user.user_id, BPUser.query.filter_by(user_id=user.user_id).first().user_email)
                              for user in users]


class OrganizationDetailForm(Form):
    class Meta:
        locales = ["zh_CN"]

    name = StringField(u"组织名称", validators=[
        DataRequired(message=u'组织名不为空')])
    email = StringField(u"邮箱")
    pieces = IntegerField(u"片数", validators=[
        DataRequired(message=u'片数不为空')])


class ProjectForm(Form):
    class Meta:
        locales = ["zh_CN"]

    name = StringField(u"项目名称", validators=[DataRequired(message=u'项目名称不为空')])
    desc = StringField(u"描述")
    pieces = IntegerField(u"项目总片数", validators=[DataRequired(message=u'片数不为空')])
    pieces_left = IntegerField(u"项目剩余片数")
    url = StringField(u"项目链接")

    def validate_pieces(self, field):

        organization_left_pieces = BPUser.query.filter_by(user_id=current_user.user_id).first().user_pieces_left
        if session['organ_edit_project_id'] == 'new':
            if field.data > organization_left_pieces:
                raise ValidationError(u'剩余片数不够')
        if session['organ_edit_project_id'] != 'new':
            project_pieces = BPProject.query.filter_by(
                project_id=session['organ_edit_project_id']).first().project_pieces
            if current_user.user_role_type != Identify.ORGANIZATION and field.data != project_pieces:
                raise ValidationError(u'只有公司管理员才能修改片数')
            if field.data < project_pieces:
                raise ValidationError(u'不能减少项目片数，项目已经在施工')
            if field.data > organization_left_pieces + project_pieces:
                raise ValidationError(u'剩余片数不够')


class BedBoxForm(Form):
    class Meta:
        locales = ["zh_CN"]

    name = StringField(u"台座名称", validators=[
        DataRequired(message=u'台座名不为空')])
    project = SelectField(u"所属项目", coerce=int, validators=[
        DataRequired(message=u'没有项目无法新建')])
    period = IntegerField(u"默认周期（天）", validators=[
        DataRequired(message=u'周期不为空')])
    startTime = StringField(u"起始时间")
    # user_id = StringField(u"user_id")

    def __init__(self, user, project_id, *args, **kwargs):
        super(BedBoxForm, self).__init__(*args, **kwargs)
        if user.user_role_type == u"公司管理员":
            projects = BPProject.query.filter_by(project_owner=user.user_id).order_by(
                BPProject.project_id.desc()).all()
            if len(projects) == 0:
                projects = BPUserProject.query.filter_by(
                    user_project_user_id=user.user_id).all()
                self.project.choices = [(project.user_project_project_id, BPProject.query.filter_by(
                    project_id=project.user_project_project_id).first().project_name) for project in projects]
            else:
                self.project.choices = [(project.project_id, project.project_name) for project in projects]
        else:
            projects = BPUserProject.query.filter_by(
                user_project_user_id=user.user_id, user_project_project_id=project_id).all()
            self.project.choices = [(project.user_project_project_id, BPProject.query.filter_by(
                project_id=project.user_project_project_id).first().project_name) for project in projects]


class LoginForm(Form):
    class Meta:
        locales = ["zh_CN"]

    email = StringField(u'邮箱', validators=[DataRequired(message=u'邮箱不为空'), Length(1, 64),
                                           Email(message=u'邮件地址输入有误')])
    password = PasswordField(u'密码', validators=[DataRequired(message=u'密码不为空')])
    remember_me = BooleanField('Keep me logged in')
    submit = SubmitField(u'登录')


class RegistrationForm(Form):
    class Meta:
        locales = ["zh_CN"]

    email = StringField(u'邮箱', validators=[DataRequired(message=u'邮箱不为空'), Length(1, 64),
                                           Email(message=u'邮件地址输入有误')])
    username = StringField(u'用户名', validators=[
        DataRequired(message=u'用户名不为空'), Length(1, 64)])
    password = PasswordField(u'密码', validators=[
        DataRequired(message=u'密码不为空'), EqualTo('password2', message=u'两次输入密码不一致.')])
    password2 = PasswordField(u'确认密码', validators=[DataRequired(message=u'邮箱不为空')])
    submit = SubmitField(u'注册')

    def validate_email(self, field):
        if BPUser.query.filter_by(user_email=field.data).first():
            raise ValidationError(u'邮箱已被注册')


class ChangePasswordForm(Form):
    old_password = PasswordField(u'旧密码', validators=[DataRequired()])
    password = PasswordField(u'新密码', validators=[
        DataRequired(), EqualTo('password2', message=u'两次输入密码不匹配')])
    password2 = PasswordField(u'确认密码', validators=[DataRequired()])
    # submit = SubmitField('Update Password')


# class ChangeEmailForm(Form):
# password = PasswordField(u'请输入密码', validators=[DataRequired()])
# email = StringField(u'请输入新的邮箱', validators=[DataRequired(message=u'邮箱不为空'), Length(1, 64),
# Email(message=u'邮件地址输入有误')])

class PasswordResetRequestForm(Form):
    email = StringField('Email', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    submit = SubmitField('Reset Password')


class PasswordResetForm(Form):
    email = StringField('Email', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    password = PasswordField('New Password', validators=[
        DataRequired(), EqualTo('password2', message='Passwords must match')])
    password2 = PasswordField('Confirm password', validators=[DataRequired()])
    submit = SubmitField('Reset Password')

    def validate_email(self, field):
        if BPUser.query.filter_by(email=field.data).first() is None:
            raise ValidationError('Unknown email address.')


class ChangeEmailForm(Form):
    email = StringField(u'新的邮箱', validators=[DataRequired(), Length(1, 64),
                                             Email()])
    password = PasswordField(u'请输入密码', validators=[DataRequired()])
    # submit = SubmitField('提交')

    def validate_email(self, field):
        if BPUser.query.filter_by(user_email=field.data).first():
            raise ValidationError(u'邮箱地址已经被注册')
