require([
    "esri/map", "esri/toolbars/draw", "esri/dijit/Print",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/LayerDrawingOptions",
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol", "esri/graphic", "esri/InfoTemplate",
    "esri/renderers/ClassBreaksRenderer",
    "esri/config",
    "dojo/_base/array", "esri/Color", "dojo/parser",
    "dojo/query", "dojo/dom", "dojo/dom-construct",
    "dijit/form/CheckBox", "dijit/form/Button",

    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
], function (
    Map, Draw, Print,
    ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer,
    LayerDrawingOptions,
    SimpleMarkerSymbol, SimpleLineSymbol,
    SimpleFillSymbol, Graphic, InfoTemplate,
    ClassBreaksRenderer,
    esriConfig,
    arrayUtils, Color, parser,
    query, dom, domConstruct,
    CheckBox, Button
) {
    parser.parse();

    esriConfig.defaults.io.proxyUrl = "/proxy";

    var map = new Map("map", {
        center: [-90.733, 30.541],
        zoom: 8
    });

    var url = "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer";
    var tiledLayer = new ArcGISTiledMapServiceLayer(url, { "id": "Ocean" });
    map.addLayer(tiledLayer);

    var layer = new ArcGISDynamicMapServiceLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/", {
        id: "County Population",
        opacity: 0.5
    });
    layer.setVisibleLayers([3]);
    var layerDefs = [];
    layerDefs[3] = "state_name = 'Louisiana'";
    layer.setLayerDefinitions(layerDefs);

    var renderer = new ClassBreaksRenderer(null, "pop2000");
    var outline = new SimpleLineSymbol("solid", new Color([0, 0, 0, 0.5]), 1);
    var colors = [
      new Color([255, 255, 178, 0.5]),
      new Color([254, 204, 92, 0.5]),
      new Color([253, 141, 60, 0.5]),
      new Color([240, 59, 32, 0.5]),
      new Color([189, 0, 38, 0.5])
    ];
    renderer.addBreak(0, 20000, new SimpleFillSymbol("solid", outline, colors[0]));
    renderer.addBreak(20000, 50000, new SimpleFillSymbol("solid", outline, colors[1]));
    renderer.addBreak(50000, 100000, new SimpleFillSymbol("solid", outline, colors[2]));
    renderer.addBreak(10000, 1000000, new SimpleFillSymbol("solid", outline, colors[3]));
    renderer.addBreak(1000000, 10000000, new SimpleFillSymbol("solid", outline, colors[4]));
    var drawingOptions = new LayerDrawingOptions();
    drawingOptions.renderer = renderer;
    var optionsArray = [];
    optionsArray[3] = drawingOptions;
    layer.setLayerDrawingOptions(optionsArray);
    map.addLayer(layer);

    var toolbar = new Draw(map);
    toolbar.on("draw-end", addToMap);

    // set up symbols for the various geometry types
    var symbols = {};
    symbols.point = new SimpleMarkerSymbol("square", 10, new SimpleLineSymbol(), new Color([0, 255, 0, 0.75]));
    symbols.polyline = new SimpleLineSymbol("solid", new Color([255, 128, 0]), 2);
    symbols.polygon = new SimpleFillSymbol().setColor(new Color([255, 255, 0, 0.25]));
    symbols.circle = new SimpleFillSymbol().setColor(new Color([0, 0, 180, 0.25]))

    // find the divs for buttons
    query(".drawing").forEach(function (btn) {
        var button = new Button({
            label: btn.innerHTML,
            onClick: function () {
                activateTool(this.id);
            }
        }, btn);
    });

    var tool = null;

    function activateTool(type) {
        tool = type.replace("freehand", "");
        toolbar.activate(type);
        map.hideZoomSlider();
    }

    function addToMap(evt) {
        toolbar.deactivate();
        map.showZoomSlider();

        var graphic = new Graphic(evt.geometry, symbols[tool]);
        map.graphics.add(graphic);
    }

    // print dijit
    var printer = new Print({
        map: map,
        url: "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task"
    }, dom.byId("printButton"));
    printer.startup();
});