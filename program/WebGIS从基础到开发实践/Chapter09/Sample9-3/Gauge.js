require(["dojo/parser", "esri/map", "esri/dijit/Gauge",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer", 
    "esri/layers/GraphicsLayer", "esri/symbols/SimpleMarkerSymbol", 
    "esri/graphic", "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dojo/domReady!"],
    function (parser, Map, Gauge, ArcGISTiledMapServiceLayer, FeatureLayer, GraphicsLayer,
        SimpleMarkerSymbol, Graphic) {

        parser.parse();
        map = new esri.Map("map", {
            center: [-50.658, 46.188],
            zoom: 4,
            logo: false
        });

        var topo = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer");
        map.addLayer(topo);

        var hGraphics = new GraphicsLayer({ "id": "highlights" });
        map.addLayer(hGraphics);

        var highlight = new SimpleMarkerSymbol().setColor("#c0c").setSize(12);

        var outFields = ["OBJECTID", "WINDSPEED", "DAY"];
        var featuresUrl = "http://servicesbeta.esri.com/ArcGIS/rest/services/Hurricanes/Hurricanes/MapServer/0";
        var fl = new FeatureLayer(featuresUrl, {
            "mode": FeatureLayer.MODE_ONDEMAND,
            "outFields": outFields
        });        
        fl.on("mouse-over", function (e) {
            hGraphics.clear();
            hGraphics.add(new Graphic(e.graphic.geometry, highlight));
        });
        fl.on("load", createGauge);
        map.addLayer(fl);

        function createGauge() {
            var gaugeParams = {
                "caption": "飓风风速",
                "color": "#c0c",
                "dataField": "WINDSPEED", 
                "dataFormat": "value",
                "dataLabelField": "EVENTID",
                "layer": fl,
                "maxDataValue": 120, 
                "noFeatureLabel": "无名称",
                "title": "大西洋飓风(2000)",
                "unitLabel": "英里/小时"
            }
            var gauge = new Gauge(gaugeParams, "gaugeDiv");
            gauge.startup();
        }
});