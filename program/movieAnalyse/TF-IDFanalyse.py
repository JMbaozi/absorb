from jieba.analyse import *

keyWord = []
Weight = []
def getData():
    with open('movieComments.txt',encoding = 'utf-8') as f:
        data = f.read()
    for keyword, weight in extract_tags(data, topK=100, withWeight=True):
        keyWord.append(keyword)
        Weight.append(weight)

def saveData(keyWord,Weight):
    with open('TF-IDFanalyse.txt','w') as f:
        for i in range(len(keyWord)):
            f.write(str(i+1)+'.'+str(keyWord[i])+' '+str(Weight[i]))
            f.write('\n')

if __name__ == '__main__':
    getData()
    saveData(keyWord,Weight)
    print('保存成功！')

