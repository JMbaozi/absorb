from tkinter import*
from math import *

root = Tk()
canvas = Canvas(root,width=400,height=300)  #创建画布
canvas.pack()

points=[]
x=[]
y=[]


def onMouseEvent(event):   #获取鼠标事件并加入数组中
    print(event.x, event.y)
    # if number:
    points.append(event.x);
    points.append(event.y);
    print(points)
    return

def onMousestop(event):   #获取鼠标事件并加入数组中

    return
def stopdraw(event):  #停止绘制

    canvas.create_polygon(points, fill="", outline="black")  # 画布中画不规则多边形
    root.bind("<Button-1>", onMousestop)

def drawpol():   #开始绘制多边形
    points.clear()
    root.bind("<Button-1>", onMouseEvent)
    root.bind("<Double-Button-1>", stopdraw)
    return

def xx():   #将xy分开
    for i in range(len(points)):
        if i%2==0:
            x.append(points[i])
        if i%2!=0:
            y.append(points[i])
def area():    #计算面积
    area1=0;
    xx()
    for i in range(len(x)):
        if i + 1 <= len(x) - 1:
            area1 += x[i] * y[i + 1] -x[i + 1] * y[i]
        elif i + 1 > len(x) - 1:
            area1 += x[i] * y[0] - x[0] * y[i]
    area1 = area1/2


    return area1;
def jisuanarea():   #显示面积

    areas=area()
    c = 0;  v = 0;
    a = 0;  b = 0;
    for i in range(len(x)):
        a += x[i]
        b += y[i]

    c = a / len(x);  # 中心点x坐标
    v = b / len(x);  # 中心点y坐标
    print("中心点x" + str(c))
    print("中心点y" + str(v))

    canvas.create_text(c, v, text="面积" + str(abs(areas)))


    x.clear()   #清空
    y.clear()

def qingkonghuaban():
    canvas.delete('all')
    x.clear()
    y.clear()
    c=0
    v=0


def lengthceliang():  #周长测量

   length1=0
   xx()
   for i in range(len(x)):
        if i<len(x):

            l= sqrt((x[i]-x[i-1])*(x[i]-x[i-1])+(y[i]-y[i-1])*(y[i]-y[i-1]))
            length1 +=l;
            c=(x[i]+x[i-1])/2     #边长的位置
            v= (y[i] + y[i - 1]) / 2
            canvas.create_text(c, v, text= str(round(abs(l),1)))

        elif i==len(x):
            l =  sqrt((x[0]-x[i-1])*(x[0]-x[i-1])+(y[0]-y[i-1])*(y[0]-y[i-1]))
            length1 += l;



   c = 0;
   v = 0;
   a = 0;
   b = 0;
   for i in range(len(x)):
       a += x[i]
       b += y[i]

   c = a / len(x);  # 中心点x坐标
   v = b / len(x);  # 中心点y坐标
   canvas.create_text(c, v+25, text="周长"+str(round(abs(length1), 1)))
   length1 = 0
   x.clear()
   y.clear()
   return



def CLLocationCoordinate2D():  #重心测量
    area1=abs(area())

    a, b = 0.0, 0.0 #重心点坐标
    for i in range(len(x)):
        lat = x[i]  # weidu
        lng = y[i]  # jingdu
        if i == 0:
            lat1 = x[-1]
            lng1 = y[-1]
        else:
            lat1 = x[i - 1]
            lng1 = y[i - 1]
        fg = (lat * lng1 - lng * lat1) / 2.0
        area1 += fg
        a += fg * (lat + lat1) / 3.0
        b += fg * (lng + lng1) / 3.0
    a = a / area1
    b = b / area1
    print("重心点x"+str(a))
    print("重心点y"+str(b))
    canvas.create_text(b, a, text="这里是重心" )

    return



# 创建菜单
def caidan():
    menu1 = Menu(root, tearoff=0)  # 1的话多了一个虚线，如果点击的话就会发现，这个菜单框可以独立出来显示
    menu1.add_command(label="开始绘制多边形",command=drawpol)
    menu1.add_separator()
    menu1.add_command(label="计算面积",command=jisuanarea)
    menu1.add_separator()
    menu1.add_command(label="周长测量",command=lengthceliang)
    menu1.add_separator()
    menu1.add_command(label="重心测量",command=CLLocationCoordinate2D)
    menu1.add_separator()
    menu1.add_command(label="1111",command=qingkonghuaban)
    menu1.add_separator()
    menu1.add_command(label="2222",command=qingkonghuaban)
    menu1.add_separator()
    menu1.add_command(label="3333",command=qingkonghuaban)
    menu1.add_separator()
    menu1.add_command(label="清空画板",command=qingkonghuaban)


    menu2=Menu(root,tearoff=0)
    menu2.add_command(label="开始绘制多边形",command=drawpol)
    menu2.add_separator()
    mebubar = Menu(root)
    mebubar.add_cascade(label="实验一", menu=menu1)  # 原理：先在主菜单中添加一个菜单，与之前创建的菜单进行绑定。
    mebubar.add_cascade(label="实验二", menu=menu2)  # 原理：先在主菜单中添加一个菜单，与之前创建的菜单进行绑定。
    mebubar.add_command(label="退出", command=root.quit)
    root.config(menu=mebubar)



caidan()
root.mainloop()