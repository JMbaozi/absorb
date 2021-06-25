require([
    "esri/map",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer",
    "esri/tasks/UniqueValueDefinition", "esri/tasks/AlgorithmicColorRamp",
    "esri/tasks/GenerateRendererParameters", "esri/tasks/GenerateRendererTask",
    "esri/dijit/Legend",
    "dojo/parser", "esri/Color",
    "dojo/dom-construct", 
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dojo/domReady!"
], function (
    Map,
    ArcGISTiledMapServiceLayer, FeatureLayer,
    UniqueValueDefinition, AlgorithmicColorRamp,
    GenerateRendererParameters, GenerateRendererTask,
    Legend,
    parser, Color,
    domConstruct
    ) {
    parser.parse();

    var map = new Map("map", {
        center: [-95.625, 39.243],
        zoom: 4,
        slider: false
    });
    var basemap = new ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
    map.addLayer(basemap);
    var countiesUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";
    var outFields = ["POP2007", "POP07_SQMI", "WHITE", "BLACK", "AMERI_ES", "ASIAN", "HAWN_PI", "OTHER", "MULT_RACE", "HISPANIC", "STATE_NAME", "SUB_REGION"];

    var wash = new FeatureLayer(countiesUrl, {
        "mode": FeatureLayer.MODE_SNAPSHOT,
        "outFields": outFields,
        "opacity": 0.8
    });
    map.addLayer(wash);

    var defaultFrom = Color.fromHex("#998ec3");
    var defaultTo = Color.fromHex("#f1a340");

    map.on("load", function () {
        createRenderer();
    });

    function createRenderer() {
        var colorRamp = new AlgorithmicColorRamp();
        colorRamp.fromColor = defaultFrom;
        colorRamp.toColor = defaultTo;
        colorRamp.algorithm = "hsv"; // options are:  "cie-lab", "hsv", "lab-lch"

        var classDef = new UniqueValueDefinition();
        classDef.attributeField = "SUB_REGION";
        classDef.colorRamp = colorRamp;

        var params = new GenerateRendererParameters();
        params.classificationDefinition = classDef;
        var generateRenderer = new GenerateRendererTask(countiesUrl);
        generateRenderer.execute(params, applyRenderer, errorHandler);
    }

    function applyRenderer(renderer) {
        wash.setRenderer(renderer);
        wash.redraw();
        createLegend(map, wash);
    }

    function createLegend(map, fl) {
        // create a new div for the legend
        var legendDiv = domConstruct.create("div", {
            id: "legendDiv"
        }, document.getElementById("legendWrapper"));

        var legend = new Legend({
            map: map,
            layerInfos: [{
                layer: fl,
                title: "SUB_REGION"
            }]
        }, legendDiv);
        legend.startup();
    }

    function errorHandler(err) {
        console.log('Oops, error: ', err);
    }
});