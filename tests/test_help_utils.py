# coding=utf8
import unittest
from flask import url_for
from app.main import help_utils
from app import create_app, db
from app.main.demo_datas import seed_user, seed_project, seed_user_project, seed_bed_box, seed_model, seed_segment


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

    def test_create_order_path(self):
        order_path = help_utils.create_order_path("test")
        self.assertTrue('C:\\flaskProject\workspace\\bridgeGit\\app\static\constructionOrder\\test' == order_path)












