import arcpy
from arcpy import mapping
path=r"E:\ArcPyStudy\Data\ArcpyBook\Ch2\Crime_Ch2.mxd"
mxd=arcpy.mapping.MapDocument(path)
layers=mapping.ListLayers(mxd)
for lyr in layers:
    print(lyr)