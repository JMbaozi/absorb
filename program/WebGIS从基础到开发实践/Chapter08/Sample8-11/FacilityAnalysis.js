require(["esri/map", "esri/geometry/Extent", "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/FeatureLayer", "esri/geometry/Point", "esri/graphic", "esri/InfoTemplate",
    "esri/renderers/SimpleRenderer", "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color",
    "esri/tasks/ClosestFacilityTask", "esri/tasks/ClosestFacilityParameters", "esri/tasks/FeatureSet", "dojo/_base/array", "dojo/domReady!"],
    function (Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer,
        FeatureLayer, Point, Graphic, InfoTemplate,
        SimpleRenderer, GraphicsLayer,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color,
        ClosestFacilityTask, ClosestFacilityParameters, FeatureSet, array) {

        var extent = new Extent(-17637844, 2420493, -17529456, 2472699, new SpatialReference({ wkid: 102100 }))
        map = new esri.Map("map", {
            extent: extent
        });

        var streetMap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
        map.addLayer(streetMap);

        var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([111, 0, 255]), 2), new Color([111, 0, 255, 0.15]));
        var closestFacilityTask = new ClosestFacilityTask("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Network/USA/NAServer/Closest Facility");

        // 停车场点数据，作为设施点
        var parking = new FeatureLayer("http://services.arcgis.com/tNJpAOha4mODLkXz/arcgis/rest/services/PARKING_HNL/FeatureServer/0", {
            outFields: ["Address"]
        });
        parking.setSelectionSymbol(sfs);
        map.addLayer(parking);

        // 最优路径图层
        routeGraphicLayer = new GraphicsLayer();
        var routePolylineSymbol = new SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new dojo.Color([100, 0, 200]),
          4.0
        );
        var routeRenderer = new SimpleRenderer(routePolylineSymbol);
        routeGraphicLayer.setRenderer(routeRenderer);
        map.addLayer(routeGraphicLayer);

        // 事件点图层
        var incidentPointSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 16,
            new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([89, 95, 35]), 2),
            new Color([130, 159, 83, 0.40])
        );
        var incidentsGraphicsLayer = new GraphicsLayer();
        var incidentsRenderer = new SimpleRenderer(incidentPointSymbol);
        incidentsGraphicsLayer.setRenderer(incidentsRenderer);
        map.addLayer(incidentsGraphicsLayer);

        esriConfig.defaults.io.proxyUrl = "proxy.ashx";
        esriConfig.defaults.io.alwaysUseProxy = false;

        map.on('click', doQuery );

        function doQuery(evt) {
            clearGraphics();

            var inPoint = new Point(evt.mapPoint.x, evt.mapPoint.y, map.spatialReference);
            var location = new Graphic(inPoint);
            incidentsGraphicsLayer.add(location);

            var params = new ClosestFacilityParameters();
            params.defaultCutoff = 300.0;
            params.returnIncidents = true;
            params.returnRoutes = true;
            params.returnDirections = true;
            params.outSpatialReference = map.spatialReference;
            var incidents = new FeatureSet();
            incidents.features = [location];
            params.incidents = incidents;

            var facilities = new FeatureSet();
            facilities.features = parking.graphics;
            params.facilities = facilities;

            closestFacilityTask.solve(params, showResult);
        }

        function showResult(solveResult) {
            var directions = solveResult.directions;

            array.forEach(solveResult.routes, function (route, index) {
                // 构建路径信息
                var attr = array.map(solveResult.directions[index].features, function (feature) {
                    return feature.attributes.text;
                });
                var infoTemplate = new InfoTemplate("属性", "${*}");

                route.setInfoTemplate(infoTemplate);
                route.setAttributes(attr);
                routeGraphicLayer.add(route);
            });
        }

        function clearGraphics() {
            map.graphics.clear();
            routeGraphicLayer.clear();
            incidentsGraphicsLayer.clear();
        }
});
