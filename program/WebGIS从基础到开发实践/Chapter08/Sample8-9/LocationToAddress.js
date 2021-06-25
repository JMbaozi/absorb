require(["esri/map", "esri/geometry/Extent", "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer", "esri/InfoTemplate",
    "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color", "esri/tasks/locator", "dojo/domReady!"],
    function (Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer, InfoTemplate, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, Color, Locator) {
        var extent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid: 4326 }))
        var map = new esri.Map("map", {
            extent: extent
        });

        var streetMap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
        map.addLayer(streetMap);

        var locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");

        var infoTemplate = new InfoTemplate("位置", "街道：${Address}<br />城市：${City}<br />州：${Region}<br />邮编：${Postal}");
        var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 15, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 255]), 2), new Color([0, 0, 255]));

        map.on("click", reverseGeocode);

        function reverseGeocode(evt) {
            map.graphics.clear();
            locator.locationToAddress(evt.mapPoint, 100, showResults);
        }

        function showResults(candidate) {
            if (candidate.address) {
                var graphic = new Graphic(candidate.location, symbol, candidate.address, infoTemplate);
                map.graphics.add(graphic);
                map.infoWindow.setTitle(graphic.getTitle());
                map.infoWindow.setContent(graphic.getContent());
                var screenPnt = map.toScreen(candidate.location);
                map.infoWindow.show(screenPnt, map.getInfoWindowAnchor(screenPnt));
            }
        }
});