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