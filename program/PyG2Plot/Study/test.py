from pyg2plot import Plot

data_registration = [
    {"year": '2010', "value": 140.6},
    {"year": '2011', "value": 151.1},
    {"year": '2012', "value": 165.6},
    {"year": '2013', "value": 176},
    {"year": '2014', "value": 172},
    {"year": '2015', "value": 164.9},
    {"year": '2016', "value": 177},
    {"year": '2017', "value": 201},
    {"year": '2018', "value": 238},
    {"year": '2019', "value": 290},
    {"year": '2020', "value": 341},
]

line_registration = Plot("Line")

line_registration.set_options({
    "data": data_registration,
    "xField": "year",
    "yField": "value",
    "smooth": True,
    "label": {},
    # "point": {
    #     "size": 5,
    #     "shape": 'diamond',
    #     "style": {
    #         "fill": "white",
    #         "stroke": "#5B8FF9",
    #         "lineWidth": 2,
    #     }
    # },
})

line_registration.render("Study/test.html")

print("HTML生成完毕")
