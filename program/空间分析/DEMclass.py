from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cbook
from matplotlib import cm
from matplotlib.colors import LightSource
import matplotlib.pyplot as plt
import numpy as np
import re
import math
#####读取文件并处理成numpy并返回
def readfile(row,col,z):
    key = 0
    npdata = np.zeros((row, col),dtype=np.int)
    for i in range(row):
        for j in range(col):
            npdata[i][j] = int(z[key])
            key += 1
    return npdata

#####在原栅格图像周围加一圈并返回
def AddRound(npgrid):
    ny, nx = npgrid.shape  # ny:行数，nx:列数
    zbc=np.zeros((ny+2,nx+2))
    zbc[1:-1,1:-1]=npgrid
    #四边
    zbc[0,1:-1]=npgrid[0,:]
    zbc[-1,1:-1]=npgrid[-1,:]
    zbc[1:-1,0]=npgrid[:,0]
    zbc[1:-1,-1]=npgrid[:,-1]
    #角点
    zbc[0,0]=npgrid[0,0]
    zbc[0,-1]=npgrid[0,-1]
    zbc[-1,0]=npgrid[-1,0]
    zbc[-1,-1]=npgrid[-1,0]
    return zbc
#####计算xy方向的梯度
def Cacdxdy(npgrid,sizex,sizey):
    zbc=AddRound(npgrid)
    dx=((zbc[1:-1,:-2])-(zbc[1:-1,2:]))/sizex/2/1000
    dy=((zbc[2:,1:-1])-(zbc[:-2,1:-1]))/sizey/2/1000
    dx=dx[1:-1,1:-1]
    dy=dy[1:-1,1:-1]
    np.savetxt("dxdy.csv",dx,delimiter=",")
    return dx,dy
####计算坡度\坡向
def CacSlopAsp(dx,dy):
    slope=(np.arctan(np.sqrt(dx*dx+dy*dy)))*57.29578  #转换成°
    slope=slope[1:-1,1:-1]
    #坡向
    a=np.zeros([dx.shape[0],dx.shape[1]]).astype(np.float32)
    for i in range(dx.shape[0]):
        for j in range(dx.shape[1]):
            x=float(dx[i,j])
            y=float(dy[i,j])
            if (x==0.)& (y==0.):
                a[i,j]=-1
            elif x==0.:
                if y>0.:
                    a[i,j]=0.
                else:
                    a[i,j]=180.
            elif y==0.:
                if x>0:
                    a[i,j]=90.
                else:
                    a[i,j]=270.
            else:
                a[i,j]=float(math.atan(y/x))*57.29578
                if a[i,j]<0.:
                    a[i,j]=90.-a[i,j]
                elif a[i,j]>90.:
                    a[i,j]=450.-a[i,j]
                else:
                    a[i,j]=90.-a[i,j]
    return slope,a
####绘制平面栅格图
def Drawgrid(judge,pre=[],A=[],strs=""):
    if judge==0:
        if strs == "":
            plt.imshow(A, interpolation='nearest', cmap=plt.cm.hot, origin='lower')  # cmap='bone'  cmap=plt.cm.hot
            plt.colorbar(shrink=0.8)
            plt.xticks(())
            plt.yticks(())
            plt.show()
        else:
            plt.imshow(A, interpolation='nearest', cmap=strs, origin='lower')  # cmap='bone'  cmap=plt.cm.hot
            plt.colorbar(shrink=0.8)
            xt=range(258000, 268822,22)
            yt=range(324000, 331222,22)
            plt.xticks(())
            plt.yticks(())
            plt.show()

