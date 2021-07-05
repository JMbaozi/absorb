# # a = {'a' : 1, 'b': 2, 'c' : 3}
# #  
# # #字典中的key转换为列表
# # key_value = list(a.keys())
# # print('字典中的key转换为列表：', key_value)
# #  
# # #字典中的value转换为列表
# # value_list = list(a.values())
# # print('字典中的value转换为列表：', value_list)


#     <script>
#         $('#btn_dongwei').click(function () {
#             var url = '/Dynasty/dongwei';
#             alert(url);
#             $.post(url, function (alldata) {
#                 CountyName_sort = alldata[0]
#                 Household_sort = alldata[1]
#                 Households = alldata[2]
#                 Populations = alldata[4]
#                 Families = alldata[4]
#                 console.log(alldata);
#                 console.log(CountyName_sort)
#                 myChart.setOption({
#                     yAxis: {
#                         data: CountyName_sort
#                     },
#                     series: [{
#                         name: '户数（排序后）',
#                         data: Household_sort
#                     }]
#                 })
#                 myChart.setOption({
#                     series: [{
#                         name: '户数',
#                         data: Households
#                     }]
#                 })
#                 myChart.setOption({
#                     series: [{
#                         name: '人口数',
#                         data: Populations
#                     }]
#                 })
#                 myChart.setOption({
#                     series: [{
#                         name: '户口数',
#                         data: Families
#                     }]
#                 })
#             })
#         })
#     </script>




# a = [1,2,3,4,5,6]
# b = ['a','s','d','g','d','h']
# print(dict(list(zip(a,b))))




