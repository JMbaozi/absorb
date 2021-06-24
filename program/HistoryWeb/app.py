from flask import Flask,render_template,jsonify
import sqlite3
import json
import pandas
import ast

from werkzeug.wrappers import request
app = Flask(__name__)



####################################################
Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']# 各朝代列表
Countys = []# 各朝所含郡县
Countynum = []# 各朝所含郡县数量
CountyHouseholds = []# 各朝代各郡县户数
CountyPopulations = []# 各朝代各郡县人口数  
CountyFamilies = []# 各朝代各郡县人每户数
Households = []# 各朝代总户数
Populations = []# 各朝代总人口总数
Families = []# 各朝代人每户数量
Household_dict = {}# 户数字典
Population_dict = {}# 人口字典
Familie_dict = {}# 人每户字典
####################################################
# 连接数据库
db = sqlite3.connect('test\数据库\HISTORY_DATABASE')
print("数据库连接成功")
cur = db.cursor()
for dynasty in Dynastys:
    num1,num2,num3,num4 = 0,0,0,0# 户数,口数,人每户,郡县数
    countys = []# 单个朝代的所有郡县名称
    CountyHousehold = []# 当前朝代各郡县户数
    CountyPopulation = []# 当前朝代各郡县人口数
    CountyFamilie = []# 当前朝代各郡县人每户数
    data = cur.execute("select * from people where 朝代='{}'".format(dynasty))
    for row in data:
        num1 += int(row[3])
        num2 += int(row[4])
        num3 += float(row[5])
        num4 += 1
        countys.append(str(row[2]))
        CountyHousehold.append(int(row[3]))
        CountyPopulation.append(int(row[4]))
        CountyFamilie.append(int(row[5]))
    Households.append(num1)
    Populations.append(num2)
    Families.append(float('%.2f' % float(num3/num4)))# 结果保留一位小数
    Countynum.append(num4)
    Countys.append(countys)
    CountyHouseholds.append(CountyHousehold)
    CountyPopulations.append(CountyPopulation)
    CountyFamilies.append(CountyFamilie)
    print("{}计算成功".format(dynasty))
# for i in range(len(Dynastys)):
#     print("{}共有{}户".format(Dynastys[i],str(Households[i])))
#     print("{}共有{}人".format(Dynastys[i],str(Populations[i])))
#     print("{}每户平均有{}人".format(Dynastys[i],str(Families[i])))
#     print("{}共有{}个郡县".format(Dynastys[i],str(Countynum[i])))
#     print("{}的郡县有{}".format(Dynastys[i],str(Countys[i])))
Household_dict = dict(list(zip(Dynastys,Households)))
Population_dict = dict(list(zip(Dynastys,Populations)))
Familie_dict = dict(list(zip(Dynastys,Families)))
# print(Household_dict)
# print(Population_dict)
# print(Familie_dict)
####################################################



@app.route('/')
def hello_world():
    data=123123
    return render_template("index.html",data=data)

@app.route('/people_all')
def people_all():
    Populationlabel = Populations# 各朝代总人口总数
    Dynastylabel = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']# 各朝代列表
    Householdlabel = Households# 各朝代总户数
    Familylabel = Families[:-1]# 各朝代人每户
    Populationlabelweight = list(map(lambda x:x/1000000,Populationlabel))# 总人口加权除以1000000后的结果
    Householdlabelweight = list(map(lambda x:x/1000000,Householdlabel))# 总户数加权除以1000000后的结果
    Population_dict_sort = dict(sorted(Population_dict.items(),key=lambda item:item[1]))# 各朝代总人口从高到低排序
    Dynasty_sort = list(Population_dict_sort.keys())# 排序后的朝代列表
    Population_sort = list(Population_dict_sort.values())# 排序后的各朝代总人口数
    return render_template("people_all.html",
                            Dynasty_sort=Dynasty_sort,
                            Population_sort=Population_sort,
                            Populationlabel=Populationlabel,
                            Populationlabelweight=Populationlabelweight,
                            Dynastylabel=Dynastylabel,
                            Familylabel=Familylabel,
                            Householdlabel=Householdlabel,
                            Householdlabelweight=Householdlabelweight)

@app.route('/Dynasty')
def Dynasty():
    # 首页显示东魏数据
    DongweiHousehold_dict = dict(list(zip(Countys[0],CountyHouseholds[0])))
    DongweiHouseholdValue = CountyHouseholds[0]
    DongweiCountyName = Countys[0]
    DongweiHouseholds = []
    DongweiHousehold_dict_sort = dict(sorted(DongweiHousehold_dict.items(),key=lambda item:item[1]))# 各朝代总人口从高到低排序
    DongweiDynasty_sort = list(DongweiHousehold_dict_sort.keys())# 排序后的朝代列表
    DongweiHousehold_sort = list(DongweiHousehold_dict_sort.values())# 排序后的各朝代总人口数
    for i in range(len(DongweiHouseholdValue)):
        each_dict = {'value': DongweiHouseholdValue[i], 'name': DongweiCountyName[i]}
        DongweiHouseholds.append(each_dict)
    return render_template("Dynasty.html",
                            DongweiHouseholds=DongweiHouseholds,
                            DongweiDynasty_sort=DongweiDynasty_sort,
                            DongweiHousehold_sort=DongweiHousehold_sort)

@app.route('/Dynasty/dongwei',methods=['POST'])
def dongwei():
    DongweiHousehold_dict = dict(list(zip(Countys[0],CountyHouseholds[0])))
    DongweiHouseholdValue = CountyHouseholds[0]
    DongweiCountyName = Countys[0]
    DongweiHouseholds = []
    DongweiHousehold_dict_sort = dict(sorted(DongweiHousehold_dict.items(),key=lambda item:item[1]))# 各朝代总人口从高到低排序
    DongweiDynasty_sort = list(DongweiHousehold_dict_sort.keys())# 排序后的朝代列表
    DongweiHousehold_sort = list(DongweiHousehold_dict_sort.values())# 排序后的各朝代总人口数
    for i in range(len(DongweiHouseholdValue)):
        each_dict = {'value': DongweiHouseholdValue[i], 'name': DongweiCountyName[i]}
        DongweiHouseholds.append(each_dict)
    return jsonify(DongweiHouseholds)
    # DongweiDynasty_sort
    # DongweiHousehold_sort

@app.route('/Dynasty/sui')
def sui():
    SuiHousehold_dict = dict(list(zip(Countys[1],CountyHouseholds[1])))
    SuiHouseholdValue = CountyHouseholds[1]
    SuiCountyName = Countys[1]
    SuiHouseholds = []
    SuiHousehold_dict_sort = dict(sorted(SuiHousehold_dict.items(),key=lambda item:item[1]))# 各朝代总人口从高到低排序
    SuiDynasty_sort = list(SuiHousehold_dict_sort.keys())# 排序后的朝代列表
    SuiHousehold_sort = list(SuiHousehold_dict_sort.values())# 排序后的各朝代总人口数
    for i in range(len(SuiHouseholdValue)):
        each_dict = {'value': SuiHouseholdValue[i], 'name': SuiCountyName[i]}
        SuiHouseholds.append(each_dict)
    return render_template("Dynasty/sui.html",
                            SuiHouseholds=SuiHouseholds,
                            SuiDynasty_sort=SuiDynasty_sort,
                            SuiHousehold_sort=SuiHousehold_sort)

if __name__ == '__main__':
    app.run(debug=True)
