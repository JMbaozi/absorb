#教程地址：https://github.com/JMbaozi/Python-100-Days/blob/master/Day01-15/15.图像和办公文档处理.md
#Pillow官方文档：https://pillow-cn.readthedocs.io/zh_CN/latest/index.html

from PIL import Image
import os,sys

image = Image.open('img/PillowCrop/成果.jpg')

# format 这个属性标识了图像来源。如果图像不是从文件读取它的值就是None。
# size属性是一个二元tuple，包含width和height（宽度和高度，单位都是px）。 
# mode 属性定义了图像bands的数量和名称，以及像素类型和深度。
# 常见的modes 有 “L” (luminance) 表示灰度图像, “RGB” 表示真彩色图像, and “CMYK” 表示出版图像。
# image.format,image.size,image.mode

#裁剪图像
# Image.crop(left, up, right, below)left：与左边界的距离 up：与上边界的距离 right：还是与左边界的距离 below：还是与上边界的距离
# [(left,up),(right,below)]分别为左上角和右下角的坐标
# 矩形选区有一个4元元组定义，分别表示左、上、右、下的坐标。这个库以左上角为坐标原点，单位是px，
# 所以以下代码复制了一个 900x900 pixels 的矩形选区。这个选区现在可以被处理并且粘贴到原图。
# rect = (100,100,1000,1000)
# image.crop(rect).show()

#裁剪九宫格
"""
imgSize = image.size    #size(weight,height)=(2922,3992)
imgWeight = int(imgSize[0] // 3)
imgHeight = int(imgSize[1] // 3)

for i in range(3):
    for j in range(3):
        box = (imgWeight*j,imgHeight*i,imgWeight*(j+1),imgHeight*(i+1))
        result = image.crop(box)
        result.save("img/PillowCrop/{}{}.jpg".format(i,j))
"""

#修改图片格式
"""
#f,e = os.path.splitext(image) #error
f,e = os.path.splitext('img/PillowCrop/成果.jpg')
outimg = f + '.png'
if image != outimg:
    try:
        image.save(outimg)
    except IOError:
        print("Don't convert",image)
"""

#创建图片缩略图
"""
size = (333,333)

outimg = os.path.splitext('img/PillowCrop/成果.jpg')[0]+"_thumbnail.jpg"
image.thumbnail(size)
image.save(outimg,"JPEG")
"""

#复制粘贴到图片
"""
imgSize = image.size
imgWeight = int(imgSize[0] // 3)
imgHeight = int(imgSize[1] // 3)
crop_size = (imgWeight*1,imgHeight*1,imgWeight*3,imgHeight*2)
img_crop = image.crop(crop_size)
#img_crop.show()
img_paste = Image.new('RGB',imgSize)
#img_paste.show()
img_paste.paste(img_crop,(imgWeight*1,imgHeight*1))
#img_paste.show()
img_paste.save('img/PillowCrop/复制粘贴.jpg')
"""


# image.show()
# print(image.format)
# print(type(image.format))