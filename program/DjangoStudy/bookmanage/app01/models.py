from django.db import models

# Create your models here.

# 出版社
class Publisher(models.Model):
    name = models.CharField(max_length=32)