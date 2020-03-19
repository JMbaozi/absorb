"""
Author:JMbaozi
Total:2886
Take:48min 08sec
"""

import requests
import re
import lxml
import random
from bs4 import BeautifulSoup

user_agent_list = ["Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
                    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36",
                    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36",
                    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36",
                    "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)",
                    "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.2.15) Gecko/20110303 Firefox/3.6.15",
]
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.62 Safari/537.36 Edg/81.0.416.31',
    'Referer': 'https://www.sw4.net/baisi'
}
url = 'https://www.sw4.net/heisi'

post_href = []#博客链接
img_url = []#图片url
img_content = []#图片二进制信息
dirname = 'heisiPicture'

#获取链接
def get_href():
    for i in range(1,6):#共5页
        if i==1:
            link = url
        else:
            link = url + '/page/' + str(i)    
        r = requests.get(link,headers=headers)
        soup = BeautifulSoup(r.text,'lxml')
        href_list = soup.find_all('h2',class_='entry-title')
        for each in href_list:
            href = each.find('a')['href']
            post_href.append(href)

#获取照片url
def get_imgURL():
    for href in post_href:
        r = requests.get(href,headers=headers)
        test = r.text
        reg = r'src="(.+?\.jpg)" alt'
        imgre = re.compile(reg)
        imgURL = re.findall(imgre,test)#返回的是列表格式
        img_url.append(imgURL)#元素为列表

#获取照片二进制信息并保存
def get_img():
    number = 1
    for url_list in img_url:
        for url in url_list:
            headers['User-Agent'] = random.choice(user_agent_list)
            r = requests.get(url,headers=headers,verify=False)
            content = r.content
            file_name = dirname + '/' + str(number) + '.jpg'
            with open(file_name,'wb') as file:
                file.write(content)
            print('保存第%d张'% (number))
            number+=1 

if __name__ == '__main__':
    get_href()
    get_imgURL()
    get_img()
    print('保存完成！')