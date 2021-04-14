# 实验内容
# 1、	使用SearchCursor检索要素；
# 2、	使用where子句筛选记录；
# 3、	使用几何令牌返回几何的部分信息；
# 4、	使用InsertCursor插入行；
# 5、	使用UpdateCursor更新行；
# 6、	使用UpdateCursor删除行；
# 7、	在编辑会话中插入和更新行；
# 8、	读取要素类中的几何信息；
# 9、	使用Walk()遍历目录。


# 1 使用SearchCursor检索要素
# import arcpy,arcpy.da as da
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\Ch8"
# with da.SearchCursor('Schools.shp',('Facility','Name')) as cursor:
#     for row in sorted(cursor):
#         print('School name:' + row[1])


# 2 使用where子句筛选记录
# import arcpy,arcpy.da as da
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\Ch8"
# with arcpy.da.SearchCursor('Schools.shp',("Facility","Name"),'"FACILITY" = \'HIGH SCHOOL\'')as cursor:
#     for row in sorted(cursor):
#         print("School name:" + row[1])


# 3 使用几何令牌返回几何的部分信息
# import arcpy,arcpy.da as da
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\Ch8"
# with arcpy.da.SearchCursor("coa_parcels.shp",("PY_FULL_OW","SHAPE@XY")) as cursor:
#     for row in cursor:
#         print("Parcel owner: {0} has a location of:{1}").format(row[0],row[1])


# 4 使用InsertCursor插入行
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
#             rowValue = [(latitude,longitude),confidence]
#             cur.insertRow(rowValue)
#             print("Record number " + str(cntr) + " written to feature class")
#             cntr += 1
# except Exception as e:
#     print(e.message)
# finally:
#     f.close()


# 5 使用UpdateCursor更新行
# import arcpy
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\Ch8\WildfireData\WildlandFires.mdb"
# try:
    # create a new field to hold the values
    # arcpy.AddField_management("FireIncidents","CONFID_RATING","TEXT","10")
#     print("CONFID_RATING field added to FireIncidents")
#     with arcpy.da.UpdateCursor("FireIncidents",("CONFIDENCEVALUE","CONFID_RATING")) as cursor:
#         cntr = 1
#         for row in cursor:
#             if row[0] <=40:
#                 row[1] = 'POOR'
#             elif row[0] > 40 and row[0] <= 60:
#                 row[1] = 'FAIR'
#             elif row[0] > 60 and row[0] <= 85:
#                 row[1] = 'GODD'
#             else:
#                 row[1] = 'EXCELLENT'
#             cursor.updateRow(row)
#             print("Record number "+ str(cntr) + " updated")
#             cntr += 1
# except Exception as e:
#     print(e.message)


# 6 使用UpdateCursor删除行
# import arcpy,os
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\Ch8\WildfireData\WildlandFires.mdb"
# try:
#     with arcpy.da.UpdateCursor("FireIncidents",("CONFID_RATING"),'[CONFID_RATING] = \'POOR\'') as cursor:
#         cntr = 1
#         for row in cursor:
#             cursor.deleteRow()
#             print("Record number " + str(cntr) + ' deleted')
#             cntr += 1
# except Exception as e:
#     print(e.message)


# 7 在编辑会话中插入和更新行
# import arcpy,os
# arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\Ch8\WildfireData\WildlandFires.mdb"
# try:
#     edit = arcpy.da.Editor(r"E:\ArcPyStudy\Data\ArcpyBook\Ch8\WildfireData\WildlandFires.mdb")
#     edit.startEditing(True)
#     with arcpy.da.UpdateCursor("FireIncidents",("CONFIDENCEVALUE","CONFID_RATING")) as cursor:
#         cntr = 1
#         for row in cursor:
#             if row[0] > 40 and row[0] <= 60:
#                 row[1] = "GOOD"
#             elif row[0] > 60 and row[0] <= 85:
#                 row[1] = "BETTER"
#             else:
#                 row[1] = "BEST"
#             cursor.updateRow(row)
#             print("Record number " + str(cntr) + " updated")
#             cntr += 1
#     edit.stopEditing(True)
# except Exception as e:
#     print(e.message)


# 8 读取要素类中的几何信息
# import arcpy 
# infc = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb\SchoolDistricts"
# for row in arcpy.da.SearchCursor(infc,["OID@","SHAPE@"],'"NAME" = \'Lackland ISD\''):
#     # Print the current multipoint's ID
#     print("Feature {}:".format(row[0]))
#     partnum = 0
#     # Step through each part of the feature
#     for part in row[1]:
#         print("Part {}:".format(partnum))
#         for pnt in part:
#             if pnt:
#                 print("{},{}".format(pnt.X,pnt.Y))
#             else:
#                 print("Interior Ring:")
#         partnum += 1


# 9 使用Walk()遍历目录
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