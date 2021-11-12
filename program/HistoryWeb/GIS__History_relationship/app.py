from flask import Flask,render_template,request,jsonify,Markup
import json
import sqlite3
import pandas as pd
import markdown
import os
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template("index.html")
#人口



####################################################
Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']# 各朝代列表
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
db.close()# 关闭数据库连接。
####################################################

def DynastyAllData(num):
    # 返回当前朝代所有数据，需要参数num:当前朝代在列表中的索引，从0开始。如：刘宋为0，东魏为1。
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
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

# @app.route('/people_all')
# def people_all():
#     Populationlabel = Populations# 各朝代总人口总数
#     Dynastylabel = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']# 各朝代列表
#     Householdlabel = Households# 各朝代总户数
#     Familylabel = Families[:-1]# 各朝代人每户
#     Populationlabelweight = list(map(lambda x:x/1000000,Populationlabel))# 总人口加权除以1000000后的结果
#     Householdlabelweight = list(map(lambda x:x/1000000,Householdlabel))# 总户数加权除以1000000后的结果
#     Population_dict_sort = dict(sorted(Population_dict.items(),key=lambda item:item[1]))# 各朝代总人口从高到低排序
#     Dynasty_sort = list(Population_dict_sort.keys())# 排序后的朝代列表
#     Population_sort = list(Population_dict_sort.values())# 排序后的各朝代总人口数
#     return render_template("people_all.html",
#                             Dynasty_sort=Dynasty_sort,
#                             Population_sort=Population_sort,
#                             Populationlabel=Populationlabel,
#                             Populationlabelweight=Populationlabelweight,
#                             Dynastylabel=Dynastylabel,
#                             Familylabel=Familylabel,
#                             Householdlabel=Householdlabel,
#                             Householdlabelweight=Householdlabelweight)

@app.route('/Dynasty')
def Dynasty():
    Populationlabel = Populations# 各朝代总人口总数
    Dynastylabel = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']# 各朝代列表
    Householdlabel = Households# 各朝代总户数
    Familylabel = Families[:-1]# 各朝代人每户
    Populationlabelweight = list(map(lambda x:x/1000000,Populationlabel))# 总人口加权除以1000000后的结果
    Householdlabelweight = list(map(lambda x:x/1000000,Householdlabel))# 总户数加权除以1000000后的结果
    Population_dict_sort = dict(sorted(Population_dict.items(),key=lambda item:item[1]))# 各朝代总人口从高到低排序
    Dynasty_sort = list(Population_dict_sort.keys())# 排序后的朝代列表
    Population_sort = list(Population_dict_sort.values())# 排序后的各朝代总人口数
    return render_template("people.html",
                            Dynasty_sort=Dynasty_sort,
                            Population_sort=Population_sort,
                            Populationlabel=Populationlabel,
                            Populationlabelweight=Populationlabelweight,
                            Dynastylabel=Dynastylabel,
                            Familylabel=Familylabel,
                            Householdlabel=Householdlabel,
                            Householdlabelweight=Householdlabelweight)


@app.route('/Dynasty/liusong',methods=['POST'])
def liusong():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 0# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/dongwei',methods=['POST'])
def dongwei():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 1# 当前朝代的索引值
    alldata = DynastyAllData(num)
    print(123)
    return jsonify(alldata)

@app.route('/Dynasty/sui',methods=['POST'])
def sui():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 2# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/tang',methods=['POST'])
def tang():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 3# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/beisong',methods=['POST'])
def beisong():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 4# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/jin',methods=['POST'])
def jin():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 5# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/yuan',methods=['POST'])
def yuan():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 6# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/ming',methods=['POST'])
def ming():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 7# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

@app.route('/Dynasty/qing',methods=['POST'])
def qing():
    # Dynastys = ['刘宋','东魏','隋代','唐','北宋','金','元','明','清']
    num = 8# 当前朝代的索引值
    alldata = DynastyAllData(num)
    return jsonify(alldata)

#  帝王巡视
def diwangshujuku():
    秦始皇 = []
    乾隆帝 = []
    康熙帝 = []
    汉武帝 = []
    con = sqlite3.connect("HISTORY_DATABASE")
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

#文字发源
@app.route('/wenzi')
def wenzi():
    dataneed=[]
    con = sqlite3.connect("HISTORY_DATABASE")
    cur = con.cursor()
    sql = "select 遗址名称,描述,link,遗址出土年代,遗址地点,遗址坐标,遗址类型 from wenzifayuan "
    data = cur.execute(sql)
    for item in data:
        dataneed.append(item)
    cur.close()
    con.close()
    # print(dataneed[1])

    return render_template("wenzi.html",data=dataneed)

@app.route("/time_map")
def time_map():
    # wenxuerenwu=[]   #文学
    # sixiangjia=[]    #思想
    # zhengzhirenwu=[] #政治人物
    # junshirenwu=[]    #军事人物
    # shehuirenwu=[]    #社会人物
    coor = []
    con = sqlite3.connect("HISTORY_DATABASE")
    cur = con.cursor()
    sql = "select name,info,地点,朝代,人物属性,经度,维度 from renwu "
    data = cur.execute(sql)
    for item in data:

        coor_each = {
            "name": item[0].replace("\n",""),
            "info": item[1].replace("\n",""),
            "place":item[2].replace("\n",""),
            "chaodai":item[3].replace("\n",""),
            "shuxing":item[4].replace("\n",""),
            "lon": item[5],
            "lat": item[6],
        }
        coor.append(coor_each)
    coor = json.dumps(coor, ensure_ascii=False)
    cur.close()
    con.close()
    # print(coor)

    return render_template("time_map.html",coor=coor)
@app.route("/trace", methods=['POST'])
def trace():
    res = request.form["name"]  #点击时空轨迹传回后端的name
    con = sqlite3.connect("HISTORY_DATABASE")
    cur = con.cursor()
    sql = "select  name,time,Biao_place,C_place,info,lon,lat from trace where name=" +'"'+res+'"'
    data = cur.execute(sql)
    all_trace=[];
    for item in data:
        time=str(item[1]).split("-")
        title=str(item[2]).split("-")
        c_place=str(item[3]).split("-")
        info=str(item[4]).split("-")
        lon=str(item[5]).split("-")
        lat=str(item[6]).split("-")
        for i in range(len(time)-1):
            data_each = {
                "name":item[0],
                'time':time[i],
                'title': title[i],
                'c_place': c_place[i],
                'info': info[i],
                'lon': lon[i],
                'lat': lat[i],
            }
            all_trace.append(data_each)

    all_trace = json.dumps(all_trace, ensure_ascii=False)
    return render_template("shikong_guiji.html",all_trace=all_trace)


@app.route("/RelationshipGraph", methods=['POST'])
def RelationshipGraph():
    RootName = ''# 根节点
    Nodes_list = []# 子节点列表
    LinkName_list = []# 节点关系列表
    InDB_list = []# 判断子节点是否在数据库中的列表
    res = request.form["name"]# 前端传回的数据
    db = sqlite3.connect('HISTORY_DATABASE')
    print("关系图谱数据库连接成功")
    cur = db.cursor()
    sql = "select * from relationship where RootName='{}'".format(res)
    data = cur.execute(sql)
    RootName = res
    for row in data:
        # 每个人只有一条记录，所以只循环一遍
        Nodes_list += str(row[2]).split('-')
        LinkName_list += str(row[3]).split('-')
        InDB_list += str(row[4]).split('-')
    Nodes = [{'name': RootName, 'symbolSize': 50, 'category': 0}]
    Links = []
    for i in range(len(Nodes_list)):
        if int(InDB_list[i]) == 1:
            # 子节点在数据库中
            node = {'name': Nodes_list[i], 'symbolSize': 50, 'category': 1}
            link = {'source': RootName, 'target': Nodes_list[i], 'name': LinkName_list[i]}
        else:
            # 子节点不在数据库中
            node = {'name': Nodes_list[i], 'symbolSize': 50, 'category': 2}
            link = {'source': RootName, 'target': Nodes_list[i], 'name': LinkName_list[i]}
        Nodes.append(node)
        Links.append(link)
    return render_template('relationship.html', Nodes=Nodes, Links=Links)

# 留言板
@app.route("/comment")
def comment():
    return render_template('comment.html')


# 将md转html
def MDToHTML(filename):
	exts = ['markdown.extensions.extra', 'markdown.extensions.codehilite','markdown.extensions.tables','markdown.extensions.toc']
	mdcontent = ""
	with open(filename,'r',encoding='utf-8') as f:
		mdcontent = f.read()	
	html = markdown.markdown(mdcontent,extensions=exts)
	content = Markup(html)
	return content
@app.route("/article", methods=['POST'])
def article():
    article_name = str(request.form["name"])
    root_path = str(os.path.realpath('static/asster/doc'))# 获取/static/asster/doc文件夹的真实路径
    filepath = root_path.replace('\\','/') + '/' + article_name + '.md'
    content = MDToHTML(filepath)  #markdown文件的路径
    return render_template('article.html',content=content,article_name=article_name)

if __name__ == '__main__':
    app.run(debug=True)
