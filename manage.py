# coding=utf8
import os

COV = None
if os.environ.get('FLASK_COVERAGE'):
    import coverage

    COV = coverage.coverage(branch=False, include=['app/main/email.py', 'app/main/forms.py', 'app/main/models.py',
                                                   'app/main/views.py'])
    COV.start()

if os.path.exists('.env'):
    print('Importing environment from .env...')
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]

from app import create_app, db
from flask.ext.script import Manager, Shell
from flask.ext.migrate import Migrate, MigrateCommand


app = create_app(os.getenv('FLASK_CONFIG') or 'default')
manager = Manager(app)
migrate = Migrate(app, db)


def make_shell_context():
    return dict(app=app, db=db)


manager.add_command('shell', Shell(make_shell_context))
manager.add_command('db', MigrateCommand)


# @manager.command
# def setup():
# # from app.main.models import Role
#     # admin_role = Role(name=u'管理员')
#     # user_role = Role(name=u'普通用户')
#     # db.session.add(admin_role)
#     # db.session.add(user_role)
#     # db.session.commit()


@manager.command
def test(coverage=False):
    """Run the unit tests."""

    if coverage and not os.environ.get('FLASK_COVERAGE'):
        import sys

        os.environ['FLASK_COVERAGE'] = '1'
        # os.execvp(sys.executable, [sys.executable] + sys.argv)

    import unittest

    tests = unittest.TestLoader().discover('tests')
    unittest.TextTestRunner(verbosity=2).run(tests)

    if COV:
        COV.stop()
        COV.save()
        print('Coverage Summary:')
        COV.report()
        basedir = os.path.abspath(os.path.dirname(__file__))
        covdir = os.path.join(basedir, 'coverage/samples')
        COV.html_report(directory=covdir)
        print('HTML version: file://%s/index.html' % covdir)
        COV.erase()


@manager.command
def seed():
    from app.main.demo_datas import seed_user, seed_project, seed_user_project, seed_bed_box, seed_model, seed_segment, \
        seed_node, seed_surveyed_data, seed_order, seed_segment_data, seed_surveyed_data_from_file, seed_model_from_file

    try:
        path1 = os.path.abspath(os.path.dirname(__file__))
        seed_user()
        seed_project()
        seed_user_project()
        seed_bed_box()
        #seed_model()
        # seed_model_from_file(path1)
        #seed_segment_data()
        #seed_segment()
        #seed_node()
        #for i in range(101, 107):
        #    seed_surveyed_data_from_file(path1, i)

        # seed_surveyed_data()
        #seed_order()

    except Exception, e:
        print(e)
    else:
        print("add seed success")


if __name__ == '__main__':
    manager.run()