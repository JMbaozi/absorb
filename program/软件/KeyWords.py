from jieba.analyse import *
import os

def DataAnalyse(data):
    keyWord = []
    Weight = []
    for keyword, weight in extract_tags(data, topK=100, withWeight=True):
        keyWord.append(keyword)
        Weight.append(weight)
    print("关键词分析完成。")
    return keyWord,Weight

def saveData(keyWord,Weight):
    with open('TF-IDFanalyse.txt','w') as f:
        for i in range(len(keyWord)):
            f.write(str(i+1)+'.'+str(keyWord[i])+' '+str(Weight[i]))
            f.write('\n')


