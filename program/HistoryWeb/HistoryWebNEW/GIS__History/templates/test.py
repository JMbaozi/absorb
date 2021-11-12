x=[1,2,3,4,5]
yyl=[0.8,0.1,0.9,1]
yylStad=[0.8,0.9,0.8,0.8]

def tackle(x,yyl):
    if yyl > yylStad:
        print(0)
    else:
        print(1)


for i in range(0,len(x)-1):

    tackle(x[i],yyl[i],yylStad[i]);