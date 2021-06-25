require(["dojo/parser", "dijit/registry", "esri/request", "esri/map",
    "esri/geometry/Point", "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/toolbars/draw", "esri/graphic", "esri/symbols/SimpleLineSymbol", "esri/Color",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Select", "dijit/form/TextBox", "dojo/domReady!"],
    function (parser, registry, esriRequest, Map,
        Point, SpatialReference, ArcGISTiledMapServiceLayer,
        Draw, Graphic, SimpleLineSymbol, Color ) {
        parser.parse();

        var pt = new Point(-8837407.939287, 5410409.73274808, new SpatialReference({ wkid: 102100 }));
        var map = new esri.Map("map", {
            center: pt,
            zoom: 18
        });

        var url = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Toronto/ImageServer/";
        var baseMap = new ArcGISTiledMapServiceLayer(url);
        map.addLayer(baseMap);

        var inputSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 2);

        var drawToolbar = new Draw(map);
        drawToolbar.on("draw-end", onDrawEnd);

        registry.byId("measureTool").on("click", function () {
            map.graphics.clear();
            drawToolbar.activate(Draw.LINE);
        });

        function onDrawEnd(evt) {
            var userGraphic = new Graphic(evt.geometry, inputSymbol);
            map.graphics.add(userGraphic);
            drawToolbar.deactivate();

            var content = {
                fromGeometry: '{ "x":' + evt.geometry.paths[0][0][0] + ', "y": ' + evt.geometry.paths[0][0][1] + ', "spatialReference": { "wkid": 102100 } }',
                toGeometry: '{ "x":' + evt.geometry.paths[0][1][0] + ', "y": ' + evt.geometry.paths[0][1][1] + ', "spatialReference": { "wkid": 102100 } }',
                geometryType: 'esriGeometryPoint',
                measureOperation: registry.byId("measureOpt").value,
                f: 'json'
            };
            var layersRequest = esriRequest({
                url: url + 'measure',
                content: content,
                handleAs: "json",
                callbackParamName: "callback"
            });
            layersRequest.then(
              function (response) {
                  registry.byId("result").set('value', response.height.value);
              }, function (error) {
                  console.log("Error: ", error.message);
              });
        }
    });
