import turtle


def koch(size, n):
    if n == 0:
        turtle.fd(size)
    else:
        for angle in [0, 60, -120, 60]:
            turtle.left(angle)
            koch(size/3, n-1)


def DrawKoch(length, num):
    turtle.setup(800, 400)
    turtle.speed(0)  # 控制绘制速度
    turtle.penup()
    turtle.goto(-300, -50)
    turtle.pendown()
    turtle.pensize(2)
    koch(length, num)     # 0阶科赫曲线长度，阶数
    turtle.hideturtle()
