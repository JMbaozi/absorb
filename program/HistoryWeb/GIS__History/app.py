from flask import Flask,render_template,request,jsonify
import json
import sqlite3

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("index1.html")
#人口



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
db = sqlite3.connect('HISTORY_DATABASE')
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
Household_dict = dict(list(zip(Dynastys,Households)))
Population_dict = dict(list(zip(Dynastys,Populations)))
Familie_dict = dict(list(zip(Dynastys,Families)))
####################################################


def DynastyAllData(num):
    # 返回当前朝代所有数据，需要参数num:当前朝代在列表中的索引，从0开始。如：东魏为0，隋代为1。
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    CurrentHouseholds = []# 当前朝代各郡县总户数
    CurrentPopulations = []# 当前朝代各郡县人口数
    CurrentFamilies = []# 当前朝代各郡县户口数
    CurrentCountyName = Countys[num]# 当前朝代各郡县名称
    CurrentHouseholdValue = CountyHouseholds[num]# 当前朝代各郡县户数值
    CurrentPopulationValue = CountyPopulations[num]# 各朝代各郡县人口数值
    CurrentPopulationMin = int(min(CurrentPopulationValue)-1000)# 当前朝代各郡县人口最小值
    CurrentPopulationMax = int(max(CurrentPopulationValue)+1000)# 当前朝代各郡县人口最大值
    CurrentFamiliesValue = CountyFamilies[num]# 各朝代各郡县户口数值
    CurrentHousehold_dict = dict(list(zip(CurrentCountyName,CurrentHouseholdValue)))
    CurrentHousehold_dict_sort = dict(sorted(CurrentHousehold_dict.items(),key=lambda item:item[1]))# 各朝代总人口从高到低排序
    CurrentCountyName_sort = list(CurrentHousehold_dict_sort.keys())# 排序后的郡县名称列表
    CurrentHousehold_sort = list(CurrentHousehold_dict_sort.values())# 排序后的各郡县总户数
    for i in range(len(CurrentHouseholdValue)):
        each_dict = {'value': CurrentHouseholdValue[i], 'name': CurrentCountyName[i]}
        CurrentHouseholds.append(each_dict)
    for i in range(len(CurrentHouseholdValue)):
        each_dict = {'value': CurrentPopulationValue[i], 'name': CurrentCountyName[i]}
        CurrentPopulations.append(each_dict)
    for i in range(len(CurrentHouseholdValue)):
        each_dict = {'value': CurrentFamiliesValue[i], 'name': CurrentCountyName[i]}
        CurrentFamilies.append(each_dict)
    CurrentAlldata = [CurrentCountyName_sort,
                        CurrentHousehold_sort,
                        CurrentHouseholds,
                        CurrentPopulations,
                        CurrentFamilies,
                        CurrentPopulationMin,
                        CurrentPopulationMax]
    return CurrentAlldata# 返回当前朝代数据
    # 数据目录：
    # 当前朝代按照户数排序后的各郡县名称CurrentCountyName_sort
    # 当前朝代各郡县总户数排序CurrentHousehold_sort
    # 当前朝代各郡县总户数CurrentHouseholds
    # 当前朝代各郡县总人口排序CurrentPopulations
    # 当前朝代各郡县户口数排序CurrentFamilies
    # 当前朝代各郡县人口最小值CurrentPopulationMin
    # 当前朝代各郡县人口最小值CurrentPopulationMax


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
    alldata = DynastyAllData(0)
    return render_template("people.html",
                            DongweiCountyName_sort=alldata[0],
                            DongweiHousehold_sort=alldata[1],
                            DongweiHouseholds=alldata[2],
                            DongweiPopulations=alldata[3],
                            DongweiFamilies=alldata[4],
                            DongweiPopulationMin=alldata[5],
                            DongweiPopulationMax=alldata[6])

@app.route('/Dynasty/dongwei',methods=['POST'])
def dongwei():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 0# 当前朝代的索引值
    alldata = DynastyAllData(num)
    print(123)
    return jsonify(alldata)

@app.route('/Dynasty/sui',methods=['POST'])
def sui():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 1# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/tang',methods=['POST'])
def tang():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 2# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/beisong',methods=['POST'])
def beisong():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 3# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/liusong',methods=['POST'])
def liusong():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 4# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/jin',methods=['POST'])
def jin():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 5# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/yuan',methods=['POST'])
def yuan():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 6# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/ming',methods=['POST'])
def ming():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 7# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/qing',methods=['POST'])
def qing():
    # Dynastys = ['东魏','隋代','唐','北宋','刘宋','金','元','明','清']
    num = 8# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)


#  帝王巡视
def diwangshujuku():
    秦始皇 = []
    乾隆帝 = []
    康熙帝 = []
    汉武帝 = []
    con = sqlite3.connect("D:\person\study\GIS软件\GIS__History\HISTORY_DATABASE")
    cur = con.cursor()
    sql = "select 参与人物,朝时间,介绍,历经地点,坐标,地点介绍 from tour WHERE 参与人物='秦始皇'"
    data = cur.execute(sql)
    for item in data:
        秦始皇.append(item)
    sql = "select 参与人物,朝时间,介绍,历经地点,坐标 ,地点介绍 from tour WHERE 参与人物='乾隆帝'"
    data = cur.execute(sql)
    for item in data:
        乾隆帝.append(item)
    sql = "select 参与人物,朝时间,介绍,历经地点,坐标 ,地点介绍 from tour WHERE 参与人物='康熙帝'"
    data = cur.execute(sql)
    for item in data:
        康熙帝.append(item)
    sql = "select 参与人物,朝时间,介绍,历经地点,坐标 ,地点介绍 from tour WHERE 参与人物='汉武帝'"
    data = cur.execute(sql)
    for item in data:
        汉武帝.append(item)
    cur.close()
    con.close()
    return 秦始皇,乾隆帝,康熙帝,汉武帝
@app.route('/diwang')
def diwang():
    return render_template("diwang.html")
@app.route('/diwang/qa',methods=['POST'])
def qa():
    秦始皇, 乾隆帝, 康熙帝, 汉武帝 = diwangshujuku()
    d={'秦始皇':秦始皇,'乾隆帝':乾隆帝,'康熙帝':康熙帝,'汉武帝':汉武帝,}
    res=request.form['data']
    res1=[]
    for key,vau in d.items():
        if res==key:
            res1=vau

    dataall=[]
    for i in range(len(res1)):
        coor = []
        key = str(res1[i][3]).split("&")
        vau = str(res1[i][4]).split("&",)
        info= str(res1[i][5]).split("&",)
        for j in range(len(key)):
            v=str(vau[j]).split(",")
            coor_each = {
                "name":key[j],
                "lon" :v[0],
                "lat" :v[1],
                "info_place":info[j]
            }
            coor.append(coor_each)
        coor=json.dumps(coor,ensure_ascii=False)

        data = {
            'name': res,
            'time': res1[i][1],
            'info': res1[i][2],
            'where': coor
        }
        dataall.append(data)

    return jsonify(dataall)

if __name__ == '__main__':
    app.run(debug=True)
