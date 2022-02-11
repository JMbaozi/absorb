import cv2 as cv
import numpy as np

# 色彩空间


def extrace_object_demo():
    capture = cv.VideoCapture("video/test.avi")
    while(True):
        ret,frame = capture.read()
        if ret == False:
            break
        hsv = cv.cvtColor(frame,cv.COLOR_BGR2HSV)
        # check blue
        lower_hsv = np.array([100,43,46])
        upper_hsv = np.array([124,255,255])
        mask = cv.inRange(hsv,lowerb=lower_hsv,upperb=upper_hsv)
        cv.imshow("video",frame)
        cv.imshow("mask",mask)
        c = cv.waitKey(40)
        if c == 27:
            break

def color_space_demo(image):
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    cv.imshow("gray",gray)
    hsv = cv.cvtColor(image,cv.COLOR_BGR2HSV)
    cv.imshow("hsv",hsv)
    yuv = cv.cvtColor(image,cv.COLOR_BGR2YUV)
    cv.imshow("yuv",yuv)
    Ycrcb = cv.cvtColor(image,cv.COLOR_BGR2YCrCb)
    cv.imshow("Ycrcb",Ycrcb)

print("-----------------------------")
src = cv.imread('img/picture4.jpg')#bule,green,red
# cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
# cv.imshow("input image",src)
# color_space_demo(src)
# extrace_object_demo()

# 分离通道
b,g,r = cv.split(src)
cv.imshow("blue",b)
cv.imshow("green",g)
cv.imshow("red",r)

src[:,:,2] = 0
cv.imshow("changed image",src)

# 合并通道
src = cv.merge([b,g,r])#必须给定数组
cv.imshow("changed img",src)

cv.waitKey(0)

cv.destroyAllWindows()