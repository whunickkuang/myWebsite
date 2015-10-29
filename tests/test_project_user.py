# coding=utf8
import unittest
from flask import url_for
from app.main.models import BPUser, BPProject, Status, Identify
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

    def test_change_project(self):
        self.login_user()
        project = BPProject.query.first()
        response = self.client.post(url_for('main.change_project', projectId=project.project_id), data={
            'email': 'organization@example.com',
            'password': '123'
        }, follow_redirects=True)
        self.assertTrue('一局桥梁公司洪湖项目' in response.data)

    def test_admin_project_list(self):
        self.login_user()
        response = self.client.get(url_for('main.admin_project_list'), follow_redirects=True)
        self.assertTrue('一局桥梁公司宁波项目' in response.data)
        self.assertTrue('一局桥梁公司武汉项目' in response.data)
        self.assertTrue('一局桥梁公司洪湖项目' in response.data)

    def test_get_session_project_list(self):
        self.login_user()
        response = self.client.get(url_for('main.get_session_project_list'), follow_redirects=True)
        data = json.loads(response.data)
        self.assertTrue(3 == len(data['result']))

    def test_admin_finish_project(self):
        self.login_user()
        project = BPProject.query.first()
        self.client.get(url_for('main.admin_finish_project', projectId=project.project_id),
                        follow_redirects=True)
        self.assertTrue(project.project_status == Status.COMPLETED)

    def test_general_url(self):
        self.login_user()
        project = BPProject.query.first()
        response = self.client.get(url_for('main.general_url', projectId=project.project_id), follow_redirects=True)
        self.assertTrue(response.status_code == 200)

    def test_admin_users_list(self):
        self.client.post(url_for('main.login'), data={
            'email': 'admin@example.com',
            'password': '123'
        }, follow_redirects=True)
        response = self.client.get(url_for('main.admin_users_list'), follow_redirects=True)
        self.assertTrue('组织管理' in response.data)

    def test_admin_organization_list(self):
        self.client.post(url_for('main.login'), data={
            'email': 'admin@example.com',
            'password': '123'
        }, follow_redirects=True)
        response = self.client.get(url_for('main.admin_organization_list'), follow_redirects=True)
        user = BPUser.query.filter_by(user_role_type=Identify.ORGANIZATION).first()
        self.assertTrue(user.user_email.encode("utf-8") in response.data)

    def test_admin_organization_new(self):
        self.client.post(url_for('main.login'), data={
            'email': 'admin@example.com',
            'password': '123'
        }, follow_redirects=True)
        response = self.client.post(url_for('main.admin_organization_new'), data={
            'email': 'user1@example.com',
            'pieces': '123'
        })
        self.assertTrue('user1@example.com' in response.data)
        self.assertTrue('123' in response.data)

    def test_admin_user_detail(self):
        self.login_user()
        user = BPUser.query.first()
        project = BPProject.query.first()
        response = self.client.get(url_for('main.admin_user_detail',projectId=project.project_id,userId=user.user_id),follow_redirects=True)
        self.assertTrue('user not found' in response.data)








