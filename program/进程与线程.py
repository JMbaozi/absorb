
"""
Python中的多进程
"""

#Part 1 
"""
普通调用函数的方法，如果程序中的代码只能按顺序一点点的往下执行，
那么即使执行两个毫不相关的下载任务，也需要先等待一个文件下载完成
后才能开始下一个下载任务，很显然这并不合理也没有效率。
"""
from random import randint
from time import time,sleep

def download_task(filename):
    print('Start download %s ...' % filename)
    time_to_download = randint(5,10)
    sleep(time_to_download)
    print('%s download done.Use %d second.' % (filename,time_to_download))
    
def main():
    start = time()
    download_task('Python从入门到住院.pdf')
    download_task('Peking Hot.avi') #别问我是啥，我也不知道。
    end = time()
    print('Total use %.2f second.' % (end - start))
    
if __name__ == '__main__':
    main()

"""
result:
Start download Python从入门到住院.pdf ...
Python从入门到住院.pdf download done.Use 5 second.
Start download Peking Hot.avi ...
Peking Hot.avi download done.Use 10 second.
Total use 15.03 second.
"""


#Part 2
"""
通过Process类创建了进程对象，通过target参数我们传入一个函数来
表示进程启动后要执行的代码，后面的args是一个元组，它代表了传递给
函数的参数。Process对象的start方法用来启动进程，而join方法表示等待
进程执行结束。运行上面的代码可以明显发现两个下载任务“同时”启动了，
而且程序的执行时间将大大缩短，不再是两个任务的时间总和。
"""
from multiprocessing import Process         #pip install multiprocess
from os import getpid
from random import randint
from time import time,sleep

def download_task(filename):
    print('Start process,ID:%d.' % getpid())
    print('Star download %s ...' % filename)
    time_to_download = randint(5,10)
    sleep(time_to_download)
    print('%s download done.Use %d second.' % (filename,time_to_download))
    
def main():
    start = time()
    p1 = Process(target = download_task,args=('Python从入门到住院.pdf',))
    p1.start()
    p2 = Process(target=download_task,args=('Peking Hot.avi',))
    p2.start()
    p1.join()
    p2.join()
    end = time()
    print('Total us %.2f second.' % (end - start))
    
if __name__ == '__main__':
    main()

"""
result:
Start process,ID:7060.
Star download Python从入门到住院.pdf ...
Start process,ID:2828.
Star download Peking Hot.avi ...
Peking Hot.avi download done.Use 6 second.
Python从入门到住院.pdf download done.Use 10 second.
Total us 10.10 second.
"""






"""
Python中的多线程
"""

#Part 1
"""
目前的多线程开发推荐使用threading模块，该模块对多线程编程
提供了更好的面向对象的封装。把刚才下载文件的例子用多线程的方式来实现一遍。
"""
from random import randint
from threading import Thread
from time import time, sleep

def download(filename):
    print('开始下载%s...' % filename)
    time_to_download = randint(5, 10)
    sleep(time_to_download)
    print('%s下载完成! 耗费了%d秒' % (filename, time_to_download))

def main():
    start = time()
    t1 = Thread(target=download, args=('Python从入门到住院.pdf',))
    t1.start()
    t2 = Thread(target=download, args=('Peking Hot.avi',))
    t2.start()
    t1.join()
    t2.join()
    end = time()
    print('总共耗费了%.3f秒' % (end - start))

if __name__ == '__main__':
    main()

"""
result:
开始下载Python从入门到住院.pdf...
开始下载Peking Hot.avi...
Peking Hot.avi下载完成! 耗费了6秒
Python从入门到住院.pdf下载完成! 耗费了8秒
总共耗费了8.013秒
"""

#Part 2
"""
我们可以直接使用threading模块的Thread类来创建线程，但是我们学过一个
非常重要的概念叫“继承”，我们可以从已有的类创建新类，因此也可以通过
继承Thread类的方式来创建自定义的线程类，然后再创建线程对象并启动线程。
"""
from random import randint
from threading import Thread
from time import time, sleep

class DownloadTask(Thread):
    def __init__(self, filename):
        super().__init__()
        self._filename = filename
    def run(self):
        print('开始下载%s...' % self._filename)
        time_to_download = randint(5, 10)
        sleep(time_to_download)
        print('%s下载完成! 耗费了%d秒' % (self._filename, time_to_download))

def main():
    start = time()
    t1 = DownloadTask('Python从入门到住院.pdf')
    t1.start()
    t2 = DownloadTask('Peking Hot.avi')
    t2.start()
    t1.join()
    t2.join()
    end = time()
    print('总共耗费了%.2f秒.' % (end - start))

if __name__ == '__main__':
    main()

"""
resutlt:
开始下载Python从入门到住院.pdf...
开始下载Peking Hot.avi...
Python从入门到住院.pdf下载完成! 耗费了9秒
Peking Hot.avi下载完成! 耗费了10秒
总共耗费了10.02秒.
"""

#Part 3
"""
因为多个线程可以共享进程的内存空间，因此要实现多个线程间的通信相对简单，
大家能想到的最直接的办法就是设置一个全局变量，多个线程共享这个全局变量即可。
但是当多个线程共享同一个变量（我们通常称之为“资源”）的时候，很有可能产生
不可控的结果从而导致程序失效甚至崩溃。如果一个资源被多个线程竞争使用，那么
我们通常称之为“临界资源”，对“临界资源”的访问需要加上保护，否则资源会处于
“混乱”的状态。下面的例子演示了100个线程向同一个银行账户转账（转入1元钱）的
场景，在这个例子中，银行账户就是一个临界资源，在没有保护的情况下我们很有
可能会得到错误的结果。
"""
from time import sleep
from threading import Thread


class Account(object):

    def __init__(self):
        self._balance = 0

    def deposit(self, money):
        # 计算存款后的余额
        new_balance = self._balance + money
        # 模拟受理存款业务需要0.01秒的时间
        sleep(0.01)
        # 修改账户余额
        self._balance = new_balance

    @property
    def balance(self):
        return self._balance


class AddMoneyThread(Thread):

    def __init__(self, account, money):
        super().__init__()
        self._account = account
        self._money = money

    def run(self):
        self._account.deposit(self._money)


def main():
    account = Account()
    threads = []
    # 创建100个存款的线程向同一个账户中存钱
    for _ in range(100):
        t = AddMoneyThread(account, 1)
        threads.append(t)
        t.start()
    # 等所有存款的线程都执行完毕
    for t in threads:
        t.join()
    print('账户余额为: ￥%d元' % account.balance)


if __name__ == '__main__':
    main()
    
"""
result:
账户余额为: ￥3元
"""
"""
运行上面的的程序，结果让人大跌眼镜，100个线程分别向账户中转入1元钱，结果居然
远远小于100元。之所以出现这种情况是因为我们没有对银行账户这个“临界资源”加以保护，
多个线程同时向账户中存钱时，会一起执行到new_balance = self._balance + money这行
代码，多个线程得到的账户余额都是初始状态下的0，所以都是0上面做了+1的操作，因此
得到了错误的结果。在这种情况下，“锁”就可以派上用场了。我们可以通过“锁”来
保护“临界资源”，只有获得“锁”的线程才能访问“临界资源”，而其他没有得到“锁”的线程
只能被阻塞起来，直到获得“锁”的线程释放了“锁”，其他线程才有机会获得“锁”，进而访问
被保护的“临界资源”。下面的代码演示了如何使用“锁”来保护对银行账户的操作，从而获得
正确的结果。
"""

#Part 4
from time import sleep
from threading import Thread, Lock


class Account(object):

    def __init__(self):
        self._balance = 0
        self._lock = Lock()

    def deposit(self, money):
        # 先获取锁才能执行后续的代码
        self._lock.acquire()
        try:
            new_balance = self._balance + money
            sleep(0.01)
            self._balance = new_balance
        finally:
            # 在finally中执行释放锁的操作保证正常异常锁都能释放
            self._lock.release()

    @property
    def balance(self):
        return self._balance


class AddMoneyThread(Thread):

    def __init__(self, account, money):
        super().__init__()
        self._account = account
        self._money = money

    def run(self):
        self._account.deposit(self._money)


def main():
    account = Account()
    threads = []
    for _ in range(100):
        t = AddMoneyThread(account, 1)
        threads.append(t)
        t.start()
    for t in threads:
        t.join()
    print('账户余额为: ￥%d元' % account.balance)


if __name__ == '__main__':
    main()
    
"""
result:
账户余额为: ￥100元
"""
