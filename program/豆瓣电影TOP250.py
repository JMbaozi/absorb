"""
https://movie.douban.com/top250?start=0&filter=
"""

import re,requests,lxml
from bs4 import BeautifulSoup
def get_movies():
    movies_list = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16',
        'Host':'movie.douban.com'
    }
    for i in range(0,10):
        link = 'https://movie.douban.com/top250?start=' + str(i*25) + '&filter='    #从网址中可以很明显的发现，'start='的结果为i*25
        r = requests.get(link,headers=headers,timeout = 10)     #获得当前页的html内容
        soup = BeautifulSoup(r.text,'lxml')     #对当前页的内容进行解析
        div_list = soup.find_all('div',class_='hd')
        for each in div_list:
            #movie = re.findall("<span class ='title'>(.*?)</span>",each.text).strip()
            movie = each.a.span.text.strip()    #获取电影名，并清除多余的空格
            movies_list.append(movie)
    return movies_list

movies = get_movies()
print(movies)

#将movies列表写入 豆瓣电影TOP250.txt
number = 1      #排名
file = open('E:\\blog\\program\\豆瓣TOP250.txt','w')
for each in movies:
    file.write(str(number)+'：'+each)
    file.write('\n')
    number+=1
file.close()
print('写入完成！')
    