require(["esri/map",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer",
    "esri/tasks/ClassBreaksDefinition", "esri/tasks/AlgorithmicColorRamp",
    "esri/tasks/GenerateRendererParameters", "esri/tasks/GenerateRendererTask",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
    "esri/dijit/Legend",
    "dojo/parser", "dojo/_base/array", "esri/Color",
    "dojo/dom-construct", "dojo/number",
    "dojo/data/ItemFileReadStore", "dijit/form/FilteringSelect",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dojo/domReady!"
], function (
    Map,
    ArcGISTiledMapServiceLayer, FeatureLayer,
    ClassBreaksDefinition, AlgorithmicColorRamp,
    GenerateRendererParameters, GenerateRendererTask,
    SimpleLineSymbol, SimpleFillSymbol,
    Legend,
    parser, arrayUtils, Color,
    domConstruct, number,
    ItemFileReadStore, FilteringSelect
    ) {
    parser.parse();
    var fields = {
        "POP2007": "Population(2007)", "POP07_SQMI": "Population/Square Mile(2007)",
        "WHITE": "White", "BLACK": "Black", "AMERI_ES": "Native Americans",
        "HISPANIC": "Hispanic", "ASIAN": "Asian", "HAWN_PI": "Native Hawaiian/Pacific Islander",
        "MULT_RACE": "Multiple Races", "OTHER": "Other"
    };

    var map = new Map("map", {
        center: [-95.625, 39.243],
        zoom: 4,
        slider: false
    });
    var basemap = new ArcGISTiledMapServiceLayer("http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
    map.addLayer(basemap);

    countiesUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3";
    var outFields = ["POP2007", "POP07_SQMI", "WHITE", "BLACK", "AMERI_ES", "ASIAN", "HAWN_PI", "OTHER", "MULT_RACE", "HISPANIC", "STATE_NAME"];
    var currentAttribute = "POP2007";

    var wash = new FeatureLayer(countiesUrl, {
        "mode": FeatureLayer.MODE_SNAPSHOT,
        "outFields": outFields,
        "opacity": 0.8
    });
    map.addLayer(wash);

    var fieldNames, fieldStore, fieldSelect;
    fieldNames = { "identifier": "value", "label": "name", "items": [] };
    arrayUtils.forEach(outFields, function (f) {
        if (arrayUtils.indexOf(f.split("_"), "NAME") == -1) {
            fieldNames.items.push({ "name": fields[f], "value": f });
        }
    });

    fieldStore = new ItemFileReadStore({ data: fieldNames });
    fieldSelect = new FilteringSelect({
        displayedValue: fieldNames.items[0].name,
        value: fieldNames.items[0].value,
        name: "fieldsFS",
        required: false,
        store: fieldStore,
        searchAttr: "name",
        style: { "width": "220px", "fontSize": "12pt", "color": "#444" }
    }, domConstruct.create("div", null, document.getElementById("fieldWrapper")));
    fieldSelect.on("change", updateAttribute);

    // colors for the renderer
    var defaultFrom = Color.fromHex("#998ec3");
    var defaultTo = Color.fromHex("#f1a340");
    var sfs = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_SOLID,
            new Color([0, 0, 0]),
            0.5
          ),
          null
        );
    var legend = null;

    // create a feature layer 
    // wait for map to load so the map's extent is available
    map.on("load", function () {
        createRenderer("POP2007");
    });

    

    function createRenderer(field) {        
        var colorRamp = new AlgorithmicColorRamp();
        colorRamp.fromColor = defaultFrom;
        colorRamp.toColor = defaultTo;
        colorRamp.algorithm = "hsv";

        var classDef = new ClassBreaksDefinition();
        classDef.classificationField = currentAttribute;
        classDef.classificationMethod = "quantile";
        classDef.breakCount = 5;
        classDef.baseSymbol = sfs;        
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

    function updateAttribute(ch) {
        currentAttribute = ch;
        createRenderer(ch);
        createLegend(map, wash);
    }

    function createLegend(map, fl) {
        // destroy previous legend, if present
        if (legend != null) {
            legend.destroy();
            domConstruct.destroy(document.getElementById("legendDiv"));
        }
        // create a new div for the legend
        var legendDiv = domConstruct.create("div", {
            id: "legendDiv"
        }, document.getElementById("legendWrapper"));

        legend = new Legend({
            map: map,
            layerInfos: [{
                layer: fl,
                title: "属性：" + fields[currentAttribute]
            }]
        }, legendDiv);
        legend.startup();
    }

    function errorHandler(err) {
        console.log('Oops, error: ', err);
    }
});