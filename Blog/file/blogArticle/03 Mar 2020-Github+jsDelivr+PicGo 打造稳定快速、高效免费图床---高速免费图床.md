[<article class="markdown-body">
<blockquote>
<p>参考：<a href="https://www.itrhx.com/2019/08/01/A27-image-hosting/">https://www.itrhx.com/2019/08/01/A27-image-hosting/</a></p>
</blockquote>
<p>我目前一直用<a href="https://jiketuchuang.com/">即刻图床</a>，上传速度特别快，但是我发现一次性上传图片过多会有部分失效，估计是被删除了。由于作者没有公开源码，所以具体的上传机制我也不清楚。</p>
<p>今天我逛博客看到了这篇，用 <strong>Github+jsDelivr+PicGo</strong> 打造稳定快速、高效免费图床</p>
<p>我之前想到过用Github库做免费仓库，但是访问速度太差劲了，直到今天我发现这篇，顿时解决了速度慢的问题，太赞了。下面为<strong>实例</strong>和<strong>教程</strong></p>
<h4 id="实例">实例</h4>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/89a835f6790c30c5725086b86b602060.png"/></p>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/87e25bda286bd77ea4d4c63ba73216e8.jpg"/></p>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/3ce807c0c64dac135b05b16458a2fd17.png"/></p>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/55f7a140a35c58861d7fdf88cb4634de.png"/></p>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/2a2b25399f452ce8cb90aaa41e79f2dd.png"/></p>
<h4 id="教程">教程</h4>
<h4 id="1新建github仓库">1.新建GitHub仓库</h4>
<p>登录/注册GitHub，新建一个仓库，红色标注的是必选项，其他的可以自由选择。
<img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/图床1.png"/></p>
<p><img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/图床2.png"/></p>
<h4 id="2生成一个token">2.生成一个Token</h4>
<p>在主页依次选择【Settings】-【Developer settings】-【Personal access tokens】-【Generate new token】，填写好描述，勾选【repo】，然后点击【Generate token】生成一个Token，注意这个Token只会显示一次，自己先保存下来，或者等后面配置好PicGo后再关闭此网页。
<img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/图床3.png"/>
<img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/图床4.png"/>
<img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/图床5.png"/></p>
<h4 id="3配置picgo">3.配置PicGo</h4>
<p>前往下载<a href="https://github.com/Molunerfinn/picgo/releases">PicGo</a>（Windows用户建议下载最新版的.exe文件），安装好后开始配置图床
<img alt="" src="https://cdn.jsdelivr.net/gh/JMbaozi/Blogimg/Pictures/图床6.png"/></p>
<ul>
<li>设定仓库名：按照【用户名/图床仓库名】的格式填写</li>
<li>设定分支名：【master】</li>
<li>设定Token：粘贴之前生成的【Token】</li>
<li>指定存储路径：填写想要储存的路径，如【Pictures/】，这样就会在仓库下创建一个名为 ITRHX-PIC 的文件夹，图片将会储存在此文件夹中</li>
<li>如果想要分类存放的话，可以再设置一个新的存储路径，如：img/，在上传的时候设置好就可以。</li>
</ul>
<p>设定自定义域名：它的作用是，在图片上传后，PicGo 会按照【自定义域名+储存路径+上传的图片名】的方式生成访问链接，并放到粘贴板上，因为我们要使用 jsDelivr 加速访问，所以可以设置为【https://cdn.jsdelivr.net/gh/用户名/图床仓库名 】，上传完毕后，我们就可以通过【https://cdn.jsdelivr.net/gh/用户名/图床仓库名/图片路径 】加速访问我们的图片了。</p>
</article>]