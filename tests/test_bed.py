# coding=utf8
import unittest
from flask import url_for
from app.main.models import BPUser, BPProject,Status,BPBedBox
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

    def test_admin_bed_list(self):
        self.login_user()
        response = self.client.get(url_for('main.admin_bed_list'),follow_redirects=True)
        self.assertTrue('台座列表' in response.data)

    def test_admin_bed_detail(self):
        self.login_user()
        bed = BPBedBox.query.first()
        response = self.client.get(url_for('main.admin_bed_detail',bed_id=bed.bed_id),follow_redirects=True)
        self.assertTrue(str(bed.bed_default_period) in response.data)

    def test_admin_bed_new(self):
        self.login_user()
        response = self.client.post(url_for('main.admin_bed_new'), data={
            'period': '2',
            'name': 'test1',
            'startTime': '2015-8-19',
            'project': 'project1'
        }, follow_redirects=True)
        self.assertTrue('test1' in response.data)










