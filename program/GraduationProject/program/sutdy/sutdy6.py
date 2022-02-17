import cv2 as cv
import numpy as np

# 边缘保留滤波EPF

def bi_demo(image):
    dst = cv.bilateralFilter(image,0,100,15)
    cv. imshow("bi_demo",dst)

def shift_demo(image):
    dst = cv.pyrMeanShiftFiltering(image,5,30)
    cv. imshow("shift_demo",dst)

print("-----------------------------")
src = cv.imread('img/img1.jpg')#bule,green,red
cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image",src)
print(src.shape)
bi_demo(src)
shift_demo(src)

cv.waitKey(0)

cv.destroyAllWindows()