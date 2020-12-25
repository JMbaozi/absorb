
import numpy as np  
import matplotlib.pyplot as plt 
from mpl_toolkits.mplot3d import Axes3D

def Cloud_compute(xl):
    '''计算云滴的数字特征'''
    xl = np.array(xl)
    # S2 = np.var(xl)   #用的方差
    S2 = np.std(xl)   #用的标准差
    Ex = np.mean(xl)
    En = np.sqrt(np.pi/2)  * np.mean( np.abs(xl-Ex) )
    He = np.sqrt( np.abs(S2*S2 - En*En) )
    return (Ex, En, He)

def plot_cloud_model(Ex, En, He, n, title='', grid=False, moni=False):  
    Y = np.zeros((1, n))
    X = np.random.normal(loc=En, scale=He, size=n)  
    Y = Y[0]  
    plt.rcParams['font.sans-serif'] = ['SimHei']  
    #  用来正常显示中文标签  
    plt.rcParams['axes.unicode_minus'] = False  
    # 用来正常显示负号  
    fig = plt.figure(0)  
    ax = fig.add_subplot(111)  

    for i in range(n):  
        Enn = X[i]  
        X[i] = np.random.normal(loc=Ex, scale=np.abs(Enn), size=1)  
        Y[i] = np.exp(-(X[i]-Ex)*(X[i]-Ex)/(2*Enn*Enn))  
        ax.scatter(X[i], Y[i], s=10, alpha=0.5, c='r', marker='o')  
    if title == '':  
        title = '期望:%.2f,熵:%.2f,超熵:%.2f,云滴数:%d' % (Ex, En, He, n)  
    ax.set_title(title)  
    ax.set_xlabel('指标值')  
    ax.set_ylabel('确定度')  
    ax.grid(True)  
    if moni:
        print (Cloud_compute(X))
    plt.show()  


def plot_2d_cloud_model(Ex, En, He, n, title='', grid=False):  

    Y = np.zeros((1, n))  
    X0 = np.random.normal(loc=En[0], scale=He[0], size=n)  
    Y = Y[0]  
    X1 = np.random.normal(loc=En[1], scale=He[1], size=n)  
    plt.rcParams['font.sans-serif'] = ['SimHei']  
    # 用来正常显示中文标签  
    plt.rcParams['axes.unicode_minus'] = False  
    # 用来正常显示负号  
    fig = plt.figure(0)  
    ax = fig.add_subplot(111, projection='3d')  
    for i in range(n):  
        Enn0 = X0[i]  
        X0[i] = np.random.normal(loc=Ex[0], scale=np.abs(Enn0), size=1)  
        # Y0[i] = np.exp(-(X0[i]-Ex[0])*(X0[i]-Ex[0])/(2*Enn*Enn))  
        Enn1 = X1[i]  
        X1[i] = np.random.normal(loc=Ex[1], scale=np.abs(Enn1), size=1)  
        Y[i] = np.exp(-(X0[i] - Ex[0]) * (X0[i] - Ex[0]) / (2 * Enn0 * Enn0)-(X1[i] - Ex[1]) * (X1[i] - Ex[1]) / (2 * Enn1 * Enn1))  
        ax.scatter(X0[i], X1[i], Y[i], s=10, alpha=0.5, c='r', marker='o')  
    if title == '':  
        title = '期望:[%.2f,%.2f],熵:[%.2f,%.2f],超熵:[%.2f,%.2f],云滴数:%d' % (Ex[0], Ex[1], En[0], En[1], He[0], He[1], n)  
    ax.set_title(title)  
    ax.set_xlabel('指标值1')  
    ax.set_ylabel('指标值2')  
    ax.set_zlabel('确定度')  
    ax.grid(True)  
    plt.show()



    #二维云图
    # plot_cloud_model(0, 1, 0.1, 500, moni=True)  
    # print Cloud_compute(x)

    # #三维云图
    # plot_2d_cloud_model([0, 1], [0.3, 0.3], [0.01, 0.05], 2000)