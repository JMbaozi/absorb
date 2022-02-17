import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt

# 图像直方图
# 均衡化

def equalHist_demo(image):
    # 全局均衡化
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    dst = cv.equalizeHist(gray)
    cv.imshow("equalHist_demo",dst)

def clahe_demo(image):
    # 自适应均衡化
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    clahe = cv.createCLAHE(clipLimit=2.0,tileGridSize=(8,8))
    dst = clahe.apply(gray)
    cv.imshow("clahe_demo",dst)


def create_rgb_hist(image):
    h,w,c = image.shape
    rgbHist = np.zeros([16*16*16,1],np.float32)
    bsize = 256/16
    for row in range(h):
        for col in range(w):
            b = image[row,col,0]
            g = image[row,col,1]
            r = image[row,col,2]
            index = np.int(b/bsize)*16*16 + np.int(g/bsize)*16 + np.int(r/bsize)
            rgbHist[np.int(index),0] += 1
    return rgbHist

def hist_compare(image1,image2):
    # 直方图比较
    hist1 = create_rgb_hist(image1)
    hist2 = create_rgb_hist(image2)
    match1 = cv.compareHist(hist1,hist2,cv.HISTCMP_BHATTACHARYYA)
    match2 = cv.compareHist(hist1,hist2,cv.HISTCMP_CORREL)
    match3 = cv.compareHist(hist1,hist2,cv.HISTCMP_CHISQR)
    print("巴氏距离: %s相关性: %s卡方: %s" % (match1,match2,match3))

    
def plot_demo(image):
    plt.hist(image.ravel(),256,[0,256])
    plt.show()

def image_hist(image):
    color = ('blue','green','red')
    for i ,color in enumerate(color):
        hist = cv.calcHist(image,[i],None,[256],[0,256])
        plt.plot(hist,color=color)
        plt.xlim([0,256])
    plt.show()

print("-----------------------------")
# src = cv.imread('img/img1.jpg')#bule,green,red
# cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
# cv.imshow("input image",src)
# print(src.shape)
# plot_demo(src)
# image_hist(src)
# equalHist_demo(src)
# clahe_demo(src)

img1 = cv.imread("img/img1.jpg")
img2 = cv.imread("img/img2.png")
cv.imshow("image1",img1)
cv.imshow("image2",img2)
hist_compare(img1,img2)

cv.waitKey(0)

cv.destroyAllWindows()