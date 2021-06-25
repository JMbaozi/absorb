require(["dojo/parser", "dojo/aspect", "dijit/registry", "esri/map", "esri/geometry/Extent", "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/graphic", "esri/layers/GraphicsLayer", "esri/tasks/QueryTask", "esri/tasks/query", "esri/graphicsUtils",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color",
    "dojox/charting/Chart2D", "dojox/charting/action2d/Highlight", "dojox/charting/action2d/Tooltip", "dojox/charting/action2d/MoveSlice", "dojox/charting/plot2d/ClusteredColumns", "dojox/charting/plot2d/Pie",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/layout/AccordionContainer", "dojo/domReady!"],
    function (parser, aspect, registry, Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer,
        Graphic, GraphicsLayer, QueryTask, Query, graphicsUtils,
        SimpleLineSymbol, SimpleFillSymbol, Color,
        Chart2D, Highlight, Tooltip, MoveSlice) {
        parser.parse();

        var initialExtent = new Extent(-117.28, 32.65, -116.99, 32.86, new SpatialReference({
            wkid: 4326
        }));
        var map = new Map("mapDiv", {
            extent: initialExtent
        });
        var agoServiceURL = "http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer";
        var agoLayer = new ArcGISTiledMapServiceLayer(agoServiceURL);
        map.addLayer(agoLayer);

        var queryUrl = "https://servicesbeta.esri.com/ArcGIS/rest/services/SanDiego/Neighborhoods/MapServer/0";        

        // 定义几个符号
        var neighborhoodSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([72, 61, 139, 0.7]), 3), new Color([72, 61, 139, 0.3]));
        var highlightSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([72, 61, 139, 0.70]), 3), new Color([72, 61, 139, 0.70]));
        var selectedSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0, 0.70]), 3), new Color([255, 0, 0, 0.70]));

        var hoverGraphicsLayer = new GraphicsLayer();
        var selectedGraphicsLayer = new GraphicsLayer();

        // 地图加载后，执行下面的代码
        map.on("load", function (theMap) {
            // 监听社区被点击事件
            map.on("click", selectNeighborhood);

            // 为鼠标移动与选择两类高亮显示各增加一图形图层
            map.addLayer(hoverGraphicsLayer);
            map.addLayer(selectedGraphicsLayer);

            /// 监听鼠标移出地图图形图层事件
            map.graphics.on("mouse-over", function (evt) {
                hoverGraphicsLayer.clear();

                var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
                hoverGraphicsLayer.add(highlightGraphic);
            });

            map.graphics.on("mouse-out", function (evt) {
                hoverGraphicsLayer.clear();
            });

            addAllNeighborhood();
        });

        // 监听用户在堆叠容器中选择不同的面板
        var accordion = registry.byId("myAccordionContainer");
        aspect.after(accordion, "selectChild", function () {
            switch (accordion.selectedChildWidget.id) {
                case "paneIncome":
                    displayIncomeStats();
                    break;
                case "paneEducation":
                    displayEducationStats();
                    break;
                case "paneRace":
                    displayRaceStats();
                    break;
            }
        });

        function addAllNeighborhood() {
            var queryTask = new QueryTask(queryUrl);
            var query = new Query();
            query.returnGeometry = true;
            query.outSpatialReference = map.spatialReference;
            query.where = "1=1";

            queryTask.on("complete", function (evt) {
                map.graphics.clear();

                for (var i = 0, il = evt.featureSet.features.length; i < il; i++) {
                    var graphic = evt.featureSet.features[i];
                    graphic.setSymbol(neighborhoodSymbol);
                    map.graphics.add(graphic);
                }
            });

            queryTask.execute(query);
        }

        function selectNeighborhood(evt) {
            //Create a new query for the clicked neighborhood
            var queryClickedNeighborhoodTask = new QueryTask(queryUrl);
            var queryClickedNeighborhood = new Query();
            queryClickedNeighborhood.returnGeometry = true;

            //On this query, get all the needed attributes for the charts
            queryClickedNeighborhood.outFields = ["NAME", "TOTPOP_CY",
                "RACEBASECY", "WHITE_CY", "BLACK_CY", "AMERIND_CY",
                "ASIAN_CY", "PACIFIC_CY", "OTHRACE_CY", "RACE2UP_CY",
                "HISPPOP_CY", "EDUCBASECY", "EDLT9_CY", "EDSMHS_CY",
                "EDHSGRD_CY", "EDCOLL_CY", "EDASSC_CY", "EDBACH_CY",
                "EDGRAD_CY", "HINCBASECY", "MEDHINC_CY", "INC_0_20",
                "INC_20_35", "INC_35_50", "INC_50_75", "INC_75_125", "INC_125_UP"];
            queryClickedNeighborhood.geometry = evt.mapPoint;  //query the clicked point

            //Removes other neighborhoods. 
            // Shows just the clicked neighborhood.
            queryClickedNeighborhoodTask.on("complete", function (evt) {

                //If a neighborhood wasn't clicked, don't do anything
                if (evt.featureSet.features.length < 1) {
                    return;
                }
                    //If a neighborhood was clicked, do this...
                else {
                    //Clear all the other neighborhoods
                    hoverGraphicsLayer.clear();
                    selectedGraphicsLayer.clear();

                    //Add clicked neighborhood to map. 
                    var graphic = evt.featureSet.features[0];
                    graphic.setSymbol(selectedSymbol);
                    selectedGraphicsLayer.add(graphic);
                    selectedNeighborhood = graphic;

                    //Helper method to get the extent of the graphic
                    var neighborhoodExtent = graphicsUtils.graphicsExtent([graphic]);

                    //Zoom to the extent of the neighborhood graphic
                    map.setExtent(neighborhoodExtent, true);
                }

                updateAccordionPanes();
            });

            queryClickedNeighborhoodTask.execute(queryClickedNeighborhood);
        }

        function updateAccordionPanes() {
            var accordion = registry.byId("myAccordionContainer");
            accordion.selectChild(accordion.selectedChildWidget);
        }

        function displayIncomeStats() {
            var div = document.createElement("div");
            div.style.width = "300px";
            div.style.height = "200px";
            registry.byId("paneIncome").setContent(div);

            if (selectedNeighborhood == null) {
                div.innerHTML = "在地图上点击需要进行统计的社区";
            }
            else {
                div.innerHTML = "";
                var attributes = selectedNeighborhood.attributes;

                var incMed, incBase, inc_0_20, inc_20_35, inc_35_50, inc_50_75, inc_75_125, inc_125_Up;

                // 得到不同字段的属性信息
                incMed = parseInt(attributes.MEDHINC_CY, 10);
                incBase = parseInt(attributes.HINCBASECY, 10);
                inc_0_20 = parseInt(attributes.INC_0_20, 10);
                inc_20_35 = parseInt(attributes.INC_20_35, 10);
                inc_35_50 = parseInt(attributes.INC_35_50, 10);
                inc_50_75 = parseInt(attributes.INC_50_75, 10);
                inc_75_125 = parseInt(attributes.INC_75_125, 10);
                inc_125_Up = parseInt(attributes.INC_125_UP, 10);

                var maxTickVal = incBase / 2;

                // 图表需要如下的数据数组
                var incDataSeries = [inc_0_20, inc_20_35, inc_35_50, inc_50_75, inc_75_125, inc_125_Up];

                // 创建图表并显示在DIV中
                var chartInc = new Chart2D(div);

                // 增加X轴
                chartInc.addAxis("x", {
                    labels: [
                                { value: 1, text: "0 - 20" },
                                { value: 2, text: "20 - 35" },
                                { value: 3, text: "35 - 50" },
                                { value: 4, text: "50 - 75" },
                                { value: 5, text: "75 - 125" },
                                { value: 6, text: "125+" }],
                    majorTick: { length: 0 },
                    minorTick: { length: 0 },
                    natural: true
                });

                // 增加Y轴
                chartInc.addAxis("y", {
                    vertical: true,
                    stroke: "white",
                    fontColor: "white",
                    majorTick: { length: 0 },
                    minorTick: { length: 0 },
                    includeZero: true
                });

                // 定义图表的类型，这里使用柱状图
                chartInc.addPlot("default", {
                    type: "Columns",
                    gap: 8,
                    font: "normal normal bold 8pt Tahoma",
                    fontColor: "black"
                });

                // 指定图表使用的数据以及图表中柱条的颜色
                chartInc.addSeries("Series A", incDataSeries, { stroke: { color: "steelblue" }, fill: "steelblue" });

                // 当鼠标移动到柱条上时高亮显示
                var anim1 = new Highlight(chartInc, "default", { highlight: "lightskyblue" });
                var anim2 = new Tooltip(chartInc, "default");

                chartInc.render();

                // 在图表的下方增加解释性的文字
                var divExplText = document.createElement("div");
                divExplText.innerHTML = "社区居民年收入，单位千美元。（该社区平均年收入为：<b>$" + incMed + "</b>.)";
                registry.byId("paneIncome").domNode.appendChild(divExplText);
            }
        }

        function displayEducationStats() {
            var div = document.createElement("div");
            div.style.width = "350px";
            div.style.height = "200px";
            dijit.byId("paneEducation").setContent(div);
            if (selectedNeighborhood == null) {
                div.innerHTML = "在地图上点击需要进行统计的社区";
            }
            else {
                div.innerHTML = "";
                var attributes = selectedNeighborhood.attributes;

                var edubase, lths, hsgrad, smcoll, bach, grad;

                edubase = parseInt(attributes.EDUCBASECY, 10); //Total pop for this statistic
                lths = parseInt(attributes.EDLT9_CY, 10) +
                        parseInt(attributes.EDSMHS_CY, 10);
                hsgrad = parseInt(attributes.EDHSGRD_CY, 10);
                //Assoc. degree considered "Some college"
                smcoll = parseInt(attributes.EDCOLL_CY, 10) +
                        parseInt(attributes.EDASSC_CY, 10);
                bach = parseInt(attributes.EDBACH_CY, 10);
                grad = parseInt(attributes.EDGRAD_CY, 10);

                var maxTickVal = edubase / 1.5;

                // 图表需要如下的数据数组
                var dataSeries = [lths, hsgrad, smcoll, bach, grad];

                // 创建图表并显示在DIV中
                var chartEdu = new Chart2D(div);

                // 增加X轴
                chartEdu.addAxis("x", {
                    fixLower: "none",
                    fixUpper: "minor",
                    stroke: "white",
                    fontColor: "white",
                    max: maxTickVal,
                    majorTick: { length: 0 },
                    minorTick: { length: 0 },
                    includeZero: true
                });

                // 增加自标注的Y轴
                chartEdu.addAxis("y", {
                    labels: [
                        { value: 1, text: "小学" },
                        { value: 2, text: "中学" },
                        { value: 3, text: "大专" },
                        { value: 4, text: "本科" },
                        { value: 5, text: "研究生" }],
                    font: "normal normal bold 8pt Tahoma",
                    fontColor: "black",
                    vertical: true,
                    microTicks: false,
                    minorTicks: false,
                    majorTick: { stroke: "black", length: 1 }
                });

                // 定义图表的类型
                chartEdu.addPlot("default", {
                    type: "Bars",
                    gap: 4,
                    font: "normal normal bold 8pt Tahoma",
                    fontColor: "black"
                });

                // 指定图表使用的数据以及图表中柱条的颜色
                chartEdu.addSeries("Series A", dataSeries, { stroke: { color: "steelblue" }, fill: "steelblue" });

                // 当鼠标移动到柱条上时高亮显示
                var anim1 = new Highlight(chartEdu, "default", { highlight: "lightskyblue" });
                var anim2 = new Tooltip(chartEdu, "default");

                chartEdu.render();

                // 在图表的下方增加解释性的文字
                var divExplText = document.createElement("div");
                divExplText.innerHTML = "社区居民受教育程度";
                registry.byId("paneEducation").domNode.appendChild(divExplText);
            }
        }

        //Creates race chart
        function displayRaceStats() {
            var div = document.createElement("div");
            div.style.width = "300px";
            div.style.height = "225px";
            dijit.byId("paneRace").setContent(div);

            //Check to see if there's a neighborhood selected
            if (selectedNeighborhood == null) {
                div.innerHTML = "在地图上点击需要进行统计的社区";
            }
            else {
                div.innerHTML = "";
                var attributes = selectedNeighborhood.attributes;

                //Define race count variables
                var white, black, asian, amerind, pacific,
                        hispanic, otherrace, race2Up, racebase;

                white = parseInt(attributes.WHITE_CY, 10);
                black = parseInt(attributes.BLACK_CY, 10);
                asian = parseInt(attributes.ASIAN_CY, 10);
                amerind = parseInt(attributes.AMERIND_CY, 10);
                pacific = parseInt(attributes.PACIFIC_CY, 10);
                otherrace = parseInt(attributes.OTHRACE_CY, 10);
                race2Up = parseInt(attributes.RACE2UP_CY, 10);
                hispanic = parseInt(attributes.HISPPOP_CY, 10);
                racebase = parseInt(attributes.RACEBASECY, 10);

                //"Other" in the chart is American Indian or Alaska Native,
                // plus Pacific Islander, plus Other
                var other = amerind + pacific + otherrace;

                // Calculate race percentages
                var whitePct = Math.round((white / racebase) * 100);
                var blackPct = Math.round((black / racebase) * 100);
                var asianPct = Math.round((asian / racebase) * 100);
                var otherPct = Math.round(((other) / racebase) * 100);
                var race2UpPct = Math.round((race2Up / racebase) * 100);
                var hispanicPct = Math.round((hispanic / racebase) * 100);

                //Define the chart properties
                var chartRace = new Chart2D(div);
                chartRace.addPlot("default", {
                    type: "Pie",
                    font: "normal normal bold 8pt Tahoma",
                    fontColor: "black",
                    radius: 65,
                    labelOffset: -25
                });

                //Add the data series to the chart
                //Note Latinos/Hispanics are distributed among
                // the categories below in the 2000 Census
                chartRace.addSeries("Series A", [
                { y: white, text: "White", color: "powderblue", stroke: "black", tooltip: "White: " + white + " (" + whitePct + "%)" },
                { y: black, text: "Black", color: "cadetblue", stroke: "black", tooltip: "Black: " + black + " (" + blackPct + "%)" },
                { y: asian, text: "Asian", color: "cornflowerblue", stroke: "black", tooltip: "Asian: " + asian + " (" + asianPct + "%)" },
                { y: other, text: "Other", color: "lightsteelblue", stroke: "black", tooltip: "Other: " + other + " (" + otherPct + "%)" },
                { y: race2Up, text: "   2+ races", color: "dodgerblue", stroke: "black", tooltip: "2+ races: " + race2Up + " (" + race2UpPct + "%)" }]);

                //Add special effects and tooltip       
                var animMoveSlice = new MoveSlice(chartRace, "default");
                var animHighlightSlice = new Highlight(chartRace, "default");
                var animSliceTooltip = new Tooltip(chartRace, "default");

                chartRace.render();

                //Add explanatory text below chart
                var divExplText = document.createElement("div");
                divExplText.innerHTML = "社区人口种族构成。（该社区是<b>" + hispanicPct + "%</b> Hispanic/Latino。）";
                registry.byId("paneRace").domNode.appendChild(divExplText);

            }
        }
});