
"""
@教程地址：https://github.com/jackfrued/Python-100-Days/blob/master/Day01-15/12.%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%92%8C%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F.md
@正则表达式入门：https://deerchao.cn/tutorials/regex/regex.htm
"""
"""
符号             解释           示例      说明
.	            匹配任意字符	b.t	可以匹配bat / but / b#t / b1t等
\w	            匹配字母/数字/下划线	b\wt	可以匹配bat / b1t / b_t等,但不能匹配b#t
\s	            匹配空白字符（包括\r、\n、\t等）	love\syou	可以匹配love you
\d	            匹配数字	\d\d	可以匹配01 / 23 / 99等
\b	            匹配单词的边界	\bThe\b	
^	            匹配字符串的开始	^The	可以匹配The开头的字符串
$	            匹配字符串的结束	.exe$	可以匹配.exe结尾的字符串
\W	            匹配非字母/数字/下划线	b\Wt	可以匹配b#t / b@t等,但不能匹配but / b1t / b_t等
\S	            匹配非空白字符	love\Syou	可以匹配love#you等,但不能匹配love you
\D	            匹配非数字	\d\D	可以匹配9a / 3# / 0F等
\B	            匹配非单词边界	\Bio\B	
[]	            匹配来自字符集的任意单一字符	[aeiou]	可以匹配任一元音字母字符
[^]	            匹配不在字符集中的任意单一字符	[^aeiou]	可以匹配任一非元音字母字符
*	            匹配0次或多次	\w*	
+	            匹配1次或多次	\w+	
?	            匹配0次或1次	\w?	
{N}	            匹配N次	\w{3}	
{M,}	        匹配至少M次	\w{3,}	
{M,N}	        匹配至少M次至多N次	\w{3,6}	
|	            分支	foo|bar	可以匹配foo或者bar
(?#)	        注释		
(exp)	        匹配exp并捕获到自动命名的组中		
(? <name>exp)	匹配exp并捕获到名为name的组中		
(?:exp)	        匹配exp但是不捕获匹配的文本		
(?=exp)	        匹配exp前面的位置	\b\w+(?=ing)	可以匹配I'm dancing中的danc
(?<=exp)	    匹配exp后面的位置	(?<=\bdanc)\w+\b	可以匹配I love dancing and reading中的第一个ing
(?!exp)	        匹配后面不是exp的位置		
(?<!exp)	    匹配前面不是exp的位置		
*?	            重复任意次，但尽可能少重复	a.*b
a.*?b	        将正则表达式应用于aabab，前者会匹配整个字符串aabab，后者会匹配aab和ab两个字符串
+?	            重复1次或多次，但尽可能少重复		
??	            重复0次或1次，但尽可能少重复		
{M,N}?	        重复M到N次，但尽可能少重复		
{M,}?	        重复M次以上，但尽可能少重复		

函数                                             说明                                     
compile(pattern, flags=0)	                    编译正则表达式返回正则表达式对象
match(pattern, string, flags=0)	                用正则表达式匹配字符串 成功返回匹配对象 否则返回None
search(pattern, string, flags=0)	            搜索字符串中第一次出现正则表达式的模式 成功返回匹配对象 否则返回None
split(pattern, string, maxsplit=0, flags=0)	    用正则表达式指定的模式分隔符拆分字符串 返回列表
sub(pattern, repl, string, count=0, flags=0)	用指定的字符串替换原字符串中与正则表达式匹配的模式 可以用count指定替换的次数
fullmatch(pattern, string, flags=0)	            match函数的完全匹配（从字符串开头到结尾）版本
findall(pattern, string, flags=0)	            查找字符串所有与正则表达式匹配的模式 返回字符串的列表
finditer(pattern, string, flags=0)	            查找字符串所有与正则表达式匹配的模式 返回一个迭代器
purge()	                                        清除隐式编译的正则表达式的缓存
re.I / re.IGNORECASE	                        忽略大小写匹配标记
re.M / re.MULTILINE	                            多行匹配标记
"""


"""
Part 1:
验证输入用户名和QQ号是否有效
要求：用户名必须由字母、数字或下划线构成且长度在6~20个字符
      QQ号是5~12位数字且首位不能为0
Ps：
书写正则表达式时使用了“原始字符串”的写法（在字符串前面加上了r），
所谓“原始字符串”就是字符串中的每个字符都是它原始的意义，说得更直接
一点就是字符串中没有所谓的转义字符啦。因为正则表达式中有很多元字符和
需要进行转义的地方，如果不使用原始字符串就需要将反斜杠写作\\，例如表示
数字的\d得书写成\\d，这样不仅写起来不方便，阅读的时候也会很吃力。

Part 2:
从一段文字中提取出国内手机号码。
Ps:
截至2017年底，国内三家运营商推出的手机号段：
电信：133/153/180/181/189/177；
联通：130/131/132/155/156/185/186/145/176；
移动：134/135/136/137/138/139/150/151/152/158/159/182/183/184/187/188/147/178
匹配国内手机号的正则表达式并不够好，因为像14开头的号码只有145或147，
而上面的正则表达式并没有考虑这种情况，要匹配国内手机号，更好的正则表达式的
写法是：(?<=\D)(1[38]\d{9}|14[57]\d{8}|15[0-35-9]\d{8}|17[678]\d{8})(?=\D)，
国内最近好像有19和16开头的手机号了，但是这个暂时不在我们考虑之列。

Part 3:
替换字符串中的不良内容
Ps:
 re模块的正则表达式相关函数中都有一个flags参数，它代表了正则表达式的匹配标记，
 可以通过该标记来指定匹配时是否忽略大小写、是否进行多行匹配、是否显示调试信息等。
 如果需要为flags参数指定多个值，可以使用按位或运算符进行叠加，如flags=re.I | re.M。

Part 4:
拆分长字符串
"""

"""
#Part 1
import re

def main():
    username = input("请输入用户名：")
    qq = input("请输入QQ：")
    # match函数的第一个参数是正则表达式字符串或正则表达式对象
    # 第二个参数是要跟正则表达式做匹配的字符串对象
    match1=re.match(r'^[0-9a-zA-Z_]{6,20}$',username)
    if not match1:
        print("用户名无效！")
    match2=re.match(r'^[1-9]\d{4,11}$',qq)
    if not match2:
        print("QQ无效！")
    if match1 and match2:
        print("信息有效！")

if __name__ == '__main__':
    main()

"""


"""
#Part 2
import re

def main():
    # 创建正则表达式对象 使用了前瞻和回顾来保证手机号前后不应该出现数字
    pattern = re.compile(r'(?<=\D)1[34578]\d{9}(?=\D)')
    sentence = '''
    重要的事情说8130123456789遍，我的手机号是13512346789这个靓号，
    不是15600998765，也是110或119，王大锤的手机号才是15600998765。
    '''
    # 查找所有匹配并保存到一个列表中
    mylist = re.findall(pattern,sentence)
    print(mylist)
    print('--------华丽的分隔线--------')
    # 通过迭代器取出匹配对象并获得匹配的内容
    for temp in pattern.finditer(sentence):
        print(temp.group())
    print('--------华丽的分隔线--------')
    # 通过search函数指定搜索位置找出所有匹配
    m = pattern.search(sentence)
    while m:
        print(m.group())
        m = pattern.search(sentence,m.end())

if __name__ == '__main__':
    main()

"""

"""
#Part 3
import re

def main():
    pattern = re.compile(r'[操肏艹]|fuck|shit|傻[比屄逼叉缺吊屌]|煞笔',flags = re.IGNORECASE) #flags = re.IGNORECASE:忽略大小写
    sentence = '你丫是傻叉吗? 我操你大爷的. Fuck you.'
    purified = re.sub(pattern,'*',sentence) 
    print(purified)

if __name__ == '__main__':
    main()

"""

"""
#Part 4
import re

def main():
    poem = '床前明月光，疑是地上霜。举头望明月，低头思故乡。'
    sentence_list = re.split(r'[,.，。]',poem)
    while '' in sentence_list:
        sentence_list.remove('')
    print(sentence_list)

if __name__ == '__main__':
    main()

"""