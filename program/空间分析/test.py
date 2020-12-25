# import time
# from functools import reduce


# # x = [1.3,2,3,4,5,6,7,8,9,10.7]
# # print(min(x))
# # print(int(max(x)))
# # for i in range(10,20):
# #     print(i)

# sum1 = 0
# t1 = time.time()
# # for i in range(10000000):
# #     sum1 += i * i
# sum1 = reduce(lambda x,y:x + y , map(lambda x:x*x ,range(10000000)))
# t2 = time.time()
# T1 = t2 - t1


# print("%d用时：%f" % (sum1,T1))

# import random

# re = ""

# for i in range(1,101):
#     re += str(random.uniform(100,160))
#     re += '\t'
#     re += str(random.uniform(100,160))
#     re += '\t'
#     re += str(random.uniform(1120,1150))
#     re += '\n'

# with open('data/test.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# a = [1,2,3,4]
# print(a[-1])


# import random

# re = ""

# for i in range(0,100):
#     re += str(random.randint(10,900))
#     re += ','
#     re += str(random.randint(10,700))
#     re += '\n'
# with open('data/kmenasPoints.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# import random

# re = ""

# for i in range(0,10):
#     re += str(random.randint(100,800))
#     re += ','
#     re += str(random.randint(100,600))
#     re += '\n'
# with open('data/Pointsbuffer.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# import random

# re = ""

# for i in range(0,10):
#     re += str(random.randint(100,800))
#     re += ','
#     re += str(random.randint(100,600))
#     re += ','
#     re += str(random.randint(100,800))
#     re += ','
#     re += str(random.randint(100,600))
#     re += '\n'
# with open('data/Linesbuffer.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")



# import random

# re = ""

# for i in range(0,3):
#     t = random.randint(3,6)#多边形边数
#     for j in range(t):
#         re += str(random.randint(100,800))
#         re += ','
#         re += str(random.randint(100,800))
#         if(j != t-1):
#             re += ','
#     re += '\n'
# with open('data/Shapesbuffer.txt','w',encoding='utf-8') as file:
#     file.write(re)
#     print("写入完毕")


# a = [[0,1,2],[3,4,5],[7,8,9]]

# print(a[1][1])
# print(a[0][2])
# print(a[0][0])




# from shapely.geometry import Point
# from shapely.geometry import LineString
# from shapely.geometry import MultiPolygon
# import matplotlib.pyplot as plt
# # 定义线段
# line = LineString([(0.1, 0.1), (2, 3),(3,3),(4,5)])
# # 生成缓冲区
# buffer = line.buffer(0.5)
# x1,y1=line.xy
 
# x2,y2=buffer.boundary.xy
 
# plt.figure()
 
# plt.plot(x1,y1)
 
# plt.plot(x2,y2)
 
# plt.show()v



# from Structure.graph.WeightedUndigraph import WeightedUndigraph
# from Structure.graph.Edge import Edge
# from Structure.PriorityQueue.IndexMinpriorutyQueue import IndexMinPriorityQueue
# from math import inf


# class PrimMST:
#     def __init__(self, graph):
#         """MST here represent the Minimum Spanning Tree of the current loop"""
#         self.graph = graph
#         # Memorize the cheapest edge to MST of each vertex(index)
#         self.min_edge_to_MST = [None for _ in range(self.graph.get_num_vertices())]
#         # Store the smallest weight of each vertex(index)'s edge to MST;
#         # Initialize it with infinite plus, we will compare out a minimum weight after
#         self.min_weight_to_MST = [+inf for _ in range(self.graph.get_num_vertices())]
#         # Mark a True if a vertex(index) has been visited
#         self.marked = [False for _ in range(self.graph.get_num_vertices())]
#         # Memorize the smaller weight of each vertex(index)'s edge connected to MST
#         self.the_cut_edges = IndexMinPriorityQueue(self.graph.get_num_vertices())

#         # Initialize a 0.0 as the minimum weight to weight_to_MST
#         self.min_weight_to_MST[0] = 0.0
#         self.the_cut_edges.insert(0, 0.0)
#         while not self.the_cut_edges.is_empty():
#             # Take out the minimum-weighted vertex, and make a visit(update) for it
#             self.visit(self.the_cut_edges.delete_min_and_get_index())

#     def visit(self, v):
#         """Update the MST"""
#         self.marked[v] = True
#         for e in self.graph.adjacent_edges(v):
#             w = e.opposite(v)
#             # Check if the opposite vertex of v in edge e is marked, if did, skip this loop
#             if self.marked[w]:
#                 continue
#             # Find out the minimum-weighted-edge vertex opposite to this vertex(v)
#             if e.get_weight() < self.min_weight_to_MST[w]:    # e.get_weight():Get weight of the edge between v and w
#                 # Update the minimum edge and weight
#                 # print(f"v: {v}, w: {w}, min_weight_edge: {e.get_weight()}")
#                 self.min_edge_to_MST[w] = e
#                 self.min_weight_to_MST[w] = e.get_weight()
#                 if self.the_cut_edges.is_index_exist(w):
#                     # print(w, e.get_weight())
#                     self.the_cut_edges.change_item(w, e.get_weight())
#                 else:
#                     self.the_cut_edges.insert(w, e.get_weight())

#     def min_weight_edges(self):
#         return [edge for edge in self.min_edge_to_MST if edge]


# if __name__ == '__main__':

#     with open('data/MST.txt', 'r') as f:
#         num_vertices = int(f.readline())
#         num_edges = int(f.readline())
#         graph = WeightedUndigraph(num_vertices)

#         for e in range(num_edges):
#             v1, v2, w = f.readline().split()
#             graph.add_edge(Edge(int(v1), int(v2), float(w)))
#     P_MST = PrimMST(graph)

#     for e in P_MST.min_weight_edges():
#         v = e.either()
#         w = e.opposite(v)
#         weight = e.weight
#         print(f"v: {v} w: {w} weight: {weight}")



# PrioQueue = ()
# def Prim(graph):
#     vnum = graph.vertex_num()
#     edges = PrioQueue((0,0,0))       #每次将新边加入到一个优先队列中
#     mst = [None] * vnum              #用于判断边所连接的点是否已经遍历过
#     edge_count = 0
#     while edge_count < vnum and not edges.is_empty():
#         weight, vi, vj = edges.dequeue()
#         if mst[vj] == None:
#             edge_count += 1
#             mst[vj] = (vi, weight)
#             for i,w in graph.out_edges(vj):   #将新点的出边加入优先队列
#                 if not mst[i]:
#                     edges.enqueue((w, vj, i))
#     return mst


# a = [1,2,3]
# b = []
# b += a[0:2]
# print(b)

# s = ''
# a = 2
# b = 3
# s += f'节点数据为%d，边数为%d\n'.format(a, b)

# print(s)




import random
42,39-21,38431294.160,3739137.010,-122.81

re = ""
for i in range(43,500):
    t = ""
    t = str(i)+','+str(i)+'-'+str(i-20)+','+str(random.uniform(38420080,38431499))+','+str(random.uniform(3737000.010,3739247.010))+','+str(random.uniform(-200.81,-110.81))+'\n'
    re += t
with open('data/test.txt','w',encoding='utf-8') as file:
    file.write(re)
    print("写入完毕")