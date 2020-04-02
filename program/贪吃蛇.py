import pygame,sys,random
from pygame.locals import *

#set color
pinkColor = pygame.Color(255,182,193)
blackColor = pygame.Color(0,0,0)
whiteColor = pygame.Color(255,255,255)

#set function of gameover
def gameover():
    #quit pygame window
    pygame.quit()
    #exit program
    sys.exit()

#function of main
def main():
    #init the program
    pygame.init()
    #define a variable to control speed
    time_clock = pygame.time.Clock()
    
    #set window&title
    screen = pygame.display.set_mode((640,480))
    pygame.display.set_caption("贪吃蛇")
    
    #定义蛇的初始化位置
    snakePosition = [100,100]   #蛇头位置
    #定义一个贪吃蛇的长度列表，其中有几个元素就代表有几段身体，这里我们定义5段身体
    snakeSegments = [[100,100],[80,100],[60,100],[40,100],[20,100]]
    #初始化食物位置
    foodPosition = [300,300]
    #食物数量，0表示被吃了，1表示没吃
    foodTotal = 1
    #初始方向：向右
    direction = 'right'
    #定义一个改变方向的变量
    changeDirection = direction
    
    while True:
        #监听用户事件
        for event in pygame.event.get():
            #判断是否为退出事件
            if event.type == QUIT:
                pygame.quit()
                sys.exit()
            #按键事件
            elif event.type == KEYDOWN:
                #left:'<-' or 'A';up:'↑'or 'W';right:'->' or 'D';down:'↓' or 'S'
                if event.key == K_LEFT or event.key == K_a:
                    changeDirection = 'left'
                if event.key == K_UP or event.key == K_w:
                    changeDirection = 'up'
                if event.key == K_RIGHT or event.key == K_d:
                    changeDirection = 'right'
                if event.key == K_DOWN or event.key == K_s:
                    changeDirection = 'down'
                #退出程序：Esc
                if event.key == K_ESCAPE:
                    pygame.event.post(pygame.event.Event(QUIT))
                
        #确认方向，判断是否输入了反方向
        if changeDirection == 'left' and direction != 'right':
            direction = changeDirection
        if changeDirection == 'up' and direction != 'down':
            direction = changeDirection
        if changeDirection == 'right' and direction != 'left':
            direction = changeDirection
        if changeDirection == 'down' and direction != 'up':
            direction = changeDirection
        
        #根据方向移动蛇头
        if direction == 'left':
            snakePosition[0] -= 20
        if direction == 'right':
            snakePosition[0] += 20
        if direction == 'up':
            snakePosition[1] -= 20
        if direction == 'down':
            snakePosition[1] += 20
                
        # 增加蛇的长度
        snakeSegments.insert(0, list(snakePosition))
        # 判断是否吃到食物
        if snakePosition[0] == foodPosition[0] and snakePosition[1] == foodPosition[1]:
            foodTotal = 0
        else:
            snakeSegments.pop()  # 每次将最后一单位蛇身剔除列表

        # 如果食物为0 重新生成食物
        if foodTotal == 0:
            x = random.randrange(1, 32)
            y = random.randrange(1, 24)
            foodPosition = [int(x * 20), int(y * 20)]
            foodTotal = 1

        # 绘制pygame显示层
        screen.fill(blackColor)


        for position in snakeSegments:  # 蛇身为白色
            # 画蛇
            pygame.draw.rect(screen, pinkColor, Rect(position[0], position[1], 20, 20))
            pygame.draw.rect(screen, whiteColor, Rect(foodPosition[0], foodPosition[1], 20, 20))

        # 更新显示到屏幕表面
        pygame.display.flip()

        # 判断游戏是否结束
        if snakePosition[0] > 620 or snakePosition[0] < 0:
            gameover()
        elif snakePosition[1] > 460 or snakePosition[1] < 0:
            gameover()
        # 如果碰到自己的身体
        for body in snakeSegments[1:]:
            if snakePosition[0] == body[0] and snakePosition[1] == body[1]:
                gameover()

        # 控制游戏速度
        time_clock.tick(5)


#  启动入口函数
if __name__ == '__main__':
    main()
                