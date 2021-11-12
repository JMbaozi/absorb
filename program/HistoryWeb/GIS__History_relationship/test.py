import os
import re
# # print(os.getcwd())
# file_path = 'doc'
# parent_dir = os.path.realpath(file_path)
# print(parent_dir)
# filepath = parent_dir.replace('\\','/') + '/main.md'
# print(filepath)

data = ""
with open(r'C:\Users\JMbaozi\Documents\GitHub\absorb\program\HistoryWeb\GIS__History_relationship\static\asster\doc\xinqiji.md','r',encoding='utf-8') as f:
    data = f.readlines()


print(data)