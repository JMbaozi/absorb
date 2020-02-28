
import re,requests,lxml
from bs4 import BeautifulSoup
def get_movies():
    movies_list = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16',
        'Host':'movie.douban.com'
    }
    for i in range(0,10):
        link = 'https://movie.douban.com/top250?start=' + str(i*25) + '&filter='
        r = requests.get(link,headers=headers,timeout = 10)
        soup = BeautifulSoup(r.text,'lxml')
        div_list = soup.find_all('div',class_='hd')
        for each in div_list:
            #movie = re.findall("<span class ='title'>(.*?)</span>",each.text).strip()
            movie = each.a.span.text.strip()
            movies_list.append(movie)
    return movies_list

movies = get_movies()
print(movies)

number = 1
file = open('E:\\blog\\program\\豆瓣TOP250.txt','w')
for each in movies:
    file.write(str(number)+'：'+each)
    file.write('\n')
    number+=1
file.close()
print('写入完成！')
    