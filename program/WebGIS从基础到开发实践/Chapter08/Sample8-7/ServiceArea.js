require(["dojo/parser", "dijit/registry", "esri/map", "esri/geometry/Extent", "esri/SpatialReference",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color",
    "esri/tasks/Geoprocessor", "esri/tasks/FeatureSet", "dojo/domReady!"],
    function (parser, registry, Map, Extent, SpatialReference,
        ArcGISTiledMapServiceLayer, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color,
        Geoprocessor, FeatureSet) {

        parser.parse();

        var extent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid: 4326 }))
        var map = new esri.Map("map", {
            extent: extent
        });

        var streetMap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
        map.addLayer(streetMap);

        var driveTimes = "1 2 3";
        var gp = new Geoprocessor("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Network/ESRI_DriveTime_US/GPServer/CreateDriveTimePolygons");

        map.on("click", computeServiceArea);

        function computeServiceArea(evt) {
            map.graphics.clear();
            var pointSymbol = new SimpleMarkerSymbol();
            pointSymbol.setOutline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255, 0, 0]), 1);
            pointSymbol.setSize(5);
            pointSymbol.setColor(new Color([0, 255, 0, 0.25]));

            var graphic = new Graphic(evt.mapPoint, pointSymbol);
            map.graphics.add(graphic);

            var dtInput = [registry.byId("driveTime1").getValue(),
                registry.byId("driveTime2").getValue(),
                registry.byId("driveTime3").getValue()];
            driveTimes = dtInput.join(" ");

            var features = [];
            features.push(graphic);
            var featureSet = new FeatureSet();
            featureSet.features = features;
            var params = { "Input_Location": featureSet, "Drive_Times": driveTimes };
            gp.execute(params, getDriveTimePolys);
        }

        function getDriveTimePolys(results, messages) {
            var features = results[0].value.features;
            for (var f = 0, fl = features.length; f < fl; f++) {
                var feature = features[f];
                if (f == 0) {
                    var polySymbolRed = new SimpleFillSymbol();
                    polySymbolRed.setOutline(
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 0, 0, 0.5]), 1));
                    polySymbolRed.setColor(new Color([255, 0, 0, 0.7]));
                    feature.setSymbol(polySymbolRed);
                }
                else if (f == 1) {
                    var polySymbolGreen = new SimpleFillSymbol();
                    polySymbolGreen.setOutline(
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 0, 0, 0.5]), 1));
                    polySymbolGreen.setColor(new Color([0, 255, 0, 0.7]));
                    feature.setSymbol(polySymbolGreen);
                }
                else if (f == 2) {
                    var polySymbolBlue = new SimpleFillSymbol();
                    polySymbolBlue.setOutline(
                        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([0, 0, 0, 0.5]), 1));
                    polySymbolBlue.setColor(new Color([0, 0, 255, 0.7]));
                    feature.setSymbol(polySymbolBlue);
                }
                map.graphics.add(feature);
            }
        }
});