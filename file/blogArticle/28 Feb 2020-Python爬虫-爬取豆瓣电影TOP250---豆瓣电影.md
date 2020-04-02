[<article class="markdown-body">
<blockquote>
<p>之前挖的动态网页爬虫坑一直没有填，现在也不想填。。。</p>
</blockquote>
<blockquote>
<p>碰巧看到了这篇<a href="https://cloud.tencent.com/developer/article/1404219">教程</a>，就学习了一下。</p>
</blockquote>
<blockquote>
<p>这次就不加详细注释了，只加部分说明性的注释。有不懂的地方可以联系我。</p>
</blockquote>
<p>我将获得的结果写入了txt文件中</p>
<ul>
<li><a href="https://github.com/JMbaozi/absorb/blob/master/Blog/program/%E8%B1%86%E7%93%A3%E7%94%B5%E5%BD%B1TOP250.py">代码下载</a></li>
<li><a href="https://github.com/JMbaozi/absorb/blob/master/Blog/file/%E8%B1%86%E7%93%A3%E7%94%B5%E5%BD%B1TOP250.txt">txt下载</a></li>
</ul>
<blockquote>
<p>这只实现了获取电影名称的功能，后续再写评分、评论什么的（又挖坑。。。）</p>
</blockquote>
<p>我在第一个博客中写了爬取静态网页图片的代码，其中用BeautifulSoup对总页数进行了解析，共44页，其实这一步是多余的，因为可以很清晰的看到一共就44页。。。
所以这次我直接循环10次来爬这10页的电影名。</p>
<h4 id="代码">代码</h4>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="s">"""
https://movie.douban.com/top250?start=0&amp;filter=
"""</span>

<span class="kn">import</span> <span class="nn">re</span><span class="p">,</span><span class="n">requests</span><span class="p">,</span><span class="n">lxml</span>
<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
<span class="k">def</span> <span class="nf">get_movies</span><span class="p">():</span>
    <span class="n">movies_list</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="n">headers</span> <span class="o">=</span> <span class="p">{</span>
        <span class="s">'User-Agent'</span><span class="p">:</span> <span class="s">'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.26 Safari/537.36 Edg/81.0.416.16'</span><span class="p">,</span>
        <span class="s">'Host'</span><span class="p">:</span><span class="s">'movie.douban.com'</span>
    <span class="p">}</span>
    <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">10</span><span class="p">):</span>
        <span class="n">link</span> <span class="o">=</span> <span class="s">'https://movie.douban.com/top250?start='</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">i</span><span class="o">*</span><span class="mi">25</span><span class="p">)</span> <span class="o">+</span> <span class="s">'&amp;filter='</span>    <span class="c1">#从网址中可以很明显的发现，'start='的结果为i*25
</span>        <span class="n">r</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">link</span><span class="p">,</span><span class="n">headers</span><span class="o">=</span><span class="n">headers</span><span class="p">,</span><span class="n">timeout</span> <span class="o">=</span> <span class="mi">10</span><span class="p">)</span>     <span class="c1">#获得当前页的html内容
</span>        <span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">r</span><span class="o">.</span><span class="n">text</span><span class="p">,</span><span class="s">'lxml'</span><span class="p">)</span>     <span class="c1">#对当前页的内容进行解析
</span>        <span class="n">div_list</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'div'</span><span class="p">,</span><span class="n">class_</span><span class="o">=</span><span class="s">'hd'</span><span class="p">)</span>
        <span class="k">for</span> <span class="n">each</span> <span class="ow">in</span> <span class="n">div_list</span><span class="p">:</span>
            <span class="c1">#movie = re.findall("&lt;span class ='title'&gt;(.*?)&lt;/span&gt;",each.text).strip()
</span>            <span class="n">movie</span> <span class="o">=</span> <span class="n">each</span><span class="o">.</span><span class="n">a</span><span class="o">.</span><span class="n">span</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span>    <span class="c1">#获取电影名，并清除多余的空格
</span>            <span class="n">movies_list</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">movie</span><span class="p">)</span>
    <span class="k">return</span> <span class="n">movies_list</span>

<span class="n">movies</span> <span class="o">=</span> <span class="n">get_movies</span><span class="p">()</span>
<span class="k">print</span><span class="p">(</span><span class="n">movies</span><span class="p">)</span>

<span class="c1">#将movies列表写入 豆瓣电影TOP250.txt
</span><span class="n">number</span> <span class="o">=</span> <span class="mi">1</span>      <span class="c1">#排名
</span><span class="nb">file</span> <span class="o">=</span> <span class="nb">open</span><span class="p">(</span><span class="s">'E:</span><span class="se">\\</span><span class="s">blog</span><span class="se">\\</span><span class="s">program</span><span class="se">\\</span><span class="s">豆瓣TOP250.txt'</span><span class="p">,</span><span class="s">'w'</span><span class="p">)</span>
<span class="k">for</span> <span class="n">each</span> <span class="ow">in</span> <span class="n">movies</span><span class="p">:</span>
    <span class="nb">file</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="nb">str</span><span class="p">(</span><span class="n">number</span><span class="p">)</span><span class="o">+</span><span class="s">'：'</span><span class="o">+</span><span class="n">each</span><span class="p">)</span>
    <span class="nb">file</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="s">'</span><span class="se">\n</span><span class="s">'</span><span class="p">)</span>
    <span class="n">number</span><span class="o">+=</span><span class="mi">1</span>
<span class="nb">file</span><span class="o">.</span><span class="n">close</span><span class="p">()</span>
<span class="k">print</span><span class="p">(</span><span class="s">'写入完成！'</span><span class="p">)</span>
    
</code></pre></div></div>
<h4 id="结果">结果</h4>
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>1：肖申克的救赎
2：霸王别姬
3：阿甘正传
4：这个杀手不太冷
5：美丽人生
6：泰坦尼克号
7：千与千寻
8：辛德勒的名单
9：盗梦空间
10：忠犬八公的故事
11：海上钢琴师
12：机器人总动员
13：三傻大闹宝莱坞
14：楚门的世界
15：放牛班的春天
16：星际穿越
17：大话西游之大圣娶亲
18：熔炉
19：疯狂动物城
20：无间道
21：龙猫
22：教父
23：当幸福来敲门
24：怦然心动
25：触不可及
26：蝙蝠侠：黑暗骑士
27：控方证人
28：活着
29：乱世佳人
30：末代皇帝
31：摔跤吧！爸爸
32：寻梦环游记
33：少年派的奇幻漂流
34：指环王3：王者无敌
35：飞屋环游记
36：十二怒汉
37：鬼子来了
38：天空之城
39：何以为家
40：大话西游之月光宝盒
41：哈尔的移动城堡
42：天堂电影院
43：素媛
44：罗马假日
45：闻香识女人
46：辩护人
47：搏击俱乐部
48：哈利·波特与魔法石
49：死亡诗社
50：窃听风暴
51：教父2
52：狮子王
53：指环王2：双塔奇兵
54：我不是药神
55：大闹天宫
56：两杆大烟枪
57：指环王1：魔戒再现
58：飞越疯人院
59：美丽心灵
60：饮食男女
61：V字仇杀队
62：黑客帝国
63：猫鼠游戏
64：钢琴家
65：本杰明·巴顿奇事
66：看不见的客人
67：让子弹飞
68：海豚湾
69：西西里的美丽传说
70：情书
71：拯救大兵瑞恩
72：小鞋子
73：美国往事
74：音乐之声
75：穿条纹睡衣的男孩
76：致命魔术
77：七宗罪
78：低俗小说
79：沉默的羔羊
80：被嫌弃的松子的一生
81：蝴蝶效应
82：绿皮书
83：春光乍泄
84：禁闭岛
85：心灵捕手
86：布达佩斯大饭店
87：勇敢的心
88：剪刀手爱德华
89：海蒂和爷爷
90：阿凡达
91：天使爱美丽
92：摩登时代
93：加勒比海盗
94：致命ID
95：喜剧之王
96：断背山
97：幽灵公主
98：杀人回忆
99：入殓师
100：狩猎
101：阳光灿烂的日子
102：重庆森林
103：第六感
104：请以你的名字呼唤我
105：小森林 夏秋篇
106：哈利·波特与死亡圣器(下)
107：消失的爱人
108：7号房的礼物
109：玛丽和马克思
110：红辣椒
111：爱在黎明破晓前
112：告白
113：一一
114：侧耳倾听
115：小森林 冬春篇
116：大鱼
117：阳光姐妹淘
118：射雕英雄传之东成西就
119：蝙蝠侠：黑暗骑士崛起
120：唐伯虎点秋香
121：超脱
122：倩女幽魂
123：甜蜜蜜
124：驯龙高手
125：恐怖直播
126：萤火之森
127：菊次郎的夏天
128：幸福终点站
129：爱在日落黄昏时
130：超能陆战队
131：无人知晓
132：借东西的小人阿莉埃蒂
133：神偷奶爸
134：怪兽电力公司
135：风之谷
136：玩具总动员3
137：完美的世界
138：上帝之城
139：血战钢锯岭
140：电锯惊魂
141：傲慢与偏见
142：时空恋旅人
143：喜宴
144：谍影重重3
145：教父3
146：岁月神偷
147：英雄本色
148：七武士
149：被解救的姜戈
150：疯狂原始人
151：功夫
152：真爱至上
153：三块广告牌
154：萤火虫之墓
155：心迷宫
156：哪吒闹海
157：纵横四海
158：天书奇谭
159：我是山姆
160：达拉斯买家俱乐部
161：爆裂鼓手
162：东邪西毒
163：记忆碎片
164：贫民窟的百万富翁
165：荒蛮故事
166：黑天鹅
167：头号玩家
168：花样年华
169：你的名字。
170：卢旺达饭店
171：人生果实
172：釜山行
173：雨人
174：忠犬八公物语
175：头脑特工队
176：模仿游戏
177：一个叫欧维的男人决定去死
178：黑客帝国3：矩阵革命
179：你看起来好像很好吃
180：无敌破坏王
181：未麻的部屋
182：恋恋笔记本
183：冰川时代
184：海边的曼彻斯特
185：二十二
186：海街日记
187：哈利·波特与阿兹卡班的囚徒
188：虎口脱险
189：新世界
190：房间
191：雨中曲
192：恐怖游轮
193：人工智能
194：魔女宅急便
195：惊魂记
196：哈利·波特与密室
197：海洋
198：奇迹男孩
199：疯狂的石头
200：罗生门
201：燃情岁月
202：终结者2：审判日
203：穿越时空的少女
204：魂断蓝桥
205：爱在午夜降临前
206：初恋这件小事
207：可可西里
208：2001太空漫游
209：完美陌生人
210：牯岭街少年杀人事件
211：绿里奇迹
212：小偷家族
213：阿飞正传
214：香水
215：无耻混蛋
216：谍影重重2
217：猜火车
218：新龙门客栈
219：谍影重重
220：战争之王
221：青蛇
222：源代码
223：地球上的星星
224：城市之光
225：血钻
226：浪潮
227：朗读者
228：彗星来的那一夜
229：步履不停
230：疯狂的麦克斯4：狂暴之路
231：遗愿清单
232：色，戒
233：大佛普拉斯
234：再次出发之纽约遇见你
235：小萝莉的猴神大叔
236：追随
237：东京物语
238：聚焦
239：一次别离
240：驴得水
241：黑鹰坠落
242：我爱你
243：发条橙
244：千钧一发
245：E.T. 外星人
246：撞车
247：网络谜踪
248：四个春天
249：梦之安魂曲
250：变脸
</code></pre></div></div>
<p><img alt="" src="https://lz.sinaimg.cn/orj1080/ebeef3aaly3gcecjlomm1j20rq0jlacz.jpg"/></p>
</article>]