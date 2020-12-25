# 提取dem_old.txt中的坐标值
all = ""
s = ""
with open('data/dem_old.txt','r',encoding='utf-8') as f:
    data = f.readlines()
    # print(data)
    for d in data:
        v = d.split(',')
        s = str(float(v[1])) + ' ' + str(float(v[2])) + ' ' + str(float(v[3])) + '\n'
        all += s
        s = ""

# print(all)

with open('data/dem.txt','w',encoding='utf-8') as f:
    f.write(all)

print('提取完成！')