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
