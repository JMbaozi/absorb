
import tkinter as tk
window=tk.Tk()
window.title('my window')
window.geometry('200x200')
e=tk.Entry(window,show='*')
# Entry的第一个参数是父窗口，即这里的window
# *表示输入的文本变为星号，在Entry不可见内容，若为None则表示为输入文本以原形式可见
e.pack()
def insert_point():
    var=e.get()      
    t.insert('insert',var)
def insert_end():
    var=e.get()
    t.insert('end',var)
#这里的end表示插入在结尾，可以换为1.2，则插入在第一行第二位后面
b1=tk.Button(window,text='insert point',width=15,height=2,command=insert_point)
b1.pack()
b2=tk.Button(window,text='insert end',width=15,height=2,command=insert_end)
b2.pack()
t=tk.Text(window,height=2)     #这里设置文本框高，可以容纳两行
t.pack()
window.mainloop()
