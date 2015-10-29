# coding=utf8
import unittest
from flask import url_for
from app.main.models import BPUser, BPProject
from app import create_app, db
from flask.ext.login import login_user, logout_user, login_required, \
    current_user


class FlaskClientTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app.config['SERVER_NAME'] = 'example.com'  # 需配置SERVER_NAME
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        # Role.insert_roles()
        self.client = self.app.test_client(use_cookies=True)


    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_home_page(self):
        response = self.client.get(url_for('main.index'), follow_redirects=True)
        self.assertTrue('桥+ 优秀的桥梁制造软件' in response.data)
        # self.assertTrue('Perfectly designed' in response.data)


    def test_register(self):
        # register a new account
        response = self.client.post(url_for('main.register'), data={
            'email': 'john@example.com',
            'username': 'john',
            'password': 'kuang',
            'password2': 'kuang'
        }, follow_redirects=True)
        #user = BPUser.query.filter_by(user_email='john@example.com').first()
        # print(user.user_id)
        # print(user.user_password_hash)
        self.assertTrue('优秀的桥梁设计软件' in response.data)

    def test_login(self):
        # login with the new account
        user = BPUser(user_email='john@example.com', user_name='john', password='kuang')
        db.session.add(user)
        db.session.commit()
        response = self.client.post(url_for('main.login'), data={
            'email': 'john@example.com',
            'password': 'kuang'
        }, follow_redirects=True)
        # print response.data
        self.assertTrue('桥梁短线法施工辅助系统' in response.data)

    def test_logout(self):
        response = self.client.get(url_for('main.logout'), follow_redirects=True)
        # print response.data
        self.assertTrue('桥+ 优秀的桥梁制造软件' in response.data)

    def test_individual_info(self):
        user = BPUser(user_email='test@example.com', user_name='john', password='123')
        db.session.add(user)
        db.session.commit()
        response1 = self.client.post(url_for('main.login'), data={
            'email': 'test@example.com',
            'password': '123'
        }, follow_redirects=True)
        # print response1.data
        response = self.client.get(url_for('main.individual_info', userId=user.user_id), follow_redirects=True)
        self.assertTrue(response.status_code == 200)

    def general_user(self):
        user = BPUser(user_email='test@example.com', user_name='john', password='123')
        db.session.add(user)
        db.session.commit()
        response1 = self.client.post(url_for('main.login'), data={
            'email': 'test@example.com',
            'password': '123'
        }, follow_redirects=True)
        return user

    def test_individual_info_display(self):
        user = self.general_user()
        response = self.client.get(url_for('main.individual_info_display', userId=user.user_id), follow_redirects=True)
        self.assertTrue(response.status_code == 200)

    def test_user_info(self):
        user = self.general_user()
        response = self.client.get(url_for('main.user_info', userId=user.user_id, selected_id=1), follow_redirects=True)
        self.assertTrue(response.status_code == 200)

    def test_change_password(self):
        self.general_user()
        response1 = self.client.post(url_for('main.change_password'), data={
            'old_password': '123',
            'password': '123',
            'password2': '123'
        }, follow_redirects=True)
        # print response1.data
        self.assertTrue('密码修改成功'in response1.data)










