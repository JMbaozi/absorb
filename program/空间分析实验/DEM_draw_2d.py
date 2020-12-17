# import matplotlib.pyplot as plt
# from mpl_toolkits.mplot3d import Axes3D
# import numpy as np


# # https://www.bilibili.com/read/cv5956129/
# color_grade = ['lightblue','cyan','c','darkcyan','darkslategrey']

# def IDW_draw_2d_height(x,y,g):
#     plt.scatter(x,y,color=g)



# 暂时停用
# 二维高程分布图
# def IDWdraw2dheight():
#     getDemData()
#     z_grade = []
#     X_min = int(min(x_konw))
#     X_max = int(max(x_konw)) + 1
#     Y_min = int(min(y_konw))
#     Y_max = int(max(y_konw)) + 1
#     for i in range(X_min, X_max):
#         X_insert.append(i)
#     print('插值点X坐标输入完成！')
#     for j in range(Y_min, Y_max):
#         Y_insert.append(j)
#     print('插入点Y坐标输入完成！')
#     all_num = (X_max - X_min) * (Y_max - Y_min)
#     key = 1
#     for i in range(X_min, X_max):
#         for j in range(Y_min, Y_max):
#             Z_insert.append(interpolation(i, j, lst_surface[0:need_num]))
#             print("共%d,正计算第%d个" % (all_num, key))
#             key += 1
#     print('插入点Z值计算完成！')
#     allNum = int(max(Z_insert) - min(Z_insert))
#     key = 0
#     for i in range(X_min, X_max):
#         for j in range(Y_min, Y_max):
#             judgeNum = int(Z_insert[key] - min(Z_insert))
#             key += 1
#             g = int(judgeNum/allNum)
#             if(g<0.2):
#                 z_grade.append(1)
#             elif(g<0.4):
#                 z_grade.append(2)
#             elif(g<0.6):
#                 z_grade.append(3)
#             elif(g<0.8):
#                 z_grade.append(4)
#             else:
#                 z_grade.append(5)
#             print("共%d,正计算第%d个" % (all_num, key+1))
#     IDW_draw_2d_height(X_insert, Y_insert,z_grade)
