from django.db import models

# Create your models here.

# ORM(object-relational-mapping)
# 类    --> 表
# 对象  --> 数据行（记录）
# 属性  --> 字段

# 值性数据库迁移 
# python manage.py makemigrations 检测有什么变化
# python manage.py migrate 将变更同步到数据库中


class User(models.Model):
    username = models.CharField(max_length=32)   # varchar(32)
    password = models.CharField(max_length=32)   # varchar(32)
