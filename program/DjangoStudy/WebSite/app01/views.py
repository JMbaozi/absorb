from app01 import models
from django.shortcuts import render,HttpResponse,redirect

# Create your views here.

def index(request):
    # ORM的测试
    from app01 import models
    ret = models.User.objects.all()
    print(ret,type(ret))    # QuerySet 对象列表
    for i in ret:
        print(i,i.username,i.password)

    ret1 = models.User.objects.get(username='JMbaozi',password='123')   # 获取一条数据 获取不到或获取到多条数据就会报错
    print(ret1.username)
    ret2 = models.User.objects.filter(password='123')   #获取满足条件的对象
    print(ret2)

    # 业务逻辑
    
    # 返回结果
    # return HttpResponse('index')  # 返回字符串
    return render(request,'index.html') # 返回html页面

def login(request):
    # 处理POST请求逻辑

    # 写死的判断
    # if request.method == 'POST':
    #     # 获取用户名和密码
    #     nickname = request.POST.get('nickname')
    #     password = request.POST.get('password')
    #     # 进行校验
    #     # 校验成功并登录成功，反之返回登陆界面
    #     if nickname == 'JMbaozi' and password == '123':
    #         # return HttpResponse('登陆成功')
    #         # return redirect('http://baozi.run')
    #         return redirect('/index/')  #重定向 注意与render的区别
    
    # 用数据库判断
    nickname = request.POST.get('nickname')
    password = request.POST.get('password')
    if models.User.objects.filter(username=nickname,password=password):
        return redirect('/index/')
    
    # return render(request,'login.html')
    return render(request,'login1.html')