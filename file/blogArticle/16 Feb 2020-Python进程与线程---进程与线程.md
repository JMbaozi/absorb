[<article class="markdown-body">
<blockquote>
<p><a href="https://github.com/JMbaozi/Python-100-Days/blob/master/Day01-15/13.%E8%BF%9B%E7%A8%8B%E5%92%8C%E7%BA%BF%E7%A8%8B.md">原教程</a>，我放过好几次这个教程了，真的写的太好了，基础学习完全没有问题。如果看不下去文字，想看视频，可以B站搜索小甲鱼，单口相声手把手教你python。</p>
</blockquote>
<h3 id="进程与线程">进程与线程</h3>
<p>今天我们使用的计算机早已进入多CPU或多核时代，而我们使用的操作系统都是支持“多任务”的操作系统，这使得我们可以同时运行多个程序，也可以将一个程序分解为若干个相对独立的子任务，让多个子任务并发的执行，从而缩短程序的执行时间，同时也让用户获得更好的体验。因此在当下不管是用什么编程语言进行开发，实现让程序同时执行多个任务也就是常说的“并发编程”，应该是程序员必备技能之一。为此，我们需要先讨论两个概念，一个叫进程，一个叫线程。</p>
<h4 id="概念">概念</h4>
<p>进程就是操作系统中执行的一个程序，操作系统以进程为单位分配存储空间，每个进程都有自己的地址空间、数据栈以及其他用于跟踪进程执行的辅助数据，操作系统管理所有进程的执行，为它们合理的分配资源。进程可以通过fork或spawn的方式来创建新的进程来执行其他的任务，不过新的进程也有自己独立的内存空间，因此必须通过进程间通信机制（IPC，Inter-Process Communication）来实现数据共享，具体的方式包括管道、信号、套接字、共享内存区等。</p>
<p>一个进程还可以拥有多个并发的执行线索，简单的说就是拥有多个可以获得CPU调度的执行单元，这就是所谓的线程。由于线程在同一个进程下，它们可以共享相同的上下文，因此相对于进程而言，线程间的信息共享和通信更加容易。当然在单核CPU系统中，真正的并发是不可能的，因为在某个时刻能够获得CPU的只有唯一的一个线程，多个线程共享了CPU的执行时间。使用多线程实现并发编程为程序带来的好处是不言而喻的，最主要的体现在提升程序的性能和改善用户体验，今天我们使用的软件几乎都用到了多线程技术，这一点可以利用系统自带的进程监控工具（如macOS中的“活动监视器”、Windows中的“任务管理器”）来证实。</p>
<p>当然多线程也并不是没有坏处，站在其他进程的角度，多线程的程序对其他程序并不友好，因为它占用了更多的CPU执行时间，导致其他程序无法获得足够的CPU执行时间；另一方面，站在开发者的角度，编写和调试多线程的程序都对开发者有较高的要求，对于初学者来说更加困难。</p>
<p>Python既支持多进程又支持多线程，因此使用Python实现并发编程主要有3种方式：多进程、多线程、多进程+多线程。</p>
<blockquote>
<p>老样子，直接放出我已经写好的代码，注释我都加进去了。<a href="https://github.com/JMbaozi/absorb/blob/master/Blog/program/%E8%BF%9B%E7%A8%8B%E4%B8%8E%E7%BA%BF%E7%A8%8B.py">点我下载</a></p>
</blockquote>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code>
<span class="s">"""
Python中的多进程
"""</span>

<span class="c1">#Part 1 
</span><span class="s">"""
普通调用函数的方法，如果程序中的代码只能按顺序一点点的往下执行，
那么即使执行两个毫不相关的下载任务，也需要先等待一个文件下载完成
后才能开始下一个下载任务，很显然这并不合理也没有效率。
"""</span>
<span class="kn">from</span> <span class="nn">random</span> <span class="kn">import</span> <span class="n">randint</span>
<span class="kn">from</span> <span class="nn">time</span> <span class="kn">import</span> <span class="n">time</span><span class="p">,</span><span class="n">sleep</span>

<span class="k">def</span> <span class="nf">download_task</span><span class="p">(</span><span class="n">filename</span><span class="p">):</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'Start download </span><span class="si">%</span><span class="s">s ...'</span> <span class="o">%</span> <span class="n">filename</span><span class="p">)</span>
    <span class="n">time_to_download</span> <span class="o">=</span> <span class="n">randint</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">10</span><span class="p">)</span>
    <span class="n">sleep</span><span class="p">(</span><span class="n">time_to_download</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'</span><span class="si">%</span><span class="s">s download done.Use </span><span class="si">%</span><span class="s">d second.'</span> <span class="o">%</span> <span class="p">(</span><span class="n">filename</span><span class="p">,</span><span class="n">time_to_download</span><span class="p">))</span>
    
<span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="n">start</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="n">download_task</span><span class="p">(</span><span class="s">'Python从入门到住院.pdf'</span><span class="p">)</span>
    <span class="n">download_task</span><span class="p">(</span><span class="s">'Peking Hot.avi'</span><span class="p">)</span> <span class="c1">#别问我是啥，我也不知道。
</span>    <span class="n">end</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'Total use </span><span class="si">%.2</span><span class="s">f second.'</span> <span class="o">%</span> <span class="p">(</span><span class="n">end</span> <span class="o">-</span> <span class="n">start</span><span class="p">))</span>
    
<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>

<span class="s">"""
result:
Start download Python从入门到住院.pdf ...
Python从入门到住院.pdf download done.Use 5 second.
Start download Peking Hot.avi ...
Peking Hot.avi download done.Use 10 second.
Total use 15.03 second.
"""</span>


<span class="c1">#Part 2
</span><span class="s">"""
通过Process类创建了进程对象，通过target参数我们传入一个函数来
表示进程启动后要执行的代码，后面的args是一个元组，它代表了传递给
函数的参数。Process对象的start方法用来启动进程，而join方法表示等待
进程执行结束。运行上面的代码可以明显发现两个下载任务“同时”启动了，
而且程序的执行时间将大大缩短，不再是两个任务的时间总和。
"""</span>
<span class="kn">from</span> <span class="nn">multiprocessing</span> <span class="kn">import</span> <span class="n">Process</span>         <span class="c1">#pip install multiprocess
</span><span class="kn">from</span> <span class="nn">os</span> <span class="kn">import</span> <span class="n">getpid</span>
<span class="kn">from</span> <span class="nn">random</span> <span class="kn">import</span> <span class="n">randint</span>
<span class="kn">from</span> <span class="nn">time</span> <span class="kn">import</span> <span class="n">time</span><span class="p">,</span><span class="n">sleep</span>

<span class="k">def</span> <span class="nf">download_task</span><span class="p">(</span><span class="n">filename</span><span class="p">):</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'Start process,ID:</span><span class="si">%</span><span class="s">d.'</span> <span class="o">%</span> <span class="n">getpid</span><span class="p">())</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'Star download </span><span class="si">%</span><span class="s">s ...'</span> <span class="o">%</span> <span class="n">filename</span><span class="p">)</span>
    <span class="n">time_to_download</span> <span class="o">=</span> <span class="n">randint</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span><span class="mi">10</span><span class="p">)</span>
    <span class="n">sleep</span><span class="p">(</span><span class="n">time_to_download</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'</span><span class="si">%</span><span class="s">s download done.Use </span><span class="si">%</span><span class="s">d second.'</span> <span class="o">%</span> <span class="p">(</span><span class="n">filename</span><span class="p">,</span><span class="n">time_to_download</span><span class="p">))</span>
    
<span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="n">start</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="n">p1</span> <span class="o">=</span> <span class="n">Process</span><span class="p">(</span><span class="n">target</span> <span class="o">=</span> <span class="n">download_task</span><span class="p">,</span><span class="n">args</span><span class="o">=</span><span class="p">(</span><span class="s">'Python从入门到住院.pdf'</span><span class="p">,))</span>
    <span class="n">p1</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="n">p2</span> <span class="o">=</span> <span class="n">Process</span><span class="p">(</span><span class="n">target</span><span class="o">=</span><span class="n">download_task</span><span class="p">,</span><span class="n">args</span><span class="o">=</span><span class="p">(</span><span class="s">'Peking Hot.avi'</span><span class="p">,))</span>
    <span class="n">p2</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="n">p1</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="n">p2</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="n">end</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'Total us </span><span class="si">%.2</span><span class="s">f second.'</span> <span class="o">%</span> <span class="p">(</span><span class="n">end</span> <span class="o">-</span> <span class="n">start</span><span class="p">))</span>
    
<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>

<span class="s">"""
result:
Start process,ID:7060.
Star download Python从入门到住院.pdf ...
Start process,ID:2828.
Star download Peking Hot.avi ...
Peking Hot.avi download done.Use 6 second.
Python从入门到住院.pdf download done.Use 10 second.
Total us 10.10 second.
"""</span>






<span class="s">"""
Python中的多线程
"""</span>

<span class="c1">#Part 1
</span><span class="s">"""
目前的多线程开发推荐使用threading模块，该模块对多线程编程
提供了更好的面向对象的封装。把刚才下载文件的例子用多线程的方式来实现一遍。
"""</span>
<span class="kn">from</span> <span class="nn">random</span> <span class="kn">import</span> <span class="n">randint</span>
<span class="kn">from</span> <span class="nn">threading</span> <span class="kn">import</span> <span class="n">Thread</span>
<span class="kn">from</span> <span class="nn">time</span> <span class="kn">import</span> <span class="n">time</span><span class="p">,</span> <span class="n">sleep</span>

<span class="k">def</span> <span class="nf">download</span><span class="p">(</span><span class="n">filename</span><span class="p">):</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'开始下载</span><span class="si">%</span><span class="s">s...'</span> <span class="o">%</span> <span class="n">filename</span><span class="p">)</span>
    <span class="n">time_to_download</span> <span class="o">=</span> <span class="n">randint</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span>
    <span class="n">sleep</span><span class="p">(</span><span class="n">time_to_download</span><span class="p">)</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'</span><span class="si">%</span><span class="s">s下载完成! 耗费了</span><span class="si">%</span><span class="s">d秒'</span> <span class="o">%</span> <span class="p">(</span><span class="n">filename</span><span class="p">,</span> <span class="n">time_to_download</span><span class="p">))</span>

<span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="n">start</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="n">t1</span> <span class="o">=</span> <span class="n">Thread</span><span class="p">(</span><span class="n">target</span><span class="o">=</span><span class="n">download</span><span class="p">,</span> <span class="n">args</span><span class="o">=</span><span class="p">(</span><span class="s">'Python从入门到住院.pdf'</span><span class="p">,))</span>
    <span class="n">t1</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="n">t2</span> <span class="o">=</span> <span class="n">Thread</span><span class="p">(</span><span class="n">target</span><span class="o">=</span><span class="n">download</span><span class="p">,</span> <span class="n">args</span><span class="o">=</span><span class="p">(</span><span class="s">'Peking Hot.avi'</span><span class="p">,))</span>
    <span class="n">t2</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="n">t1</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="n">t2</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="n">end</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'总共耗费了</span><span class="si">%.3</span><span class="s">f秒'</span> <span class="o">%</span> <span class="p">(</span><span class="n">end</span> <span class="o">-</span> <span class="n">start</span><span class="p">))</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>

<span class="s">"""
result:
开始下载Python从入门到住院.pdf...
开始下载Peking Hot.avi...
Peking Hot.avi下载完成! 耗费了6秒
Python从入门到住院.pdf下载完成! 耗费了8秒
总共耗费了8.013秒
"""</span>

<span class="c1">#Part 2
</span><span class="s">"""
我们可以直接使用threading模块的Thread类来创建线程，但是我们学过一个
非常重要的概念叫“继承”，我们可以从已有的类创建新类，因此也可以通过
继承Thread类的方式来创建自定义的线程类，然后再创建线程对象并启动线程。
"""</span>
<span class="kn">from</span> <span class="nn">random</span> <span class="kn">import</span> <span class="n">randint</span>
<span class="kn">from</span> <span class="nn">threading</span> <span class="kn">import</span> <span class="n">Thread</span>
<span class="kn">from</span> <span class="nn">time</span> <span class="kn">import</span> <span class="n">time</span><span class="p">,</span> <span class="n">sleep</span>

<span class="k">class</span> <span class="nc">DownloadTask</span><span class="p">(</span><span class="n">Thread</span><span class="p">):</span>
    <span class="k">def</span> <span class="nf">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">filename</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">()</span><span class="o">.</span><span class="n">__init__</span><span class="p">()</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_filename</span> <span class="o">=</span> <span class="n">filename</span>
    <span class="k">def</span> <span class="nf">run</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">print</span><span class="p">(</span><span class="s">'开始下载</span><span class="si">%</span><span class="s">s...'</span> <span class="o">%</span> <span class="bp">self</span><span class="o">.</span><span class="n">_filename</span><span class="p">)</span>
        <span class="n">time_to_download</span> <span class="o">=</span> <span class="n">randint</span><span class="p">(</span><span class="mi">5</span><span class="p">,</span> <span class="mi">10</span><span class="p">)</span>
        <span class="n">sleep</span><span class="p">(</span><span class="n">time_to_download</span><span class="p">)</span>
        <span class="k">print</span><span class="p">(</span><span class="s">'</span><span class="si">%</span><span class="s">s下载完成! 耗费了</span><span class="si">%</span><span class="s">d秒'</span> <span class="o">%</span> <span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">_filename</span><span class="p">,</span> <span class="n">time_to_download</span><span class="p">))</span>

<span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="n">start</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="n">t1</span> <span class="o">=</span> <span class="n">DownloadTask</span><span class="p">(</span><span class="s">'Python从入门到住院.pdf'</span><span class="p">)</span>
    <span class="n">t1</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="n">t2</span> <span class="o">=</span> <span class="n">DownloadTask</span><span class="p">(</span><span class="s">'Peking Hot.avi'</span><span class="p">)</span>
    <span class="n">t2</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="n">t1</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="n">t2</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="n">end</span> <span class="o">=</span> <span class="n">time</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'总共耗费了</span><span class="si">%.2</span><span class="s">f秒.'</span> <span class="o">%</span> <span class="p">(</span><span class="n">end</span> <span class="o">-</span> <span class="n">start</span><span class="p">))</span>

<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>

<span class="s">"""
resutlt:
开始下载Python从入门到住院.pdf...
开始下载Peking Hot.avi...
Python从入门到住院.pdf下载完成! 耗费了9秒
Peking Hot.avi下载完成! 耗费了10秒
总共耗费了10.02秒.
"""</span>

<span class="c1">#Part 3
</span><span class="s">"""
因为多个线程可以共享进程的内存空间，因此要实现多个线程间的通信相对简单，
大家能想到的最直接的办法就是设置一个全局变量，多个线程共享这个全局变量即可。
但是当多个线程共享同一个变量（我们通常称之为“资源”）的时候，很有可能产生
不可控的结果从而导致程序失效甚至崩溃。如果一个资源被多个线程竞争使用，那么
我们通常称之为“临界资源”，对“临界资源”的访问需要加上保护，否则资源会处于
“混乱”的状态。下面的例子演示了100个线程向同一个银行账户转账（转入1元钱）的
场景，在这个例子中，银行账户就是一个临界资源，在没有保护的情况下我们很有
可能会得到错误的结果。
"""</span>
<span class="kn">from</span> <span class="nn">time</span> <span class="kn">import</span> <span class="n">sleep</span>
<span class="kn">from</span> <span class="nn">threading</span> <span class="kn">import</span> <span class="n">Thread</span>


<span class="k">class</span> <span class="nc">Account</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>

    <span class="k">def</span> <span class="nf">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span> <span class="o">=</span> <span class="mi">0</span>

    <span class="k">def</span> <span class="nf">deposit</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">money</span><span class="p">):</span>
        <span class="c1"># 计算存款后的余额
</span>        <span class="n">new_balance</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span> <span class="o">+</span> <span class="n">money</span>
        <span class="c1"># 模拟受理存款业务需要0.01秒的时间
</span>        <span class="n">sleep</span><span class="p">(</span><span class="mf">0.01</span><span class="p">)</span>
        <span class="c1"># 修改账户余额
</span>        <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span> <span class="o">=</span> <span class="n">new_balance</span>

    <span class="o">@</span><span class="nb">property</span>
    <span class="k">def</span> <span class="nf">balance</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span>


<span class="k">class</span> <span class="nc">AddMoneyThread</span><span class="p">(</span><span class="n">Thread</span><span class="p">):</span>

    <span class="k">def</span> <span class="nf">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">account</span><span class="p">,</span> <span class="n">money</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">()</span><span class="o">.</span><span class="n">__init__</span><span class="p">()</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_account</span> <span class="o">=</span> <span class="n">account</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_money</span> <span class="o">=</span> <span class="n">money</span>

    <span class="k">def</span> <span class="nf">run</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_account</span><span class="o">.</span><span class="n">deposit</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">_money</span><span class="p">)</span>


<span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="n">account</span> <span class="o">=</span> <span class="n">Account</span><span class="p">()</span>
    <span class="n">threads</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="c1"># 创建100个存款的线程向同一个账户中存钱
</span>    <span class="k">for</span> <span class="n">_</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">100</span><span class="p">):</span>
        <span class="n">t</span> <span class="o">=</span> <span class="n">AddMoneyThread</span><span class="p">(</span><span class="n">account</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
        <span class="n">threads</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">t</span><span class="p">)</span>
        <span class="n">t</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="c1"># 等所有存款的线程都执行完毕
</span>    <span class="k">for</span> <span class="n">t</span> <span class="ow">in</span> <span class="n">threads</span><span class="p">:</span>
        <span class="n">t</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'账户余额为: ￥</span><span class="si">%</span><span class="s">d元'</span> <span class="o">%</span> <span class="n">account</span><span class="o">.</span><span class="n">balance</span><span class="p">)</span>


<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>
    
<span class="s">"""
result:
账户余额为: ￥3元
"""</span>
<span class="s">"""
运行上面的的程序，结果让人大跌眼镜，100个线程分别向账户中转入1元钱，结果居然
远远小于100元。之所以出现这种情况是因为我们没有对银行账户这个“临界资源”加以保护，
多个线程同时向账户中存钱时，会一起执行到new_balance = self._balance + money这行
代码，多个线程得到的账户余额都是初始状态下的0，所以都是0上面做了+1的操作，因此
得到了错误的结果。在这种情况下，“锁”就可以派上用场了。我们可以通过“锁”来
保护“临界资源”，只有获得“锁”的线程才能访问“临界资源”，而其他没有得到“锁”的线程
只能被阻塞起来，直到获得“锁”的线程释放了“锁”，其他线程才有机会获得“锁”，进而访问
被保护的“临界资源”。下面的代码演示了如何使用“锁”来保护对银行账户的操作，从而获得
正确的结果。
"""</span>

<span class="c1">#Part 4
</span><span class="kn">from</span> <span class="nn">time</span> <span class="kn">import</span> <span class="n">sleep</span>
<span class="kn">from</span> <span class="nn">threading</span> <span class="kn">import</span> <span class="n">Thread</span><span class="p">,</span> <span class="n">Lock</span>


<span class="k">class</span> <span class="nc">Account</span><span class="p">(</span><span class="nb">object</span><span class="p">):</span>

    <span class="k">def</span> <span class="nf">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_lock</span> <span class="o">=</span> <span class="n">Lock</span><span class="p">()</span>

    <span class="k">def</span> <span class="nf">deposit</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">money</span><span class="p">):</span>
        <span class="c1"># 先获取锁才能执行后续的代码
</span>        <span class="bp">self</span><span class="o">.</span><span class="n">_lock</span><span class="o">.</span><span class="n">acquire</span><span class="p">()</span>
        <span class="k">try</span><span class="p">:</span>
            <span class="n">new_balance</span> <span class="o">=</span> <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span> <span class="o">+</span> <span class="n">money</span>
            <span class="n">sleep</span><span class="p">(</span><span class="mf">0.01</span><span class="p">)</span>
            <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span> <span class="o">=</span> <span class="n">new_balance</span>
        <span class="k">finally</span><span class="p">:</span>
            <span class="c1"># 在finally中执行释放锁的操作保证正常异常锁都能释放
</span>            <span class="bp">self</span><span class="o">.</span><span class="n">_lock</span><span class="o">.</span><span class="n">release</span><span class="p">()</span>

    <span class="o">@</span><span class="nb">property</span>
    <span class="k">def</span> <span class="nf">balance</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="k">return</span> <span class="bp">self</span><span class="o">.</span><span class="n">_balance</span>


<span class="k">class</span> <span class="nc">AddMoneyThread</span><span class="p">(</span><span class="n">Thread</span><span class="p">):</span>

    <span class="k">def</span> <span class="nf">__init__</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">account</span><span class="p">,</span> <span class="n">money</span><span class="p">):</span>
        <span class="nb">super</span><span class="p">()</span><span class="o">.</span><span class="n">__init__</span><span class="p">()</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_account</span> <span class="o">=</span> <span class="n">account</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_money</span> <span class="o">=</span> <span class="n">money</span>

    <span class="k">def</span> <span class="nf">run</span><span class="p">(</span><span class="bp">self</span><span class="p">):</span>
        <span class="bp">self</span><span class="o">.</span><span class="n">_account</span><span class="o">.</span><span class="n">deposit</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">_money</span><span class="p">)</span>


<span class="k">def</span> <span class="nf">main</span><span class="p">():</span>
    <span class="n">account</span> <span class="o">=</span> <span class="n">Account</span><span class="p">()</span>
    <span class="n">threads</span> <span class="o">=</span> <span class="p">[]</span>
    <span class="k">for</span> <span class="n">_</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="mi">100</span><span class="p">):</span>
        <span class="n">t</span> <span class="o">=</span> <span class="n">AddMoneyThread</span><span class="p">(</span><span class="n">account</span><span class="p">,</span> <span class="mi">1</span><span class="p">)</span>
        <span class="n">threads</span><span class="o">.</span><span class="n">append</span><span class="p">(</span><span class="n">t</span><span class="p">)</span>
        <span class="n">t</span><span class="o">.</span><span class="n">start</span><span class="p">()</span>
    <span class="k">for</span> <span class="n">t</span> <span class="ow">in</span> <span class="n">threads</span><span class="p">:</span>
        <span class="n">t</span><span class="o">.</span><span class="n">join</span><span class="p">()</span>
    <span class="k">print</span><span class="p">(</span><span class="s">'账户余额为: ￥</span><span class="si">%</span><span class="s">d元'</span> <span class="o">%</span> <span class="n">account</span><span class="o">.</span><span class="n">balance</span><span class="p">)</span>


<span class="k">if</span> <span class="n">__name__</span> <span class="o">==</span> <span class="s">'__main__'</span><span class="p">:</span>
    <span class="n">main</span><span class="p">()</span>
    
<span class="s">"""
result:
账户余额为: ￥100元
"""</span>

</code></pre></div></div>
<h4 id="多进程还是多线程">多进程还是多线程</h4>
<p>无论是多进程还是多线程，只要数量一多，效率肯定上不去，为什么呢？我们打个比方，假设你不幸正在准备中考，每天晚上需要做语文、数学、英语、物理、化学这5科的作业，每项作业耗时1小时。如果你先花1小时做语文作业，做完了，再花1小时做数学作业，这样，依次全部做完，一共花5小时，这种方式称为单任务模型。如果你打算切换到多任务模型，可以先做1分钟语文，再切换到数学作业，做1分钟，再切换到英语，以此类推，只要切换速度足够快，这种方式就和单核CPU执行多任务是一样的了，以旁观者的角度来看，你就正在同时写5科作业。</p>
<p>但是，切换作业是有代价的，比如从语文切到数学，要先收拾桌子上的语文书本、钢笔（这叫保存现场），然后，打开数学课本、找出圆规直尺（这叫准备新环境），才能开始做数学作业。操作系统在切换进程或者线程时也是一样的，它需要先保存当前执行的现场环境（CPU寄存器状态、内存页等），然后，把新任务的执行环境准备好（恢复上次的寄存器状态，切换内存页等），才能开始执行。这个切换过程虽然很快，但是也需要耗费时间。如果有几千个任务同时进行，操作系统可能就主要忙着切换任务，根本没有多少时间去执行任务了，这种情况最常见的就是硬盘狂响，点窗口无反应，系统处于假死状态。所以，多任务一旦多到一个限度，反而会使得系统性能急剧下降，最终导致所有任务都做不好。</p>
<p>是否采用多任务的第二个考虑是任务的类型，可以把任务分为计算密集型和I/O密集型。计算密集型任务的特点是要进行大量的计算，消耗CPU资源，比如对视频进行编码解码或者格式转换等等，这种任务全靠CPU的运算能力，虽然也可以用多任务完成，但是任务越多，花在任务切换的时间就越多，CPU执行任务的效率就越低。计算密集型任务由于主要消耗CPU资源，这类任务用Python这样的脚本语言去执行效率通常很低，最能胜任这类任务的是C语言，我们之前提到了Python中有嵌入C/C++代码的机制。</p>
<p>除了计算密集型任务，其他的涉及到网络、存储介质I/O的任务都可以视为I/O密集型任务，这类任务的特点是CPU消耗很少，任务的大部分时间都在等待I/O操作完成（因为I/O的速度远远低于CPU和内存的速度）。对于I/O密集型任务，如果启动多任务，就可以减少I/O等待时间从而让CPU高效率的运转。有一大类的任务都属于I/O密集型任务，这其中包括了我们很快会涉及到的网络应用和Web应用。</p>
<p><img alt="img" src="https://lz.sinaimg.cn/osj1080/ebeef3aaly3gby9qii5rkj20u01407a5.jpg"/></p>
</article>]