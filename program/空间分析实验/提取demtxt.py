
all = ""
with open('dem_old.txt','r',encoding='utf-8') as f:
    data = f.readlines()
    # print(data)
    for d in data:
        v = d.split(',')
        s = str(int(v[1])) + ' ' + str(int(v[2])) + ' ' + str(int(v[3])) + '\n'
        all += s

# print(all)

with open('dem.txt','w',encoding='utf-8') as f:
    f.write(all)

print('提取完成！')