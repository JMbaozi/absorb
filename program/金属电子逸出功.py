import matplotlib.pyplot as plt
import numpy as np

Ia = np.array([[6.9,7.1,7.2,7.4,7.5,7.8,7.8,8.1],
               [31.5,31.6,32.0,33.1,34.0,34.4,35.3,35.4],
               [118.5,120.8,122.7,126.4,128.3,128.4,133.2,133.2],
               [381.3,388.8,394.7,401.1,406.5,413.5,421.9,428.6],
               [1050.0,1067.6,1136.5,1147.3,1169.3,1174.4,1202.8,1226.6]])
# logIa1 = np.array([[0.835,0.845,0.857,0.863,0.869,0.875,0.886,0.898],
#                  [1.507,1.513,1.520,1.528,1.534,1.542,1.550,1.559],
#                  [2.083,2.089,2.096,2.103,2.110,2.117,2.118,2.132],
#                  [2.589,2.597,2.604,2.611,2.618,2.624,2.632,2.638]])
logIa = np.log10(Ia*1e-6)
genUa = np.array([5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0])
print(logIa)



plt.figure()
plt.plot(genUa,logIa[0])
plt.show()



from scipy.optimize import leastsq
r_=[]
for i in range(logIa.shape[0]):
    def f(p):
        k,b=p
        return (logIa[i]-(k*genUa+b))
    r = leastsq(f,[1,0])
    r_.append(r)



lgI=[]
for i in range(logIa.shape[0]):
    k,b=r_[i][0]
    plt.plot(genUa,logIa[i])
    plt.plot(range(13),k*range(13)+b)
    lgI.append(b)
plt.show()
print(lgI)



T = np.array([1.72,1.80,1.88,1.96,2.04])*1e3
lgI = np.array(lgI)
lgI_T = lgI-np.log10(np.power(T,2))
print(lgI_T)

print(1/T)


def f(p):
        k,b=p
        return (lgI_T-(k*(1/T)+b))
r = leastsq(f,[1,0])


print(r[0][0])



t = r[0][0]/(-5.04*1e3)
print(t)


import math
print(abs(4.5-round(t,2))/4.5)

