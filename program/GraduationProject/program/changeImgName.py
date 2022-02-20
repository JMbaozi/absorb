import os
import os.path

rootdir = 'img/train/USCPedestrianSetC/PedestrianMultiViewTestSet'

num = 1
for parent,dirnames,filenames in os.walk(rootdir):
    for filename in filenames:
        os.rename(os.path.join(parent,filename),os.path.join(parent,str('img'+str(num)+'.bmp')))
        num +=1
        print("have changed from %s to %s" % (os.path.join(parent,filename),str('img'+str(num)+'.bmp')))