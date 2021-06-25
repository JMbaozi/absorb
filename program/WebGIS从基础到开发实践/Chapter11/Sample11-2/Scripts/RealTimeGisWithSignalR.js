var realTimePoints;
var layersColors = [];

require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "esri/SpatialReference",
    "esri/InfoTemplate", "esri/toolbars/draw", "esri/layers/GraphicsLayer",
    "esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/graphic",
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color",
    "dijit/registry", "dojo/parser", "dijit/form/Button",
    "dojo/domReady!"],
    function (Map, ArcGISTiledMapServiceLayer, SpatialReference,
        InfoTemplate, Draw, GraphicsLayer,
        Point, Polyline, Polygon, Graphic,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color,
        registry, parser) {

        parser.parse();
        var map = new Map("map", {
            center: [-25.312, 34.307],
            zoom: 3
        });
        var street = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer");
        map.addLayer(street);

        var sr = new SpatialReference({ wkid: 102100 });

        var tb = new Draw(map);
        tb.on("draw-end", addGraphic);

        registry.forEach(function (d) {
            if (d.declaredClass === "dijit.form.Button") {
                d.on("click", activateTool);
            }
        });

        function activateTool() {
            var tool = null;
            if (this.label === "取消绘图") {
                tb.deactivate();
            }
            else {
                switch (this.label) {
                    case "点":
                        tool = "POINT";
                        break;
                    case "线":
                        tool = "POLYLINE";
                        break;
                    case "多边形":
                        tool = "POLYGON";
                        break;
                }
                tb.activate(Draw[tool]);
                map.hideZoomSlider();
            }
        }

        // Create Proxy to SignalR hub
        realTimePoints = $.connection.realTimePoints;

        // Everything is ready, now start the connection
        $.connection.hub.start();

        // This function is callable from the server
        realTimePoints.client.addPoint = function addPoint(cid, x, y) {
            var p = new Point(x, y, sr);
            var gLayer = map.getLayer(cid);

            // Set up symbol and color of point
            // Get color from the layersColors list
            var symbol = new SimpleMarkerSymbol();
            var clr = layersColors[layersColors.indexOf(cid) + 1];
            symbol.setColor(new Color(clr));

            // Add point to graphics layer
            gLayer.add(new Graphic(p, symbol));
        };

        // This function is callable from the server
        realTimePoints.client.addPolyline = function addPolyline(cid, paths) {

            // Create line object and set its geometry
            var line = new Polyline(sr);
            line.paths = paths;

            // Get the layer of remote user to which the line will be added
            var gLayer = map.getLayer(cid);

            // Set up symbol and color of line
            // Get color from the layersColors list
            var symbol = new SimpleLineSymbol();
            var clr = layersColors[layersColors.indexOf(cid) + 1];
            symbol.setColor(new Color(clr));

            // Add line to graphics layer
            gLayer.add(new Graphic(line, symbol));
        };

        // This function is callable from the server
        realTimePoints.client.addPolygon = function addPolygon(cid, rings) {

            // Create polygon object and set its geometry
            var polygon = new Polygon(sr);
            polygon.rings = rings;

            // Get the layer of remote user to which the polygon will be added
            var gLayer = map.getLayer(cid);

            // Set up symbol and color of polygon
            // Get color from the layersColors list
            var symbol = new SimpleFillSymbol();
            var clr = layersColors[layersColors.indexOf(cid) + 1];
            symbol.setColor(new Color(clr));

            // Add polygon to graphics layer
            gLayer.add(new Graphic(polygon, symbol));
        };

        // This function is callable from the server
        realTimePoints.client.addLayer = function addLayer(cid, color) {

            // Create new layer
            var gLayer = new GraphicsLayer();
            gLayer.id = cid;

            // Keep track of layer names and their colors.
            layersColors.push(cid);
            layersColors.push(color);

            // Add layer
            map.addLayer(gLayer);

            // Update number of layers counter
            $("#graphicsLayersCount").empty();
            $("#graphicsLayersCount").append("<p>图形图层个数为：" + map.graphicsLayerIds.length + "</p>");

            // Set the default symbols for drawing
            if ($.connection.hub.id === cid) {

                var clr = layersColors[layersColors.indexOf(cid) + 1];

                // Point symbol
                var symbol = new SimpleMarkerSymbol();
                symbol.setColor(new Color(clr));
                tb.markerSymbol = symbol;

                // Line symbol
                symbol = new SimpleLineSymbol();
                symbol.setColor(new Color(clr));
                tb.lineSymbol = symbol;
            }
        };

        // This function is callable from the server
        realTimePoints.client.removeLayer = function removeLayer(cid) {

            if ($.connection.hub.id !== cid) {

                // Get layer with specific cid (Connection ID)
                var gLayer = map.getLayer(cid);

                // Remove layer
                map.removeLayer(gLayer);

                // Update number of layers counter
                $("#graphicsLayersCount").empty();
                $("#graphicsLayersCount").append("<p>图形图层个数为：" + map.graphicsLayerIds.length + "</p>");
            }
        };

        // This function is callable from the server
        realTimePoints.client.updataGraphicsLayersLegend =
            function updataGraphicsLayersLegend(layersNames, layersColors) {

                // This function updates the legend

                $("#legendDiv").empty();
                $("#legendDiv").append("<p><b>Legend</b></p>");

                for (var i = 0; i < layersNames.length; i++) {

                    $("#legendDiv").append("<p><font color='" + layersColors[i] + "'>" + layersNames[i] + "</font></p>");
                }
            };

        // This function is callable from the server
        realTimePoints.client.updateOwnUserName = function updateOwnUserName(initialUserName) {
            // This function sets the user's initial username which is assigned by the server.
            $("#txtUserName").val(initialUserName);
        };



        function addGraphic(evt) {
            var geometry = evt.geometry;
            var type = geometry.type;
            if (type === "point" || type === "multipoint") {

                var symbol = new SimpleMarkerSymbol();
                var clr = layersColors[layersColors.indexOf($.connection.hub.id) + 1];
                symbol.setColor(new Color(clr));
                // Notify the server about the point
                realTimePoints.server.addPoint(geometry.x, geometry.y);
            }
            else if (type === "line" || type === "polyline") {

                var symbol = new SimpleLineSymbol();
                var clr = layersColors[layersColors.indexOf($.connection.hub.id) + 1];
                symbol.setColor(new Color(clr));
                // Notify the server about the line
                realTimePoints.server.addPolyline(geometry.paths);
            }
            else if (type === "polygon") {
                var symbol = new SimpleFillSymbol();
                var clr = layersColors[layersColors.indexOf($.connection.hub.id) + 1];
                symbol.setColor(new dojo.Color(clr));
                // Notify the server about the line
                realTimePoints.server.addPolygon(geometry.rings);
            }
            else {
                symbol = tb.fillSymbol;
            }
        }
    });

function btnUpdateUserName_Click() {
    realTimePoints.server.updateUserName($("#txtUserName").val());
}