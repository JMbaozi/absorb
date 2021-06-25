require(["dojo/parser", "dojo/_base/array", "dijit/registry", "dojo/string", "dojo/query", "dojo/on",
    "esri/map", "esri/geometry/Extent", "esri/SpatialReference",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer",
    "esri/dijit/TimeSlider", "esri/dijit/editing/TemplatePicker", "dojo/date", "dojo/date/locale",
    "esri/InfoTemplate",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/RadioButton", "dojo/domReady!"],
    function (parser, array, registry, string, query, on,
        Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer,
        FeatureLayer,
        TimeSlider, TemplatePicker, date, locale,
        InfoTemplate) {

        parser.parse();

        var osr = new SpatialReference({ wkid: 102100 });
        var e = new Extent(-13678237.35524, 5611625.8514831, -13043467.98616, 6163700.4954169, osr);
        var map = new Map("map", { extent: e });

        var topo = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer");
        map.addLayer(topo);

        var hourOffset = 7; 
        var inputChildren = query("#fishRadioButtons input");
        for (var i = 0; i < inputChildren.length; i++) {
            on(inputChildren[i], "click", updateFishType);
        }

        var fishLayerRoot = "http://servicesbeta.esri.com/ArcGIS/rest/services/Portland/FishCount/MapServer/";
        var initialFishLayerUrl = fishLayerRoot + 0
        var fishLayer = new FeatureLayer(initialFishLayerUrl, {
            mode: FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"]
        });
        // 设置当某一河坝被点击时的信息模板
        var infoTemplate = new esri.InfoTemplate();
        infoTemplate.setTitle("${DAM}");
        infoTemplate.setContent("这天各类鱼的数目<br /><br /><b>Chinook: </b>${CHINOOK_ADULT}<br/>"
                             + "<b>Steelhead: </b>${STEELHEAD}<br/>"
                             + "<b>Sockeye: </b>${SOCKEYE}<br/>"
                             + "<b>Shad: </b>${SHAD}");
        fishLayer.on("click", function (evt) {
            evt.graphic.setInfoTemplate(infoTemplate);
            var content = evt.graphic.getContent();
            map.infoWindow.setContent(content);
            var title = evt.graphic.getTitle();
            map.infoWindow.setTitle(title);
            map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
        });

        map.on("layers-add-result", initSlider);
        map.addLayers([fishLayer]);

        

        function initSlider(evt) {
            var timeLayers = array.map(evt.layers, function (result) {
                return result.layer;
            });

            // 构建图例的符号
            var symbols = [];
            array.forEach(timeLayers, function (layer) {
                array.forEach(layer.renderer.infos, function (info) {
                    var labelText = "";
                    if (info.minValue <= 0) {
                        labelText = "少于" + info.maxValue;
                    }
                    else {
                        labelText = info.minValue + " - " + info.maxValue;
                    }
                    symbols.push({label: labelText, symbol: info.symbol
                    })
                });
            });

            // 如果已经存在图例小部件，则先删除
            var currentLegend = registry.byId("fishLegendDiv");
            if (typeof currentLegend !== "undefined") {
                currentLegend.destroy();
                // 重新创建fishLegendDiv元素
                var newLegendDiv = document.createElement("div");
                newLegendDiv.setAttribute("id", "fishLegendDiv");
                document.getElementById("legendContainer").appendChild(newLegendDiv);
            }

            // 利用TemplatePicker小部件创建图例
            var legend = new TemplatePicker({
                items: symbols,
                rows: "auto",
                columns: 1,
                style: "font-weight:bold; border:0;"
            }, "fishLegendDiv");
            legend.startup();

            // 创建与设置时间滑块小部件
            var timeSlider = registry.byId("timeSliderDiv");
            if (typeof timeSlider == "undefined") {
                timeSlider = new TimeSlider({}, document.getElementById("timeSliderDiv"));                
            }
            map.setTimeSlider(timeSlider);
            timeSlider.setThumbCount(1);
            var layerTimeExtent = timeLayers[0].timeInfo.timeExtent;
            timeSlider.createTimeStopsByTimeInterval(layerTimeExtent, 1, 'esriTimeUnitsDays');
            timeSlider.setThumbMovingRate(350);
            timeSlider.singleThumbAsTimeInstant(true);
            timeSlider.setLoop(false);
            timeSlider.startup();

            // 当移动时间滑块时显示日期
            timeSlider.on("time-extent-change", function (timeExtent) {
                map.infoWindow.hide();
                document.getElementById("timeSliderLabel").innerHTML = string.substitute("<b>2011年${startTime}</b>", timeExtent, function (val) {
                    return locale.format(date.add(val, "hour", hourOffset), {
                        selector: 'date',
                        datePattern: 'MMM dd'
                    });
                });
            });
        }

        function updateFishType() {
            var newFishLayerIndex = this.value;
            var layerToRemove = map.getLayer(map.graphicsLayerIds[0]);
            map.removeLayer(layerToRemove); // 删除当前要素图层
            // 构建用户选择的要素图层对应的URL
            var newFishLayerUrl = fishLayerRoot + newFishLayerIndex;
            var newFishLayer = new FeatureLayer(newFishLayerUrl, {
                mode: FeatureLayer.MODE_SNAPSHOT,
                outFields: ["*"]
            });
            map.addLayers([newFishLayer]);
        }
});