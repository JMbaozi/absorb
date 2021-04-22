from pyg2plot import Plot

# The number of admission postgraduate exam
# Line graph

data_admission = [
    {"year": '2010', "value": 47.4},
    {"year": '2011', "value": 49.5},
    {"year": '2012', "value": 51.7},
    {"year": '2013', "value": 53.9},
    {"year": '2014', "value": 54.9},
    {"year": '2015', "value": 57.1},
    {"year": '2016', "value": 59.0},
    {"year": '2017', "value": 72.2},
    {"year": '2018', "value": 76.3},
]

line_admission = Plot("Line")

line_admission.set_options({
    "appendPadding": 32,
    "data": data_admission,
    "xField": "year",
    "yField": "value",
    "label": {},
    "smooth": True,
    "lineStyle": {
        "lineWidth": 3,
    },
    "point": {
        "size": 5,
        "shape": 'diamond',
        "style": {
            "fill": "white",
            "stroke": "#5B8FF9",
            "lineWidth": 2,
        }
    }
})

line_admission.render("Study/折线图/line_admission.html")

print("HTML生成完毕")
