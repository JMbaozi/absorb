# 反距离权重插值IDW算法
# https://blog.csdn.net/BigBoySunshine/article/details/81867502?utm_source=blogxgwz4

from tkinter import filedialog
from tkinter.filedialog import FileDialog
import numpy as np
import math
import copy
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import time

import DEMclass as dem
from DEMclass import Drawgrid

from DEM_draw_3d import IDW_draw_3d_points, IDW_draw_3d_surface
# from DEM_draw_2d import IDW_draw_2d_height


# lon和lat分别是要插值的点的x,y
# lst是已有数据的数组，结构为：[[x1，y1，z1]，[x2，y2，z2]，...]
# 返回值是插值点的高程
def interpolation(lon, lat, lst):
    P = 2
    p0 = [lon, lat]
    sum0 = 0
    sum1 = 0
    temp = []
    # 遍历获取该点距离所有采样点的距离
    for point in lst:
        if lon == point[0] and lat == point[1]:
            return point[2]
        Di = np.hypot(p0[0]-point[0],p0[1]-point[1])    # 计算两点间的距离
        # new出来一个对象，不然会改变原来lst的值
        ptn = copy.deepcopy(point)
        ptn.append(Di)
        temp.append(ptn)

    # 根据上面ptn.append（）的值由小到大排序
    temp1 = sorted(temp, key=lambda point: point[3])
    # 遍历排序的前15个点，根据公式求出sum0 and sum1
    for point in temp1[0:15]:
        sum0 += point[2] / math.pow(point[3], P)
        sum1 += 1 / math.pow(point[3], P)
    return sum0 / sum1



###############################################################################
#               分                  割                  线
###############################################################################


x_konw = []  # 已知点x坐标,用于计算x范围
y_konw = []  # 已知点y坐标，用于计算y范围
z_konw = []  # 已知点z坐标
X_insert = []  # 插值点X坐标
Y_insert = []  # 插值点Y坐标
Z_insert = []  # 计算得到的高程
z_x = 0  # z坐标的x范围
z_y = 0  # z坐标的y范围
X_min = 0  # 插值点X范围最小值
X_max = 0  # 插值点X范围最大值
Y_min = 0  # 插值点Y范围最小值
Y_max = 0  # 插值点Y范围最大值
lst_surface = []  # 已知点三维坐标值列表：[[x,y,z],[x,y,z]...]
need_num =50   # know[0:need_num],需要使用的已知点个数为 need_num + 1


def getDemData():
    points = []  # 临时高程点坐标值列表：[x,y,z]
    flag = 0  # 判断是否需要读取
    filename = filedialog.askopenfilename()
    with open(filename, 'r', encoding='utf-8') as file:
        data = file.readlines()
        for each in data:
            flag += 1
            if(flag%1 == 0):
                d = each.split('\t')
                x_konw.append(float(d[0]))
                y_konw.append(float(d[1]))
                z_konw.append(float(d[2]))
                points.append(float(d[0]))
                points.append(float(d[1]))
                points.append(float(d[2]))
                lst_surface.append(points)
                points = []
            else:
                continue
        print('已知点输入完成！')


# 获取DEM所有点的数据
def GetDEMAllData():
    time1 = time.time()
    getDemData()
    global X_min,X_max,Y_min,Y_max,Z_insert,z_x,z_y
    X_min = int(min(x_konw))
    X_max = int(max(x_konw)) + 1
    Y_min = int(min(y_konw))
    Y_max = int(max(y_konw)) + 1
    for i in range(X_min, X_max):
        X_insert.append(i)
    print('插值点X坐标输入完成！')
    for j in range(Y_min, Y_max):
        Y_insert.append(j)
    print('插入点Y坐标输入完成！')
    all_num = (X_max - X_min) * (Y_max - Y_min)
    key = 1
    for i in range(X_min, X_max):
        for j in range(Y_min, Y_max):
            Z_insert.append(interpolation(i, j, lst_surface[0:need_num]))
            print("共%d,正计算第%d个" % (all_num, key))
            key += 1
    print('插入点Z值计算完成！')
    time2 = time.time()
    print("用时：%f s" % (time2-time1))
    z_x = X_max - X_min
    z_y = Y_max - Y_min
    print(z_x)
    print(z_y)

# 绘制已知点三维散点图
def IDWdraw3dpoints():
    # getDemData()
    IDW_draw_3d_points(x_konw[0:need_num], y_konw[0:need_num], z_konw[0:need_num])


# 三维表面图
def IDWdraw3dsurface():
    print('正在绘制...')
    IDW_draw_3d_surface(X_insert, Y_insert, Z_insert, z_x, z_y)
    print('绘制完成！')



#绘制二维DEM
def Drawgrid2dDEM():
    npgrid=dem.readfile(z_y,z_x,Z_insert)
    pre=npgrid
    npgrid=dem.AddRound(npgrid)
    dx,dy=dem.Cacdxdy(npgrid,22.5,22.5)
    slope,arf=dem.CacSlopAsp(dx,dy)
    dem.np.savetxt("slope.csv",slope,delimiter=",")
    Drawgrid(judge=0,A=pre,strs="bone")
#绘制坡度图
def DrawgridSlope():
    npgrid=dem.readfile(z_y,z_x,Z_insert)
    npgrid=dem.AddRound(npgrid)
    dx,dy=dem.Cacdxdy(npgrid,22.5,22.5)
    slope,arf=dem.CacSlopAsp(dx,dy)
    dem.np.savetxt("slope.csv",slope,delimiter=",")
    Drawgrid(judge=0,A=slope,strs="rainbow")
#绘制坡向图
def Drawgrid2dDEMAspectOfSlope():
    npgrid=dem.readfile(z_y,z_x,Z_insert)
    npgrid=dem.AddRound(npgrid)
    dx,dy=dem.Cacdxdy(npgrid,22.5,22.5)
    slope,arf=dem.CacSlopAsp(dx,dy)
    dem.np.savetxt("slope.csv",slope,delimiter=",")
    Drawgrid(judge=0,A=arf)



if __name__ == '__main__':
    # IDWdraw3dpoints()
    IDWdraw3dsurface()
    # GetDEMAllData()
