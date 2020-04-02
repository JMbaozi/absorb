"""
Author:JMbaozi
爬取jmbaozi.top博客文章内容
时间：2020.3.13  19:53
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
blog_time = []#时间
blog_article_href = []#文章链接
blog_article = []#文章内容
page_number = 5#博客页数
dirname = 'blogArticle'#文章存放文件夹

#获取信息
def get_data():
    for i in range(1,page_number+1):
        if i==1:
            link = url
        else:
            link = url + 'page' + str(i)
        r = requests.get(link,headers = headers)
        soup = BeautifulSoup(r.text,'lxml')
        title_list = soup.find_all('section',class_='post-preview')#标题&副标题&文章链接
        for each in title_list:
            title = each.h2.text.strip()
            subtitle = each.h3.text.strip()
            blog_tilte.append(title)
            blog_subtitle.append(subtitle)
            href = each.find('a')['href']#文章链接
            blog_article_href.append(href)
        time_list = soup.find_all('time',class_='post-date')#时间
        for each in time_list:
            time = each.text.strip()
            blog_time.append(time)

#获取文章
def get_article():
    for each in blog_article_href:
        link = url + str(each)
        r = requests.get(link,headers = headers)
        soup = BeautifulSoup(r.text,'lxml')
        result = soup.find_all('article',class_ = 'markdown-body')
        blog_article.append(result)

#写入文章
def write_article():
    for i in range(len(blog_article)):
        file_name = dirname + '/' + blog_time[i]+'-'+blog_tilte[i]+'---'+blog_subtitle[i]+ '.md'
        with open(file_name,'w',encoding = 'utf-8') as file:
            file.write(str(blog_article[i]))

if __name__ == '__main__':
    get_data()
    get_article()
    write_article()
    print('写入完成！')


