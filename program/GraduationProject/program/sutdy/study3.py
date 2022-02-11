import cv2 as cv
import numpy as np

# 像素运算

def add_demo(m1,m2):
    # 相加
    dst = cv.add(m1,m2)
    cv.imshow("add demo",dst)

def subtract_demo(m1,m2):
    # 相减
    dst = cv.subtract(m1,m2)
    cv.imshow("subtract demo",dst)

def divide_demo(m1,m2):
    # 相除
    dst = cv.divide(m1,m2)
    cv.imshow("divide demo",dst)

def multiply_demo(m1,m2):
    dst = cv.multiply(m1,m2)
    cv.imshow("multiply demo",dst)

def others(m1,m2):
    # 平均值
    M1 = cv.mean(m1)
    M2 = cv.mean(m2)
    print(M1)
    print(M2)

print("-----------------------------")
src1 = cv.imread('img/picture1.jpg')#bule,green,red
src2 = cv.imread('img/picture5.png')
print(src1.shape)
print(src2.shape)
# cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image1",src1)
cv.imshow("input image2",src2)

add_demo(src1,src2)
subtract_demo(src1,src2)
divide_demo(src1,src2)
multiply_demo(src1,src2)
others(src1,src2)


cv.waitKey(0)

cv.destroyAllWindows()