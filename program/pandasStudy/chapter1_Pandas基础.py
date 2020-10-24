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
# s = df.mean()
# s.name = 'to_DataFranme'
# print(s)
# print(s.to_frame())
# print(s.to_frame().T)#使用T符号可以转置

#### 常用基本函数
df = pd.read_csv('data/table.csv')
# print(df)
# print(df.head())
# print(df.tail())
# print(df.head(7))
# print(df['Physics'].unique())#显示所有的唯一值
# print(df['Physics'].count())#返回非缺失值元素个数
# print(df['Physics'].value_counts())#返回每个元素有多少个
# print(df.info())#返回有哪些列、有多少非缺失值、每列的类型
# print(df.describe())#默认统计数值型数据的各个统计量
# print(df.describe(percentiles=[.05, .25, .75, .95]))#可以自行选择分位数
# print(df['Physics'].describe())#对于非数值型也可以用describe函数
# print(df['Math'].idxmax())#idxmax函数返回最大值所在索引，在某些情况下特别适用，idxmin功能类似
# print(df['Math'].idxmin())
# print(df['Math'].nlargest(3))#nlargest函数返回前几个大的元素值，nsmallest功能类似
# print(df['Math'].nsmallest(3))
# print(df['Math'].head())
# print(df['Math'].clip(33,80).head())#clip是对超过或者低于某些值的数进行截断
# print(df['Address'].head())
# print(df['Address'].replace(['street_1','street_2'],['one','two']).head())#replace是对某些值进行替换
# print(df.replace({'Address':{'street_1':'one','street_2':'two'}}).head())#通过字典，可以直接在表中修改
# print(df['Math'].apply(lambda x:str(x)+'!').head()) #可以使用lambda表达式，也可以使用函数
# print(df.apply(lambda x:x.apply(lambda x:str(x)+'!')).head()) #这是一个稍显复杂的例子，有利于理解apply的功能

#### 排序
# 索引排序
# print(df.set_index('Math').head())##set_index函数可以设置索引
# print(df.set_index('Math').sort_index().head())#可以设置ascending参数，默认为升序，True
# 值排序
# print(df.sort_values(by='Class').head())
# print(df.sort_values(by=['Address','Height']).head())#多个值排序，即先对第一层排，在第一层相同的情况下对第二层排序