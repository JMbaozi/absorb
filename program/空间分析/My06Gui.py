from tkinter import *
from tkinter import messagebox
from tkinter.colorchooser import askcolor

win_width = 600
win_height = 400
bgcolor = 'white'


class Application(Frame):
    """一个经典的GUI写法"""

    def __init__(self, master=None):
        """初始化方法"""
        super().__init__(master)  # 调用父类的初始化方法
        self.x = 0
        self.y = 0
        self.fgcolor = 'black'
        self.lastdraw = 0
        self.start_flag = False
        self.master = master
        self.pack()
        self.createWidget()

    def createWidget(self):
        """创建画图区域"""
        self.drawpad = Canvas(self, width=win_width, height=win_height, bg=bgcolor)
        self.drawpad.pack()
        # 创建按钮
        self.btn_start = Button(self, name='start', text='开始')
        self.btn_start.pack(side='left', padx=10)
        self.btn_pen = Button(self, name='pen', text='画笔')
        self.btn_pen.pack(side='left', padx=10)
        self.btn_rect = Button(self, name='rect', text='矩形')
        self.btn_rect.pack(side='left', padx=10)
        self.btn_clear = Button(self, name='clear', text='清屏')
        self.btn_clear.pack(side='left', padx=10)
        self.btn_erasor = Button(self, name='erasor', text='橡皮擦')
        self.btn_erasor.pack(side='left', padx=10)
        self.btn_line = Button(self, name='line', text='直线')
        self.btn_line.pack(side='left', padx=10)
        self.btn_line_arrow = Button(self, name='line_arrow', text='箭头直线')
        self.btn_line_arrow.pack(side='left', padx=10)
        self.btn_color = Button(self, name='color', text='颜色')
        self.btn_color.pack(side='left', padx=10)
        self.btn_circle = Button(self, name='circle', text='画圆')
        self.btn_circle.pack(side='left', padx=10)
        # 绑定事件
        self.btn_line.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.btn_line_arrow.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.btn_rect.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.btn_pen.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.btn_erasor.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.btn_clear.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.btn_color.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.btn_circle.bind('<Button-1>', self.eventManager)  # 点击按钮事件
        self.master.bind('<KeyPress-r>', self.hotKey)  # 绑定快捷键
        self.master.bind('<KeyPress-g>', self.hotKey)  # 绑定快捷键
        self.master.bind('<KeyPress-b>', self.hotKey)  # 绑定快捷键
        self.master.bind('<KeyPress-y>', self.hotKey)  # 绑定快捷键
        self.drawpad.bind('<ButtonRelease-1>', self.stopDraw)  # 左键释放按钮

    def eventManager(self, event):
        name = event.widget.winfo_name()
        print(name)
        self.start_flag = True
        if name == 'line':
            # 左键拖动
            self.drawpad.bind('<B1-Motion>', self.myline)
        elif name == 'line_arrow':
            self.drawpad.bind('<B1-Motion>', self.myline_arrow)
        elif name == 'rect':
            self.drawpad.bind('<B1-Motion>', self.myrect)
        elif name == 'pen':
            self.drawpad.bind('<B1-Motion>', self.mypen)
        elif name == 'erasor':
            self.drawpad.bind('<B1-Motion>', self.myerasor)
        elif name == 'clear':
            self.drawpad.delete('all')
        elif name == 'color':
            c = askcolor(color=self.fgcolor, title='请选择颜色')
            print(c)  # c的值 ((128.5, 255.99609375, 0.0), '#80ff00')
            self.fgcolor = c[1]
        elif name == 'circle':
            self.drawpad.bind('<B1-Motion>', self.mycircle)

    def startDraw(self, event):
        self.drawpad.delete(self.lastdraw)
        if self.start_flag:
            self.start_flag = False
            self.x = event.x
            self.y = event.y

    def stopDraw(self, event):
        self.start_flag = True
        self.lastdraw = 0

    def myline(self, event):
        self.startDraw(event)
        self.lastdraw = self.drawpad.create_line(self.x, self.y, event.x, event.y, fill=self.fgcolor)

    def myline_arrow(self, event):
        self.startDraw(event)
        self.lastdraw = self.drawpad.create_line(self.x, self.y, event.x, event.y, arrow=LAST, fill=self.fgcolor)

    def myrect(self, event):
        self.startDraw(event)
        self.lastdraw = self.drawpad.create_rectangle(self.x, self.y, event.x, event.y, outline=self.fgcolor)

    def mycircle(self, event):
        self.startDraw(event)
        self.lastdraw = self.drawpad.create_arc(self.x, self.y, event.x, event.y, outline=self.fgcolor)

    # Issue
    # def mycircle(self,event):
    #     w = Canvas(root, width=200, height=200, background='white')
    #     self.startDraw(event)
    #     x1, y1 = (event.x - 1), (event.y - 1)
    #     x2, y2 = (event.x + 1), (event.y + 1)
    #     w.create_oval(x1, y1, x2, y2, fill='red')

    def mypen(self, event):
        self.startDraw(event)
        print('self.x=', self.x, ',self.y=', self.y)
        self.drawpad.create_line(self.x, self.y, event.x, event.y, fill=self.fgcolor)
        self.x = event.x
        self.y = event.y

    def myerasor(self, event):
        self.startDraw(event)
        print('self.x=', self.x, ',self.y=', self.y)
        self.drawpad.create_rectangle(event.x - 3, event.y - 3, event.x + 3, event.y + 3, fill=bgcolor)
        self.x = event.x
        self.y = event.y

    def hotKey(self, event):
        c = event.char
        if c == 'r':
            self.fgcolor = 'red'
        elif c == 'g':
            self.fgcolor = 'green'
        elif c == 'b':
            self.fgcolor = 'blue'
        elif c == 'y':
            self.fgcolor = 'yellow'


if __name__ == '__main__':
    root = Tk()
    root.title('画图窗口')
    root.geometry('600x500+200+200')
    app = Application(master=root)
    root.mainloop()
