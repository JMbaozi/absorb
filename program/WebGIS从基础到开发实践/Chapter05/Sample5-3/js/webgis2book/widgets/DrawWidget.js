define(["dojo/_base/declare", "dojo/topic", "dojo/_base/Color", "dojo/query", "dojo/dom-style", "dojo/dom-attr", "dojo/on", "dojo/_base/lang",
    "esri/graphic", "esri/toolbars/draw", "esri/symbols/TextSymbol",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleFillSymbol", "esri/symbols/Font",
    "./_BaseWidget", "dijit/_WidgetsInTemplateMixin", "dojo/text!./templates/DrawWidget.html",
    "dijit/form/DropDownButton", "dijit/form/NumberSpinner", "dijit/ColorPalette", "dijit/form/TextBox"
    ],
    function (declare, topic, Color, query, domStyle, domAttr, on, lang, Graphic, Draw, TextSymbol, SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, Font,
        _BaseWidget, _WidgetsInTemplateMixin, template) {
        return declare([_BaseWidget, _WidgetsInTemplateMixin], {
            drawToolbar: null, // 几何对象绘制工具条
            _drawEventHandle: null,
            _lastDrawToolText: "",
            drawColor: null, // 符号颜色
            drawSize: 8, // 符号大小
            fontFace: "Arial", // 字体
            templateString: template,

            constructor: function (params) {
                this.rounding = {};
            },

            postMixInProperties: function () {
                try {
                    this.inherited(arguments);
                    this.drawColor = new Color([0, 0, 0]);
                    this.drawSize = 10;
                    this.fontFace = "Arial";
                }
                catch (err) { console.error(err); }
            },

            postCreate: function () {
                try {
                    this.inherited(arguments);

                    // 初始化工具栏中的按钮
                    var buttons = query(".toolbutton", this.domNode);
                    buttons.forEach(function (item, idx, arr) {
                        var icon = require.toUrl("webgis2book/widgets/" + domAttr.get(item, "buttonIcon"));
                        domStyle.set(item, "backgroundImage", "url(" + icon + ")");
                        item.toolType = item.id;
                        item.id = null;
                    });
                }
                catch (err) { console.error(err); }
            },

            startup: function () {
                this.inherited(arguments);
                if (this._initialized) { return; }

                try {
                    this.getAllNamedChildDijits();

                    this.widgets.sizeInput.setValue(this.drawSize);

                    // colorPalette不属于this.widgets，因此不能使用getNamedChildDigits方法找到该小部件
                    var item = this.widgets.colorDropDown.dropDown;
                    this.widgets["colorPalette"] = item;
                    this.widgets.colorPalette.value = this.drawColor;

                    // 连接其他小部件
                    var swatch = this.widgets.colorDropDown.containerNode;
                    domStyle.set(swatch, "backgroundColor", this.widgets.colorPalette.value);
                    this.connects.push(on(this.widgets.colorPalette, "change", function (selColor) {
                        domStyle.set(swatch, "backgroundColor", selColor);
                    }));
                }
                catch (err) {
                    console.error("DrawWidget::startup", err);
                }
            },

            setMap: function (/*esri.Map*/map) {
                this.map = map;

                var mapLoadHandle = this.map.on("load", lang.hitch(this, function (map) {
                    this.drawToolbar = new Draw(this.map);
                    mapLoadHandle.remove();
                }));
            },

            shutdown: function () {
                console.log("DrawWidget::shutdown");
                this.clearGraphics();
                this.onDrawRequest(null);
                this.inherited(arguments);
            },

            onToolButtonClick: function (evt) {
                if (evt && evt.target) {
                    var params = {
                        onDrawEnd: lang.hitch(this, function (evt) {
                            this.addGeometry(evt.geometry);
                        }),
                        label: evt.target.title
                    };

                    switch (evt.target.toolType) {
                        case ("btnPoint"):
                            params.geometryType = Draw.POINT;
                            break;
                        case ("btnPolyline"):
                            params.geometryType = Draw.POLYLINE;
                            break;
                        case ("btnFreehandLine"):
                            params.geometryType = Draw.FREEHAND_POLYLINE;
                            break;
                        case ("btnPolygon"):
                            params.geometryType = Draw.POLYGON;
                            break;
                        case ("btnFreehandPoly"):
                            params.geometryType = Draw.FREEHAND_POLYGON;
                            break;
                        case ("btnText"):
                            params.geometryType = Draw.POINT;
                            break;
                        case ("btnClear"):
                            this.clearGraphics();
                            return;
                        default:
                            console.error("点击了未知类型的按钮： " + evt.target.title);
                            return;
                    }
                    this._lastDrawToolText = evt.target.title;
                    this.onDrawRequest(params);
                }
            },

            onDrawRequest: function (params) {
                try {
                    // 在开始绘制之前，使绘制工具条不可用
                    this.drawToolbar.deactivate();

                    // 断开以前所有的绘制监听函数
                    if (this._drawEventHandle) {
                        this._drawEventHandle.remove();
                        this._drawEventHandle = null;
                    }

                    // 激活绘制工具条
                    if (params) {
                        this._drawEventHandle = this.drawToolbar.on("draw-end", params.onDrawEnd);
                        this.drawToolbar.activate(params.geometryType);
                        topic.publish("mapToolChangedEvent", params.label);
                    }
                    else {
                        this.drawToolbar.deactivate();
                    }
                }
                catch (err) {
                    console.error("DrawWidget::onDrawRequest", err);
                }
            },

            addGeometry: function (geometry) {
                if (geometry) {
                    try {
                        // 处理加入文本
                        if (geometry.declaredClass === "esri.geometry.Point" && this._lastDrawToolText === "文本") {
                            var gText = this.placeText(this.widgets.textInput.getValue(), geometry);
                            this.addGraphic(gText);
                            return;
                        }

                        // 不对长度为0的线与多边行进行进一步的处理
                        if (geometry.declaredClass === "esri.geometry.Polyline") {
                            if (geometry.paths.length === 1 && geometry.paths[0].length == 2) {
                                var p = geometry.paths[0];
                                var len = esri.geometry.getLength(p[0], p[1]);
                                if (isNaN(len) || len === 0) { return; }
                            }
                        }
                        if (geometry.declaredClass === "esri.geometry.Polygon") {
                            if (geometry.rings.length === 1 && geometry.rings[0].length == 3) {
                                var r = geometry.rings[0];
                                var len01 = esri.geometry.getLength(r[0], r[1]);
                                var len02 = esri.geometry.getLength(r[0], r[2]);
                                if (isNaN(len01) || isNaN(len02) || len02 === 0 || len02 === 0) { return; }
                            }
                        }

                        // 设置符号
                        var symbol = this.getSymbol(geometry.type);
                        if (!symbol) {
                            console.error("DrawWidget不支持该类型的几何对象： " + geometry.type);
                            return;
                        }

                        // 加入几何对象图形
                        var graphic = new Graphic(geometry, symbol);
                        this.addGraphic(graphic);
                    }
                    catch (err) {
                        console.error("DrawWidget::addGeometry", err);
                    }
                }
            },

            addGraphic: function (g) {
                try {
                    if (this.map && g) {
                        // 在图形中增加一属性
                        g.owner = this.title;
                        this.map.graphics.add(g);
                    }
                }
                catch (err) {
                    console.error("增加图形错误：" + err);
                }
            },

            getSymbol: function (/*String*/geometryType) {
                var sym = null;
                var c = this.widgets.colorPalette.value;
                if (typeof c == "string") {
                    c = new Color(c);
                }
                var rgba = c.toRgb();
                rgba.push(0.3);
                var s = this.widgets.sizeInput.getValue();

                var outline;
                var fill;

                switch (geometryType) {
                    case "point":
                    case "multipoint":
                        outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, c, 1);
                        fill = new dojo.Color(rgba);
                        sym = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, s, outline, fill);
                        break;
                    case "polyline":
                        sym = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, c, s);
                        break;
                    case "polygon":
                    case "extent":
                        outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, c, 1);
                        fill = new dojo.Color(rgba);
                        sym = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, outline, fill);
                        break;
                }

                return sym;
            },

            getFont: function (size) {
                if (!size) {
                    size = this.widgets.sizeInput.getValue();
                }
                var f = new Font(size + "pt", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, this.fontFace);
                return f;
            },

            placeText: function (text, point) {
                var sym = new TextSymbol(text, this.getFont(), this.widgets.colorPalette.value);
                sym.setAlign(TextSymbol.ALIGN_MIDDLE);
                var g = new Graphic(point, sym);
                return g;
            },

            clearGraphics: function () {
                if (this.map) {
                    try {
                        for (var i = this.map.graphics.graphics.length - 1; i >= 0; i--) {
                            var g = this.map.graphics.graphics[i];
                            if (this.isMyGraphic(g)) {
                                this.map.graphics.remove(g);
                            }
                        }
                    }
                    catch (err) {
                        console.error("清除图形错误：" + err);
                    }
                }
            },

            isMyGraphic: function (g) {
                return (g && g.owner && g.owner === this.title);
            }

        });
    }
);