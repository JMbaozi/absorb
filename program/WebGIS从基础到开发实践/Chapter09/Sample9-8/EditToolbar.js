require(["esri/map", "esri/toolbars/edit", "esri/toolbars/draw",
  "esri/layers/ArcGISTiledMapServiceLayer", "esri/graphic",
  "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol",
  "dojo/_base/event", "dojo/parser", "dijit/registry",

  "dijit/form/Button", "dijit/form/ToggleButton", "dijit/form/DropDownButton",
  "dijit/CheckedMenuItem", "dijit/layout/BorderContainer",
  "dijit/layout/ContentPane", "dojo/domReady!"
], function (
    Map, Edit, Draw, ArcGISTiledMapServiceLayer, Graphic,
    SimpleLineSymbol, SimpleFillSymbol,
    event, parser, registry
) {
    parser.parse();

    var map = new Map("map");
    var agoServiceURL = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer";
    var agoLayer = new ArcGISTiledMapServiceLayer(agoServiceURL);
    map.addLayer(agoLayer);

    var drawToolbar, editToolbar;
    var lineSymbol = new SimpleLineSymbol();
    var fillSymbol = new SimpleFillSymbol();

    map.on("load", createToolbar);

    function createToolbar() {        
        drawToolbar = new Draw(map);
        drawToolbar.on("draw-end", addToMap);
        registry.forEach(function (d) {
            if (d.declaredClass === "dijit.form.Button") {
                d.on("click", activateDrawTool);
            }
        });

        editToolbar = new Edit(map);
        map.graphics.on("click", function (evt) {
            event.stop(evt);
            activateEditTool(evt.graphic);
        });

        //deactivate the toolbar when you click outside a graphic
        map.on("click", function (evt) {
            editToolbar.deactivate();
        });
    }

    function activateDrawTool() {
        var tool = null;
        switch (this.label) {
            case "线":
                tool = "POLYLINE";
                break;
            case "徒手线":
                tool = "FREEHAND_POLYLINE";
                break;
            case "多边形":
                tool = "POLYGON";
                break;
            case "徒手多边形":
                tool = "FREEHAND_POLYGON";
                break;
        }
        drawToolbar.activate(Draw[tool]);
        map.hideZoomSlider();
    }

    function addToMap(evt) {
        var geometry = evt.geometry;
        var symbol;
        // 将用户绘制的几何对象加入到地图中
        switch (geometry.type) {
            case "polyline":
                symbol = lineSymbol;
                break;
            case "polygon":
                symbol = fillSymbol;
                break;
        }

        var graphic = new Graphic(geometry, symbol);
        map.graphics.add(graphic);
        drawToolbar.deactivate();
    }

    function activateEditTool(graphic) {
        var tool = 0;

        if (registry.byId("tool_move").checked) {
            tool = tool | Edit.MOVE;
        }
        if (registry.byId("tool_vertices").checked) {
            tool = tool | Edit.EDIT_VERTICES;
        }
        if (registry.byId("tool_scale").checked) {
            tool = tool | Edit.SCALE;
        }
        if (registry.byId("tool_rotate").checked) {
            tool = tool | Edit.ROTATE;
        }
        // 如果图形使用的是一文本符号，则允许进行文本编辑
        if (graphic.symbol.declaredClass === "esri.symbol.TextSymbol") {
            tool = tool | Edit.EDIT_TEXT;
        }
        // 指定工具条的选项       
        var options = {
            allowAddVertices: registry.byId("vtx_ca").checked,
            allowDeleteVertices: registry.byId("vtx_cd").checked,
            uniformScaling: registry.byId("uniform_scaling").checked
        };
        editToolbar.activate(tool, graphic, options);
    }
});