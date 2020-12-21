import math
from tkinter import Button, Canvas, Frame, Label, Menu, Text, Tk
from CloudModel import plot_2d_cloud_model, plot_cloud_model
from IDW import IDWdraw3dpoints,IDWdraw3dsurface,GetDEMAllData,Drawgrid2dDEM,DrawgridSlope,Drawgrid2dDEMAspectOfSlope

win_width = 1000
win_height = 700
bgcolor = 'white'
test = [200,10,240,30,120,100,140,120]

class Application(Frame):
    def __init__(self,master=None):
        super().__init__(master)
        ################################################
        self.unbindkey = 1# 判断是否解绑左键
        self.shapeNum = 0# 所画多边形的个数
        self.lineNum = 0# 所画直线的个数
        self.ovalNum = 0# 所画椭圆的个数
        ################################################
        self.Points_shape = []# 多边形点坐标
        self.Points_x_shape = []# 多边形点左标x值
        self.Points_y_shape = []# 多边形点坐标y值
        self.Points_line = []# 直线点坐标
        self.Points_x_line = []# 直线点左标x值
        self.Points_y_line = []# 直线点坐标y值
        self.Points_oval = []# 椭圆点坐标
        self.Points_x_oval = []# 椭圆点左标x值
        self.Points_y_oval = []# 椭圆点坐标y值
        ################################################
        self.p_shape = []# 多边形图形临时坐标值列表
        self.p_x_shape = []# 多边形图形临时坐标x值列表
        self.p_y_shape = []# 多边形图形临时坐标y值列表
        self.p_line = []# 直线图形临时坐标值列表
        self.p_x_line = []# 直线多边形图形临时坐标x值列表
        self.p_y_line = []# 直线多边形图形临时坐标y值列表
        self.p_oval = []# 椭圆图形临时坐标值列表
        self.p_x_oval = []# 椭圆图形临时坐标x值列表
        self.p_y_oval = []# 椭圆图形临时坐标y值列表
        ################################################
        self.fgcolor = 'black'
        self.master = master
        self.pack()
        self.createWidget()

    def createWidget(self):
        # 创建画图区域
        self.drawpad = Canvas(self, width=win_width, height=win_height, bg=bgcolor)
        self.drawpad.pack()
        # 创建顶部菜单
        self.menubar = Menu(root)
        self.filemenu_draw = Menu(self.menubar,tearoff=False)
        self.filemenu_draw.add_command(label="任意多边形",command=self.drawShape)
        self.filemenu_draw.add_command(label="直线",command=self.drawLine)
        self.filemenu_draw.add_command(label="椭圆",command=self.drawOval)
        self.filemenu_draw.add_command(label="test",command=self.drawTest)
        self.filemenu_draw.add_separator()
        self.filemenu_cloud = Menu(self.menubar,tearoff=False)
        self.filemenu_cloud.add_command(label="二维云模型",command=self.plot_cloud)
        self.filemenu_cloud.add_command(label="三维云模型",command=self.plot_2d_cloud)
        self.filemenu_cloud.add_separator()
        self.filemenu_dem = Menu(self.menubar,tearoff=False)
        self.filemenu_dem.add_command(label="获取数据",command=GetDEMAllData)
        self.filemenu_dem.add_command(label="DEM已知点散点图",command=IDWdraw3dpoints)
        self.filemenu_dem.add_command(label="DEM插值点表面图",command=IDWdraw3dsurface)
        self.filemenu_dem.add_separator()
        self.filemenu_demclass = Menu(self.menubar,tearoff=False)
        self.filemenu_demclass.add_command(label="二维DEM",command=Drawgrid2dDEM)
        self.filemenu_demclass.add_command(label="坡度图",command=DrawgridSlope)
        self.filemenu_demclass.add_command(label="坡向图",command=Drawgrid2dDEMAspectOfSlope)
        self.filemenu_demclass.add_separator()
        self.menubar.add_cascade(label="图形",menu=self.filemenu_draw)
        self.menubar.add_cascade(label="清屏",command=self.Clear)
        self.menubar.add_cascade(label="云模型",menu=self.filemenu_cloud)
        self.menubar.add_cascade(label="DEM",menu=self.filemenu_dem)
        self.menubar.add_cascade(label="DEMClass",menu=self.filemenu_demclass)
        root.config(menu=self.menubar)
        # 创建功能按钮
        self.btn_area = Button(self,text='面积',command=self.ShowShapeArea)
        self.btn_area.pack(side='left',padx=10)
        self.btn_length = Button(self,text='周长',command=self.ShowShapeLength)
        self.btn_length.pack(side='left',padx=10)
        self.btn_cg = Button(self,text='重心',command=self.ShowShapeCG)
        self.btn_cg.pack(side='left',padx=10)
        # 添加显示标签
        self.text_result = Text(self)
        self.text_result.pack(side='left',padx=10)

    # 清空面板和数据
    def Clear(self):
        self.drawpad.delete('all')
        ##############################
        self.Points_shape.clear()
        self.Points_x_shape.clear()
        self.Points_y_shape.clear()
        self.Points_line.clear()
        self.Points_x_line.clear()
        self.Points_y_line.clear()
        self.Points_oval.clear()
        self.Points_x_oval.clear()
        self.Points_y_oval.clear()
        ##############################
        self.unbindkey = 1
        self.shapeNum = 0
        self.lineNum = 0
        self.ovalNum = 0
        ##############################
        self.p_shape.clear()
        self.p_x_shape.clear()
        self.p_y_shape.clear()
        self.p_line.clear()
        self.p_x_line.clear()
        self.p_y_line.clear()
        self.p_oval.clear()
        self.p_x_oval.clear()
        self.p_y_oval.clear()
    
    # 解除多边形左键绑定
    def ShapeUnbindLeft(self,event):
        if(self.unbindkey == 1):
            root.unbind("<Button-1>")
            self.unbindkey = 0
        else:
            root.bind("<Button-1>",self.ShapeGetPoints)# 恢复左键绑定
            self.unbindkey = 1
    # 解除直线左键绑定
    def LineUnbindLeft(self,event):
        if(self.unbindkey == 1):
            root.unbind("<Button-1>")
            self.unbindkey = 0
        else:
            root.bind("<Button-1>",self.LineGetPoints)# 恢复左键绑定
            self.unbindkey = 1
    # 解除椭圆左键绑定
    def OvalUnbindLeft(self,event):
        if(self.unbindkey == 1):
            root.unbind("<Button-1>")
            self.unbindkey = 0
        else:
            root.bind("<Button-1>",self.OvalGetPoints)# 恢复左键绑定
            self.unbindkey = 1

    # 计算面积
    def GetShapeArea(self,points_x=[],points_y=[]):
        area = 0.0
        for i in range(len(points_x)):
            if i + 1 <= len(points_x) - 1:
                area += points_x[i] * points_y[i + 1] - points_x[i + 1] * points_y[i]
            elif i + 1 > len(points_x) - 1:
                area += points_x[i] * points_y[0] - points_x[0] * points_y[i]
        area = area/2.0
        return abs(area)
    # 显示面积
    def ShowShapeArea(self):
        for i in range(self.shapeNum):
            area = self.GetShapeArea(self.Points_x_shape[i],self.Points_y_shape[i])
            print("图形%d面积: %f" % (i+1,abs(area)))
            result = "图形" + str(i+1) + "面积：" + str(abs(area)) + '\n'
            self.text_result.insert('insert',result)        

    # 计算周长
    def GetShapeLength(self,points_x=[],points_y=[]):
        length = 0
        for i in range(len(points_x)):
            if i<len(points_x):
                L = math.sqrt((points_x[i]-points_x[i-1])*(points_x[i]-points_x[i-1])+(points_y[i]-points_y[i-1])*(points_y[i]-points_y[i-1]))
                length += L
            elif i==len(points_x):
                L = math.sqrt((points_x[0]-points_x[i-1])*(points_x[0]-points_x[i-1])+(points_y[0]-points_y[i-1])*(points_y[0]-points_y[i-1]))
                length += L
        return abs(length)
    # 显示周长
    def ShowShapeLength(self):
        for i in range(self.shapeNum):        
            length = self.GetShapeLength(self.Points_x_shape[i],self.Points_y_shape[i])
            print("图形%d周长: %f" % (i+1,abs(length)))
            result = "图形" + str(i+1) + "周长：" + str(abs(length)) + '\n'
            self.text_result.insert('insert',result)

    # 计算重心
    def GetShapeCG(self,points_x=[],points_y=[]):
        area = self.GetShapeArea(points_x,points_y)
        x, y = 0.0, 0.0 #重心点坐标
        for i in range(len(points_x)):
            lat = points_x[i]  # weidu
            lng = points_y[i]  # jingdu
            if i == 0:
                lat1 = points_x[-1]
                lng1 = points_y[-1]
            else:
                lat1 = points_x[i - 1]
                lng1 = points_y[i - 1]
            fg = (lat * lng1 - lng * lat1) / 2.0
            area += fg
            x += fg * (lat + lat1) / 3.0
            y += fg * (lng + lng1) / 3.0
        x = x / area   # x坐标
        y = y / area   # y坐标
        return x,y       
    # 显示重心
    def ShowShapeCG(self):
        for i in range(self.shapeNum):
            x,y = self.GetShapeCG(self.Points_x_shape[i],self.Points_y_shape[i])
            print("图形%d重心：(%f,%f)"%(i+1,x,y))
            result = "图形" + str(i+1) + "重心：(" + str(x) + ',' + str(y) + ')\n'
            self.text_result.insert('insert',result)

    # 得到多边形鼠标左键坐标
    def ShapeGetPoints(self,event):
        self.p_shape.append(event.x)
        self.p_shape.append(event.y)
        self.p_x_shape.append(event.x)
        self.p_y_shape.append(event.y)  
        print(event.x,event.y)
    
    # 得到直线鼠标左键坐标
    def LineGetPoints(self,event):
        self.p_line.append(event.x)
        self.p_line.append(event.y)
        self.p_x_line.append(event.x)
        self.p_y_line.append(event.y)  
        print(event.x,event.y)

    # 得到椭圆鼠标坐标坐标
    def OvalGetPoints(self,event):
        self.p_oval.append(event.x)
        self.p_oval.append(event.y)
        self.p_x_oval.append(event.x)
        self.p_y_oval.append(event.y)  
        print(event.x,event.y)

    # 开始绘制多边形
    def StartDrawShape(self,event):
        self.shapeNum += 1
        self.Points_shape.append(self.p_shape)# 将临时坐标值列表存入总列表
        self.Points_x_shape.append(self.p_x_shape)# 将临时坐标x值列表存入总列表
        self.Points_y_shape.append(self.p_y_shape)# 将临时坐标y值列表存入总列表
        # self.p.clear()# 清空临时列表(IndexError: tuple index out of range,不能放在前面，原因未知。现在清空，上一句函数的Points也会被清空。)
        self.drawpad.create_polygon(self.Points_shape[self.shapeNum-1],fill="",outline="black")
        # 不要使用clear()方法清空，会导致将总列表的数值也清空，原因可能是函数进程未结束时append(self.p)会与self.p一直关联。
        self.p_shape = [] # 清空临时列表
        self.p_x_shape = []# 清空临时列表
        self.p_y_shape = []# 清空临时列表    

    # 准备绘制多边形
    def drawShape(self):
        root.bind("<Button-1>",self.ShapeGetPoints)
        root.bind("<Button-2>",self.ShapeUnbindLeft)
        root.bind("<Button-3>",self.StartDrawShape)

    # 开始绘制直线
    def StartDrawLine(self,event):
        self.lineNum += 1
        self.Points_line.append(self.p_line)# 将临时坐标值列表存入总列表
        self.Points_x_line.append(self.p_x_line)# 将临时坐标x值列表存入总列表
        self.Points_y_line.append(self.p_y_line)# 将临时坐标y值列表存入总列表        
        self.drawpad.create_line(self.Points_line[self.lineNum-1],fill="red")
        self.p_line = [] # 清空临时列表
        self.p_x_line = []# 清空临时列表
        self.p_y_line = []# 清空临时列表
        print(self.Points_line[self.lineNum-1])

    # 准备绘制直线
    def drawLine(self):
        root.bind("<Button-1>",self.LineGetPoints)
        root.bind("<Button-2>",self.LineUnbindLeft)
        root.bind("<Button-3>",self.StartDrawLine)  

    # 开始绘制椭圆
    def StartDrawOval(self,event):
        self.ovalNum += 1
        self.Points_oval.append(self.p_oval)# 将临时坐标值列表存入总列表
        self.Points_x_oval.append(self.p_x_oval)# 将临时坐标x值列表存入总列表
        self.Points_y_oval.append(self.p_y_oval)# 将临时坐标y值列表存入总列表   
        self.drawpad.create_oval(self.Points_oval[self.ovalNum-1],fill="",outline="blue")
        self.p_oval = [] # 清空临时列表
        self.p_x_oval = []# 清空临时列表
        self.p_y_oval = []# 清空临时列表

    # 准备绘制椭圆
    def drawOval(self):
        root.bind("<Button-1>",self.OvalGetPoints)
        root.bind("<Button-2>",self.OvalUnbindLeft)
        root.bind("<Button-3>",self.StartDrawOval)

    # 二维云模型
    def plot_cloud(self):
        plot_cloud_model(0, 1, 0.1, 500, moni=True)
    # 三维云模型
    def plot_2d_cloud(self):
        plot_2d_cloud_model([0, 1], [0.3, 0.3], [0.01, 0.05], 2000)

    # 测试
    def drawTest(self):
        self.drawpad.create_polygon(test,fill="",outline="black")

if __name__ == '__main__':
    root = Tk()
    root.title('地理空间分析')
    root.geometry('1000x800+200+200')# 底部按钮栏
    app = Application(master=root)
    root.mainloop()