桥梁施工短线法软件

==================

1、代码库使用

创建虚拟环境：

virtualenv venv

source venv/bin/activate

配置依赖：

pip freeze > requirements.txt

pip install -r requirements.txt

数据库迁移：

建立文件夹
python manage.py db init

自动建立脚本
python manage.py db migrate -m "initial migration"

执行迁移
python manage.py db upgrade

加入初始数据
python manage.py seed

2、部署过程

# Run in apache

install virtualbox

install vagrant

    run vagrant up

see http://localhost

warning: When VM restarted, run

    sudo service apache2 reload

because apache started before /vagrant was mounted

# Run in dev server

    vagrant up

    vagrant ssh

    python /vagrant/FlaskApp.py

see http://localhost:5000

3、seed数据
seed中，导入组织管理员：organization@example.com

平台管理员：admin@example.com

普通用户为：user1@example.com，user2@example.com等等

密码均为123

4、其他



