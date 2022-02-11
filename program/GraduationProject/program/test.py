import cv2
import numpy as np

def get_svm_detector(svm):
    sv = svm.getSupportVectors()    #SVM支持向量
    rho, _, _ = svm.getDecisionFunction(0)#SVM的决策函数
    sv = np.transpose(sv)
    return np.append(sv, [[-rho]], 0)  #得到支持向量和决策函数系数的一个数组
#SVM的分类平面计算

PosNum=3548
NegNum=10000
winSize=(64,128)
blockSize=(16,16)
blockStride=(8,8)
cellSize=(8,8)
nBin=9
#初始的值设定

hog=cv2.HOGDescriptor(winSize,blockSize,blockStride,cellSize,nBin)
#HOG对象的创建初始化

svm=cv2.ml.SVM_create()
#SVM对象的创建

featureNum = int(((128 - 16) / 8 + 1) * ((64 - 16) / 8 + 1) * 4 * 9)
#计算HOG的维度总数即特征数

featureArray = np.zeros(((PosNum + NegNum), featureNum), np.float32)
labelArray = np.zeros(((PosNum + NegNum), 1), np.int32)
#构建两个数组分别是放特征的和放标签的

for i in range(0,PosNum):
    n=str(i+1)
    fileName="img/picture4"+n.zfill(6)+".jpg"
    img=cv2.imread(fileName)
    hist=hog.compute(img,(8,8))
    for j in range(0,featureNum):
        featureArray[i,j]=hist[j]
    labelArray[i,0]=1
#正样本的HOG特征的计算并存进featureArray数组中

for i in range(0,NegNum):
    n=str(i+1)
    filename="img/picture3"+n.zfill(6)+".jpg"
    img=cv2.imread(filename)
    hist=hog.compute(img,(8,8))
    for j in range(0,featureNum):
        featureArray[i+PosNum,j]=hist[j]
    labelArray[i+PosNum,0]=-1
#负样本的HOG特征计算

#SVM的参数初始化，这里用SVM线性分类器来做速度比较快
svm.setCoef0(0)
svm.setCoef0(0.0)
svm.setDegree(3)
criteria = (cv2.TERM_CRITERIA_MAX_ITER + cv2.TERM_CRITERIA_EPS, 1000, 1e-3)
svm.setTermCriteria(criteria)
svm.setGamma(0)
svm.setNu(0.5)
svm.setP(0.1)
svm.setC(0.01)
svm.setType(cv2.ml.SVM_EPS_SVR)
svm.setKernel(cv2.ml.SVM_LINEAR)
svm.setC(0.01)
#SVM对象参数的设置，核算子的设定等

svm.train(featureArray, cv2.ml.ROW_SAMPLE, labelArray)
#把计算得到的HOG数据放到SVM对象分类器里面进行训练


HOG=cv2.HOGDescriptor()
HOG.setSVMDetector(get_svm_detector(svm))
HOG.save('myHogDector.bin')
#HOG和SVM结合的一个分类器并且把文件存下来save


myHog = cv2.HOGDescriptor()
myHog.load('myHogDector.bin')
#开始加载上述的那个分类器
imageSrc = cv2.imread('img/picture1.jpg')
#输入检测的图像
rects,wei=myHog.detectMultiScale(imageSrc,0,(4, 4),(32, 32), 1.05, 2)
for (x, y, w, h) in rects:
    cv2.rectangle(imageSrc, (x, y), (x + w, y + h), (0, 0, 255), 2)
#对检测出来的分类为1的矩形进行遍历框出来
cv2.imshow('dst', imageSrc)
cv2.waitKey(0)
