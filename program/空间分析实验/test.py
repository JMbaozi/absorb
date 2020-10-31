from tkinter import *

root = Tk()

menubar = Menu(root)

points_x = []
points_y = []
points = []

def callback(event):
    points_x.append(event.x)
    points_y.append(event.y)
    print(points_x)
    print(points_y)

def getPoints(event):
    points.append(event.x)
    points.append(event.y)

def drawShape(event):
    canvas = Canvas(root,width=640,height=480)
    canvas.pack()
    canvas.create_polygon(points)

filemenu = Menu(menubar,tearoff=False)
filemenu.add_command(label="任意多边形",command=drawShape)
filemenu.add_command(label="test2",command=callback)
filemenu.add_separator()
menubar.add_cascade(label="图形",menu=filemenu)
root.config(menu=menubar)

frame = Frame(root,width=500,height=500)
frame.bind("<Button-1>",getPoints)
frame.bind("<Button-3>",drawShape)
frame.pack()

if __name__ == '__main__':
    mainloop()