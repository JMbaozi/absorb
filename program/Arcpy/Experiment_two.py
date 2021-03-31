# 实验内容
# 1、	创建布局元素的列表；
# 2、	为布局元素指定唯一名称；
# 3、	限制返回的布局元素；
# 4、	更新布局元素的属性；
# 5、	导出地图为PDF文件
# 6、	导出地图为图像文件；
# 7、	导出报表。


# 1 创建布局元素的列表
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# for el in mapping.ListLayoutElements(mxd):
#     if el.name != "":
#         print(el.name)


# 3 限制返回的布局元素
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# for el in mapping.ListLayoutElements(mxd,"LEGEND_ELEMENT","*Crime*"):
#     print(el.name)


# 4 更新布局元素的属性
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# elLeg = mapping.ListLayoutElements(mxd,"LEGEND_ELEMENT","*Crime*")[0]
# elLeg.title = "Crime by School District"
# for item in elLeg.listLegendItemLayers():
#     print(item.name)


# 5 导出地图为PDF文件
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# mapping.ExportToPDF(mxd,r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.pdf")
# print("Export Done")


# 6 导出地图为图像文件
# import arcpy.mapping as mapping
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# for df in mapping.ListDataFrames(mxd):
#     if df.name == "Crime":
#         mapping.ExportToJPEG(mxd,r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.jpg",df)
# print("Export Done")


# 7 导出报表
# 报错
# import arcpy.mapping as mapping 
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# # df = mapping.ListDataFrames(mxd)[0]
# # lyr = mapping.ListLayers(mxd,"Crime*",df)[0]
# layer = mapping.Layer(r"E:\ArcPyStudy\Data\ArcpyBook\data\School_Districts.lyr")
# mapping.ExportReport(layer,
#                     r"E:\ArcPyStudy\Data\ArcpyBook\Ch4\CrimeReport.rlf",
#                     r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new_ExportReport.pdf")
# print("Export Done")


# import arcpy.mapping as mapping 
# mxd = mapping.MapDocument(r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2_new.mxd")
# df = mapping.ListDataFrames(mxd)[0]
# lyr = mapping.ListLayers(mxd,"Crime*",df)[0]
# print(lyr.name)
