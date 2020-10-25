import tkinter as tk
from tkinter import *


# root = tk.Tk()
# root.title("TestGUIdemo")
# theLabel = tk.Label(root,text="Tkinter窗口程序")
# theLabel.pack()
# root.mainloop()


# class App:
#     def __init__(self,root):
#         frame = tk.Frame(root)#框架
#         frame.pack(side=tk.LEFT,padx=10,pady=10)#自动调整尺寸(可自定义)
#         self.hi_there = tk.Button(frame,text="打招呼",bg="black",fg="white",command=self.say_hi)#bg():背景色，fg():字体颜色
#         self.hi_there.pack(side=tk.LEFT)
#     def say_hi(self):
#         print("Hello,I am JMbaozi.")
# root = tk.Tk()
# app = App(root)
# root.mainloop()


# Label组件
# root = Tk()
# textLabel = Label(root,text="你所下载的影片含有未成年人限制内容，\n请满18周岁后再单击观看！",
#                 justify=LEFT,
#                 padx=10)
# textLabel.pack(side=LEFT)
# photo = PhotoImage(file='img/bizhi.png')
# imgLabel = Label(root,image=photo)
# imgLabel.pack(side=RIGHT)
# mainloop()


# Label组件
# root = Tk()
# photo = PhotoImage(file="img/bizhi.png")
# theLabel = Label(root,
#                 text="我是\nJMbaozi",
#                 justify=LEFT,
#                 image=photo,
#                 compound=CENTER,#设置文本和图像的混合模式
#                 font=('华康少女字体',20),
#                 fg="white")
# theLabel.pack()
# mainloop()


# Button组件
# root = Tk()
# frame1 = Frame(root)
# frame2 = Frame(root)
# #创建一个文本Label对象
# var = StringVar()
# var.set("你所下载的影片含有未成年人限制内容，\n请满18周岁后再单击观看！")
# def callback():
#     var.set("我才不信呢~")
# textLabel = Label(frame1,
#                 textvariable=var,
#                 justify=LEFT)
# textLabel.pack(side=LEFT)
# #创建一个图像Label对象
# photo = PhotoImage(file="img/18.png")
# imgLabel = Label(frame1,image=photo)
# imgLabel.pack(side=RIGHT)
# #添加一个按钮
# theButton = Button(frame2,text="已满18周岁",command=callback)
# theButton.pack()
# frame1.pack(padx=10,pady=10)
# frame2.pack(padx=10,pady=10)
# mainloop()


# Checkbutton组件
# root = Tk()
# #需要一个Tkinter变量，用来表示该按钮是否被选中
# v = IntVar()
# c = Checkbutton(root,text="测试",variable=v)
# c.pack()
# #如果选项被选中，那么变量v被赋值为1，否则为0
# l = Label(root,textvariable=v)
# l.pack()
# mainloop()


# #翻牌子
# root = Tk()
# Girls = ["西施","王昭君","貂蝉","杨玉环"]
# v = []
# for girl in Girls:
#     v.append(IntVar())
#     c = Checkbutton(root,text=girl,variable=v[-1])
#     c.pack(padx=10,pady=10,anchor=W)#方位：西(West),全部左对齐
# mainloop()

# Radiobutton组件
