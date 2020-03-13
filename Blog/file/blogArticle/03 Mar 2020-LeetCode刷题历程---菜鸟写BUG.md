[<article class="markdown-body">
<p>以前都是看别人做题，从来没做过，这次想做一下。</p>
<p>我最开始是学C++的，最后悔的就是数据结构没学好，现在也基本用不到C++了（目前为止），最近正好自学Python，所以答题就用Python了。</p>
<p>所有题目解法不一，思路不一，我放的都是我的第一思路或者学习别人的思路。</p>
<p>看完别人的题解，我基本只会暴力解题，数据结构一片茫然🙃</p>
<p>本博客持续更新，LeetCode刷题全部放在本博客中。</p>
<h4 id="1">1.</h4>
<p><img alt="1" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/20200303205251.png"/></p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">game</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">guess</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">],</span> <span class="n">answer</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">])</span> <span class="o">-&gt;</span> <span class="nb">int</span><span class="p">:</span>
        <span class="n">n</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">guess</span><span class="p">)):</span>
            <span class="k">if</span> <span class="n">guess</span><span class="p">[</span><span class="n">i</span><span class="p">]</span> <span class="o">==</span> <span class="n">answer</span><span class="p">[</span><span class="n">i</span><span class="p">]:</span>
                <span class="n">n</span><span class="o">+=</span><span class="mi">1</span>
        <span class="k">return</span> <span class="n">n</span>
</code></pre></div></div>
<h4 id="2">2.</h4>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/20200303211509.png"/></p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">findNumbers</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">nums</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">])</span> <span class="o">-&gt;</span> <span class="nb">int</span><span class="p">:</span>
        <span class="n">n</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">for</span> <span class="n">num</span> <span class="ow">in</span> <span class="n">nums</span><span class="p">:</span>
            <span class="n">a</span> <span class="o">=</span> <span class="nb">str</span><span class="p">(</span><span class="n">num</span><span class="p">)</span>
            <span class="k">if</span> <span class="nb">len</span><span class="p">(</span><span class="n">a</span><span class="p">)</span><span class="o">%</span><span class="mi">2</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
                <span class="n">n</span><span class="o">+=</span><span class="mi">1</span>
        <span class="k">return</span> <span class="n">n</span>
    <span class="c1">#将数字转成字符，然后看长度是否是偶数。。。
</span>    <span class="c1">#这思路，我傻了。
</span></code></pre></div></div>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="kn">from</span> <span class="nn">math</span> <span class="kn">import</span> <span class="n">log10</span>
<span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">findNumbers</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">nums</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">])</span> <span class="o">-&gt;</span> <span class="nb">int</span><span class="p">:</span>
        <span class="n">n</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">for</span> <span class="n">num</span> <span class="ow">in</span> <span class="n">nums</span><span class="p">:</span>
            <span class="k">if</span> <span class="nb">int</span><span class="p">(</span><span class="n">log10</span><span class="p">(</span><span class="n">num</span><span class="p">)</span><span class="o">+</span><span class="mi">1</span><span class="p">)</span><span class="o">%</span><span class="mi">2</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
                <span class="n">n</span><span class="o">+=</span><span class="mi">1</span>
        <span class="k">return</span> <span class="n">n</span>
    <span class="c1"># log10(n)，表示以10为底n的对数
</span>    <span class="c1"># log10(10)    1.0
</span>    <span class="c1"># log10(100)   2.0
</span>    <span class="c1"># log10(9100)  3.9590413923210934
</span>    <span class="c1"># 刚好可以用这个求出数字的位数
</span>    <span class="c1">#用户as所写
</span></code></pre></div></div>
<h4 id="3">3.</h4>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/20200303213205.png"/></p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">numJewelsInStones</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">J</span><span class="p">:</span> <span class="nb">str</span><span class="p">,</span> <span class="n">S</span><span class="p">:</span> <span class="nb">str</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="nb">int</span><span class="p">:</span>
        <span class="n">num</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">for</span> <span class="n">j</span> <span class="ow">in</span> <span class="n">J</span><span class="p">:</span>
            <span class="k">for</span> <span class="n">s</span> <span class="ow">in</span> <span class="n">S</span><span class="p">:</span>
                <span class="k">if</span> <span class="n">j</span><span class="o">==</span><span class="n">s</span><span class="p">:</span>
                    <span class="n">num</span><span class="o">+=</span><span class="mi">1</span>
        <span class="k">return</span> <span class="n">num</span>

</code></pre></div></div>
<h4 id="4">4.</h4>
<p>字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串”abcdefg”和数字2，该函数将返回左旋转两位得到的结果”cdefgab”。</p>
<p>示例 1：</p>
<p>输入: s = “abcdefg”, k = 2
输出: ”cdefgab”
示例 2：</p>
<p>输入: s = “lrloseumgh”, k = 6
输出: ”umghlrlose”</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">reverseLeftWords</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">s</span><span class="p">:</span> <span class="nb">str</span><span class="p">,</span> <span class="n">n</span><span class="p">:</span> <span class="nb">int</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="nb">str</span><span class="p">:</span>
        <span class="n">r</span> <span class="o">=</span> <span class="n">s</span><span class="p">[</span><span class="mi">0</span><span class="p">:</span><span class="n">n</span><span class="p">]</span>
        <span class="n">s</span> <span class="o">=</span> <span class="n">s</span><span class="p">[</span><span class="n">n</span><span class="p">:</span><span class="nb">len</span><span class="p">(</span><span class="n">s</span><span class="p">)]</span>
        <span class="n">s</span> <span class="o">=</span> <span class="n">s</span> <span class="o">+</span> <span class="n">r</span>
        <span class="k">return</span> <span class="n">s</span>
        
        <span class="c1">#或者直接简单粗暴一句话：
</span>        <span class="c1">#return s[n:]+s[:n]
</span></code></pre></div></div>
<h4 id="5">5.</h4>
<p>给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。</p>
<p>你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。</p>
<p>示例:</p>
<p>给定 nums = [2, 7, 11, 15], target = 9</p>
<p>因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">twoSum</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">nums</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">],</span> <span class="n">target</span><span class="p">:</span> <span class="nb">int</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">]:</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">nums</span><span class="p">)):</span>
            <span class="k">for</span> <span class="n">j</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="n">i</span><span class="o">+</span><span class="mi">1</span><span class="p">,</span><span class="nb">len</span><span class="p">(</span><span class="n">nums</span><span class="p">)):</span>
                <span class="k">if</span> <span class="n">nums</span><span class="p">[</span><span class="n">i</span><span class="p">]</span><span class="o">+</span><span class="n">nums</span><span class="p">[</span><span class="n">j</span><span class="p">]</span> <span class="o">==</span> <span class="n">target</span><span class="p">:</span>
                    <span class="n">a</span> <span class="o">=</span> <span class="p">[</span><span class="n">i</span><span class="p">,</span><span class="n">j</span><span class="p">]</span>
                    <span class="k">return</span> <span class="n">a</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="k">return</span> <span class="mi">0</span>
</code></pre></div></div>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">twoSum</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">nums</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">],</span> <span class="n">target</span><span class="p">:</span> <span class="nb">int</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">]:</span>
        <span class="n">hashmap</span> <span class="o">=</span> <span class="p">{}</span>
        <span class="k">for</span> <span class="n">index</span><span class="p">,</span> <span class="n">num</span> <span class="ow">in</span> <span class="nb">enumerate</span><span class="p">(</span><span class="n">nums</span><span class="p">):</span>
            <span class="n">another_num</span> <span class="o">=</span> <span class="n">target</span> <span class="o">-</span> <span class="n">num</span>
            <span class="k">if</span> <span class="n">another_num</span> <span class="ow">in</span> <span class="n">hashmap</span><span class="p">:</span>
                <span class="k">return</span> <span class="p">[</span><span class="n">hashmap</span><span class="p">[</span><span class="n">another_num</span><span class="p">],</span> <span class="n">index</span><span class="p">]</span>
            <span class="n">hashmap</span><span class="p">[</span><span class="n">num</span><span class="p">]</span> <span class="o">=</span> <span class="n">index</span>
        <span class="k">return</span> <span class="bp">None</span>
    <span class="c1">#记一位大佬用字典写的方法
</span></code></pre></div></div>
<h4 id="6">6.</h4>
<p>给你一个数组 nums，对于其中每个元素 nums[i]，请你统计数组中比它小的所有数字的数目。</p>
<p>换而言之，对于每个 nums[i] 你必须计算出有效的 j 的数量，其中 j 满足 j != i 且 nums[j] &lt; nums[i] 。</p>
<p>以数组形式返回答案。</p>
<p>示例 1：</p>
<p>输入：nums = [8,1,2,2,3]
输出：[4,0,1,1,3]
解释： 
对于 nums[0]=8 存在四个比它小的数字：（1，2，2 和 3）。 
对于 nums[1]=1 不存在比它小的数字。
对于 nums[2]=2 存在一个比它小的数字：（1）。 
对于 nums[3]=2 存在一个比它小的数字：（1）。 
对于 nums[4]=3 存在三个比它小的数字：（1，2 和 2）。
示例 2：</p>
<p>输入：nums = [6,5,4,8]
输出：[2,1,0,3]
示例 3：</p>
<p>输入：nums = [7,7,7,7]
输出：[0,0,0,0]</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">smallerNumbersThanCurrent</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">nums</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">])</span> <span class="o">-&gt;</span> <span class="n">List</span><span class="p">[</span><span class="nb">int</span><span class="p">]:</span>
        <span class="n">answer</span> <span class="o">=</span> <span class="p">[</span><span class="mi">0</span><span class="p">]</span><span class="o">*</span><span class="nb">len</span><span class="p">(</span><span class="n">nums</span><span class="p">)</span>
        <span class="n">num</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">nums</span><span class="p">)):</span>
            <span class="k">for</span> <span class="n">j</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">nums</span><span class="p">)):</span>
                <span class="k">if</span> <span class="n">nums</span><span class="p">[</span><span class="n">j</span><span class="p">]</span><span class="o">&lt;</span><span class="n">nums</span><span class="p">[</span><span class="n">i</span><span class="p">]:</span>
                    <span class="n">num</span><span class="o">+=</span><span class="mi">1</span>
            <span class="n">answer</span><span class="p">[</span><span class="n">i</span><span class="p">]</span> <span class="o">=</span> <span class="n">num</span>
            <span class="n">num</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">return</span> <span class="n">answer</span>
</code></pre></div></div>
<h4 id="7">7.</h4>
<p>给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。</p>
<p>示例 1:</p>
<p>输入: 123
输出: 321
 示例 2:</p>
<p>输入: -123
输出: -321
示例 3:</p>
<p>输入: 120
输出: 21
注意:</p>
<p>假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2^31,  2^31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">reverse</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">x</span><span class="p">:</span> <span class="nb">int</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="nb">int</span><span class="p">:</span>
        <span class="n">a</span> <span class="o">=</span> <span class="nb">str</span><span class="p">(</span><span class="n">x</span><span class="p">)[::</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span>
        <span class="k">if</span> <span class="n">a</span><span class="o">.</span><span class="n">endswith</span><span class="p">(</span><span class="s">'-'</span><span class="p">):</span>
            <span class="n">a</span> <span class="o">=</span> <span class="nb">str</span><span class="p">(</span><span class="s">'-'</span><span class="p">)</span> <span class="o">+</span> <span class="n">a</span><span class="p">[:</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span>
            <span class="k">return</span> <span class="nb">int</span><span class="p">(</span><span class="n">a</span><span class="p">)</span> <span class="k">if</span> <span class="nb">int</span><span class="p">(</span><span class="n">a</span><span class="p">)</span><span class="o">&gt;</span> <span class="o">-</span><span class="mi">2</span><span class="o">**</span><span class="mi">31</span> <span class="k">else</span> <span class="mi">0</span>
        <span class="k">return</span> <span class="nb">int</span><span class="p">(</span><span class="n">a</span><span class="p">)</span> <span class="k">if</span> <span class="nb">int</span><span class="p">(</span><span class="n">a</span><span class="p">)</span><span class="o">&lt;</span> <span class="mi">2</span><span class="o">**</span><span class="mi">31</span><span class="o">-</span><span class="mi">1</span> <span class="k">else</span> <span class="mi">0</span>     
</code></pre></div></div>
<h4 id="8">8.</h4>
<p>给你一个非负整数 num ，请你返回将它变成 0 所需要的步数。 如果当前数字是偶数，你需要把它除以 2 ；否则，减去 1 。</p>
<p>示例 1：</p>
<p>输入：num = 14
输出：6
解释：
步骤 1) 14 是偶数，除以 2 得到 7 。
步骤 2） 7 是奇数，减 1 得到 6 。
步骤 3） 6 是偶数，除以 2 得到 3 。
步骤 4） 3 是奇数，减 1 得到 2 。
步骤 5） 2 是偶数，除以 2 得到 1 。
步骤 6） 1 是奇数，减 1 得到 0 。</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">numberOfSteps</span> <span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">num</span><span class="p">:</span> <span class="nb">int</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="nb">int</span><span class="p">:</span>
        <span class="n">step</span> <span class="o">=</span> <span class="mi">0</span>
        <span class="k">if</span> <span class="n">num</span> <span class="o">==</span><span class="mi">0</span><span class="p">:</span>
            <span class="k">return</span> <span class="mi">0</span>
        <span class="k">while</span> <span class="n">num</span><span class="o">!=</span><span class="mi">0</span><span class="p">:</span>
            <span class="k">if</span> <span class="n">num</span> <span class="o">%</span> <span class="mi">2</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
                <span class="n">num</span> <span class="o">=</span> <span class="n">num</span><span class="o">/</span><span class="mi">2</span>
                <span class="n">step</span><span class="o">+=</span><span class="mi">1</span>
            <span class="k">else</span><span class="p">:</span>
                <span class="n">num</span><span class="o">-=</span><span class="mi">1</span>
                <span class="n">step</span><span class="o">+=</span><span class="mi">1</span>    
            <span class="k">if</span> <span class="n">num</span> <span class="o">==</span> <span class="mi">0</span><span class="p">:</span>
                <span class="k">return</span> <span class="n">step</span>
</code></pre></div></div>
<h4 id="9">9.</h4>
<p>判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。</p>
<p>示例 1:</p>
<p>输入: 121
输出: true
示例 2:</p>
<p>输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">isPalindrome</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">x</span><span class="p">:</span> <span class="nb">int</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="nb">bool</span><span class="p">:</span>
        <span class="k">if</span> <span class="n">x</span><span class="o">&lt;</span><span class="mi">0</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">False</span>
        <span class="n">a</span> <span class="o">=</span> <span class="nb">str</span><span class="p">(</span><span class="n">x</span><span class="p">)</span>
        <span class="n">b</span> <span class="o">=</span> <span class="n">a</span><span class="p">[::</span><span class="o">-</span><span class="mi">1</span><span class="p">]</span>
        <span class="k">if</span> <span class="n">a</span><span class="o">==</span><span class="n">b</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">True</span>
        <span class="k">else</span><span class="p">:</span>
            <span class="k">return</span> <span class="bp">False</span>
</code></pre></div></div>
<h4 id="10">10.</h4>
<p>给定一个二叉树，找出其最大深度。</p>
<p>二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。</p>
<p>说明: 叶子节点是指没有子节点的节点。</p>
<p>示例：
给定二叉树 [3,9,20,null,null,15,7]，</p>
<p>3
   / \
  9  20
      /  \
    15   7
返回它的最大深度 3 。</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">#方法1：递归
</span>
<span class="c1"># Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
</span>
<span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">maxDepth</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">root</span><span class="p">:</span> <span class="n">TreeNode</span><span class="p">)</span> <span class="o">-&gt;</span> <span class="nb">int</span><span class="p">:</span>
        <span class="k">if</span> <span class="n">root</span> <span class="o">==</span> <span class="bp">None</span><span class="p">:</span>
            <span class="k">return</span> <span class="mi">0</span>
        <span class="k">return</span> <span class="nb">max</span><span class="p">(</span><span class="bp">self</span><span class="o">.</span><span class="n">maxDepth</span><span class="p">(</span><span class="n">root</span><span class="o">.</span><span class="n">left</span><span class="p">),</span><span class="bp">self</span><span class="o">.</span><span class="n">maxDepth</span><span class="p">(</span><span class="n">root</span><span class="o">.</span><span class="n">right</span><span class="p">))</span><span class="o">+</span><span class="mi">1</span>

</code></pre></div></div>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="c1">#方法2：迭代
</span><span class="s">"""
我们还可以在栈的帮助下将上面的递归转换为迭代。

我们的想法是使用 DFS 策略访问每个结点，同时在每次访问时更新最大深度。

所以我们从包含根结点且相应深度为 1 的栈开始。然后我们继续迭代：将当前结点弹出栈并推入子结点。每一步都会更新深度。
"""</span>
<span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">maxDepth</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">root</span><span class="p">):</span>
        <span class="s">"""
        :type root: TreeNode
        :rtype: int
        """</span> 
        <span class="n">stack</span> <span class="o">=</span> <span class="p">[]</span>                                              <span class="c1"># 定义一个空栈，栈中的元素是结点及其对应的深度
</span>        <span class="k">if</span> <span class="n">root</span><span class="p">:</span>                                                <span class="c1"># 如果根结点不为空
</span>            <span class="n">stack</span><span class="o">.</span><span class="n">append</span><span class="p">((</span><span class="n">root</span><span class="p">,</span> <span class="mi">1</span><span class="p">))</span>                             <span class="c1"># 则将根节点及其对应深度1组成的元组入栈
</span>        <span class="n">max_depth</span> <span class="o">=</span> <span class="mi">0</span>                                           <span class="c1"># 初始化最大深度为零
</span>        <span class="k">while</span> <span class="n">stack</span><span class="p">:</span>                                            <span class="c1"># 当栈非空时
</span>            <span class="n">tree_node</span><span class="p">,</span> <span class="n">cur_depth</span> <span class="o">=</span> <span class="n">stack</span><span class="o">.</span><span class="n">pop</span><span class="p">()</span>                  <span class="c1"># 弹出栈顶结点及其对应的深度
</span>            <span class="k">if</span> <span class="n">tree_node</span><span class="p">:</span>                                       <span class="c1"># 如果该结点不为空
</span>                <span class="n">max_depth</span> <span class="o">=</span> <span class="nb">max</span><span class="p">(</span><span class="n">max_depth</span><span class="p">,</span> <span class="n">cur_depth</span><span class="p">)</span>           <span class="c1"># 更新当前最大深度，如果该结点深度更大的话
</span>                <span class="n">stack</span><span class="o">.</span><span class="n">append</span><span class="p">((</span><span class="n">tree_node</span><span class="o">.</span><span class="n">left</span><span class="p">,</span> <span class="n">cur_depth</span><span class="o">+</span><span class="mi">1</span><span class="p">))</span>     <span class="c1"># 将该结点的左孩子结点及其对应深度压入栈中
</span>                <span class="n">stack</span><span class="o">.</span><span class="n">append</span><span class="p">((</span><span class="n">tree_node</span><span class="o">.</span><span class="n">right</span><span class="p">,</span> <span class="n">cur_depth</span><span class="o">+</span><span class="mi">1</span><span class="p">))</span>    <span class="c1"># 将该结点的右孩子结点及其对应深度压入栈中
</span>        <span class="k">return</span> <span class="n">max_depth</span>                                        <span class="c1"># 返回遍历结束后的最大深度
</span></code></pre></div></div>
<h4 id="11">11.</h4>
<p>编写一个函数来查找字符串数组中的最长公共前缀。</p>
<p>如果不存在公共前缀，返回空字符串 ”“。</p>
<p>示例 1:</p>
<p>输入: [“flower”,”flow”,”flight”]
输出: “fl”
示例 2:</p>
<p>输入: [“dog”,”racecar”,”car”]
输出: “”
解释: 输入不存在公共前缀。</p>
<div class="language-python highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="s">"""
大佬：利用python的max()和min()，在Python里字符串是可以比较的，按照ascII值排，举例abb， aba，abac，最大为abb，最小为aba。所以只需要比较最大最小的公共前缀就是整个数组的公共前缀。
利用python的zip函数，把str看成list然后把输入看成二维数组，左对齐纵向压缩，然后把每项利用集合去重，之后遍历list中找到元素长度大于1之前的就是公共前缀
我：暴力解题 + 面向测试编程 = 不通过😭
"""</span>
<span class="k">class</span> <span class="nc">Solution</span><span class="p">:</span>
    <span class="k">def</span> <span class="nf">longestCommonPrefix</span><span class="p">(</span><span class="bp">self</span><span class="p">,</span> <span class="n">strs</span><span class="p">:</span> <span class="n">List</span><span class="p">[</span><span class="nb">str</span><span class="p">])</span> <span class="o">-&gt;</span> <span class="nb">str</span><span class="p">:</span>
        <span class="k">if</span> <span class="ow">not</span> <span class="n">strs</span><span class="p">:</span>
            <span class="k">return</span> <span class="s">""</span>
        <span class="n">Min</span> <span class="o">=</span> <span class="nb">min</span><span class="p">(</span><span class="n">strs</span><span class="p">)</span>
        <span class="n">Max</span> <span class="o">=</span> <span class="nb">max</span><span class="p">(</span><span class="n">strs</span><span class="p">)</span>
        <span class="k">for</span> <span class="n">i</span> <span class="ow">in</span> <span class="nb">range</span><span class="p">(</span><span class="nb">len</span><span class="p">(</span><span class="n">Min</span><span class="p">)):</span>
            <span class="k">if</span> <span class="n">Min</span><span class="p">[</span><span class="n">i</span><span class="p">]</span><span class="o">!=</span><span class="n">Max</span><span class="p">[</span><span class="n">i</span><span class="p">]:</span>
                <span class="k">return</span><span class="p">(</span><span class="n">Min</span><span class="p">[:</span><span class="n">i</span><span class="p">])</span>
        <span class="c1">#for i,x in enumerate(Min):
</span>        <span class="c1">#    if x!= Max[i]:
</span>        <span class="c1">#       return Min[:i]
</span>        <span class="k">return</span> <span class="n">Min</span>
    <span class="s">'''
    def longestCommonPrefix(self, strs):
        if not strs: return ""
        ss = list(map(set, zip(*strs)))
        res = ""
        for i, x in enumerate(ss):
            x = list(x)
            if len(x) &gt; 1:
                break
            res = res + x[0]
        return res    
    '''</span>
</code></pre></div></div>
</article>]