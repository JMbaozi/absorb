from django.shortcuts import render
from app01 import models
# Create your views here.

# 出版社列表
def publisher_list(request):
    # 逻辑
    # 获取所有的出版社信息
    all_publishers = models.Publisher.objects.all()  # 对象列表
    # 返回一个页面，页面中包含出版社的信息
    return render(request,'publisher_list.html',{'all_publishers':all_publishers})

# 新增出版社
def publisher_add(request):
    # get请求返回一个页面，页面中包含form表单
    return render(request,'publisher_add.html') 