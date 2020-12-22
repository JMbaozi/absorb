import math
from tkinter import Button, Canvas, Entry, Frame, Label, Menu, Text, Tk,filedialog
from tkinter.constants import END
from turtle import distance
from CloudModel import plot_2d_cloud_model, plot_cloud_model
from IDW import IDWdraw3dpoints,IDWdraw3dsurface,GetDEMAllData,Drawgrid2dDEM,DrawgridSlope,Drawgrid2dDEMAspectOfSlope
from Drawkoch import DrawKoch

win_width = 1000
win_height = 700
bgcolor = 'white'

class Application(Frame):
    def __init__(self,master=None):
        super().__init__(master)
        ################################################
        self.unbindkey = 1# 判断是否解绑左键
        self.pointNum = 0# 所画点图形的个数
        self.shapeNum = 0# 所画多边形的个数
        self.lineNum = 0# 所画直线的个数
        self.ovalNum = 0# 所画椭圆的个数
        ################################################
        self.Points_point = []# 点图形点坐标
        self.Points_x_point = []# 点图形点坐标x值
        self.Points_y_point = []# 点图形点坐标y值
        self.Points_shape = []# 多边形点坐标
        self.Points_x_shape = []# 多边形点坐标x值
        self.Points_y_shape = []# 多边形点坐标y值
        self.Points_line = []# 直线点坐标
        self.Points_x_line = []# 直线点坐标x值
        self.Points_y_line = []# 直线点坐标y值
        self.Points_oval = []# 椭圆点坐标
        self.Points_x_oval = []# 椭圆点坐标x值
        self.Points_y_oval = []# 椭圆点坐标y值
        ################################################
        self.p_point = []# 点图形临时坐标值列表
        self.p_x_point = []# 点图形临时坐标x值列表
        self.p_y_point = []# 点图形临时坐标y值列表
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
        self.kochLength = 0#koch曲线长度
        self.kochNum = 0#koch曲线迭代次数
        ################################################
        self.Points_x_kmeans = []#K均值聚类的点数据x值
        self.Points_y_kmeans = []#K均值聚类的点数据y值
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
        self.filemenu_draw.add_command(label="点",command=self.drawPoint)
        self.filemenu_draw.add_command(label="任意多边形",command=self.drawShape)
        self.filemenu_draw.add_command(label="直线",command=self.drawLine)
        self.filemenu_draw.add_command(label="椭圆",command=self.drawOval)
        self.filemenu_draw.add_command(label="test",command=self.Test)
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
        self.filemenu_koch = Menu(self.menubar,tearoff=False)
        self.filemenu_koch.add_command(label="获取koch曲线参数",command=self.DrawkochData)
        self.filemenu_koch.add_command(label="绘制koch曲线",command=self.StartDrawKoch)
        self.filemenu_koch.add_separator()
        self.filemenu_spatialmeasure = Menu(self.menubar,tearoff=False)
        self.filemenu_spatialmeasure.add_command(label="点与点距离",command=self.DistancePointandPoint)
        self.filemenu_spatialmeasure.add_command(label="点与线距离",command=self.DistancePointandLine)
        self.filemenu_spatialmeasure.add_command(label="点与面距离",command=self.DistancePointandShape)
        self.filemenu_spatialmeasure.add_command(label="线与面距离",command=self.DistanceLineandShape)
        self.filemenu_spatialmeasure.add_command(label="面与面距离",command=self.DistanceShapeandShape)
        self.filemenu_spatialmeasure.add_separator()
        self.filemenu_kmeans = Menu(self.menubar,tearoff=False)
        self.filemenu_kmeans.add_command(label="打开点数据文件",command=self.OpenKmeansData)
        self.filemenu_kmeans.add_command(label="开始K均值据类",command=self.StartDrawKoch)
        self.filemenu_kmeans.add_separator()
        self.menubar.add_cascade(label="图形",menu=self.filemenu_draw)
        self.menubar.add_cascade(label="清屏",command=self.Clear)
        self.menubar.add_cascade(label="云模型",menu=self.filemenu_cloud)
        self.menubar.add_cascade(label="DEM",menu=self.filemenu_dem)
        self.menubar.add_cascade(label="DEMClass",menu=self.filemenu_demclass)
        self.menubar.add_cascade(label="koch曲线",menu=self.filemenu_koch)
        self.menubar.add_cascade(label="空间实体量测",menu=self.filemenu_spatialmeasure)
        self.menubar.add_cascade(label="K均值聚类",menu=self.filemenu_kmeans)
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
        # 添加输入标签
        self.entry_input1 = Entry(self)
        self.entry_input1.pack(padx=10, pady=5)
        self.entry_input1.insert(END,'koch曲线长度')
        self.entry_input2 = Entry(self)
        self.entry_input2.pack(padx=10, pady=5)
        self.entry_input2.insert(END,'koch迭代次数')

    # 清空面板和数据
    def Clear(self):
        self.drawpad.delete('all')
        ##############################
        self.Points_point.clear()
        self.Points_x_point.clear()
        self.Points_y_point.clear()
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
        self.pointNum = 0
        self.shapeNum = 0
        self.lineNum = 0
        self.ovalNum = 0
        ##############################
        self.p_point.clear()
        self.p_x_point.clear()
        self.p_y_point.clear()
        self.p_shape.clear()
        self.p_x_shape.clear()
        self.p_y_shape.clear()
        self.p_line.clear()
        self.p_x_line.clear()
        self.p_y_line.clear()
        self.p_oval.clear()
        self.p_x_oval.clear()
        self.p_y_oval.clear()

    # 绘制koch曲线的数据
    def DrawkochData(self):
        self.kochLength,self.kochNum = int(self.entry_input1.get()),int(self.entry_input2.get())
        print(self.kochLength)
        print(self.kochNum)
    # 开始绘制koch曲线
    def StartDrawKoch(self):
        DrawKoch(self.kochLength,self.kochNum)

    # 解除点图形左键绑定
    def PointUnbindLeft(self,event):
        if(self.unbindkey == 1):
            root.unbind("<Button-1>")
            self.unbindkey = 0
        else:
            root.bind("<Button-1>",self.PointGetPoints)# 恢复左键绑定
            self.unbindkey = 1
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


    # 得到点图形鼠标左键坐标
    def PointGetPoints(self,event):
        self.p_point.append(event.x)
        self.p_point.append(event.y)
        self.p_x_point.append(event.x)
        self.p_y_point.append(event.y) 
        self.pointNum += 1
        print(event.x,event.y)
    # 开始绘制点
    def StartDrawPoint(self,event):
        self.Points_point += self.p_point# 将临时坐标值列表存入总列表
        self.Points_x_point += self.p_x_point# 将临时坐标x值列表存入总列表
        self.Points_y_point += self.p_y_point# 将临时坐标y值列表存入总列表
        # x1,y1 = int(self.Points_x_point[self.pointNum-1][0])-1,int(self.Points_y_point[self.pointNum-1][0])-1
        # x2,y2 = int(self.Points_x_point[self.pointNum-1][0])+1,int(self.Points_y_point[self.pointNum-1][0])+1
        # self.drawpad.create_oval(x1,y1,x2,y2,outline="red")
        for i in range(self.pointNum):
            x1,y1 = int(self.Points_x_point[i])-1,int(self.Points_y_point[i])-1
            x2,y2 = int(self.Points_x_point[i])+1,int(self.Points_y_point[i])+1
            self.drawpad.create_oval(x1,y1,x2,y2,fill="red",outline="red")
        print(self.Points_x_point)
        print(self.Points_y_point)
        self.p_point = [] # 清空临时列表
        self.p_x_point = []# 清空临时列表
        self.p_y_point = []# 清空临时列表
    # 准备绘制点
    def drawPoint(self):
        root.bind("<Button-1>",self.PointGetPoints)
        root.bind("<Button-2>",self.PointUnbindLeft)
        root.bind("<Button-3>",self.StartDrawPoint)

    # 得到多边形鼠标左键坐标
    def ShapeGetPoints(self,event):
        self.p_shape.append(event.x)
        self.p_shape.append(event.y)
        self.p_x_shape.append(event.x)
        self.p_y_shape.append(event.y)  
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
        print(self.Points_shape)
        print(self.Points_x_shape)
        self.p_shape = [] # 清空临时列表
        self.p_x_shape = []# 清空临时列表
        self.p_y_shape = []# 清空临时列表    
    # 准备绘制多边形
    def drawShape(self):
        root.bind("<Button-1>",self.ShapeGetPoints)
        root.bind("<Button-2>",self.ShapeUnbindLeft)
        root.bind("<Button-3>",self.StartDrawShape)

    # 得到直线鼠标左键坐标
    def LineGetPoints(self,event):
        self.p_line.append(event.x)
        self.p_line.append(event.y)
        self.p_x_line.append(event.x)
        self.p_y_line.append(event.y)  
        print(event.x,event.y)
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
        print(self.Points_line)
        print(self.Points_line[self.lineNum-1])
    # 准备绘制直线
    def drawLine(self):
        root.bind("<Button-1>",self.LineGetPoints)
        root.bind("<Button-2>",self.LineUnbindLeft)
        root.bind("<Button-3>",self.StartDrawLine)  

    # 得到椭圆鼠标坐标坐标
    def OvalGetPoints(self,event):
        self.p_oval.append(event.x)
        self.p_oval.append(event.y)
        self.p_x_oval.append(event.x)
        self.p_y_oval.append(event.y)  
        print(event.x,event.y)
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

    # 点与点之间的距离
    def DistancePointandPoint(self):
        distance = math.sqrt((self.Points_x_point[0]-self.Points_x_point[1])**2 + (self.Points_y_point[0]-self.Points_y_point[1])**2)
        print("点与点之间的距离：%f" % distance)
    # 点与线之间的距离
    def DistancePointandLine(self):
        k,b = 0.0,0.0
        for each in self.Points_line:
            k = math.sqrt((each[0]-each[2])**2 + (each[1]-each[3])**2)#斜率
            b = each[1] - k*each[0]#常数b
        A,B,C = k,-1,b
        distance = (abs(A*self.Points_x_point[0]+B*self.Points_y_point[0]+C))/math.sqrt(A*A + B*B)
        print("点与线之间的距离：%f" % distance)
    # 点与面之间的距离
    def DistancePointandShape(self):
        x,y = self.GetShapeCG(self.Points_x_shape[0],self.Points_y_shape[0])#重心x,y坐标值
        distance = math.sqrt((self.Points_x_point[0]-x)**2 + (self.Points_y_point[0]-y)**2)
        print("点与面之间的距离：%f" % distance)
    # 线与面之间的距离
    def DistanceLineandShape(self):
        k,b = 0.0,0.0
        for each in self.Points_line:
            k = math.sqrt((each[0]-each[2])**2 + (each[1]-each[3])**2)#斜率
            b = each[1] - k*each[0]#常数b
        A,B,C = k,-1,b
        x,y = self.GetShapeCG(self.Points_x_shape[0],self.Points_y_shape[0])#重心x,y坐标值
        distance = (abs(A*x+B*y+C))/math.sqrt(A*A + B*B)
        print("线与面之间的距离：%f" % distance)
    # 面与面之间的距离
    def DistanceShapeandShape(self):
        x1,y1 = self.GetShapeCG(self.Points_x_shape[0],self.Points_y_shape[0])#重心x1,y1坐标值
        x2,y2 = self.GetShapeCG(self.Points_x_shape[1],self.Points_y_shape[1])#重心x2,y2坐标值
        distance = math.sqrt((x1-x2)**2 + (y1-y2)**2)
        print("面与面之间的距离：%f" % distance)

    # 打开K均值聚类的点数据
    def OpenKmeansData(self):
        filename = filedialog.askopenfilename()
        with open(filename,'r',encoding='utf-8') as f:
            for each in f:
                p = each.split(',')
                self.Points_x_kmeans.append(p[0])
                self.Points_y_kmeans.append(p[1])
        for i in range(len(self.Points_x_kmeans)):
            x1,y1 = int(self.Points_x_kmeans[i])-1,int(self.Points_y_kmeans[i])-1
            x2,y2 = int(self.Points_x_kmeans[i])+1,int(self.Points_y_kmeans[i])+1
            self.drawpad.create_oval(x1,y1,x2,y2,fill="red",outline="red")
        self.text_result.insert('insert',"K-means点数据导入成功！\n")


    # 测试
    def Test(self):
        print(self.text_input.get("0.0","end"))

if __name__ == '__main__':
    root = Tk()
    root.title('地理空间分析')
    root.geometry('1000x800+200+200')# 底部按钮栏
    app = Application(master=root)
    root.mainloop()