
from tkinter import *
import math

win_width = 640
win_height = 480
bgcolor = 'white'
Points = []# 点左边
Points_x = []# 点左标x值
Points_y = []# 点坐标y值
test = [200,10,240,30,120,100,140,120]


class Application(Frame):
    def __init__(self,master=None):
        super().__init__(master)
        self.x = 0
        self.y = 0
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
    
    # 接触左键绑定
    def UnbindLeft(self,event):
        root.unbind("<Button-1>")

    # 计算面积
    def GetShapeArea(self):
        area = 0.0
        for i in range(len(Points_x)):
            if i + 1 <= len(Points_x) - 1:
                area += Points_x[i] * Points_y[i + 1] - Points_x[i + 1] * Points_y[i]
            elif i + 1 > len(Points_x) - 1:
                area += Points_x[i] * Points_y[0] - Points_x[0] * Points_y[i]
        area = area/2.0
        return abs(area)
    # 显示面积
    def ShowShapeArea(self):
        area = self.GetShapeArea()
        print("图形面积: ",abs(area))
        result = "图形面积：" + str(abs(area)) + '\n'
        self.text_result.insert('insert',result)        

    # 计算周长
    def GetShapeLength(self):
        length = 0
        for i in range(len(Points_x)):
            if i<len(Points_x):
                L = math.sqrt((Points_x[i]-Points_x[i-1])*(Points_x[i]-Points_x[i-1])+(Points_y[i]-Points_y[i-1])*(Points_y[i]-Points_y[i-1]))
                length += L
            elif i==len(Points_x):
                L = math.sqrt((Points_x[0]-Points_x[i-1])*(Points_x[0]-Points_x[i-1])+(Points_y[0]-Points_y[i-1])*(Points_y[0]-Points_y[i-1]))
                length += L
        return abs(length)
    # 显示周长
    def ShowShapeLength(self):
        length = self.GetShapeLength()
        print("图形周长: ",abs(length))
        result = "图形周长：" + str(abs(length)) + '\n'
        self.text_result.insert('insert',result)

    
    # 计算重心
    def GetShapeCG(self):
        area = self.GetShapeArea()
        x, y = 0.0, 0.0 #重心点坐标
        for i in range(len(Points_x)):
            lat = Points_x[i]  # weidu
            lng = Points_y[i]  # jingdu
            if i == 0:
                lat1 = Points_x[-1]
                lng1 = Points_y[-1]
            else:
                lat1 = Points_x[i - 1]
                lng1 = Points_y[i - 1]
            fg = (lat * lng1 - lng * lat1) / 2.0
            area += fg
            x += fg * (lat + lat1) / 3.0
            y += fg * (lng + lng1) / 3.0
        x = x / area   # x坐标
        y = y / area   # y坐标
        return x,y       
    # 显示重心
    def ShowShapeCG(self):
        x,y = self.GetShapeCG()
        result = "图形重心：(" + str(x) + ',' + str(y) + ')\n'
        self.text_result.insert('insert',result)

    # 得到鼠标左键坐标
    def getPoints(self,event):
        Points.append(event.x)
        Points.append(event.y)    
        Points_x.append(event.x)
        Points_y.append(event.y)    
        print(event.x,event.y)
        # return Points
    
    # 开始绘制多边形
    def StartDrawShape(self,event):
        self.drawpad.create_polygon(Points,fill="",outline="black")

    # 准备绘制多边形
    def drawShape(self):
        root.bind("<Button-1>",self.getPoints)
        root.bind("<Button-2>",self.UnbindLeft)
        root.bind("<Button-3>",self.StartDrawShape)    

    # 测试
    def drawTest(self):
        self.drawpad.create_polygon(test,fill="",outline="black")

if __name__ == '__main__':
    root = Tk()
    root.title('窗口')
    root.geometry('600x520+200+200')# 底部按钮栏
    app = Application(master=root)
    root.mainloop()