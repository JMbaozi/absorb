from flask import Flask,render_template
import sqlite3
import json

app = Flask(__name__)



####################################################
Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']# 各朝代列表
Households = []# 各朝代总户数
Populations = []# 各朝代总人口总数
Families = []# 各朝代人每户数量
Household_dict = {}# 户数字典
Population_dict = {}# 人口字典
Familie_dict = {}# 人每户字典

# 连接数据库
db = sqlite3.connect('test\数据库\HISTORY_DATABASE')
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
####################################################

@app.route('/')
def hello_world():
    data=123123
    return render_template("index.html",data=data)

@app.route('/people_all')
def people_all():
    xlabel = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']# 各朝代列表
    ylabel = Populations# 各朝代总人口总数
    return render_template("people_all.html",xlabel=xlabel,ylabel=ylabel)

@app.route('/people')
def people():
    data=123123
    return render_template("people.html",data=data)


if __name__ == '__main__':
    app.run(debug=True)
