import random as r

guess = ['石头', '剪刀', '布', '石头']
player = input(f'{guess[0:3]}：')
while player != 'Q':
    try:
        if player not in guess:
            raise
        CPU = r.choice(guess[0:3])
        print(f'CPU:{CPU}')
        if player == CPU:
            print('Draw！')
        elif guess[guess.index(player) + 1] == CPU:
            print('Player Win!')
        else:
            print('CPU win！')
        player = input(f'{guess[0:3]}：')
    except:
        player = input(f'输入有误！{guess[0:3]}：')
