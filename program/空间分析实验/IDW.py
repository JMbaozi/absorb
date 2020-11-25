# 反距离权重插值IDW算法
# https://blog.csdn.net/BigBoySunshine/article/details/81867502?utm_source=blogxgwz4

import math,copy
from DEM_draw_3d import IDW_draw_3d
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
    
    # 为x,y赋值(0,0),(0,1)...(99,99)
    for i in range(100):
        for j in range(100):
            x.append(i)
            y.append(j)

    for x in range(100):
        for y in range (100):
            z.append(interpolation(x, y, lst))
    # print(z)
    with open('demresult.txt','w',encoding='utf-8') as file:
        key = 0 #判断是否需要换行写入
        i = 0 #z列表的下标
        for x in range(100):
            for y in range(100):
                s = str(x) + ' ' + str(y) + ' ' + str(z[i]) + ','# 格式:x y z,
                file.write(s)
                i += 1
                key += 1
                if(key==100):
                    file.write('\n')
                    key = 0
    print('写入完成！')
    IDW_draw_3d(x,y,z)
