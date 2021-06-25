require(["dojo/parser", "dijit/registry", "esri/map",
    "esri/geometry/Extent", "esri/SpatialReference", "esri/layers/ArcGISImageServiceLayer", "esri/layers/RasterFunction", "esri/layers/ImageServiceParameters",
    "esri/toolbars/draw", "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/Color",
    "esri/tasks/ImageServiceIdentifyTask", "esri/tasks/ImageServiceIdentifyParameters", "esri/layers/MosaicRule",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/TextBox", "dojo/domReady!"],
    function (parser, registry, Map,
        Extent, SpatialReference, ArcGISImageServiceLayer, RasterFunction, ImageServiceParameters,
        Draw, Graphic, SimpleMarkerSymbol, SimpleLineSymbol, Color,
        ImageServiceIdentifyTask, ImageServiceIdentifyParameters, MosaicRule) {
        parser.parse();

        var initExtent = new Extent(-13224484.260283869, 4295127.538002357, -13105721.93623988, 4362783.124240531, new SpatialReference({ wkid: 102100 }));
        map = new Map("map", {
            extent: initExtent
        });

        var rasterFunction = new RasterFunction();
        rasterFunction.functionName = "Hillshade";
        rasterFunction.variableName = "DEM";
        var arguments = {};
        arguments.Azimuth = 215.0;
        arguments.Altitude = 60.0;
        arguments.ZFactor = 30.3;
        rasterFunction.arguments = arguments;

        var params = new ImageServiceParameters();
        params.renderingRule = rasterFunction;
        var imageLayer = new ArcGISImageServiceLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Earthquakes/CaliforniaDEM/ImageServer", {
            imageServiceParameters: params
        });
        map.addLayer(imageLayer);

        var redColor = new Color([255, 0, 0]);
        var halfFillYellow = new Color([255, 255, 0, 0.5]);
        var inputSymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_DIAMOND, 10,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, redColor, 1),
                    halfFillYellow);


        var drawToolbar = new Draw(map);
        drawToolbar.on("draw-end", onDrawEnd);

        registry.byId("measureTool").on("click", function () {
            map.graphics.clear();
            drawToolbar.activate(Draw.POINT);
        });

        function onDrawEnd(evt) {
            var userGraphic = new Graphic(evt.geometry, inputSymbol);
            map.graphics.add(userGraphic);
            drawToolbar.deactivate();

            var imageIdentify = new ImageServiceIdentifyTask(imageLayer.url);  
            var parm = new ImageServiceIdentifyParameters();  
            var mosaicRule = new MosaicRule();  
            mosaicRule.ascending = false;  
            mosaicRule.method = MosaicRule.METHOD_CENTER;
            parm.geometry = evt.geometry;
            parm.mosaicRule = mosaicRule;  
            parm.pixelSizeX = imageLayer.pixelSizeX;  
            parm.pixelSizeY = imageLayer.pixelSizeY;  
            imageIdentify.execute(parm,
              function (identifyResult) {
                  registry.byId("result").set('value', identifyResult.value);
              }, function (error) {
                  console.log("Error: ", error.message);
              });
        }
    });
