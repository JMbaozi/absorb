require(["dojo/parser", "esri/map", "esri/geometry/Extent", "esri/SpatialReference",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/GraphicsLayer", "esri/dijit/InfoWindow",
    "esri/tasks/QueryTask", "esri/tasks/query", "dojo/date", "dojo/date/locale", 
    "esri/symbols/PictureMarkerSymbol", "esri/InfoTemplate", "esri/graphic",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojox/dgauges/components/default/CircularLinearGauge", "dojo/domReady!"],
    function (parser, Map, Extent, SpatialReference,
        ArcGISTiledMapServiceLayer, GraphicsLayer, InfoWindow,
        QueryTask, Query, date, locale,
        PictureMarkerSymbol, InfoTemplate, Graphic) {
        parser.parse();

        var osr = new SpatialReference({ wkid: 102100 });
        var e = new Extent(-13432400, 5869400, -13401900, 5881800, osr);
        map = new Map("map", {
            extent: e
        });

        var topo = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
        map.addLayer(topo);

        var liveTimerID, nextTimeRefresh, e;
        var secsRefresh = 20, secRem = 20;

        busLayer = new GraphicsLayer();
        map.addLayer(busLayer);
        queryBuses();

        function queryBuses() {
            var busURL = 'http://gis.yakimawa.gov/arcgis101/rest/services/AVL/CityAVL/MapServer/3';
            var busQueryTask = new QueryTask(busURL);
            var busQuery = new Query();
            busQuery.returnGeometry = true;
            busQuery.outFields = ["UnitID,DisplayID,Name,LocalDate,Speed,Heading"];
            busQuery.outSpatialReference = osr;
            busQuery.geometry = e;
            var dayAgo = date.add(new Date(), "hour", -24);
            var dp = { datePattern: "MM/dd/yyyy", timePattern: "HH:mm:ss" };
            busQuery.where = "LocalDate > '" + locale.format(dayAgo, dp) + "'";
            busQuery.orderByFields = ["Speed DESC, DisplayID ASC"];
            busQueryTask.execute(busQuery, getBusQueryResults);
        }

        function getBusQueryResults(r) {
            busLayer.clear();
            var i = r.features.length;
            while (i--) {
                var busPlace = i;
                var bus = r.features[i].attributes;
                var busTitle = "公交 " + bus.DisplayID;
                var busText = stringHeading(bus.Heading) + "@" + bus.Speed + "英里/小时";
                if (i > 2) {
                    busPlace = "X";
                } else {
                    dijit.byId("g" + i).set("value", bus.Speed);
                    dijit.byId("g" + i).refreshRendering();
                    dojo.byId("bus" + i).innerHTML = busTitle + " " + busText;
                };
                var busSym = new PictureMarkerSymbol({
                    "angle": bus.Heading, "xoffset": 0, "yoffset": 0,
                    "url": "images/bus" + busPlace + ".png",
                    "contentType": "image/png",
                    "width": 24, "height": 24
                });
                var busIT = new InfoTemplate(busTitle, busText);
                var busGeo = r.features[i].geometry;
                var busGraphic = new Graphic(busGeo, busSym, bus, busIT);
                busLayer.add(busGraphic);
            }
            timeNow = new Date();
            nextTimeRefresh = timeNow.getTime() + (secsRefresh * 1000);
            refreshLiveAVL();
        }

        function refreshLiveAVL() {
            timeNow = new Date();
            secRem = Math.round((nextTimeRefresh - timeNow.getTime()) / 1000);
            if (secRem <= 0) {
                nextTimeRefresh = timeNow.getTime() + (secsRefresh * 1000);
                secRem = secsRefresh;
                queryBuses();
            }
            document.getElementById("refreshIN").innerHTML = "在" + secRem + "秒后刷新";
            if (secRem > 0) {
                liveTimerID = setTimeout(refreshLiveAVL, 1000);
            }
        }

        function stringHeading(heading) {
            if (heading < 23) {
                return "北";
            } else if (heading < 68) {
                return "东北";
            } else if (heading < 113) {
                return "东";
            } else if (heading < 158) {
                return "东南";
            } else if (heading < 203) {
                return "南";
            } else if (heading < 248) {
                return "西南";
            } else if (heading < 293) {
                return "西";
            } else if (heading < 338) {
                return "西北";
            } else {
                return "北";
            }
        }
});