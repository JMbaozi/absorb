[<article class="markdown-body">
<blockquote>
<p>我在之前出于兴趣学了一点Python的语法基础，但是没有深入，这里我放出我学习的<a href="https://github.com/jackfrued/Python-100-Days">项目</a>，作为初学者，可以按照这个教程学习基本的知识。几天前，我刷到了一篇简单的爬虫入门Blog，现在先写一篇关于爬取静态网页图片的Blog，供大家学习，同时我在原博客的基础上进行了修改和添加来更好的理解。</p>
</blockquote>
<blockquote>
<p>复制下面代码或<a href="https://github.com/JMbaozi/absorb/blob/master/Blog/program/web%20crawler.py">点我</a>下载</p>
</blockquote>
<h3 id="代码">代码</h3>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="s">"""
爬虫学习
https://blog.csdn.net/namespace_Pt/article/details/104124954
Part 1：
爬取静态网页图片（https://www.mzitu.com/221136）
"""</span>

<span class="kn">import</span> <span class="nn">requests</span>
<span class="kn">import</span> <span class="nn">lxml</span>
<span class="kn">from</span> <span class="nn">bs4</span> <span class="kn">import</span> <span class="n">BeautifulSoup</span>	<span class="c1">#引入库
</span>	
<span class="n">dirname</span> <span class="o">=</span> <span class="s">'picture'</span>		<span class="c1">#创建的文件名，图片将保存在子文件夹下
</span>
<span class="n">url</span> <span class="o">=</span> <span class="s">'https://www.mzitu.com/221136'</span>
<span class="c1">#header = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64; rv:66.0) 			Gecko/20100101 Firefox/66.0",
#"Referer":"https://www.mzitu.com/jiepai/comment-page-1/"}
</span><span class="n">header</span> <span class="o">=</span> <span class="p">{</span>
          <span class="s">"User-Agent"</span><span class="p">:</span><span class="s">"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.78 Safari/537.36 Edg/80.0.361.45"</span><span class="p">,</span>
          <span class="s">"Referer"</span><span class="p">:</span><span class="s">"https://www.mzitu.com/jiepai/comment-page-1/"</span>
          <span class="p">}</span><span class="c1">#header设置：https://blog.csdn.net/qq_42787271/article/details/81571229
</span>           <span class="c1">#Referer介绍：https://blog.csdn.net/shenqueying/article/details/79426884
#header里必须设置Referer属性，否则无法下载图片
</span><span class="n">response</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">url</span><span class="p">,</span><span class="n">headers</span> <span class="o">=</span> <span class="n">header</span><span class="p">)</span>	<span class="c1">#请求网页
</span><span class="n">content</span> <span class="o">=</span> <span class="n">response</span><span class="o">.</span><span class="n">content</span>
<span class="n">bsobj</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">content</span><span class="p">,</span><span class="s">'lxml'</span><span class="p">)</span>     <span class="c1">#解析html
</span>
<span class="c1">#get_text()方法获取中文字样，用string属性也可以
</span><span class="n">title</span> <span class="o">=</span> <span class="n">bsobj</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">'h2'</span><span class="p">,</span><span class="n">class_</span> <span class="o">=</span> <span class="s">'main-title'</span><span class="p">)</span><span class="o">.</span><span class="n">get_text</span><span class="p">()</span>
<span class="c1">#按照分析出存储页数上界的位置寻找，存储其string属性即得最大页数
</span><span class="n">picture_max</span> <span class="o">=</span> <span class="n">bsobj</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">'div'</span><span class="p">,</span><span class="n">class_</span> <span class="o">=</span> <span class="s">'pagenavi'</span><span class="p">)</span><span class="o">.</span><span class="n">find_all</span><span class="p">(</span><span class="s">'a'</span><span class="p">)[</span><span class="o">-</span><span class="mi">2</span><span class="p">]</span><span class="o">.</span><span class="n">string</span>
	
<span class="c1">#按照分析出的网址变化形式逐页访问
</span><span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span><span class="nb">int</span><span class="p">(</span><span class="n">picture_max</span><span class="p">)):</span>
	<span class="n">href</span> <span class="o">=</span> <span class="n">url</span> <span class="o">+</span> <span class="s">'/'</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">i</span><span class="p">)</span>	<span class="c1">#访问每一页
</span>	<span class="n">response</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">href</span><span class="p">,</span><span class="n">headers</span> <span class="o">=</span> <span class="n">header</span><span class="p">)</span>	<span class="c1">#请求数据
</span>	<span class="n">content</span> <span class="o">=</span> <span class="n">response</span><span class="o">.</span><span class="n">content</span>	<span class="c1">#得到二进制对象
</span>	<span class="n">soup</span> <span class="o">=</span> <span class="n">BeautifulSoup</span><span class="p">(</span><span class="n">content</span><span class="p">,</span><span class="s">'lxml'</span><span class="p">)</span>	<span class="c1">#初始化
</span>		
	<span class="c1">#找img标签，访问src属性，找图片url
</span>	<span class="n">picture_url</span> <span class="o">=</span> <span class="n">soup</span><span class="o">.</span><span class="n">find</span><span class="p">(</span><span class="s">'img'</span><span class="p">,</span><span class="n">alt</span> <span class="o">=</span> <span class="n">title</span><span class="p">)</span><span class="o">.</span><span class="n">attrs</span><span class="p">[</span><span class="s">'src'</span><span class="p">]</span>
	<span class="c1">#访问图片url
</span>	<span class="n">response_img</span> <span class="o">=</span> <span class="n">requests</span><span class="o">.</span><span class="n">get</span><span class="p">(</span><span class="n">picture_url</span><span class="p">,</span><span class="n">headers</span> <span class="o">=</span> <span class="n">header</span><span class="p">)</span>
	<span class="c1">#获取二进制图片文件
</span>	<span class="n">content_img</span> <span class="o">=</span> <span class="n">response_img</span><span class="o">.</span><span class="n">content</span>
	<span class="c1">#命名文件，注意加.jpg
</span>	<span class="n">file_name</span> <span class="o">=</span> <span class="n">dirname</span> <span class="o">+</span> <span class="s">'/'</span><span class="o">+</span> <span class="n">title</span> <span class="o">+</span> <span class="s">'-'</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">i</span><span class="p">)</span> <span class="o">+</span> <span class="s">'.jpg'</span>
	<span class="c1">#写入，注意以二进制写入方式打开
</span>	<span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="n">file_name</span><span class="p">,</span><span class="s">'wb'</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
   	 	<span class="n">f</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="n">content_img</span><span class="p">)</span>

</code></pre></div></div>
<h3 id="准备">准备</h3>
<ul>
<li>该程序爬取了<a href="https://www.mzitu.com/221136">妹子图</a>的44张图片，初学者看懂这个程序需要了解python的模块的引入、参数的定义和设置、循环语句和文件处理，有一定编程基础的可以短时间内学会上述内容，如果有不懂的可以参考我开头放的python教程。</li>
<li>这里重点讲述一下模块的引用，程序的开头引入了三个模块，这三个模块是爬虫程序的重要部分，python的强大就在于你可以使用别人的轮子来做非常溜批的操作，安装这三个模块的方法：
    <div class="language-plaintext highlighter-rouge"><div class="highlight"><pre class="highlight"><code> pip install requests
 pip install lxml
 pip install BeautifulSoup
</code></pre></div> </div>
<p>这里请自行搜索pip和这三个模块进行了解。</p>
</li>
</ul>
<h3 id="讲解">讲解</h3>
<blockquote>
<p>大部分内容我都已经进行了注释，这里讲解部分关键内容。</p>
</blockquote>
<ul>
<li>文件夹设置：先在程序所在目录里新建文件夹<code class="language-plaintext highlighter-rouge">picture</code>。开头定义了<code class="language-plaintext highlighter-rouge">dirname = 'picture'</code>，作用是将爬取的图片下载到该文件夹中，如果不设置，图片会直接下载到该程序所在的目录下，会非常的混乱。<code class="language-plaintext highlighter-rouge">file_name = dirname + '/'+ title + '-' + str(i) + '.jpg'</code>中的<code class="language-plaintext highlighter-rouge">'/'</code>不能省掉，作用是将图片保存在<code class="language-plaintext highlighter-rouge">..\picture\</code>中。</li>
<li>headers：在请求网页爬取的时候，输出的text信息中会出现抱歉，无法访问等字眼，这就是禁止爬取，需要通过反爬机制去解决这个问题。headers是解决requests请求反爬的方法之一，相当于我们进去这个网页的服务器本身，假装自己本身在爬取数据。查找方法我已经在headers方法后面进行了注释，这里需要一点点的html知识，不过非常简单，相信你一看就能明白。</li>
</ul>
<h3 id="实例">实例</h3>
<p>参考该方法我又爬取了另一个<a href="https://www.mzitu.com/201981">网址</a>的图片，就是身体有点吃不消 :=）</p>
<h4 id="后续我会写爬取其他类型的程序更新时间看心情吧希望上述内容可以帮到你有疑问可以微博或邮箱联系我">后续我会写爬取其他类型的程序，更新时间看心情吧。希望上述内容可以帮到你，有疑问可以微博或邮箱联系我。</h4>
<h3 id="补充">补充</h3>
<ul>
<li>爬取妹子图网站的原因是我学习的博客爬取的也是这个，后面的实例也是这个原因。</li>
<li>我在手机端发现妹子图网站有广告，而且是18禁的那种，所以希望各位在学习的过程中多注意身体，或者使用电脑端（好像没有那种广告）。</li>
<li>可能有小朋友问了，“你上来就讲这么多，初次接触python的肯定一头雾水。“我在这里强调一下，在一些稍微有一点点一丢丢复杂的地方我一般都会进行注释，比如放一些其他Blog来让大家更好的理解，所以希望可以把我注释的内容看完，这样才能有更好的理解。</li>
<li>我们都不是靠这个吃饭的，单纯是兴趣使然，所以不要纠结于这个程序为什么这样写，别人的那样写。你可以把这个当作一个模板，进行简单修改后就可以爬取其他网站的图片，你要把他当作一个工具，可以用到的工具。</li>
</ul>
<p><img alt="picture" src="https://photo.feicdn.cn/5e44ec286a71d6061147d565_1581577407021?x-oss-process=image/resize,m_fill,h_400,w_400"/></p>
</article>]