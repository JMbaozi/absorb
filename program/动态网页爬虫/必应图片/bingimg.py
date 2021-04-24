from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
import time 
import requests


def getnamepage(name):
    b.get('https://cn.bing.com/images/')
    search_box = b.find_element_by_id('sb_form_q')
    search_box.send_keys(name)
    search_box.send_keys(Keys.ENTER)
    time.sleep(1)


def download(num):
    ele_filter = b.find_element_by_id('fltIdtTit')  # 筛选器按钮
    ele_filter.click()
    time.sleep(1)
    ele_all_size = b.find_element_by_xpath('//*[@id="ftrB"]/ul/li[1]')
    ele_all_size.click()
    time.sleep(1)
    ele_max_size = b.find_element_by_xpath('/html/body/div[3]/div[2]/div/ul/li[1]/div/div/a[4]')
    ActionChains(b).move_to_element(ele_max_size).perform()
    time.sleep(1)
    ele_max_size.click()
    time.sleep(1)

    ele_first_img = b.find_element_by_xpath('//*[@id="mmComponent_images_1"]/ul[1]/li[1]/div/div/a/div/img')
    ele_first_img.click()
    time.sleep(1)
    for i in range(1,num+1):
        # 存在问题！！！
        ele_current_img = b.find_element_by_id('b_content')
        img_src = ele_current_img.get_attribute("src")
        print(img_src)
        r = requests.get(img_src)
        if r.status_code == 200:
            path = r'C:\Users\JMbaozi\Documents\GitHub\absorb\program\动态网页爬虫\必应图片\KDA\%d.jpg' % i
            print("正在爬取第%d个" % i)
            with open(path,'wb') as f:
                f.write(r.content)
                time.sleep(1)
                print("第%d个爬取成功" % i)
            ele_next_img = b.find_element_by_xpath('//*[@id="navr"]/span')
            ele_next_img.click()
        else:
            ele_next_img = b.find_element_by_xpath('//*[@id="navr"]/span')
            ele_next_img.click()
            time.sleep(1)
            continue


if __name__ == "__main__":
    b = webdriver.Edge(r"C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python36_64\Scripts\msedgedriver.exe")
    name = 'KDA女团'
    num = 33
    getnamepage(name)
    download(num)
    b.close()