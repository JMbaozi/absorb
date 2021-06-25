require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "CustomModules/D3Layer",
    "dojo/_base/array", "dojo/dom-construct", "dojo/_base/window",
    "dojo/domReady!"
], function (
    Map, ArcGISTiledMapServiceLayer, D3Layer,
    array, domConstruct, win
    ) {
    var ranks = {
        "西藏": 31,
        "青海": 30,
        "宁夏": 29,
        "海南": 28,
        "甘肃": 27,
        "贵州": 26,
        "新疆": 25,
        "云南": 24,
        "重庆": 23,
        "吉林": 22,
        "山西": 21,
        "天津": 20,
        "江西": 19,
        "广西": 18,
        "黑龙江": 17,
        "陕西": 16,
        "内蒙古": 15,
        "安徽": 14,
        "北京": 13,
        "福建": 12,
        "上海": 11,
        "湖南": 10,
        "湖北": 9,
        "四川": 8,
        "辽宁": 7,
        "河北": 6,
        "河南": 5,
        "浙江": 4,
        "山东": 3,
        "江苏": 2,
        "广东": 1
    }
    var payroll = d3.scale.quantile()
      .domain([600, 60000])
      .range([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

    var salary = d3.scale.quantile()
      .domain([0, 15000])
      .range([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

    var forces = {};
    var vis;
    var map = new esri.Map("map", {logo: false});

    var basemap = new ArcGISTiledMapServiceLayer("http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer");
    map.addLayer(basemap);

    var options = {
        attrs: [
            {
                key: 'r', value: function (d) {
                    return payroll(d.properties.team.payroll);
                }
            },
            { key: 'id', value: function (d) { return d.properties.team.name.replace(/\s/g, ''); } },
            { key: 'class', value: 'park' }
        ],
        type: 'circle'
    };
    var layer = new D3Layer('data/gdp.json', options);
    layer.on("load", d3LayerLoaded);
    map.addLayer(layer);

    map.on("zoom-end", function () {
        setTimeout(function () {
            d3.selectAll('.park')[0].forEach(function (park) {
                var root = d3.select('#' + park.id + '_root');
                if (root[0][0]) {
                    root.data()[0].x = park.cx.baseVal.value;
                    root.data()[0].px = park.cx.baseVal.value;
                    root.data()[0].y = park.cy.baseVal.value;
                    root.data()[0].py = park.cy.baseVal.value;
                    forces[park.id].start();
                }
            });
        }, 10);
    });

    function d3LayerLoaded(evt) {
        var lyr = evt.layer;

        d3.selectAll('.park').on('mouseover', function (dot) {
            var img = '<img src="img1/' + dot.properties.team.name.replace(/\s/g, '') + '.png"></img>';

            d3.select('#payroll').style('display', 'block');
            d3.select('#salary').style('display', 'none');
            d3.select('#intro').remove();
            var num = dot.properties.team.payroll;
            var str = getAmount(num.toString().length);

            d3.select('#team-logo').html(img);
            d3.select('#team-name').html('<h1>' + dot.properties.team.city + '</h1>');
            d3.select('#team-payroll').html(dot.properties.team.payroll + ' ' + str);
            d3.select('#team-payroll-rank').html(ranks[dot.properties.team.city]);
        }).on('mouseout', function (dot) {
            setTimeout(function () { }, 3000);
        });

        d3.selectAll('.park').on('click', function (dot) {
            if (d3.select('#' + dot.properties.team.city.replace(' ', ''))[0][0]) {
                d3.select('#' + dot.properties.team.city.replace(' ', '')).style('display', 'block');
            } else {
                var selected = d3.select(this)[0][0];

                var force = d3.layout.force().on("tick", tick);

                vis = lyr._element().append("g")
                    .attr('class', 'hover-force')
                    .attr('id', dot.properties.team.city.replace(' ', ''));

                var root = dot.properties;
                root.fixed = true;
                root.x = selected.cx.baseVal.value;
                root.y = selected.cy.baseVal.value;

                var nodes = flatten(root);
                var links = d3.layout.tree().links(nodes);

                forces[dot.properties.team.name.replace(/\s/g, '')] = force
                    .gravity(.01)
                    .charge(-75)
                    .linkStrength(5)
                    .linkDistance(50)
                    .size([700, 700])
                    .nodes(nodes)
                    .links(links)
                    .start();

                vis.selectAll("line.link")
                    .data(links, function (d) { return d.target.id; })
                    .enter().insert("svg:line", ".node")
                    .attr("class", "link")
                    .attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                vis.selectAll("circle.node")
                    .data(nodes, function (d) { return d.id; })
                    .enter().append("svg:circle")
                    .attr("class", function (d) { return (d.children) ? "root node" : "node" })
                    .attr("id", function (d) { return (d.children) ? d.team.name.replace(/\s/g, '') + '_root' : null })
                    .attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; })
                    .attr("r", function (d) { return d.children ? payroll(d.team.payroll) : salary(d.salary) })
                    .style("fill", color)
                    .call(force.drag)
                    .on('mousedown', function (d) {
                        if (d.team && d.team.city) d3.select('#' + d.team.city.replace(' ', '')).style('display', 'none');
                    }).on('mouseover', function (dot) {
                        if (!dot.team) {
                            var num = dot.salary;
                            var str = getAmount(num.toString().length);

                            d3.select('#salary').style('display', 'block');

                            d3.select('#player-name')
                              .html('<h1>' + dot.name + '</h1>');

                            d3.select('#player-salary')
                              .html(dot.salary + ' ' + str);
                        }
                    });
            }
        });
    }

    //add commas
    function addCommas(nStr) {
        nStr += '';
        x = nStr.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    //get dollar amount text
    function getAmount(dollar) {
        var amount;
        amount = "亿元";
        return amount;
    }

    function tick() {
        vis.selectAll("line.link")
          .attr("x1", function (d) { return d.source.x; })
          .attr("y1", function (d) { return d.source.y; })
          .attr("x2", function (d) { return d.target.x; })
          .attr("y2", function (d) { return d.target.y; });

        vis.selectAll("circle.node")
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; });
    }

    // MLB colors
    function color(d) {
        return d._children ? "#d50032" : d.children ? "#FFF" : "#d50032";
    }

    // Returns a list of all nodes under the root.
    function flatten(root) {
        var nodes = [], i = 0;

        function recurse(node) {
            if (node.children) node.salary = node.children.reduce(function (p, v) { return p + recurse(v); }, 0);
            if (!node.id) node.id = ++i;
            nodes.push(node);
            return node.salary;
        }

        root.salary = recurse(root);
        return nodes;
    }
});