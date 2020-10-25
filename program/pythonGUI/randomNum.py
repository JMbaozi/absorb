from tkinter import *
import random

root = Tk()
frame1 = Frame(root)#按钮显示
frame2 = Frame(root)#结果显示
intNum = IntVar()

def randNum():
    num = random.randint(1,100)
    intNum.set(num)

textLabel = Label(frame2,
                textvariable=intNum,
                justify=LEFT)
textLabel.pack(side=LEFT)

button = Button(frame1,text="1-100随机整数",command=randNum)
button.pack()
frame1.pack(padx=10,pady=10)
frame2.pack(padx=10,pady=10)
mainloop()