"""
Author:JMbaozi
爬取jmbaozi.top博客信息
时间：2020.3.10  12:46
"""

import requests
from bs4 import BeautifulSoup
import lxml

url = 'https://jmbaozi.top/'
headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.43 Safari/537.36 Edg/81.0.416.28'
}
blog_tilte = []#标题
blog_subtitle = []#副标题
blog_tag = []#标签
blog_time = []#时间
page_number = 4#博客页数

#获取信息
def get_data():
    for i in range(1,page_number+1):
        if i==1:
            link = url
        else:
            link = url + 'page' + str(i)
        r = requests.get(link,headers = headers)
        soup = BeautifulSoup(r.text,'lxml')
        title_list = soup.find_all('section',class_='post-preview')#标题&副标题
        for each in title_list:
            title = each.h2.text.strip()
            subtitle = each.h3.text.strip()
            blog_tilte.append(title)
            blog_subtitle.append(subtitle)
        tag_list = soup.find_all('div',class_='post-tags')#标签
        for each in tag_list:
            tag = each.text.strip()
            tag =tag.replace('\n','  ')#将回车替换为空格
            blog_tag.append(tag)
        time_list = soup.find_all('time',class_='post-date')#时间
        for each in time_list:
            time = each.text.strip()
            blog_time.append(time)

#写入信息
def write_data():
    with open('blogArchive.txt','w',encoding = 'utf-8') as file:
        for i in range(len(blog_tilte)):
            file.write(blog_time[i]+': '+blog_tilte[i]+'---'+blog_subtitle[i]+'     Tags: '+blog_tag[i])
            file.write('\n\n')

if __name__ == '__main__':
    get_data()
    write_data()
    print('写入完成！')


