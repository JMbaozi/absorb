# 实例：
# 首先，还是需要取坐标
import mpl_toolkits.mplot3d
import matplotlib.pyplot as plt
import numpy as np

# 假设，m是给定的三维散点序列
# m = np.array([[1, 3, 3],
#               [4, 1, 6],
#               [1, 4, 3],
#               [1, 6, 3]])
# x = [x[0] for x in m]
# y = [x[1] for x in m]
# z = [x[2] for x in m]
# print(x)
# print(y)
# print(z)


def IDW_draw_3d(x, y, z):
    ax = plt.subplot(projection='3d')  # 创建一个三维的绘图工程
    ax.set_title('3d_image_show')  # 设置本图名称
    ax.scatter(x, y, z, c='r')   # 绘制数据点 c: 'r'红色，'y'黄色，等颜色

    ax.set_xlabel('X')  # 设置x坐标轴
    ax.set_ylabel('Y')  # 设置y坐标轴
    ax.set_zlabel('Z')  # 设置z坐标轴

    plt.show()
