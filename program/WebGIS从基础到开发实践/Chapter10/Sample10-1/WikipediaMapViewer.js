var app = {};
require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "esri/geometry/Extent",
    "esri/SpatialReference", "esri/InfoTemplate",
    "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/dijit/InfoWindow",
    "esri/Color", "esri/graphic", "esri/config", "dojo/request/script", "dojo/_base/array", "dojo/window",
    "dojo/parser", "dijit/registry", "dojo/string", "ext/HtmlTableFactory", "ext/HtmlTableColors",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/TextBox", "dijit/form/Button", "dojo/domReady!"],
    function (Map, ArcGISTiledMapServiceLayer, Extent, SpatialReference, InfoTemplate,
        Point, SimpleMarkerSymbol, SimpleLineSymbol, InfoWindow,
        Color, Graphic, esriConfig, script, array, win,
        parser, registry, string, HtmlTableFactory, HtmlTableColors) {

        parser.parse();
        // 代理的URL
        esriConfig.defaults.io.proxyUrl = "proxy.ashx";

        // 符号
        var pointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 16, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 0]), 1), new Color([255, 255, 0, 0.5]));
        var selectedSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 24, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 255, 255]), 2), new Color([0, 255, 255, 0.5]));

        // 图形的信息模板
        var infoTemplate = new InfoTemplate("${title}", "${thumbnail}");

        // WGS84空间参考
        var wgs84 = new SpatialReference({ wkid: 4326 });
        // 初始范围
        var initialExtent = new Extent(-117.38917350769043, 32.499704360961914, -116.51026725769043, 33.02292823791504, wgs84);
        // 创建地图
        var map = new Map("map", { extent: initialExtent, slider: true});
        // 连接地图加载后事件
        map.on("load", connectHandlers);

        // 重新设置信息窗口的大小
        map.infoWindow.resize(240, 120);

        // 增加一地图服务
        var street = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
        map.addLayer(street);

        var htmlTables = new HtmlTableFactory();
        app.selectItemByTitle = selectItemByTitle;

        // 连接事件
        function connectHandlers() {
            // 监听地图的事件
            map.on("extent-change", onMapExtentChange);
            map.on("pan-start", onMapPanStart);
            map.on("pan-end", onMapPanEnd);

            // 监听图形的事件
            var g = map.graphics;
            g.on("mouse-over", graphicsOnMouseOver);
            g.on("mouse-out", graphicsOnMouseOut);

            registry.byId("refreshBtn").on("click", function () {
                findWikipediaByCurrentExtent();
            });

            // 查询初始显示范围内维基百科文章条目
            findWikipediaByCurrentExtent();
        }

        // 地图显示范围改变事件响应函数
        function onMapExtentChange(evt) {
            // 关闭信息窗口
            map.infoWindow.hide();
        }

        function onMapPanStart(evt) {
            // 清除用户界面
            clearUI();
        }

        function onMapPanEnd(evt) {
            // 查询维基百科文章条目
            findWikipediaByExtent(evt.extent);
        }

        function clearUI() {
            // 删除所有的图形
            map.graphics.clear();
            // 关系信息窗口
            map.infoWindow.hide();
            // 清除维基百科文章条目列表
            document.getElementById("wikiInfo").innerHTML = '';
        }

        // 查询当前显示范围内的维基百科文章条目
        function findWikipediaByCurrentExtent() {
            // 清除用户界面
            clearUI();
            findWikipediaByExtent(map.extent);
        }

        // 查询指定范围内的维基百科文章条目
        function findWikipediaByExtent(ext) {
            // 重新设置维基百科URL
            document.getElementById('wikiPage').src = "http://www.wikipedia.org";

            // 得到最大条目数
            var maxCount = registry.byId('maxCount').get('Value');

            // 构造GeoNames服务请求
            var geonamesRequest = string.substitute("http://ws.geonames.org/wikipediaBoundingBoxJSON?&username=demo&north=${ymax}&south=${ymin}&west=${xmin}&east=${xmax}&maxRows=" + maxCount, ext);

            // 发起GeoNames请求
            getWikiJSON(geonamesRequest);
        }

        // 调用GeoNames REST服务
        function getWikiJSON(wikiUrl) {
            script.get(wikiUrl, {
                jsonp: "callback"
            }).then(geoNamesCallback, errorCb);
        }

        // 查询得到维基百科文章条目后的回调函数
        function geoNamesCallback(data) {
            try {
                var geonames = data.geonames;
                for (var geoIdx = 0; geoIdx < geonames.length; geoIdx++) {
                    var wikiTitle = geonames[geoIdx].title;
                    var wikiSummary = geonames[geoIdx].summary;
                    var maxSumLength = 160;
                    wikiSummary = (wikiSummary.length < maxSumLength) ? wikiSummary.slice(0, maxSumLength) : wikiSummary.slice(0, maxSumLength) + " (...)";
                    var wikiURL = 'http://' + geonames[geoIdx].wikipediaUrl;
                    var wikiThumbnail = (geonames[geoIdx].thumbnailImg == null) ? wikiSummary : "<img src='" + geonames[geoIdx].thumbnailImg + "'>";
                    var wikiFeature = (geonames[geoIdx].feature == "") ? "" : "Type: " + geonames[geoIdx].feature + "<br />";
                    var lng = geonames[geoIdx].lng;
                    var lat = geonames[geoIdx].lat;

                    // 增加图形
                    var wikiPoint = new Point(lng, lat);
                    var wikiAttributes = {
                        title: wikiTitle,
                        summary: wikiSummary,
                        url: wikiURL,
                        thumbnail: wikiThumbnail,
                        feature: wikiFeature
                    };
                    var pointGraphic = new Graphic(wikiPoint, pointSymbol, wikiAttributes);
                    pointGraphic.setInfoTemplate(infoTemplate);

                    map.graphics.add(pointGraphic);
                }

                var tableColors = new HtmlTableColors('lightcyan', 'lightgray', 'white', 'E6FEE8', 'yellow');

                var htmlTable = htmlTables.createFeatureList(map.graphics.graphics, 'title', tableColors, 'app.selectItemByTitle');

                document.getElementById("wikiInfo").innerHTML = htmlTable.asHTML();
            }
            catch (e) {
                alert(e.message);
            }
        }

        // 错误时的回调函数
        function errorCb(type, data, evt) {
            debug(data);
        }

        function graphicsOnMouseOver(evt) {
            selectItemByTitle('title', evt.graphic.attributes.title);
        }

        function selectItemByTitle(displayFieldName, wikiTitle) {
            var items = array.forEach(map.graphics.graphics, function (graphic) {
                if ((graphic.attributes != null) &&
                (graphic.attributes[displayFieldName].toString() == wikiTitle)) {
                    selectItemByGraphic(graphic);
                }
                else {
                    graphic.setSymbol(pointSymbol);
                }
            });
        }

        function graphicsOnMouseOut(evt) {
            map.infoWindow.hide();
            evt.graphic.setSymbol(pointSymbol);
        }

        function selectListItem(wikiTitle) {
            var radItem = document.getElementById("rad" + wikiTitle);
            if (radItem != null) {
                if (radItem.checked == false) {
                    radItem.checked = true;
                    win.scrollIntoView(radItem);
                }
            }
        }

        function selectItemByGraphic(graphic) {
            if (graphic.attributes != null) {
                var wikiTitle = graphic.attributes.title;
                selectListItem(wikiTitle);

                graphic.setSymbol(selectedSymbol);

                // 显示信息窗口
                showInfoWindow(graphic);

                var wikiURL = graphic.attributes.url;
                if (document.getElementById('wikiPage').src != wikiURL) {
                    document.getElementById('wikiPage').src = wikiURL;
                }
            }
        }

        // 显示图形的信息窗口
        function showInfoWindow(graphic) {
            var screenPoint = map.toScreen(graphic.geometry);
            var anchor = map.getInfoWindowAnchor(screenPoint);
            var offset = 10;
            switch (anchor) {
                case InfoWindow.ANCHOR_LOWERLEFT:
                    screenPoint = screenPoint.offset(-offset, offset);
                    break;
                case InfoWindow.ANCHOR_LOWERRIGHT:
                    screenPoint = screenPoint.offset(offset, offset);
                    break;
                case InfoWindow.ANCHOR_UPPERLEFT:
                    screenPoint = screenPoint.offset(-offset, -offset);
                    break;
                case InfoWindow.ANCHOR_UPPERRIGHT:
                    screenPoint = screenPoint.offset(offset, -offset);
                    break;
            }
            map.infoWindow.setTitle(graphic.getTitle());
            map.infoWindow.setContent(graphic.getContent());
            map.infoWindow.show(screenPoint, anchor);
        }
});