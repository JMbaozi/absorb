# https://www.bilibili.com/video/BV1Va4y1Y7fK?from=search&seid=16758014745519472728

from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time
import requests

def getnamepage(name):
    b.get('http://image.baidu.com/')
    search_box=b.find_element_by_id('kw')
    search_box.send_keys(name)
    search_box.send_keys(Keys.ENTER)
    time.sleep(1)

def download(imglist,num):
    #选取大尺寸
    ele_all_size=b.find_element_by_id('sizeFilter')  # 全部尺寸
    ActionChains(b).move_to_element(ele_all_size).perform()  # 鼠标悬停
    time.sleep(1)
    ele_max_size=b.find_element_by_xpath('//*[@id   ="sizeFilter"]/div/div[2]/ul/li[3]')   # 大尺寸选项XPath
    ActionChains(b).move_to_element(ele_max_size).perform()
    time.sleep(1)
    ele_max_size.click()
    time.sleep(1)
    
    
    #打开第一张图片，在此界面中点击左右切换图片
    ele_first_img=b.find_element_by_xpath('/html/body/div[2]/div[2]/div[4]/div/ul/li[1]/div[1]/a/img')   # 第一张图片的完整XPath
    ele_first_img.click()
    b.switch_to.window(b.window_handles[1])#很重要的一步，切换窗口，否则页面找不到元素,python shell里面是b.switch_to_window
    for i in range(1,num+1):
        ele_current_img=b.find_element_by_xpath('//*[@id="currentImg"]')   # 当前图片XPath
        img=ele_current_img.get_attribute('src')#获取当前图片的url链接
        r=requests.get(img)
        if r.status_code==200:
            path = r'C:\Users\JMbaozi\Documents\GitHub\absorb\program\动态网页爬虫\百度图片\成果\%d.jpg'%i
            print('正在爬取  '+img)
            with open(path,'wb') as f:
                f.write(r.content)
                time.sleep(1)
                print('爬取成功')
            ele_next_img=b.find_element_by_xpath('/html/body/div[1]/div[2]/div/span[2]/span')   # 下一张图片
            ele_next_img.click()
            #time.sleep(3)
        #跳到下一张
        else:
            ele_next_img=b.find_element_by_xpath('/html/body/div[1]/div[2]/div/span[2]/span')
            ele_next_img.click()
            time.sleep(1)
            continue


if __name__=="__main__":
    b=webdriver.Edge(r'C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python36_64\Scripts\msedgedriver.exe')
    name='演员成果'#定义要搜索的内容
    num=33  # 爬取数目
    imglist=[]
    getnamepage(name)
    download(imglist,num)
    b.close()