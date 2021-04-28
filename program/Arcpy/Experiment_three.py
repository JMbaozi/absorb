# 实验内容
# 1、	使用ListTools()函数查看特定工具箱（例如分析工具箱）包含的工具；
# 2、	使用Clip_analysis()函数进行裁切分析；
# 3、 ☆使用脚本实现一个工具的输出作为另一个工具的输入（工具链）；
# 4、 ☆创建自定义地理处理工具实现从逗号分割的文本文件中读取数据，并将数据写入到已定义好的要素类中。


# 1 使用ListTools()函数查看特定工具箱（例如分析工具箱）包含的工具
import arcpy
tools = arcpy.ListTools('*_analysis')
for tool in tools:
    print(tool)

# 获取工具箱别名
import arcpy
boxlist = arcpy.ListToolboxes()
for box in boxlist:
    print(box)

# 2 使用Clip_analysis()函数进行裁切分析
import arcpy
in_feature = r'E:\ArcPyStudy\Data\ArcpyBook\data\CityOfSanAntonio.gdb\Burglary'
clip_feature = r'E:\ArcPyStudy\Data\ArcpyBook\Ch5\EdgewoodSD.shp'
out_feature_class = r'E:\ArcPyStudy\Data\ArcpyBook\Ch5\ClpBurglary2.shp'
arcpy.Clip_analysis(in_feature,clip_feature,out_feature_class)
print("Output Done")


# ☆3 使用脚本实现一个工具的输出作为另一个工具的输入（工具链）
import arcpy
arcpy.env.workspace = r'E:\ArcPyStudy\Data\ArcpyBook\data\TravisCounty'
streams = r'E:\ArcPyStudy\Data\ArcpyBook\data\TravisCounty\Streams.shp'
streamsBuffer = r'StreamsBuffer.shp'
distance = '2640 Feet'
schools2mile = 'Schools.shp'
schoolsLyrFile = 'Schools2Mile_lyr'
arcpy.Buffer_analysis(streams,streamsBuffer,distance,'FULL','ROUND','ALL')
arcpy.MakeFeatureLayer_management(schools2mile,schoolsLyrFile)
arcpy.SelectLayerByLocation_management(schoolsLyrFile,'INTERSECT',streamsBuffer)
print("Done")


# ☆4 创建自定义地理处理工具实现从逗号分割的文本文件中读取数据，并将数据写入到已定义好的要素类中。
import arcpy,os
try:
    # The Output Feature Class Name
    outputFC = arcpy.GetParameterAsText(0)
    # Template Feature Class
    fClassTemplate = arcpy.GetParameterAsText(1)
    # Get the file to open Path
    f_path = arcpy.GetParameterAsText(2)

    arcpy.CreateFeatureclass_management(
        os.path.split(outputFC)[0],
        os.path.split(outputFC)[1],
        'point',
        fClassTemplate)
    # open file to read
    with open(f_path,'r') as f:
        lstFires = f.readlines()
        cur = arcpy.InsertCursor(outputFC)
        cntr = 0
        for fire in lstFires[1:]:
            vals = fire.split(',')
            latitude = float(vals[0])
            longitude = float(vals[1])
            confid = int(vals[2])
            # create points
            point = arcpy.Point(longitude,latitude)
            feat = cur.newRow()
            feat.shape = point
            feat.setValue('CONFIDENCEVALUE',confid)
            cur.insertRow(feat)
            arcpy.AddMessage("Record number " + str(cntr) + "Written to Feature Class")
            cntr += 1
finally:
    del cur
    f.close()