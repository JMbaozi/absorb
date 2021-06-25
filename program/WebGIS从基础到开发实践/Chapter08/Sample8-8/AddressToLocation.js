require(["dojo/on", "esri/map", "esri/geometry/Extent", "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer", "esri/InfoTemplate",
    "esri/graphic", "esri/geometry/Multipoint", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/TextSymbol", "esri/Color", "esri/tasks/locator", "dojo/domReady!"],
    function (on, Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer, InfoTemplate,
        Graphic, Multipoint, SimpleMarkerSymbol, TextSymbol, Color, Locator) {
        var extent = new Extent(-95.271, 38.933, -95.228, 38.976, new SpatialReference({ wkid: 4326 }))
        var map = new esri.Map("map", {
            extent: extent
        });

        var streetMap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
        map.addLayer(streetMap);

        var locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
        //locator.on("address-to-locations-complete", showResults);

        on(document.getElementById("locateBtn"), "click", function () {
            locate();
        });

        function locate() {
            map.graphics.clear();
            var address = {
                SingleLine: document.getElementById("address").value
            };
            var options = {
                address: address,
                outFields: ["Loc_name"]
            };
            locator.addressToLocations(options, showResults);
        }

        function showResults(candidates) {
            var candidates;
            var symbol = new SimpleMarkerSymbol();
            var infoTemplate = new InfoTemplate("位置", "地址：${address}<br />得分：${score}<br />匹配源：${locatorName}");

            symbol.setStyle(SimpleMarkerSymbol.STYLE_DIAMOND);
            symbol.setColor(new Color([255, 0, 0, 0.75]));

            var points = new Multipoint(map.spatialReference);

            for (var i = 0, il = candidates.length; i < il; i++) {
                var candidate = candidates[i];
                if (candidate.score > 70) {
                    var attributes = { address: candidate.address, score: candidate.score, locatorName: candidate.attributes.Loc_name };
                    var graphic = new Graphic(candidate.location, symbol, attributes, infoTemplate);
                    map.graphics.add(graphic);
                    map.graphics.add(new Graphic(candidate.location, new TextSymbol(attributes.address).setOffset(0, 8)));
                    points.addPoint(candidate.location);
                }
            }
            map.setExtent(points.getExtent().expand(3));
        }
});