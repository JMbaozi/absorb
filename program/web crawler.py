
"""
爬虫学习
https://blog.csdn.net/namespace_Pt/article/details/104124954
Part 1：
爬取静态网页图片（https://www.mzitu.com/221136）
"""

import requests
import lxml
from bs4 import BeautifulSoup	#引入库
	
dirname = 'picture'

url = 'https://www.mzitu.com/221136'
#header = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:66.0) 			Gecko/20100101 Firefox/66.0",
#"Referer":"https://www.mzitu.com/jiepai/comment-page-1/"}
header = {
          "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.78 Safari/537.36 Edg/80.0.361.45",
          "Referer":"https://www.mzitu.com/jiepai/comment-page-1/"
          }#header设置：https://blog.csdn.net/qq_42787271/article/details/81571229
           #Referer介绍：https://blog.csdn.net/shenqueying/article/details/79426884
#header里必须设置Referer属性，否则无法下载图片
response = requests.get(url,headers = header)	#请求网页
content = response.content
bsobj = BeautifulSoup(content,'lxml')     #解析html

#get_text()方法获取中文字样，用string属性也可以
title = bsobj.find('h2',class_ = 'main-title').get_text()
#按照分析出存储页数上界的位置寻找，存储其string属性即得最大页数
picture_max = bsobj.find('div',class_ = 'pagenavi').find_all('a')[-2].string
	
#按照分析出的网址变化形式逐页访问
for i in range(1,int(picture_max)):
	href = url + '/' + str(i)	#访问每一页
	response = requests.get(href,headers = header)	#请求数据
	content = response.content	#得到二进制对象
	soup = BeautifulSoup(content,'lxml')	#初始化
		
	#找img标签，访问src属性，找图片url
	picture_url = soup.find('img',alt = title).attrs['src']
	#访问图片url
	response_img = requests.get(picture_url,headers = header)
	#获取二进制图片文件
	content_img = response_img.content
	#命名文件，注意加.jpg
	file_name = dirname + '/'+ title + '-' + str(i) + '.jpg'
	#写入，注意以二进制写入方式打开
	with open(file_name,'wb') as f:
   	 	f.write(content_img)

