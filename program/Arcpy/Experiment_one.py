# 环境：2.7.3 (default, Apr 10 2012, 23:31:26) [MSC v.1500 32 bit (Intel)]

# 实验内容
# 1、	开发软件的安装与配置；
# 2、	引用当前的地图文档；
# 3、	引用磁盘上的地图文档；
# 4、	获取地图文档中的图层列表；
# 5、	限制图层列表；
# 6、	缩放所选要素；
# 7、	改变地图范围；
# 8、	添加、插入图层到地图文档；
# 9、	更新图层的符号系统。


# 2 引用当前地图文档
# Notes:需要在ArcGIS中的Python窗口运行该代码
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument("CURRENT")
# mxd.title = "NEW"
# print(mxd_new.title)
# layers = mapping.ListLayers(mxd)
# for lyr in layers:
#     print(lyr)


# 3 引用磁盘上的地图文档
# import arcpy.mapping as mapping
# path = r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2.mxd"
# mxd = mapping.MapDocument(path)
# mxd.title = "Crime_Ch2_new"
# print(mxd.title)
# mxd.saveACopy(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# mxd_new = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# print(mxd_new.title)
# layers = mapping.ListLayers(mxd)
# for lyr in layers:
#     print(lyr)


# 4 获取地图文档中的图层列表
# (1)当前地图文档
# Notes:需要在ArcGIS中的Python窗口运行该代码
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument("CURRENT")
# mxd.title = "NEW"
# print(mxd_new.title)
# layers = mapping.ListLayers(mxd)
# for lyr in layers:
#     print(lyr)
# (2)磁盘地图文档
# import arcpy.mapping as mapping
# path = r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2.mxd"
# mxd = mapping.MapDocument(path)
# layers = mapping.ListLayers(mxd)
# for lyr in layers:
#     print(lyr)
# (3)遍历地图文档所有数据框的所有图层并将所有图层依次添加到每个数据框
# 谨慎操作，循环次数过多，ArcGIS容易崩溃
# import arcpy
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# ldfs = mapping.ListDataFrames(mxd)
# for ldf in ldfs:
#     print(ldf.name)
#     layers = mapping.ListLayers(mxd)
#     for lyr in layers:
#         mapping.AddLayer(ldf,lyr,"AUTO_ARRANGE")
#         arcpy.RefreshActiveView()
#         arcpy.RefreshTOC()
#         print(lyr.name)
# (4)将第二个数据框的图层添加到第一个数据框
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# ldf1 = mapping.ListDataFrames(mxd)[0]
# ldf2 = mapping.ListDataFrames(mxd)[1]
# for lyr in ldf2:
#     mapping.AddLayer(ldf1,lyr,"AUTO_ARRANGE")
# mxd.save(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new_AddLayer.mxd")  # 语句有问题
# print("添加完毕")



# 5 限制图层列表
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# ldfs = mapping.ListDataFrames(mxd)
# 输出Crime数据框以B开头的图层名
# for ldf in ldfs:
#     if(ldf.name == 'Crime'):
#         layers = mapping.ListLayers(mxd,"B*",ldf)
#         for lyr in layers:
#             print(lyr.name)
# 输出第一个数据框的所有图层名
# for lyr in ldfs[0]:
#     print(lyr.name)


# 6 缩放所选要素
# import arcpy
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# ldf = mapping.ListDataFrames(mxd)[0]
# lyr = mapping.ListLayers(mxd,"Burg*",ldf)[0]
# ldf.extent = lyr.getSelectedExtent()
# # ldf.zoomToSelectedFeatures()
# arcpy.RefreshActiveView()


# 7 改变地图范围
