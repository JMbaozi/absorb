https://github.com/Betterming/opencv_exercises
https://www.bilibili.com/video/av24998616

import cv2 as cv
import numpy as np

# 模糊操作

print("-----------------------------")
src = cv.imread('img/img1.jpg')#bule,green,red
cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image",src)
print(src.shape)


cv.waitKey(0)

cv.destroyAllWindows()