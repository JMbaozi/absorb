import cv2 as cv
import numpy as np

# ROI与泛洪填充

def fill_color_demo(image):
    copyImg = image.copy()
    height,width = image.shape[:2]
    mask = np.zeros([height+2, width+2], np.uint8)#必须+2
    cv.floodFill(copyImg,mask,(30,30),(0,255,255),(100,100,100),(50,50,50),cv.FLOODFILL_FIXED_RANGE)
    cv.imshow("fill_color_demo",copyImg)


def fill_binary_demo():
    image = np.zeros([400,400,3],np.uint8)
    image[100:300,100:300,:] = 255
    cv.imshow("fill_binary",image)
    mask = np.ones([402,402,1],np.uint8)# 单通道
    mask[101:301,101:301] = 0# 待填充区域赋值为0
    cv.floodFill(image,mask,(200,200),(0,0,255),cv.FLOODFILL_MASK_ONLY)
    cv.imshow("fill_binary_demo",image)

print("-----------------------------")
src = cv.imread('img/img1.jpg')#bule,green,red
cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image",src)
print(src.shape)
fill_color_demo(src)
fill_binary_demo()
# face = src[50:250, 100:300]# 高，宽
# gray = cv.cvtColor(face,cv.COLOR_BGR2GRAY)
# backface = cv.cvtColor(gray,cv.COLOR_GRAY2BGR)
# src[50:250,100:300] = backface
# cv.imshow("face",src)
cv.waitKey(0)

cv.destroyAllWindows()