# 反距离权重插值IDW算法
# https://blog.csdn.net/BigBoySunshine/article/details/81867502?utm_source=blogxgwz4

import math,copy
from DEM_draw_3d import IDW_draw_3d_points, IDW_draw_3d_surface
# lon和lat分别是要插值的点的x,y
# lst是已有数据的数组，结构为：[[x1，y1，z1]，[x2，y2，z2]，...]
# 返回值是插值点的高程
def interpolation(lon, lat, lst):
    P=2
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

if __name__ == '__main__':
    x = [] # x坐标
    y = [] # y坐标
    lst = [[1,2,3333],[4,5,6666],[7,8,999],[10,11,1222]]# lst是已有数据的数组，结构为：[[x1，y1，z1]，[x2，y2，z2]，...]
    z = []# 计算得到的高程

    with open('data/dem.txt','r',encoding='utf-8') as file:
        data = file.readlines()
        for each in data:
            d = each.split(' ')
            x.append(float(d[0]))
            y.append(float(d[1]))
            z.append(float(d[2]))
        print('输入输入完成！')
    
    # 三维散点图
    # IDW_draw_3d_points(x,y,z)

    # 三维表面图
    IDW_draw_3d_surface(x,y,z)
