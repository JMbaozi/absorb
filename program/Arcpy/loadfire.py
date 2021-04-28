# The ArcTool's script of WildfireToll

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