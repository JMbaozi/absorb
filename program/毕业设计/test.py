import cv2 as cv
import numpy as np

def get_image_info(image):
    print(type(image))
    print(image.shape)
    print(image.size)
    print(image.dtype)
    pixel_data = np.array(image)
    print(pixel_data)

def video_demo():
    capture = cv.VideoCapture(0)
    while(True):
        ret,frame = capture.read()
        frame = cv.flip(frame,1)
        cv.imshow("video",frame)
        c = cv.waitKey(50)
        if c == 33:
            break

src = cv.imread('img1.png')
# cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image",src)
get_image_info(src)
cv.waitKey(0)
# video_demo()
cv.destroyAllWindows()
print("YES")
