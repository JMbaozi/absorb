import cv2
import copy
import matplotlib.pyplot as plt
import numpy as np

capture = cv2.VideoCapture('test.avi')
background_subtractor = cv2.bgsegm.createBackgroundSubtractorMOG()
length = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))

fourcc = cv2.VideoWriter_fourcc(*'XVID')
width = 1920
height = 1080
video = cv2.VideoWriter('output.avi', fourcc, 30.0, (width, height))

for i in range(0, length-1):

    ret, frame = capture.read()

    if i == 0:

        first_frame = copy.deepcopy(frame)
        height, width = frame.shape[:2]
        accum_image = np.zeros((height, width), np.uint8)
    
    fgmask = background_subtractor.apply(frame)

    threshold = 2
    maxValue = 2
    ret, th1 = cv2.threshold(fgmask, threshold, maxValue, cv2.THRESH_BINARY)
    
    accum_image = cv2.add(accum_image, th1)

    color_image_video = cv2.applyColorMap(accum_image, cv2.COLORMAP_HOT)

    video.write(cv2.add(frame, color_image_video))

cap = cv2.VideoCapture('output.avi')
while 1:
    ret, frame = cap.read()
    cv2.imshow("cap", frame)
    if cv2.waitKey(5) & 0xff == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()
