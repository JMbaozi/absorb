# 实验内容
# 1、	使用ListFeatureClasses()函数返回要素类的列表；
# 2、	使用ListFields()函数返回要素类的字段列表；
# 3、	使用Describe()函数返回要素类的形状类型、字段、范围等描述性信息；
# 4、	使用Describe()函数返回栅格数据的范围、空间参考等描述性信息。


# 1 使用ListFeatureClasses()函数返回要素类的列表
import arcpy
arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
fcList = arcpy.ListFeatureClasses('C*','Polygon')   # C开头且数据类型为Polygon的要素类
for fc in fcList:
    print(fc)


# 2 使用ListFields()函数返回要素类的字段列表
import arcpy
arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb"
fieldList = arcpy.ListFields('Burglary')
for fld in fieldList:
    print('%s is a type of %s with a length of %i' % (fld.name,fld.type,fld.length))


# 3 使用Describe()函数返回要素类的形状类型、字段、范围等描述性信息；
import arcpy
arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\New_Data\CityOfSanAntonio_Personal.mdb"
try:
    descFC = arcpy.Describe("SchoolDistricts")
    print("The shape type is: " + descFC.ShapeType)
    flds = descFC.fields
    for fld in flds:
        print("Field: " + fld.name)
        print("Type: " + fld.type)
        print("Length: " + str(fld.length))
    ext = descFC.extent
    print("XMin: %f" % ext.XMin)
    print("YMin: %f" % ext.YMin)
    print("XMax: %f" % ext.XMax)
    print("YMax: %f" % ext.YMax)
except:
    print(arcpy.GetMessages)


# 4 使用Describe()函数返回栅格数据的范围、空间参考等描述性信息。
import arcpy
arcpy.env.workspace = r"E:\ArcPyStudy\Data\ArcpyBook\data"
try:
    descRaster = arcpy.Describe("AUSTIN_EAST_NW.sid")
    ext = descRaster.extent
    print("XMin: %f" % ext.XMin)
    print("YMin: %f" % ext.YMin)
    print("XMax: %f" % ext.XMax)
    print("YMax: %f" % ext.YMax)

    sr = descRaster.SpatialReference
    print("name: " + sr.name)
    print("type: " + sr.type)
except Exception as e:
    print(e.message)