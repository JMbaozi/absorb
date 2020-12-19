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

import random

re = ""

for i in range(1,101):
    re += str(random.uniform(100,160))
    re += '\t'
    re += str(random.uniform(100,160))
    re += '\t'
    re += str(random.uniform(1120,1150))
    re += '\n'

with open('data/test.txt','w',encoding='utf-8') as file:
    file.write(re)
    print("写入完毕")
