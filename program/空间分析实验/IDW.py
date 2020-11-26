# 反距离权重插值IDW算法
# https://blog.csdn.net/BigBoySunshine/article/details/81867502?utm_source=blogxgwz4

import numpy as np
import math
import copy
from DEM_draw_3d import IDW_draw_3d_points, IDW_draw_3d_surface
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D



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
        Di = distance(p0, point)
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

# 计算两点间的距离
def distance(p, pi):
    dis = (p[0] - pi[0]) * (p[0] - pi[0]) + (p[1] - pi[1]) * (p[1] - pi[1])
    m_result = math.sqrt(dis)
    return m_result


# 三维散点图
def IDWdraw3dpoints():
    x = []  # x坐标
    y = []  # y坐标
    z = []  # 计算得到的高程
    lst_points = [[1, 2, 3333], [40, 50, 6666], [7, 8, 999], [90, 91, 1222]]  # lst是已有数据的数组，结构为：[[x1，y1，z1]，[x2，y2，z2]，...]
    # 为x,y赋值(0,0),(0,1)...(99,99)
    for i in range(100):
        for j in range(100):
            x.append(i)
            y.append(j)
    for i in range(100):
        for j in range(100):
            z.append(interpolation(i, j, lst_points))
    IDW_draw_3d_points(x, y, z)


# 三维表面图
def IDWdraw3dsurface():
    x = []  # 已知点x坐标,用于计算x范围
    y = []  # 已知点y坐标，用于计算y范围
    X = []  # 插值点X坐标
    Y = []  # 插值点Y坐标
    Z = []  # 计算得到的高程
    z_x = 0  # z坐标的x范围
    z_y = 0  # z坐标的y范围
    lst_surface = []
    points = []  # 高程点坐标值列表：[x,y,z]

    with open('data/dem_points.txt','r',encoding='utf-8') as file:
        data = file.readlines()
        for each in data:
            d = each.split('\t')
            x.append(float(d[0]))
            y.append(float(d[1]))
            points.append(float(d[0]))
            points.append(float(d[1]))
            points.append(float(d[2]))
            lst_surface.append(points)
            points = []
        print('已知点输入完成！')

    for i in range(int(min(x)),int(max(x))+1):
        X.append(i)
    print('插值点X坐标输入完成！')
    for j in range(int(min(y)),int(max(y))+1):
        Y.append(j)
    print('插入点Y坐标输入完成！')
    all_num = (int(max(x)) - int(min(x)) + 1) * (int(max(y)) - int(min(y)) + 1)
    key = 1
    for i in range(int(min(x)),int(max(x))+1):
        for j in range(int(min(y)),int(max(y))+1):
            Z.append(interpolation(i, j, lst_surface[0:100]))
            print("共%d,正计算第%d个" % (all_num,key))
            key += 1
    print('插入点Z值计算完成！')
    z_x = int(max(x)) - int(min(x)) + 1
    z_y = int(max(y)) - int(min(y)) + 1            
    X = np.array(X)
    Y = np.array(Y)
    Z = np.array(Z)
    print(z_x)
    print(z_y)
    print('正在绘制...')
    IDW_draw_3d_surface(X, Y, Z, z_x, z_y)



if __name__ == '__main__':
    IDWdraw3dpoints()
    # IDWdraw3dsurface()




