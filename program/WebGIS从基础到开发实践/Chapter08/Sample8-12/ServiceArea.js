require(["dojo/parser", "dijit/registry", "esri/map", 
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color",
    "esri/tasks/ServiceAreaTask", "esri/tasks/ServiceAreaParameters", "esri/tasks/FeatureSet", "dojo/domReady!"],
    function (parser, registry, Map, 
        ArcGISTiledMapServiceLayer, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color,
        ServiceAreaTask, ServiceAreaParameters, FeatureSet) {

        parser.parse();
        var map = new esri.Map("map", {
            center: [-122.447, 37.781],
            zoom: 15
        });
        var streetMap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
        map.addLayer(streetMap);

        var serviceAreaTask = new ServiceAreaTask("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Service Area");
        params = new ServiceAreaParameters();
        params.defaultBreaks = [1, 2, 3];
        params.outSpatialReference = map.spatialReference;
        params.returnFacilities = false;

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

            params.defaultBreaks = [registry.byId("driveTime1").getValue(),
                registry.byId("driveTime2").getValue(),
                registry.byId("driveTime3").getValue()];

            var features = [];
            features.push(graphic);
            var featureSet = new FeatureSet();
            featureSet.features = features;
            params.facilities = featureSet;

            serviceAreaTask.solve(params, showServiceAreas);
        }

        function showServiceAreas(solveResult) {
            var features = solveResult.serviceAreaPolygons;
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