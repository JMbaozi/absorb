# 实验内容
# 1、	构造正确的属性查询语句；
# 2、	创建要素图层和表视图；
# 3、	使用Select Layer by Attribute选择要素；
# 4、	使用Select Layer by Location选择要素；
# 5、	结合空间查询和属性查询选择要素。



# 1 构造正确的属性查询语句
# SVCAREA = 'North'   # 匹配SVCAREA属性为North的点
# "SVCAREA" = 'North'
# SVCAREA LIKE 'N%'   # 匹配SVCAREA属性以N开头的点
# OBJECTID < 719 AND SVCAREA = 'North'    # 匹配OBJECTID<719并且SVCAREA='North'的点


# 2 创建要素图层和表视图
# 要素图层
# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# try:
#     flayer = arcpy.MakeFeatureLayer_management("Burglary","Burglary_Layer")
#     print("Create Done")
# except:
#     print("Create Error")
# 表视图
# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# try:
#     tView = arcpy.MakeTableView_management("Crime2009Table","Crime2009TView")
#     print("Create Done")
# except:
#     print("Create Error")


# 3 使用Select Layer by Attribute选择要素
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


# 4 使用Select Layer by Location选择要素
# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
# try:
#     flayer = arcpy.MakeFeatureLayer_management("Burglary","Burglary_Layer")
#     arcpy.SelectLayerByLocation_management(flayer,"COMPLETELY_WITHIN",r"E:\ArcPyStudy\Data\ArcpyBook\Ch7\EdgewoodSD.shp")
#     cnt = arcpy.GetCount_management(flayer)
#     print("The number of selected records is:" + str(cnt))
# except:
#     print("Error")


# 5 结合空间查询和属性查询选择要素
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
