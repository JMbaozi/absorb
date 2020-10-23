from numpy.core.defchararray import index
import pandas as pd
import numpy as np
from pandas.core.arrays.sparse import dtype

#### 文件读取与写入

# #读取
# df_csv = pd.read_csv('data/table.csv')
# # print(df_csv)
# df_txt = pd.read_table('data/table.txt')
# # print(df_txt)
# df_excel = pd.read_excel('data/table.xlsx')
# # print(df_excel)

# #写入
# df_csv.to_csv('data/new_table.csv')
# #df.to_csv('data/new_table.csv', index=False) #保存时除去行索引
# df_csv.to_excel('data/new_table2.xlsx',sheet_name = 'Sheet1')

#### 基本数据结构

# Series
#对于一个Series，其中最常用的属性为值（values），索引（index），名字（name），类型（dtype）
s = pd.Series(np.random.randn(5),index = ['a','b','c','d','e'],name = "这是一个Series",dtype = 'float64')
# print(s)
# print(s.values)
# print(s.index)
# print(s.name)
# print(s.dtype)
# print(s['a'])
# print(s.mean())

# DataFrame
df = pd.DataFrame({'col1':list('abcde'),'col2':range(5,10),'col3':[1.3,2.5,3.6,4.6,5.8]},
                    index = list('一二三四五'))
# print(df)
# print(df['col1'])
# print(type(df))
# print(type(df['col1']))
#修改行或列名
# df.rename(index={'一':'one'},columns={'col1':'new_col1'})
# print(df)
# print(df.index)
# print(df.columns)
# print(df.values)
# print(df.shape)
# print(df.mean())
#索引对齐特性
# df1 = pd.DataFrame({'A':[1,2,3]},index=[1,2,3])
# df2 = pd.DataFrame({'A':[1,2,3]},index=[3,1,2])
# print(df2)
# print(df1)
# print(df1 - df2)    #由于索引对齐，因此结果不是0
#列的删除与添加
# print(df.drop(index = '五',columns='col1'))#设置inplace=True后会直接在原DataFrame中改动
# print(df)
# df['col4'] = [1,2,3,4,5]# 增加新列col4
# print(df)
# del df['col4']
# print(df)
# df['col5'] = [1,2,3,4,5]
# print(df)
# test = df.pop('col5')
# print(test)
# print(df)
# df1['B'] = list('abc')#会对原DataFrame做修改
# print(df1.assign(C=pd.Series(list('def'))))#不会对原DataFrame做修改
# print(df1)
# 根据类型选择列
# print(df.select_dtypes(include=['number']))
# print(df.select_dtypes(include=['float']))
# 将Series转换为DataFrame
s = df.mean()
s.name = 'to_DataFranme'
print(s)
print(s.to_frame())
print(s.to_frame().T)#使用T符号可以转置