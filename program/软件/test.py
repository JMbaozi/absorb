import os
from KeyWords import DataAnalyse
from flask import Flask
import sqlite3



# 连接数据库
db = sqlite3.connect('数据库/HISTORY_DATABASE')
print("数据库连接成功")
cur = db.cursor()
data = cur.execute("select * from people")
for d in data:
    print(d)

# workSpace = os.getcwd()
# data_files = workSpace + '\data_files'

# with open(r'data_files\test.txt','r',encoding='utf-8') as f:
#     data = f.read()

# keyWrod,Weight = DataAnalyse(data)
# for i in range(len(keyWrod)):
#     print(str(keyWrod[i]) + ':' + str(Weight[i]))
