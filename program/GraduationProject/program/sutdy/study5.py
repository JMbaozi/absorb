import cv2 as cv
import numpy as np

# 模糊操作


def blur_demo(image):
    # 均值模糊
    dst = cv.blur(image,(5,5))
    cv.imshow("blur_demo",dst)    

def median_blur_demo(image):
    # 中值模糊
    # 经常用于去除椒盐噪声
    dst = cv.medianBlur(image,5)
    cv.imshow("median_blur_demo",dst)

def custom_blur_demo(image):
    # 自定义
    kernel1 = np.ones([5,5],np.float32)/25# 除以25，防止溢出。
    kernel2 = np.array([[0,-1,0],[-1,5,-1],[0,-1,0]],np.float32)# 锐化 总和=0：边缘梯度；总和=1：增强。
    dst = cv.filter2D(image,-1,kernel=kernel2)
    cv.imshow("custom_blur_demo",dst)


print("-----------------------------")
src = cv.imread('img/img1.jpg')#bule,green,red
cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image",src)
print(src.shape)
blur_demo(src)
median_blur_demo(src)
custom_blur_demo(src)
cv.waitKey(0)

cv.destroyAllWindows()