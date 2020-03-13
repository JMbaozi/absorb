[<article class="markdown-body">
<p>之前都是拿别人的网站练手，今天看着无聊的网课，就想爬一下自己的博客🙃</p>
<p>萌生这个想法的时候就想到了姬无命的经典台词：
<img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/20200310130733.png"/>
<img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/1583816438940.png"/></p>
<ul>
<li>
<p>程序：<a href="https://github.com/JMbaozi/absorb/blob/master/Blog/program/blogArchive.py">blogArchive.py</a></p>
</li>
<li>
<p>结果：<a href="https://github.com/JMbaozi/absorb/blob/master/Blog/file/blogArchive.txt">blogArchive.txt</a></p>
</li>
</ul>
<p>一共24篇博客，每条记录都包括了时间、标题、副标题和标签</p>
<h4 id="代码">代码</h4>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="s">"""
爬取jmbaozi.top博客信息
时间：2020.3.10  12:46
"""</span>

<span class="kn">import</span> <span class="nn">requests</span>
<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>
<span class="kn">import</span> <span class="nn">lxml</span>

<span class="n">url</span> <span class="o">=</span> <span class="s">'https://jmbaozi.top/'</span>
<span class="n">headers</span> <span class="o">=</span> <span class="p">{</span>
    <span class="s">'User-Agent'</span><span class="p">:</span><span class="s">'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.43 Safari/537.36 Edg/81.0.416.28'</span>
<span class="p">}</span>
<span class="n">blog_tilte</span> <span class="o">=</span> <span class="p">[]</span><span class="c1">#标题
</span><span class="n">blog_subtitle</span> <span class="o">=</span> <span class="p">[]</span><span class="c1">#副标题
</span><span class="n">blog_tag</span> <span class="o">=</span> <span class="p">[]</span><span class="c1">#标签
</span><span class="n">blog_time</span> <span class="o">=</span> <span class="p">[]</span><span class="c1">#时间
</span><span class="n">page_number</span> <span class="o">=</span> <span class="mi">4</span><span class="c1">#博客页数
</span>
<span class="c1">#获取信息
</span><span class="k">def</span> <span class="nf">get_data</span><span class="p">():</span>
    <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span><span class="n">page_number</span><span class="o">+</span><span class="mi">1</span><span class="p">):</span>
        <span class="k">if</span> <span class="n">i</span><span class="o">==</span><span class="mi">1</span><span class="p">:</span>
            <span class="n">link</span> <span class="o">=</span> <span class="n">url</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="n">link</span> <span class="o">=</span> <span class="n">url</span> <span class="o">+</span> <span class="s">'page'</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">i</span><span class="p">)</span>
        <span class="n">r</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">link</span><span class="p">,</span><span class="n">headers</span> <span class="o">=</span> <span class="n">headers</span><span class="p">)</span>
        <span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">r</span><span class="o">.</span><span class="n">text</span><span class="p">,</span><span class="s">'lxml'</span><span class="p">)</span>
        <span class="n">title_list</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'section'</span><span class="p">,</span><span class="n">class_</span><span class="o">=</span><span class="s">'post-preview'</span><span class="p">)</span><span class="c1">#标题&amp;副标题
</span>        <span class="k">for</span> <span class="n">each</span> <span class="ow">in</span> <span class="n">title_list</span><span class="p">:</span>
            <span class="n">title</span> <span class="o">=</span> <span class="n">each</span><span class="o">.</span><span class="n">h2</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span>
            <span class="n">subtitle</span> <span class="o">=</span> <span class="n">each</span><span class="o">.</span><span class="n">h3</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span>
            <span class="n">blog_tilte</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">title</span><span class="p">)</span>
            <span class="n">blog_subtitle</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">subtitle</span><span class="p">)</span>
        <span class="n">tag_list</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'div'</span><span class="p">,</span><span class="n">class_</span><span class="o">=</span><span class="s">'post-tags'</span><span class="p">)</span><span class="c1">#标签
</span>        <span class="k">for</span> <span class="n">each</span> <span class="ow">in</span> <span class="n">tag_list</span><span class="p">:</span>
            <span class="n">tag</span> <span class="o">=</span> <span class="n">each</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span>
            <span class="n">tag</span> <span class="o">=</span><span class="n">tag</span><span class="o">.</span><span class="n">replace</span><span class="p">(</span><span class="s">'</span><span class="se">\n</span><span class="s">'</span><span class="p">,</span><span class="s">'  '</span><span class="p">)</span><span class="c1">#将回车替换为空格
</span>            <span class="n">blog_tag</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">tag</span><span class="p">)</span>
        <span class="n">time_list</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'time'</span><span class="p">,</span><span class="n">class_</span><span class="o">=</span><span class="s">'post-date'</span><span class="p">)</span><span class="c1">#时间
</span>        <span class="k">for</span> <span class="n">each</span> <span class="ow">in</span> <span class="n">time_list</span><span class="p">:</span>
            <span class="n">time</span> <span class="o">=</span> <span class="n">each</span><span class="o">.</span><span class="n">text</span><span class="o">.</span><span class="n">strip</span><span class="p">()</span>
            <span class="n">blog_time</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">time</span><span class="p">)</span>

<span class="c1">#写入信息
</span><span class="k">def</span> <span class="nf">write_data</span><span class="p">():</span>
    <span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="s">'blogArchive.txt'</span><span class="p">,</span><span class="s">'w'</span><span class="p">,</span><span class="n">encoding</span> <span class="o">=</span> <span class="s">'utf-8'</span><span class="p">)</span> <span class="k">as</span> <span class="nb">file</span><span class="p">:</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">blog_tilte</span><span class="p">)):</span>
            <span class="nb">file</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="n">blog_time</span><span class="p">[</span><span class="n">i</span><span class="p">]</span><span class="o">+</span><span class="s">': '</span><span class="o">+</span><span class="n">blog_tilte</span><span class="p">[</span><span class="n">i</span><span class="p">]</span><span class="o">+</span><span class="s">'---'</span><span class="o">+</span><span class="n">blog_subtitle</span><span class="p">[</span><span class="n">i</span><span class="p">]</span><span class="o">+</span><span class="s">'     Tags: '</span><span class="o">+</span><span class="n">blog_tag</span><span class="p">[</span><span class="n">i</span><span class="p">])</span>
            <span class="nb">file</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="s">'</span><span class="se">\n\n</span><span class="s">'</span><span class="p">)</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">get_data</span><span class="p">()</span>
    <span class="n">write_data</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'写入完成！'</span><span class="p">)</span>


</code></pre></div></div>
<h4 id="结果">结果</h4>
<div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code>09 Mar 2020: 阿里云ECS服务器部署---部署&amp;踩坑     Tags: 服务器  网站  域名

08 Mar 2020: 物理-第2章习题---习题精炼     Tags: 物理  学习

03 Mar 2020: LeetCode刷题历程---菜鸟写BUG     Tags: Python  技术  学习

03 Mar 2020: Github+jsDelivr+PicGo 打造稳定快速、高效免费图床---高速免费图床     Tags: 杂谈  图床

02 Mar 2020: 阿里云白嫖一年服务器---ECS服务器免费领     Tags: 杂谈  服务器

02 Mar 2020: 成果斗鱼直播截图(续)---属实拉跨     Tags: 成果  直播

01 Mar 2020: 物理-第1章习题---习题精炼     Tags: 物理  学习

28 Feb 2020: Python爬虫-爬取豆瓣电影TOP250---豆瓣电影     Tags: Python  技术

26 Feb 2020: 成果斗鱼直播截图---人人都是赵海棠&amp;蓝战非     Tags: 成果  直播

25 Feb 2020: 英语四级-作文范文---范文汇总     Tags: 英语  四级  学习

24 Feb 2020: 物理-质点运动习题整理---习题整理     Tags: 物理  学习

22 Feb 2020: 英语四级-作文公式2---土味单词整改     Tags: 英语  四级  学习

21 Feb 2020: 英语四级-作文公式1---作文公式模块     Tags: 英语  四级  学习

19 Feb 2020: Python小游戏—贪吃蛇---贪吃蛇     Tags: Python  游戏

18 Feb 2020: 大地测量学基础2---大地测量控制网     Tags: 大地测量学  学习

17 Feb 2020: 人工智障推荐机制---人工智障     Tags: 杂谈  生活

16 Feb 2020: Python进程与线程---进程与线程     Tags: Python  技术

14 Feb 2020: 正则表达式基础---正则表达式     Tags: Python  技术

14 Feb 2020: Bilibili-处处吻---星爷处处吻     Tags: 视频  杂谈

13 Feb 2020: 大地测量学基础-1---大地测量     Tags: 大地测量学  学习

12 Feb 2020: 物理-质点运动的描述---质点运动习题     Tags: 物理  学习

11 Feb 2020: Blog搭建---搭建历程     Tags: 博客  杂谈

10 Feb 2020: 感谢---第一个博客     Tags: 杂谈

10 Feb 2020: Python爬虫-爬取静态网页图片---爬取妹子图网站     Tags: Python  技术
</code></pre></div></div>
<p><img alt="" src="https://lz.sinaimg.cn/orj1080/ebeef3aaly3gcoray15tfj20zk1bf478.jpg"/></p>
</article>]