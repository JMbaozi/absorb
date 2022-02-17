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

def clamp(pv):
    if pv > 255:
        return 255
    elif pv < 0:
        return 0
    else:
        return pv

def gaussian_noise(image):
    h,w,c = image.shape
    for row in range(h):
        for col in range(w):
            s = np.random.normal(0,20,3)
            b = image[row,col,0]# blue
            g = image[row,col,1]# green
            r = image[row,col,2]# red
            image[row,col,0] = clamp(b+s[0])
            image[row,col,1] = clamp(g+s[1])
            image[row,col,2] = clamp(r+s[2])
    cv.imshow("noise image",image)

print("-----------------------------")
src = cv.imread('img/img1.jpg')#bule,green,red
cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image",src)
print(src.shape)
t1 = cv.getTickCount()
# blur_demo(src)
# median_blur_demo(src)
# custom_blur_demo(src)
dst = cv.GaussianBlur(src,(3,3),15)
cv.imshow("GaussianBlur",dst)
gaussian_noise(src)
t2 = cv.getTickCount()
time = (t2-t1)/cv.getTickFrequency()
print("Total time:%s" % str(time*1000))
cv.waitKey(0)

cv.destroyAllWindows()