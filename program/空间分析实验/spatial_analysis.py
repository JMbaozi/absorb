import math
from tkinter import Button, Canvas, Frame, Menu, Text, Tk

win_width = 640
win_height = 480
bgcolor = 'white'
Points = []# 点坐标
Points_x = []# 点左标x值
Points_y = []# 点坐标y值
test = [200,10,240,30,120,100,140,120]


class Application(Frame):
    def __init__(self,master=None):
        super().__init__(master)
        self.x = 0
        self.y = 0
        self.unbindkey = 1# 判断是否解绑左键
        self.shapeNum = 0# 所画图形的个数
        self.p = []# 图形临时坐标值列表
        self.p_x = []# 图形临时坐标x值列表
        self.p_y = []# 图形临时坐标y值列表
        self.fgcolor = 'black'
        self.lastdraw = 0
        self.start_flag = False
        self.master = master
        self.pack()
        self.createWidget()

    def createWidget(self):
        # 创建画图区域
        self.drawpad = Canvas(self, width=win_width, height=win_height, bg=bgcolor)
        self.drawpad.pack()
        # 创建顶部菜单
        self.menubar = Menu(root)
        self.filemenu = Menu(self.menubar,tearoff=False)
        self.filemenu.add_command(label="任意多边形",command=self.drawShape)
        self.filemenu.add_command(label="test",command=self.drawTest)
        self.filemenu.add_separator()
        self.menubar.add_cascade(label="图形",menu=self.filemenu)
        self.menubar.add_cascade(label="清屏",command=self.Clear)
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
        Points.clear()
        Points_x.clear()
        Points_y.clear()
        self.unbindkey = 1
        self.shapeNum = 0
        self.p.clear()
        self.p_x.clear()
        self.p_y.clear()
    
    # 解除左键绑定
    def unbindLeft(self,event):
        if(self.unbindkey == 1):
            root.unbind("<Button-1>")
            self.unbindkey = 0
        else:
            root.bind("<Button-1>",self.getPoints)# 恢复左键绑定
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
            area = self.GetShapeArea(Points_x[i],Points_y[i])
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
            length = self.GetShapeLength(Points_x[i],Points_y[i])
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
            x,y = self.GetShapeCG(Points_x[i],Points_y[i])
            print("图形%d重心：(%f,%f)"%(i+1,x,y))
            result = "图形" + str(i+1) + "重心：(" + str(x) + ',' + str(y) + ')\n'
            self.text_result.insert('insert',result)

    # 得到鼠标左键坐标
    def getPoints(self,event):
        self.p.append(event.x)
        self.p.append(event.y)
        self.p_x.append(event.x)
        self.p_y.append(event.y)
        # Points_x.append(event.x)
        # Points_y.append(event.y)    
        print(event.x,event.y)
        # return Points
    
    # 开始绘制多边形
    def StartDrawShape(self,event):
        self.shapeNum += 1
        Points.append(self.p)# 将临时坐标值列表存入总列表
        Points_x.append(self.p_x)# 将临时坐标x值列表存入总列表
        Points_y.append(self.p_y)# 将临时坐标y值列表存入总列表
        # self.p.clear()# 清空临时列表(IndexError: tuple index out of range,不能放在前面，原因未知。现在清空，上一句函数的Points也会被清空。)
        self.drawpad.create_polygon(Points[self.shapeNum-1],fill="",outline="black")
        # 不要使用clear()方法清空，会导致将总列表的数值也清空，原因可能是函数进程未结束时append(self.p)会与self.p一直关联。
        self.p = [] # 清空临时列表
        self.p_x = []# 清空临时列表
        self.p_y = []# 清空临时列表
        ##################################
        # 测试显示数据
        # print(Points[self.shapeNum-1])
        # print(Points_x[self.shapeNum-1])
        # print(Points_y[self.shapeNum-1])
        ##################################        

    # 准备绘制多边形
    def drawShape(self):
        root.bind("<Button-1>",self.getPoints)
        root.bind("<Button-2>",self.unbindLeft)
        root.bind("<Button-3>",self.StartDrawShape)    

    # 测试
    def drawTest(self):
        self.drawpad.create_polygon(test,fill="",outline="black")

if __name__ == '__main__':
    root = Tk()
    root.title('地理空间分析')
    root.geometry('600x520+200+200')# 底部按钮栏
    app = Application(master=root)
    root.mainloop()