import cv2
import os
#  三帧差分法
# 三帧差法基本实现步骤：
# 1. 前两帧图像做灰度差
# 2. 当前帧图像与前一帧图像做灰度差
# 3. 1和2的结果图像按位做“与”操作
# 视频文件输入初始化
filename = "video/PETS2009.avi"
camera = cv2.VideoCapture(filename)
video_name=filename.split("/")[-1].split(".")[0]
# 视频文件输出参数设置
out_fps = 60.0  # 输出文件的帧率
# fourcc = cv2.VideoWriter_fourcc('M', 'P', '4', '2')
fourcc = cv2.VideoWriter_fourcc('I','4','2','0')  # avi
out1 = cv2.VideoWriter(os.path.join('video/', "{}_1.avi".format(video_name)), fourcc, out_fps, (500, 500))
out2 = cv2.VideoWriter(os.path.join('video/', "{}_2.avi".format(video_name)), fourcc, out_fps, (500, 500))

# 初始化当前帧的前两帧
lastFrame1 = None
lastFrame2 = None

# 遍历视频的每一帧
# while camera.isOpened():
while(True):
    # 读取下一帧
    (ret, frame) = camera.read()

    # 如果不能抓取到一帧，说明我们到了视频的结尾
    if not ret:
        break

    # 调整该帧的大小
    frame = cv2.resize(frame, (500, 500), interpolation=cv2.INTER_CUBIC)# 基于4x4像素邻域的3次插值法 https://www.cnblogs.com/jyxbk/p/7651241.html

    # 如果第一二帧是None，对其进行初始化,计算第一二帧的不同
    if lastFrame2 is None:
        if lastFrame1 is None:
            lastFrame1 = frame
        else:
            lastFrame2 = frame
            global frameDelta1  # 全局变量
            frameDelta1 = cv2.absdiff(lastFrame1, lastFrame2)  # 帧差一
        continue

    # 计算当前帧和前帧的不同,计算三帧差分
    frameDelta2 = cv2.absdiff(lastFrame2, frame)  # 帧差二
    thresh = cv2.bitwise_and(frameDelta1, frameDelta2)  # 图像与运算
    thresh2 = thresh.copy()

    # 当前帧设为下一帧的前帧,前帧设为下一帧的前前帧,帧差二设为帧差一
    lastFrame1 = lastFrame2
    lastFrame2 = frame.copy()
    frameDelta1 = frameDelta2

    # 结果转为灰度图
    thresh = cv2.cvtColor(thresh, cv2.COLOR_BGR2GRAY)

    # 图像二值化
    thresh = cv2.threshold(thresh, 25, 255, cv2.THRESH_BINARY)[1]

    # 去除图像噪声,先腐蚀再膨胀(形态学开运算)
    thresh = cv2.dilate(thresh, None, iterations=3)
    thresh = cv2.erode(thresh, None, iterations=1)

    # # 阀值图像上的轮廓位置
    cnts, hierarchy = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 遍历轮廓
    for c in cnts:
        # 忽略小轮廓，排除误差
        if cv2.contourArea(c) < 100:
            continue

        # 计算轮廓的边界框，在当前帧中画出该框
        (x, y, w, h) = cv2.boundingRect(c)
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

    # 显示当前帧
    cv2.imshow("frame", frame)
    cv2.imshow("thresh", thresh)
    cv2.imshow("threst2", thresh2)

    # 保存视频
    out1.write(frame)
    out2.write(thresh2)

    # 如果q键被按下，跳出循环
    if cv2.waitKey(200) & 0xFF == ord('q'):
        break

# 清理资源并关闭打开的窗口
out1.release()
out2.release()
camera.release()
cv2.destroyAllWindows()