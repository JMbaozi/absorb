import os
# from KeyWords import DataAnalyse
from flask import Flask
import sqlite3
from pyg2plot import Plot


Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']# 各朝代列表
Households = []# 各朝代总户数
Populations = []# 各朝代总人口总数
Families = []# 各朝代人每户数量
Household_dict = {}# 户数字典
Population_dict = {}# 人口字典
Familie_dict = {}# 人每户字典


# 连接数据库
db = sqlite3.connect('数据库/HISTORY_DATABASE')
print("数据库连接成功")
cur = db.cursor()
for dynasty in Dynastys:
    num1,num2,num3 = 0,0,0# 户数，口数，人每户
    data = cur.execute("select * from people where 朝代='{}'".format(dynasty))
    for row in data:
        num1 += int(row[3])
        num2 += int(row[4])
        num3 += float(row[5])
    Households.append(num1)
    Populations.append(num2)
    Families.append(float('%.1f' % num3))# 结果保留一位小数
    print("{}计算成功".format(dynasty))
for i in range(len(Dynastys)):
    print("{}共有{}户".format(Dynastys[i],str(Households[i])))
    print("{}共有{}人".format(Dynastys[i],str(Populations[i])))
    print("{}每户平均有{}人".format(Dynastys[i],str(Families[i])))
Household_dict = dict(list(zip(Dynastys,Households)))
Population_dict = dict(list(zip(Dynastys,Populations)))
Familie_dict = dict(list(zip(Dynastys,Families)))
print(Household_dict)
print(Population_dict)
print(Familie_dict)

# 生成曲线图
data_Households = []
data_Populations = []
data_Families = []
for i in range(len(Dynastys)):
    data_Households.append({"朝代":Dynastys[i],"总户数":Households[i]})
for i in range(len(Dynastys)):
    data_Populations.append({"朝代":Dynastys[i],"总人数":Populations[i]})
for i in range(len(Dynastys)):
    data_Families.append({"朝代":Dynastys[i],"人每户":Families[i]})
print(data_Households)
print(data_Populations)
print(data_Families)
line_Households = Plot("Line")
line_Populations = Plot("Line")
line_Families = Plot("Line")
# 总户数
line_Households.set_options({
    "appendPadding": 32,
    "data": data_Households,
    "xField": "朝代",
    "yField": "总户数",
    "label": {},
    "smooth": True,
    "lineStyle": {
        "lineWidth": 3,
    },
    "point": {
        "size": 5,
        "shape": 'diamond',
        "style": {
            "fill": "white",
            "stroke": "#5B8FF9",
            "lineWidth": 2,
        }
    }
})
# 总人口数
line_Populations.set_options({
    "appendPadding": 32,
    "data": data_Populations,
    "xField": "朝代",
    "yField": "总人数",
    "label": {},
    "smooth": True,
    "lineStyle": {
        "lineWidth": 3,
    },
    "point": {
        "size": 5,
        "shape": 'diamond',
        "style": {
            "fill": "white",
            "stroke": "#5B8FF9",
            "lineWidth": 2,
        }
    }
})
# 人每户
line_Families.set_options({
    "appendPadding": 32,
    "data": data_Families,
    "xField": "朝代",
    "yField": "人每户",
    "label": {},
    "smooth": True,
    "lineStyle": {
        "lineWidth": 3,
    },
    "point": {
        "size": 5,
        "shape": 'diamond',
        "style": {
            "fill": "white",
            "stroke": "#5B8FF9",
            "lineWidth": 2,
        }
    }
})
line_Households.render("数据网页/line_Households.html")
line_Populations.render("数据网页/line_Populations.html")
line_Families.render("数据网页/line_Families.html")
print("HTML生成完毕")

