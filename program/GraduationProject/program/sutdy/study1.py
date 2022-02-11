import cv2 as cv
import numpy as np

# 读取

def access_pixels(image):
    print(image.shape)
    height = image.shape[0]
    width = image.shape[1]
    channels = image.shape[2]
    print("height: %s, width: %s, channels: %s" % (height,width,channels))
    for row in range(height):
        for col in range(width):
            for c in range(channels):
                pv = image[row,col,c]
                image[row,col,c] = 255 - pv
    cv.imshow("pixels_demo",image)

def create_image():
    """
    img = np.zeros([400,400,3],np.uint8)
    img[:,:,1] = np.ones([400,400])*255
    cv.imshow("new image",img)

    img = np.zeros([400,400,1],np.uint8)
    img[:,:,0] = np.ones([400,400])*127
    cv.imshow("new image",img)
    cv.imwrite("img/creat_image.jpg",img)
    """

    m1 = np.ones([3,3],np.float32)
    m1.fill(122.388)
    print(m1)
    m2 = m1.reshape([1,9])
    print(m2)

def inverse(image):
    dst = cv.bitwise_not(image)
    cv.imshow("inverse demo",dst)


print("-----------------------------")
src = cv.imread('img/picture4.jpg')#bule,green,red
cv.namedWindow("input image",cv.WINDOW_AUTOSIZE)
cv.imshow("input image",src)
t1 = cv.getTickCount()
create_image()
inverse(src)
# access_pixels(src)
t2 = cv.getTickCount()
time = (t2-t1)/cv.getTickFrequency();
print("time: %s ms" % str(time*1000))
cv.waitKey(0)

cv.destroyAllWindows()