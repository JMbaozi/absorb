require(["dojo/parser", "dojo/_base/array", "dijit/registry", "dojo/query", 
    "esri/map", "esri/dijit/editing/Editor", "esri/dijit/AttributeInspector",
    "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer",
    "dijit/form/CheckBox", "dojo/keys", "dijit/ToolbarSeparator",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"],
    function (parser, array, registry, query,
        Map, Editor, AttributeInspector, ArcGISTiledMapServiceLayer, FeatureLayer, CheckBox, keys, ToolbarSeparator) {
        parser.parse();

        var map = new Map("map", {
            center: [-117.535, 34.28],
            zoom: 12,
            logon: false
        });

        var topo = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
        map.addLayer(topo);

        map.on("layers-add-result", initEditor);

        var baseUrl = "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Wildfire/FeatureServer/";
        var pointsOfInterest = new FeatureLayer(baseUrl + "0", {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ['*']
        });
        var WildfireLine = new FeatureLayer(baseUrl + "1", {
            mode: FeatureLayer.MODE_ONDEMAND, 
            outFields: ['*']
        });
        var evacuationPerimeter = new FeatureLayer(baseUrl + "2", {
            mode: FeatureLayer.MODE_ONDEMAND,
            outFields: ['*']
        });

        map.addLayers([pointsOfInterest, WildfireLine, evacuationPerimeter]);

        function initEditor(evt) {

            //build the layer and field information for the layer, display the description field
            //using a text area.
            var layers = array.map(evt.layers, function (result) {
                var fieldInfos = array.map(result.layer.fields, function (field) {
                    if (field.name === 'description') {
                        return {
                            'fieldName': field.name,
                            'label': 'Details',
                            stringFieldOption: AttributeInspector.STRING_FIELD_OPTION_TEXTAREA
                        }
                    }
                    else {
                        return { 'fieldName': field.name, 'lable': field.alias }
                    }
                });
                return { featureLayer: result.layer, 'fieldInfos': fieldInfos }
            });

            var settings = {
                map: map,
                enableUndoRedo: true,
                layerInfos: layers,
                toolbarVisible: true,
                createOptions: {
                    polygonDrawTools: [
                      Editor.CREATE_TOOL_FREEHAND_POLYGON,
                      Editor.CREATE_TOOL_AUTOCOMPLETE
                    ]
                },
                toolbarOptions: {
                    reshapeVisible: true,
                    cutVisible: true,
                    mergeVisible: true
                }
            };
            var params = { settings: settings };

            editorWidget = new Editor(params, 'editorDiv');

            //Dojo.keys.copyKey maps to CTRL in Windows and CMD in Mac
            map.enableSnapping({ snapKey: keys.copyKey });

            //create a new checkbox to enable/disable snapping
            var checkBox = new CheckBox({
                name: "chkSnapping",
                checked: true,
                id: "chkSnapping",
                label: "Snapping",
                showLabel: "false",
                title: "捕捉",
                onChange: function (evt) {
                    if (this.checked) {
                        map.enableSnapping({ snapKey: keys.copyKey });
                    } else {
                        map.disableSnapping();
                    }
                }
            });

            //add the snapping checkbox to the editor's toolbar 
            var myToolbarElement = query(".esriDrawingToolbar", editorWidget.domNode)[0];
            var myToolbar = registry.byId(myToolbarElement.id);

            myToolbar.addChild(new ToolbarSeparator());
            myToolbar.addChild(checkBox);

            editorWidget.startup();

            //listen for the template pickers onSelectionChange and disable
            //the snapping checkbox when a template is selected
            var templatePickerElement = query(".esriTemplatePicker", editorWidget.domNode)[0];
            var templatePicker = registry.byId(templatePickerElement.id);
            templatePicker.on("selection-change", function () {
                if (templatePicker.getSelected()) {
                    registry.byId('chkSnapping').set("disabled", true);
                } else {
                    registry.byId('chkSnapping').set("disabled", false);
                }
            });
            map.infoWindow.resize(325, 200);
        }
});