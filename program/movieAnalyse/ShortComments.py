"""
Author:JMbaozi
Movie:星际穿越
MovieID:1889243
Total:500条
"""

import requests
import lxml
from bs4 import BeautifulSoup

def getComments(id,pageNum):
    movieComments = ""
    for i in range(pageNum):
        start = i*20
        url = "https://movie.douban.com/subject/"+str(id)+"/comments?start="+str(start)+"&limit=20&sort=new_score&status=P"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36 Edg/81.0.416.45',
            'Cookie':''
        }
        print("正在爬取第%s页评论" % (i+1))
        r = requests.get(url,headers=headers)
        soup = BeautifulSoup(r.text,'lxml')
        commentsList = soup.find_all('span',class_ ='short')
        for comments in commentsList:
            movieComments += comments.text
            movieComments += '\n'
    return movieComments

def saveComments(Comments):
    try:
        fileName = 'movieComments.txt'
        with open(fileName,'w',encoding='utf-8') as f:
            f.write(str(Comments))
        print('保存成功！')
    except:
        print('保存失败！')

if __name__ == '__main__':
    id = '1889243'
    pageNum = 25
    Comments = getComments(id,pageNum)
    saveComments(Comments)

