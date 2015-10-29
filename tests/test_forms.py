# coding=utf8
import unittest
from flask import url_for
from app.main.models import BPUser, BPProject,Status,BPBedBox
from app.main.forms import RegistrationForm
from app import create_app, db
from app.main.demo_datas import seed_user, seed_project, seed_user_project, seed_bed_box, seed_model, seed_segment
import json
class FlaskClientTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app('testing')
        self.app.config['SERVER_NAME'] = 'example.com'  # 需配置SERVER_NAME
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        # Role.insert_roles()
        self.client = self.app.test_client(use_cookies=True)
        seed_user()
        seed_project()
        seed_user_project()
        seed_bed_box()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def login_user(self):
        self.client.post(url_for('main.login'), data={
            'email': 'organization@example.com',
            'password': '123'
        }, follow_redirects=True)

    def test_RegistrationForm(self):
        response = self.client.post(url_for('main.register'), data={
            'email': 'organization@example.com',
            'username': 'john',
            'password': '123',
            'password2': '123'
        }, follow_redirects=True)
        self.assertTrue('邮箱已被注册' in response.data)

    def test_changeEmailForm(self):
        self.login_user()
        response = self.client.post(url_for('main.change_email'), data={
            'email': 'organization@example.com',
            'password': '123'
        }, follow_redirects=True)
        self.assertTrue('邮箱地址已经被注册' in response.data)

















