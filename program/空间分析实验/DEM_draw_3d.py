# 实例：
# 首先，还是需要取坐标
import mpl_toolkits.mplot3d
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt
from matplotlib import cm
from matplotlib.ticker import LinearLocator, FormatStrFormatter
import numpy as np


# 绘制三维散点图
def IDW_draw_3d_points(x, y, z):
    ax = plt.subplot(projection='3d')  # 创建一个三维的绘图工程
    ax.set_title('3d_points_show')  # 设置本图名称
    ax.scatter(x, y, z, c='r')   # 绘制数据点 c: 'r'红色，'y'黄色，等颜色

    ax.set_xlabel('X')  # 设置x坐标轴
    ax.set_ylabel('Y')  # 设置y坐标轴
    ax.set_zlabel('Z')  # 设置z坐标轴

    plt.show()

# 绘制三维表面
def IDW_draw_3d_surface(x, y, z):
    fig = plt.figure()
    ax = Axes3D(fig)
    # Plot the surface.
    x,y = np.meshgrid(x,y)
    print(x.shape)
    z = z.reshape(100,100)
    surf = ax.plot_surface(x, y, z,cmap='rainbow')
    # Add a color bar which maps values to colors.
    fig.colorbar(surf, shrink=0.5, aspect=5)
    plt.show()

# np.hypot