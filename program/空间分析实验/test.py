# import time
# from functools import reduce


# # x = [1.3,2,3,4,5,6,7,8,9,10.7]
# # print(min(x))
# # print(int(max(x)))
# # for i in range(10,20):
# #     print(i)

# sum1 = 0
# t1 = time.time()
# # for i in range(10000000):
# #     sum1 += i * i
# sum1 = reduce(lambda x,y:x + y , map(lambda x:x*x ,range(10000000)))
# t2 = time.time()
# T1 = t2 - t1


# print("%d用时：%f" % (sum1,T1))

# import random

# re = ""

# for i in range(1,101):
#     re += str(random.uniform(100,160))
#     re += '\t'
#     re += str(random.uniform(100,160))
#     re += '\t'
#     re += str(random.uniform(1120,1150))
#     re += '\n'

# with open('data/test.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# a = [1,2,3,4]
# print(a[-1])


# import random

# re = ""

# for i in range(0,100):
#     re += str(random.randint(10,900))
#     re += ','
#     re += str(random.randint(10,700))
#     re += '\n'
# with open('data/kmenasPoints.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# import random

# re = ""

# for i in range(0,10):
#     re += str(random.randint(100,800))
#     re += ','
#     re += str(random.randint(100,600))
#     re += '\n'
# with open('data/Pointsbuffer.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# import random

# re = ""

# for i in range(0,10):
#     re += str(random.randint(100,800))
#     re += ','
#     re += str(random.randint(100,600))
#     re += ','
#     re += str(random.randint(100,800))
#     re += ','
#     re += str(random.randint(100,600))
#     re += '\n'
# with open('data/Linesbuffer.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")



# import random

# re = ""

# for i in range(0,3):
#     t = random.randint(3,6)#多边形边数
#     for j in range(t):
#         re += str(random.randint(100,800))
#         re += ','
#         re += str(random.randint(100,800))
#         if(j != t-1):
#             re += ','
#     re += '\n'
# with open('data/Shapesbuffer.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# a = [[0,1,2],[3,4,5],[7,8,9]]

# print(a[1][1])
# print(a[0][2])
# print(a[0][0])




from shapely.geometry import Point
from shapely.geometry import LineString
from shapely.geometry import MultiPolygon
import matplotlib.pyplot as plt
# 定义线段
line = LineString([(0.1, 0.1), (2, 3),(3,3),(4,5)])
# 生成缓冲区
buffer = line.buffer(0.5)
x1,y1=line.xy
 
x2,y2=buffer.boundary.xy
 
plt.figure()
 
plt.plot(x1,y1)
 
plt.plot(x2,y2)
 
plt.show()