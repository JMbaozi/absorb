# import arcpy
# from arcpy import mapping
# path=r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2.mxd"
# mxd=arcpy.mapping.MapDocument(path)
# layers=mapping.ListLayers(mxd)
# for lyr in layers:
#     print(lyr)

# dict1 = {'one':1,'two':2,'three':3}
# for each in dict1.items():
#     print(each)
# print(dict1.values())

# f = lambda x,y:x*y
# print(f(3,3))

# class Person:
#     def __init__(self,n,y):
#         self.name = n
#         self.year = y
#     def whatName(self):
#         print(self.name)
#     def howOld(self,y):
#         print(str(y-self.year))
# p = Person('baozi',2000)
# p.whatName()
# p.howOld(2021)

# str = "ASDfgh123/*-"
# list_str = list(str)
# print(list_str)
# daxie,xiaoxie,shuzi,fuhao = 0,0,0,0
# for each in list_str:
#     if 'A' <= each and each <= 'Z':
#         daxie += 1
#     elif 'a' <= each and each <= 'z':
#         xiaoxie += 1
#     elif '0' <= each and each <= '9':
#         shuzi += 1
#     else:
#         fuhao += 1
# print(daxie)
# print(xiaoxie)
# print(shuzi)
# print(fuhao)



# str = "ASDfgh123/*-"
# list_str = list(str)
# print(list_str)
# daxie,xiaoxie,shuzi,fuhao = 0,0,0,0
# for each in list_str:
#     if 'A' <= each and each <= 'Z':
#         daxie += 1
#     elif 'a' <= each and each <= 'z':
#         xiaoxie += 1
#     elif '0' <= each and each <= '9':
#         shuzi += 1
#     else:
#         fuhao += 1
# print(daxie)
# print(xiaoxie)
# print(shuzi)
# print(fuhao)

# str = "ASDfgh123/*-"
# list_str = list(str)
# print(list_str)
# daxie,xiaoxie,shuzi,fuhao = 0,0,0,0
# for each in list_str:
#     if 'A' <= each <= 'Z':
#         daxie += 1
#     elif 'a' <= each <= 'z':
#         xiaoxie += 1
#     elif '0' <= each  <= '9':
#         shuzi += 1
#     else:
#         fuhao += 1
# print(daxie)
# print(xiaoxie)
# print(shuzi)
# print(fuhao)


# str = "ASDfgh123/*-"
# list_str = list(str)
# print(list_str)
# daxie,xiaoxie,shuzi,fuhao = 0,0,0,0
# for each in list_str:
#     if 'A' <= each <= 'Z':
#         daxie += 1
#     elif 'a' <= each <= 'z':
#         xiaoxie += 1
#     elif '0' <= each  <= '9':
#         shuzi += 1
#     else:
#         fuhao += 1
# print(daxie)
# print(xiaoxie)
# print(shuzi)
# print(fuhao)

# def judge(str):
#     list_str = list(str)
#     print(list_str)
#     daxie,xiaoxie,shuzi,fuhao = 0,0,0,0
#     for each in list_str:
#         if 'A' <= each <= 'Z':
#             daxie += 1
#         elif 'a' <= each <= 'z':
#             xiaoxie += 1
#         elif '0' <= each  <= '9':
#             shuzi += 1
#         else:
#             fuhao += 1
#     print(daxie)
#     print(xiaoxie)
#     print(shuzi)
#     print(fuhao)
# judge("4452144dfsadfsdf")


# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# try:
#     qry = '"SVCAREA" = \'North\''
#     flayer = arcpy.MakeFeatureLayer_management("Burglary","Burglary_Layer")
#     arcpy.SelectLayerByAttribute_management(flayer)
#     cnt = arcpy.GetCount_management(flayer)
#     print("The number of selected records is:" + str(cnt))
# except:
#     print("Error")


# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# try:
#     flayer = arcpy.MakeFeatureLayer_management("Burglary","Burglary_Layer")
#     arcpy.SelectLayerByLocation_management(flayer,"COMPLETELY_WITHIN",r"E:\ArcPyStudy\Data\ArcpyBook\Ch7\EdgewoodSD.shp")
#     cnt = arcpy.GetCount_management(flayer)
#     print("The number of selected records is:" + str(cnt))
# except:
#     print("Error")


# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# try:
#     qry = '"DOW" = \'Mon\''
#     flayer = arcpy.MakeFeatureLayer_management("Burglary","Burglary_Layer")
#     arcpy.SelectLayerByLocation_management(flayer,"COMPLETELY_WITHIN",r"E:\ArcPyStudy\Data\ArcpyBook\Ch7\EdgewoodSD.shp")
#     arcpy.SelectLayerByAttribute_management(flayer,"SUBSET_SELECTION",qry)
#     cnt = arcpy.GetCount_management(flayer)
#     print("The total number of selected records is:" + str(cnt))
# except Exception as e:
#     print(e.message)


# import arcpy.da as da,os
# os.chdir(r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb")
# print("os.walk:")
# for dirpath,dirnames,filenames in os.walk(os.getcwd()):
#     for filename in filenames:
#         print(filename)

# print("arcpy.da.Walk:")
# for dirpath,dirnames,filenames in da.Walk(os.getcwd(),datatype="FeatureClass"):
#     for filename in filenames:
#         print(os.path.join(dirpath,filename))


# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# fcList = arcpy.ListFeatureClasses('C*','Polygon')   # C开头且数据类型为Polygon的要素类
# for fc in fcList:
#     print(fc)


# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# fieldList = arcpy.ListFields('Burglary')
# for fld in fieldList:
#     print('%s is a type of %s with a length of %i' % (fld.name,fld.type,fld.length))


# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\New_Data\CityOfSanAntonio_Personal.mdb"
# try:
#     descFC = arcpy.Describe("SchoolDistricts")
#     print("The shape type is: " + descFC.ShapeType)
#     flds = descFC.fields
#     for fld in flds:
#         print("Field: " + fld.name)
#         print("Type: " + fld.type)
#         print("Length: " + str(fld.length))
#     ext = descFC.extent
#     print("XMin: %f" % ext.XMin)
#     print("YMin: %f" % ext.YMin)
#     print("XMax: %f" % ext.XMax)
#     print("YMax: %f" % ext.YMax)
# except:
#     print(arcpy.GetMessages)


# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data"
# try:
#     descRaster = arcpy.Describe("AUSTIN_EAST_NW.sid")
#     ext = descRaster.extent
#     print("XMin: %f" % ext.XMin)
#     print("YMin: %f" % ext.YMin)
#     print("XMax: %f" % ext.XMax)
#     print("YMax: %f" % ext.YMax)

#     sr = descRaster.SpatialReference
#     print("name: " + sr.name)
#     print("type: " + sr.type)
# except Exception as e:
#     print(e.message)


# s = input("输入字符串s:")
# daxie,xiaoxie,shuzi,fuhao = 0,0,0,0
# for each in s:
#     if 'A' <= each <= 'Z':
#         daxie += 1
#     elif 'a' <= each <= 'z':
#         xiaoxie += 1
#     elif '0' <= each  <= '9':
#         shuzi += 1
#     else:
#         fuhao += 1
# print("大写个数：" + str(daxie))
# print("小写个数：" + str(xiaoxie))
# print("数字个数：" + str(shuzi))
# print("符号个数：" + str(fuhao))

# # 4 ☆使用InsertCursor插入行
# import arcpy,os
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\Ch8\WildfireData\WildlandFires.mdb"
# f = open(r"E:\ArcPyStudy\Data\ArcpyBook\Ch8\WildfireData\NorthAmericaWildfires_2007275.txt",'r')
# lstFires = f.readlines()
# try:
#     with arcpy.da.InsertCursor("FireIncidents",("SHAPE@XY","CONFIDENCEVALUE")) as cur:
#         cntr = 1
#         for fire in lstFires:
#             if 'Latitude' in fire:
#                 continue
#             vals = fire.split(",")
#             latitude = float(vals[0])
#             longitude = float(vals[1])
#             confidence = int(vals[2])
#             rowValue = [(longitude,latitude),confidence]
#             cur.insertRow(rowValue)
#             print("Record number " + str(cntr) + " written to feature class")
#             cntr += 1
# except Exception as e:
#     print(e.message)
# finally:
#     f.close()

# # ☆3 使用脚本实现一个工具的输出作为另一个工具的输入（工具链）
# import arcpy
# arcpy.env.workspace = r'E:\ArcPyStudy\Data\ArcpyBook\data\TravisCounty'
# streams = r'E:\ArcPyStudy\Data\ArcpyBook\data\TravisCounty\Streams.shp'
# streamsBuffer = r'StreamsBuffer.shp'
# distance = '2640 Feet'
# schools2mile = 'Schools.shp'
# schoolsLyrFile = 'Schools2Mile_lyr'
# arcpy.Buffer_analysis(streams,streamsBuffer,distance,'FULL','ROUND','ALL')
# arcpy.MakeFeatureLayer_management(schools2mile,schoolsLyrFile)
# arcpy.SelectLayerByLocation_management(schoolsLyrFile,'INTERSECT',streamsBuffer)
# print("Done")



# python脚本
import arcpy
try:
    with arcpy.da.UpdateCursor("图斑面",("标识码","图斑编号")) as cursor:
        num = 1
        for row in cursor:
            row[0] = int(num)
            row[1] = int(num)
            cursor.updateRow(row)
            print("第"+ str(num) + "行编号完毕。")
            num += 1
except Exception as e:
    print(e.message)
# 字段计算器python函数
def IDsort(x):
    return int(x)