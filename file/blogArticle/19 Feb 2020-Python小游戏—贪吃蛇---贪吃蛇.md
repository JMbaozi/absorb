[<article class="markdown-body">
<blockquote>
<p>我之前看到即友的一个结课作业，用python做了一个迷宫游戏，在这里放一下<a href="https://github.com/Wonz5130/Maze_AI">链接</a>，感兴趣的可以去看看。当时我也想做一个，但是看了看源码，对于我这个菜鸡来说真的是有心无力。。。所以我就想到了我认为最简单的游戏——贪吃蛇。然后我找到了这个<a href="https://www.jianshu.com/p/8ad00c05f54e">教程</a>，一共100多行代码，非常适合学习。<a href="https://github.com/JMbaozi/absorb/blob/master/Blog/program/%E8%B4%AA%E5%90%83%E8%9B%87.py">点我下载</a></p>
</blockquote>
<blockquote>
<p>pygame是python的一个制作2D游戏的模块，如果对制作游戏没有兴趣，我不建议深入学习这个模块 。</p>
</blockquote>
<blockquote>
<p>我说一下这个游戏最核心的代码是如何实现的，贪吃蛇最重要的就是让这条蛇一直沿着你规定的方向走下去，然后吃掉一个食物后这条蛇就变长一格(在这里，以20X个像素为一格，即一格是20*20)。</p>
</blockquote>
<ul>
<li>利用循环来监听你是否按了方向键，如果没按就按照前进的方向继续前进，如果按了方向键要先判断是否与原方向冲突，比如你向右走，你自然不能直接向左走。判断无误后就在在你要改变的那个方向上加上一格，同时尾部去掉一格，来造成好像这条蛇在移动一样(不改变方向也是这样，在走的方向加一格，尾部去掉一格)。</li>
<li>如果吃到食物就在尾部加一格，方向继续。
    <ul>
<li>因为你不管是否改变方向，你每动一次，尾部就要去掉一格，而吃食物尾部加一格，所以为了方便起见，每次循环默认尾部减一格，如果吃了食物，这次循环尾部就不减。</li>
<li>如果蛇头的X，Y坐标和食物的X，Y坐标重合就代表蛇吃到了这个食物。</li>
</ul>
</li>
<li>最后就是失败的判断机制了，如果蛇头的X，Y坐标和边界的X，Y坐标重合，就代表你撞墙了；循环遍历身体（有好几个20*20方格组成的列表，这里不计算蛇头，毕竟蛇头不可能吃蛇头）的方格，如果蛇头的X，Y坐标和身体的X，Y坐标重合，就代表你咬到自己了。</li>
</ul>
<h3 id="开始">开始</h3>
<ul>
<li><strong>首先我们需要导入待使用的模块：</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">import</span> <span class="nn">pygame</span><span class="p">,</span> <span class="n">sys</span><span class="p">,</span> <span class="n">random</span>
<span class="kn">from</span> <span class="nn">pygame.locals</span> <span class="kn">import</span> <span class="o">*</span>
</code></pre></div></div>
<p><code class="language-plaintext highlighter-rouge">pygame.locals 模块</code>包含pygame使用的各种常量，它的内容会被自动放入到 Pygame 模块的名字空间中。</p>
<ul>
<li><strong>模块导入之后我们可以先定义好会用到的颜色，根据大家的喜好定义：</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">#设置颜色
</span><span class="n">pinkColor</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="p">(</span><span class="mi">255</span><span class="p">,</span><span class="mi">182</span><span class="p">,</span><span class="mi">193</span><span class="p">)</span>
<span class="n">blackColor</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">)</span>
<span class="n">whiteColor</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="p">(</span><span class="mi">255</span><span class="p">,</span><span class="mi">255</span><span class="p">,</span><span class="mi">255</span><span class="p">)</span>
</code></pre></div></div>
<p><code class="language-plaintext highlighter-rouge">pygame.Color()</code>是用于描述颜色的对象，</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">Color</span><span class="p">(</span><span class="n">name</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="n">Color</span>
<span class="n">Color</span><span class="p">(</span><span class="n">r</span><span class="p">,</span> <span class="n">g</span><span class="p">,</span> <span class="n">b</span> <span class="p">,</span> <span class="n">a</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="n">Color</span>
<span class="n">Color</span><span class="p">(</span><span class="n">rgbvalue</span><span class="p">)</span> <span class="err">–</span><span class="o">&gt;</span><span class="n">Color</span>

<span class="c1"># Color对象的方法&amp;属性
</span><span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">r</span>  <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的红色值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">g</span> <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的绿色值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">b</span> <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的蓝色值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">a</span> <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的</span><span class="n">alpha</span><span class="err">值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">cmy</span> <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的</span><span class="n">cmy</span><span class="err">值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">hsva</span> <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的</span><span class="n">hsav</span><span class="err">值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">hsla</span> <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的</span><span class="n">hsla</span><span class="err">值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">i</span> <span class="mi">1</span><span class="n">i2i3</span> <span class="err">：获取或者设置</span><span class="n">Color</span><span class="err">对象的</span><span class="n">I1I2I3</span><span class="err">描述</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">normalize</span> <span class="err">：</span> <span class="err">返回一个</span><span class="n">Color</span><span class="err">对象的</span><span class="n">RGBA</span><span class="err">（显示通道）值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="n">correct</span> <span class="n">gamma</span> <span class="err">：</span><span class="n">Color</span><span class="err">对象请求一个确定</span><span class="n">gamma</span><span class="err">值</span>
<span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="o">.</span><span class="nb">set</span> <span class="n">length</span>  <span class="err">：设置在</span><span class="n">Color</span><span class="err">对象中元素的数值为</span><span class="mi">1</span><span class="err">，</span><span class="mi">2</span><span class="err">，</span><span class="mi">3</span><span class="err">，或</span><span class="mi">4</span>
</code></pre></div></div>
<ul>
<li><strong>当游戏结束时，我们需要退出这个游戏，所以我们需要给游戏定义一个用于退出的函数，很简单，就是先退出pygame窗口，再退出程序：</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1"># 定义游戏结束的函数
</span><span class="k">def</span> <span class="nf">gameover</span><span class="p">():</span>
    <span class="c1"># 退出pygame窗口
</span>    <span class="n">pygame</span><span class="o">.</span><span class="n">quit</span><span class="p">()</span>
    <span class="c1"># 退出程序
</span>    <span class="n">sys</span><span class="o">.</span><span class="nb">exit</span><span class="p">()</span>
</code></pre></div></div>
<ul>
<li><strong>定义好结束函数之后，我们需要定义一个入口函数，用于进入游戏，游戏的主要代码都写在这里面：</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="c1"># 初始化
</span>    <span class="n">pygame</span><span class="o">.</span><span class="n">init</span><span class="p">()</span>
    <span class="c1"># 定义一个变量来控制速度
</span>    <span class="n">time_clock</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">time</span><span class="o">.</span><span class="n">Clock</span><span class="p">()</span>

    <span class="c1"># 创建窗口，定义标题
</span>    <span class="n">screen</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">display</span><span class="o">.</span><span class="n">set_mode</span><span class="p">((</span><span class="mi">640</span><span class="p">,</span> <span class="mi">480</span><span class="p">))</span>
    <span class="n">pygame</span><span class="o">.</span><span class="n">display</span><span class="o">.</span><span class="n">set_caption</span><span class="p">(</span><span class="s">"贪吃蛇"</span><span class="p">)</span>
</code></pre></div></div>
<p>首先我们需要初始化pygame，创建好游戏窗口，顺便定义一个用来控制速度的变量，这个变量用于贪吃蛇的移动。</p>
<ul>
<li><strong>接着初始化一些贪吃蛇和食物用到的变量，将整个界面看成许多20x20的小方块，每个方块代表一个单位</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code>    <span class="c1"># 定义蛇的初始化变量
</span>    <span class="n">snakePosition</span> <span class="o">=</span> <span class="p">[</span><span class="mi">100</span><span class="p">,</span> <span class="mi">100</span><span class="p">]</span>  <span class="c1"># 蛇头位置
</span>    <span class="c1"># 定义一个贪吃蛇的长度列表，其中有几个元素就代表有几段身体，这里我们定义5段身体
</span>    <span class="n">snakeSegments</span> <span class="o">=</span> <span class="p">[[</span><span class="mi">100</span><span class="p">,</span> <span class="mi">100</span><span class="p">],</span> <span class="p">[</span><span class="mi">80</span><span class="p">,</span> <span class="mi">100</span><span class="p">],</span> <span class="p">[</span><span class="mi">60</span><span class="p">,</span> <span class="mi">100</span><span class="p">],</span> <span class="p">[</span><span class="mi">40</span><span class="p">,</span> <span class="mi">100</span><span class="p">],</span> <span class="p">[</span><span class="mi">20</span><span class="p">,</span> <span class="mi">100</span><span class="p">]]</span>

    <span class="c1"># 初始化食物位置
</span>    <span class="n">foodPostion</span> <span class="o">=</span> <span class="p">[</span><span class="mi">300</span><span class="p">,</span> <span class="mi">300</span><span class="p">]</span>
   
    <span class="c1"># 食物数量，0表示被吃了，1表示没被吃
</span>    <span class="n">foodTotal</span> <span class="o">=</span> <span class="mi">1</span>
    
    <span class="c1"># 初始方向，向右
</span>    <span class="n">direction</span> <span class="o">=</span> <span class="s">'right'</span>
    <span class="c1"># 定义一个改变方向的变量，按键
</span>    <span class="n">changeDirection</span> <span class="o">=</span> <span class="n">direction</span>
</code></pre></div></div>
<ul>
<li><strong>初始化好数据之后，使用while循环来侦听事件，通过不断地循环使蛇不断地前进</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code>    <span class="k">while</span> <span class="bp">True</span><span class="p">:</span>
        <span class="c1">#监听用户事件
</span>        <span class="k">for</span> <span class="n">event</span> <span class="ow">in</span> <span class="n">pygame</span><span class="o">.</span><span class="n">event</span><span class="o">.</span><span class="n">get</span><span class="p">():</span>
            <span class="c1">#判断是否为退出事件
</span>            <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="nb">type</span> <span class="o">==</span> <span class="n">QUIT</span><span class="p">:</span>
                <span class="n">pygame</span><span class="o">.</span><span class="n">quit</span><span class="p">()</span>
                <span class="n">sys</span><span class="o">.</span><span class="nb">exit</span><span class="p">()</span>
            <span class="c1">#按键事件
</span>            <span class="k">elif</span> <span class="n">event</span><span class="o">.</span><span class="nb">type</span> <span class="o">==</span> <span class="n">KEYDOWN</span><span class="p">:</span>
                <span class="c1">#left:'&lt;-' or 'A';up:'↑'or 'W';right:'-&gt;' or 'D';down:'↓' or 'S'
</span>                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_LEFT</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_a</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'left'</span>
                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_UP</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_w</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'up'</span>
                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_RIGHT</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_d</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'right'</span>
                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_DOWN</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_s</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'down'</span>
                <span class="c1">#退出程序：Esc
</span>                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_ESCAPE</span><span class="p">:</span>
                    <span class="n">pygame</span><span class="o">.</span><span class="n">event</span><span class="o">.</span><span class="n">post</span><span class="p">(</span><span class="n">pygame</span><span class="o">.</span><span class="n">event</span><span class="o">.</span><span class="n">Event</span><span class="p">(</span><span class="n">QUIT</span><span class="p">))</span>
</code></pre></div></div>
<p>KEYDOWN是键盘按键事件，而K_RIGHT 、K_LEFT 、K_d、K_a等这些表示对应键盘上的按键。</p>
<ul>
<li><strong>确认蛇的移动方向，不能向反方向移动，比如此时蛇是向右移动的，则不能控制它向左移动，只向上或向下</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code>        <span class="c1">#确认方向，判断是否输入了反方向
</span>        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'left'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'right'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'up'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'down'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'right'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'left'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'down'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'up'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
</code></pre></div></div>
<ul>
<li><strong>通过像素的加减确定蛇头的移动向上或向下加减20px相当于向上下移动一步</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code>        <span class="c1">#根据方向移动蛇头
</span>        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'left'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">-=</span> <span class="mi">20</span>
        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'right'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">20</span>
        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'up'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">-=</span> <span class="mi">20</span>
        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'down'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">20</span>
                
        <span class="c1"># 增加蛇的长度
</span>        <span class="n">snakeSegments</span><span class="o">.</span><span class="n">insert</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nb">list</span><span class="p">(</span><span class="n">snakePosition</span><span class="p">))</span>
        <span class="c1"># 判断是否吃到食物
</span>        <span class="k">if</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">==</span> <span class="n">foodPosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="ow">and</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="n">foodPosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]:</span>
            <span class="n">foodTotal</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="n">snakeSegments</span><span class="o">.</span><span class="n">pop</span><span class="p">()</span>  <span class="c1"># 每次将最后一单位蛇身剔除列表
</span>
        <span class="c1"># 如果食物为0 重新生成食物
</span>        <span class="k">if</span> <span class="n">foodTotal</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
            <span class="n">x</span> <span class="o">=</span> <span class="n">random</span><span class="o">.</span><span class="n">randrange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">32</span><span class="p">)</span>
            <span class="n">y</span> <span class="o">=</span> <span class="n">random</span><span class="o">.</span><span class="n">randrange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">24</span><span class="p">)</span>
            <span class="n">foodPosition</span> <span class="o">=</span> <span class="p">[</span><span class="nb">int</span><span class="p">(</span><span class="n">x</span> <span class="o">*</span> <span class="mi">20</span><span class="p">),</span> <span class="nb">int</span><span class="p">(</span><span class="n">y</span> <span class="o">*</span> <span class="mi">20</span><span class="p">)]</span>
            <span class="n">foodTotal</span> <span class="o">=</span> <span class="mi">1</span>

        <span class="c1"># 绘制pygame显示层
</span>        <span class="n">screen</span><span class="o">.</span><span class="n">fill</span><span class="p">(</span><span class="n">blackColor</span><span class="p">)</span>
</code></pre></div></div>
<ul>
<li><strong>设置蛇与食物的颜色长宽</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code>        <span class="k">for</span> <span class="n">position</span> <span class="ow">in</span> <span class="n">snakeSegments</span><span class="p">:</span>  <span class="c1"># 蛇身为白色
</span>            <span class="c1"># 画蛇
</span>            <span class="n">pygame</span><span class="o">.</span><span class="n">draw</span><span class="o">.</span><span class="n">rect</span><span class="p">(</span><span class="n">screen</span><span class="p">,</span> <span class="n">pinkColor</span><span class="p">,</span> <span class="n">Rect</span><span class="p">(</span><span class="n">position</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="n">position</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span> <span class="mi">20</span><span class="p">,</span> <span class="mi">20</span><span class="p">))</span>
            <span class="n">pygame</span><span class="o">.</span><span class="n">draw</span><span class="o">.</span><span class="n">rect</span><span class="p">(</span><span class="n">screen</span><span class="p">,</span> <span class="n">whiteColor</span><span class="p">,</span> <span class="n">Rect</span><span class="p">(</span><span class="n">foodPosition</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="n">foodPosition</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span> <span class="mi">20</span><span class="p">,</span> <span class="mi">20</span><span class="p">))</span>
</code></pre></div></div>
<ul>
<li><strong>更新显示到屏幕表面</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="n">pygame</span><span class="o">.</span><span class="n">display</span><span class="o">.</span><span class="n">flip</span><span class="p">()</span>
</code></pre></div></div>
<ul>
<li><strong>判断游戏是否结束</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code>         <span class="c1"># 判断游戏是否结束
</span>        <span class="k">if</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">&gt;</span> <span class="mi">620</span> <span class="ow">or</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">:</span>
            <span class="n">gameover</span><span class="p">()</span>
        <span class="k">elif</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">&gt;</span> <span class="mi">460</span> <span class="ow">or</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">:</span>
            <span class="n">gameover</span><span class="p">()</span>
        <span class="c1"># 如果碰到自己的身体
</span>        <span class="k">for</span> <span class="n">body</span> <span class="ow">in</span> <span class="n">snakeSegments</span><span class="p">[</span><span class="mi">1</span><span class="p">:]:</span>
            <span class="k">if</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">==</span> <span class="n">body</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="ow">and</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="n">body</span><span class="p">[</span><span class="mi">1</span><span class="p">]:</span>
                <span class="n">gameover</span><span class="p">()</span>

        <span class="c1"># 控制游戏速度
</span>        <span class="n">time_clock</span><span class="o">.</span><span class="n">tick</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span>
</code></pre></div></div>
<ul>
<li><strong>入口函数</strong></li>
</ul>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>
</code></pre></div></div>
<h3 id="完整代码">完整代码</h3>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">import</span> <span class="nn">pygame</span><span class="p">,</span><span class="n">sys</span><span class="p">,</span><span class="n">random</span>
<span class="kn">from</span> <span class="nn">pygame.locals</span> <span class="kn">import</span> <span class="o">*</span>

<span class="c1">#设置颜色
</span><span class="n">pinkColor</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="p">(</span><span class="mi">255</span><span class="p">,</span><span class="mi">182</span><span class="p">,</span><span class="mi">193</span><span class="p">)</span>
<span class="n">blackColor</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">,</span><span class="mi">0</span><span class="p">)</span>
<span class="n">whiteColor</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">Color</span><span class="p">(</span><span class="mi">255</span><span class="p">,</span><span class="mi">255</span><span class="p">,</span><span class="mi">255</span><span class="p">)</span>

<span class="c1">#定义游戏结束的函数
</span><span class="k">def</span> <span class="nf">gameover</span><span class="p">():</span>
    <span class="c1">#结束游戏窗口
</span>    <span class="n">pygame</span><span class="o">.</span><span class="n">quit</span><span class="p">()</span>
    <span class="c1">#退出程序
</span>    <span class="n">sys</span><span class="o">.</span><span class="nb">exit</span><span class="p">()</span>

<span class="c1">#function of main
</span><span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="c1">#初始化程序
</span>    <span class="n">pygame</span><span class="o">.</span><span class="n">init</span><span class="p">()</span>
    <span class="c1">#定义控制速度的变量
</span>    <span class="n">time_clock</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">time</span><span class="o">.</span><span class="n">Clock</span><span class="p">()</span>
    
    <span class="c1">#创建窗口 &amp; 定义标题
</span>    <span class="n">screen</span> <span class="o">=</span> <span class="n">pygame</span><span class="o">.</span><span class="n">display</span><span class="o">.</span><span class="n">set_mode</span><span class="p">((</span><span class="mi">640</span><span class="p">,</span><span class="mi">480</span><span class="p">))</span>
    <span class="n">pygame</span><span class="o">.</span><span class="n">display</span><span class="o">.</span><span class="n">set_caption</span><span class="p">(</span><span class="s">"贪吃蛇"</span><span class="p">)</span>
    
    <span class="c1">#定义蛇的初始化位置
</span>    <span class="n">snakePosition</span> <span class="o">=</span> <span class="p">[</span><span class="mi">100</span><span class="p">,</span><span class="mi">100</span><span class="p">]</span>   <span class="c1">#蛇头位置
</span>    <span class="c1">#定义一个贪吃蛇的长度列表，其中有几个元素就代表有几段身体，这里我们定义5段身体
</span>    <span class="n">snakeSegments</span> <span class="o">=</span> <span class="p">[[</span><span class="mi">100</span><span class="p">,</span><span class="mi">100</span><span class="p">],[</span><span class="mi">80</span><span class="p">,</span><span class="mi">100</span><span class="p">],[</span><span class="mi">60</span><span class="p">,</span><span class="mi">100</span><span class="p">],[</span><span class="mi">40</span><span class="p">,</span><span class="mi">100</span><span class="p">],[</span><span class="mi">20</span><span class="p">,</span><span class="mi">100</span><span class="p">]]</span>
    <span class="c1">#初始化食物位置
</span>    <span class="n">foodPosition</span> <span class="o">=</span> <span class="p">[</span><span class="mi">300</span><span class="p">,</span><span class="mi">300</span><span class="p">]</span>
    <span class="c1">#食物数量，0表示被吃了，1表示没吃
</span>    <span class="n">foodTotal</span> <span class="o">=</span> <span class="mi">1</span>
    <span class="c1">#初始方向：向右
</span>    <span class="n">direction</span> <span class="o">=</span> <span class="s">'right'</span>
    <span class="c1">#定义一个改变方向的变量
</span>    <span class="n">changeDirection</span> <span class="o">=</span> <span class="n">direction</span>
    
    <span class="k">while</span> <span class="bp">True</span><span class="p">:</span>
        <span class="c1">#监听用户事件
</span>        <span class="k">for</span> <span class="n">event</span> <span class="ow">in</span> <span class="n">pygame</span><span class="o">.</span><span class="n">event</span><span class="o">.</span><span class="n">get</span><span class="p">():</span>
            <span class="c1">#判断是否为退出事件
</span>            <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="nb">type</span> <span class="o">==</span> <span class="n">QUIT</span><span class="p">:</span>
                <span class="n">pygame</span><span class="o">.</span><span class="n">quit</span><span class="p">()</span>
                <span class="n">sys</span><span class="o">.</span><span class="nb">exit</span><span class="p">()</span>
            <span class="c1">#按键事件
</span>            <span class="k">elif</span> <span class="n">event</span><span class="o">.</span><span class="nb">type</span> <span class="o">==</span> <span class="n">KEYDOWN</span><span class="p">:</span>
                <span class="c1">#left:'&lt;-' or 'A';up:'↑'or 'W';right:'-&gt;' or 'D';down:'↓' or 'S'
</span>                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_LEFT</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_a</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'left'</span>
                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_UP</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_w</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'up'</span>
                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_RIGHT</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_d</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'right'</span>
                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_DOWN</span> <span class="ow">or</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_s</span><span class="p">:</span>
                    <span class="n">changeDirection</span> <span class="o">=</span> <span class="s">'down'</span>
                <span class="c1">#退出程序：Esc
</span>                <span class="k">if</span> <span class="n">event</span><span class="o">.</span><span class="n">key</span> <span class="o">==</span> <span class="n">K_ESCAPE</span><span class="p">:</span>
                    <span class="n">pygame</span><span class="o">.</span><span class="n">event</span><span class="o">.</span><span class="n">post</span><span class="p">(</span><span class="n">pygame</span><span class="o">.</span><span class="n">event</span><span class="o">.</span><span class="n">Event</span><span class="p">(</span><span class="n">QUIT</span><span class="p">))</span>
                
        <span class="c1">#确认方向，判断是否输入了反方向
</span>        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'left'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'right'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'up'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'down'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'right'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'left'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
        <span class="k">if</span> <span class="n">changeDirection</span> <span class="o">==</span> <span class="s">'down'</span> <span class="ow">and</span> <span class="n">direction</span> <span class="o">!=</span> <span class="s">'up'</span><span class="p">:</span>
            <span class="n">direction</span> <span class="o">=</span> <span class="n">changeDirection</span>
        
        <span class="c1">#根据方向移动蛇头
</span>        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'left'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">-=</span> <span class="mi">20</span>
        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'right'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">20</span>
        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'up'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">-=</span> <span class="mi">20</span>
        <span class="k">if</span> <span class="n">direction</span> <span class="o">==</span> <span class="s">'down'</span><span class="p">:</span>
            <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">+=</span> <span class="mi">20</span>
                
        <span class="c1"># 增加蛇的长度
</span>        <span class="n">snakeSegments</span><span class="o">.</span><span class="n">insert</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nb">list</span><span class="p">(</span><span class="n">snakePosition</span><span class="p">))</span>
        <span class="c1"># 判断是否吃到食物
</span>        <span class="k">if</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">==</span> <span class="n">foodPosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="ow">and</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="n">foodPosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]:</span>
            <span class="n">foodTotal</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="n">snakeSegments</span><span class="o">.</span><span class="n">pop</span><span class="p">()</span>  <span class="c1"># 每次将最后一单位蛇身剔除列表
</span>
        <span class="c1"># 如果食物为0 重新生成食物
</span>        <span class="k">if</span> <span class="n">foodTotal</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
            <span class="n">x</span> <span class="o">=</span> <span class="n">random</span><span class="o">.</span><span class="n">randrange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">32</span><span class="p">)</span>
            <span class="n">y</span> <span class="o">=</span> <span class="n">random</span><span class="o">.</span><span class="n">randrange</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">24</span><span class="p">)</span>
            <span class="n">foodPosition</span> <span class="o">=</span> <span class="p">[</span><span class="nb">int</span><span class="p">(</span><span class="n">x</span> <span class="o">*</span> <span class="mi">20</span><span class="p">),</span> <span class="nb">int</span><span class="p">(</span><span class="n">y</span> <span class="o">*</span> <span class="mi">20</span><span class="p">)]</span>
            <span class="n">foodTotal</span> <span class="o">=</span> <span class="mi">1</span>

        <span class="c1"># 绘制pygame显示层
</span>        <span class="n">screen</span><span class="o">.</span><span class="n">fill</span><span class="p">(</span><span class="n">blackColor</span><span class="p">)</span>


        <span class="k">for</span> <span class="n">position</span> <span class="ow">in</span> <span class="n">snakeSegments</span><span class="p">:</span>  <span class="c1"># 蛇身为白色
</span>            <span class="c1"># 画蛇
</span>            <span class="n">pygame</span><span class="o">.</span><span class="n">draw</span><span class="o">.</span><span class="n">rect</span><span class="p">(</span><span class="n">screen</span><span class="p">,</span> <span class="n">pinkColor</span><span class="p">,</span> <span class="n">Rect</span><span class="p">(</span><span class="n">position</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="n">position</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span> <span class="mi">20</span><span class="p">,</span> <span class="mi">20</span><span class="p">))</span>
            <span class="n">pygame</span><span class="o">.</span><span class="n">draw</span><span class="o">.</span><span class="n">rect</span><span class="p">(</span><span class="n">screen</span><span class="p">,</span> <span class="n">whiteColor</span><span class="p">,</span> <span class="n">Rect</span><span class="p">(</span><span class="n">foodPosition</span><span class="p">[</span><span class="mi">0</span><span class="p">],</span> <span class="n">foodPosition</span><span class="p">[</span><span class="mi">1</span><span class="p">],</span> <span class="mi">20</span><span class="p">,</span> <span class="mi">20</span><span class="p">))</span>

        <span class="c1"># 更新显示到屏幕表面
</span>        <span class="n">pygame</span><span class="o">.</span><span class="n">display</span><span class="o">.</span><span class="n">flip</span><span class="p">()</span>

        <span class="c1"># 判断游戏是否结束
</span>        <span class="k">if</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">&gt;</span> <span class="mi">620</span> <span class="ow">or</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">:</span>
            <span class="n">gameover</span><span class="p">()</span>
        <span class="k">elif</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">&gt;</span> <span class="mi">460</span> <span class="ow">or</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">:</span>
            <span class="n">gameover</span><span class="p">()</span>
        <span class="c1"># 如果碰到自己的身体
</span>        <span class="k">for</span> <span class="n">body</span> <span class="ow">in</span> <span class="n">snakeSegments</span><span class="p">[</span><span class="mi">1</span><span class="p">:]:</span>
            <span class="k">if</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="o">==</span> <span class="n">body</span><span class="p">[</span><span class="mi">0</span><span class="p">]</span> <span class="ow">and</span> <span class="n">snakePosition</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">==</span> <span class="n">body</span><span class="p">[</span><span class="mi">1</span><span class="p">]:</span>
                <span class="n">gameover</span><span class="p">()</span>

        <span class="c1"># 控制游戏速度
</span>        <span class="n">time_clock</span><span class="o">.</span><span class="n">tick</span><span class="p">(</span><span class="mi">5</span><span class="p">)</span>


<span class="c1">#  启动入口函数
</span><span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>
                
</code></pre></div></div>
<p><img alt="img" src="https://lz.sinaimg.cn/osj1080/ebeef3aaly3gc1wdtmu3kj20u01400ze.jpg"/></p>
</article>]