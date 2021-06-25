define(["dojo/_base/declare", "dojo/_base/array", "dojo/query", "dojo/dom-style", "dojo/on", "dojo/fx", "dojo/_base/fx", "dojo/_base/lang", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", 
    "dijit/_Widget", "dijit/_Container", "dojo/dnd/Moveable", "dijit/_TemplatedMixin", "dojo/text!./templates/ContainedWidgetFrame.html"],
    function (declare, array, query, domStyle, on, coreFx, fx, lang, domAttr, domClass, domGeom, _Widget, _Container, Moveable, _TemplatedMixin, template) {
        return declare([_Widget, _TemplatedMixin, _Container], {
            // 包含的控件
            widget: null,
            icon: "",
            title: "",
            state: "maximized", // 其他选项有"minimized", "minimizing", "maximizing"

            // 框架DOM节点
            boxNode: null,
            badgeNode: null,
            contentNode: null,
            titleNode: null,

            // 调用postCreate创建框架后自动计算
            widgetWidth: 100,
            boxMaximized: null, // 在构造函数中初始化

            templateString: template,

            constructor: function () {
                this.boxMaximized = {
                    w: 100,
                    h: [],
                    paddingTop: 100,
                    paddingBottom: 100,
                    paddingLeft: 100,
                    paddingRight: 100,
                    marginLeft: 100
                };
            },

            postCreate: function () {
                try {
                    // 查询框架DOM节点
                    this.boxNode = query(".widgetBadgedPane", this.domNode)[0];
                    this.badgeNode = query(".widgetBadge", this.domNode)[0];
                    this.contentNode = query(".widgetHolder", this.domNode)[0];
                    this.titleNode = query("#.widgetTitle", this.domNode)[0];
                }
                catch (err) {
                    console.error(err);
                }
            },

            startup: function () {
                if (this._started) {
                    return;
                }

                console.log("WidgetFrame::startup");
                var children = this.getChildren();
                array.forEach(children, function (child) { child.startup(); });

                // 查找类型为_Widget的子控件
                for (var i = 0; i < children.length; i++) {
                    var c = children[i];
                    if (c.setMap && c.setId && c.setAlarm && c.setTitle && c.setIcon && c.setState && c.setConfig) {
                        this.setWidget(c, true);
                        break;
                    }
                }

                // Set width to that of parent node
                var p = this.getParent();
                var pw;
                if (p === null) {
                    pw = 300;
                }
                else {
                    pw = domStyle.get(p.containerNode, "width");
                    if (p.contentWidth) {
                        pw = p.contentWidth;
                    }
                }
                domStyle.set(this.domNode, "width", pw + "px");

                // Measure the box as laid out in the default (maximized) position
                this.widgetWidth = domStyle.get(this.domNode, "width");

                this.boxMaximized.paddingTop = domStyle.get(this.boxNode, "paddingTop");
                this.boxMaximized.paddingBottom = domStyle.get(this.boxNode, "paddingBottom");
                this.boxMaximized.paddingLeft = domStyle.get(this.boxNode, "paddingLeft");
                this.boxMaximized.paddingRight = domStyle.get(this.boxNode, "paddingRight");
                this.boxMaximized.marginLeft = domStyle.get(this.boxNode, "marginLeft");
                this.boxMaximized.w = this.widgetWidth - (this.boxMaximized.marginLeft + this.boxMaximized.paddingLeft + this.boxMaximized.paddingRight);

                // 每个面板具有不同的高度
                for (var i = 0; i < this.widget.panels.length; i++) {
                    this.widget.showPanel(i);
                    var h = domStyle.get(this.boxNode, "height");
                    this.boxMaximized.h.push(h);
                }
                this.widget.showPanel(0);

                if (this.state === "minimized") {
                    // 最小化该小部件
                    this.minimize(0);
                }
                else {
                    // 最大化该小部件
                    this.maximize(0);
                }

                // 淡入显示
                fx.fadeIn({
                    node: this.domNode
                }).play();

                console.log("WidgetFrame::startup ended");
            },

            setIcon: function (/* String */icon) {
                try {
                    this.icon = icon;
                    domStyle.set(this.badgeNode, "backgroundImage",
                        "url(" + require.toUrl("webgis2book/widgets/" + icon) + ")");
                    
                }
                catch (err) { console.error(err); }
            },

            setWidget: function (/*webgis2book.widgets._Widget*/widget, /*boolean*/childAlreadyAdded) {
                // 确保只设置一次
                if (this.widget) {
                    return;
                }

                if (!childAlreadyAdded) {
                    this.addChild(widget);
                }

                this.widget = widget;

                try {
                    // 设置框架的标题
                    this.title = widget.title;
                    this.titleNode.innerHTML = this.title;

                    // Set the frame icon
                    this.setIcon(widget.icon);

                    // 增加按钮图标
                    var minBtn = query(".wbMinimize", this.domNode)[0];
                    minBtnTd = minBtn.parentNode;
                    if (widget.panels.length > 1) {
                        array.forEach(widget.panels, lang.hitch(this, function (item, idx, arr) {
                            var td = document.createElement("TD");
                            var btn = document.createElement("DIV");
                            domClass.add(btn, "widgetButton");
                            domStyle.set(btn, "backgroundImage",
                                "url(" + require.toUrl("webgis2book/widgets/" + item.buttonIcon) + ")");
                            domAttr.set(btn, "title", item.buttonText);
                            if (this.state === "minimized") {
                                domStyle.set(btn, "display", "none");
                            }

                            td.appendChild(btn);
                            minBtnTd.parentNode.insertBefore(td, minBtnTd);
                            on(btn, "click", lang.hitch(this, function () {
                                this.selectPanel(idx);
                            }));
                        }));
                    }
                }
                catch (err) { console.error(err); }
            },

            onMinClick: function (evt) {
                this.minimize();
            },

            onCloseClick: function (evt) {
                this.onClose(this.id);
            },

            onBadgeClick: function (evt) {
                console.log("onBadgeClick " + evt.target);
                if (this.state === "maximized") {
                    // Start minimizing
                    this.minimize();
                }
                else if (this.state === "minimized") {
                    // Start maximizing
                    this.maximize();
                }
                // otherwise: we're animating, ignore the click
            },

            minimize: function (duration) {
                //console.log("minimizing!");
                var boxEndProperties = {
                    height: 20,
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: 20,
                    marginLeft: this.widgetWidth - 200,
                    width: 150,
                    paddingLeft: this.boxMaximized.paddingRight,
                    paddingRight: this.boxMaximized.paddingLeft
                };
                var badgeEndProperties = {
                    left: this.widgetWidth - 40
                };

                // Broadcast the change in height
                var startHeight = domStyle.get(this.boxNode, "height") + domStyle.get(this.boxNode, "paddingTop") + domStyle.get(this.boxNode, "paddingBottom") + domStyle.get(this.boxNode, "marginTop");
                var endHeight = boxEndProperties.height + boxEndProperties.paddingTop + boxEndProperties.paddingBottom + boxEndProperties.marginTop;
                this.onResizeStart(this.id, { dh: (endHeight) - (startHeight) });

                if (duration !== 0 && !duration) {
                    duration = 350;
                }
                if (duration <= 0) {
                    // Short-circuit, no animation
                    for (var key in boxEndProperties) {
                        boxEndProperties[key] = boxEndProperties[key] + "px";
                    }
                    for (var key in badgeEndProperties) {
                        badgeEndProperties[key] = badgeEndProperties[key] + "px";
                    }
                    domStyle.set(this.badgeNode, badgeEndProperties);
                    domStyle.set(this.boxNode, boxEndProperties);
                    domStyle.set(this.contentNode, "overflow", "hidden");
                    query(".widgetButton", this.domNode).style("display", "none");
                    this.state = "minimized";
                }
                else {
                    try {
                        var vShrink = fx.animateProperty({
                            node: this.boxNode,
                            duration: duration,
                            beforeBegin: lang.hitch(this, function () {
                                domStyle.set(this.contentNode, "overflow", "hidden");
                                query(".widgetButton", this.domNode).style("display", "none");
                            }),
                            properties: {
                                height: boxEndProperties.height,
                                paddingTop: boxEndProperties.paddingTop,
                                paddingBottom: boxEndProperties.paddingBottom,
                                marginTop: boxEndProperties.marginTop
                            },
                            onEnd: lang.hitch(this, function () {
                                this.onResizeEnd(this);
                            })
                        });

                        var hShrink = fx.animateProperty({
                            node: this.boxNode,
                            duration: duration,
                            beforeBegin: lang.hitch(this, function () {
                                domStyle.set(this.contentNode, "display", "none");
                            }),
                            properties: {
                                width: "10",
                                paddingLeft: "0",
                                paddingRight: "0"
                            },
                            onEnd: lang.hitch(this, function () {
                                var badgeSlide = fx.animateProperty({
                                    node: this.badgeNode,
                                    duration: duration,
                                    properties: badgeEndProperties
                                });

                                var hGrow = fx.animateProperty({
                                    node: this.boxNode,
                                    duration: duration,
                                    properties: {
                                        marginLeft: boxEndProperties.marginLeft,
                                        width: boxEndProperties.width,
                                        paddingLeft: boxEndProperties.paddingLeft,
                                        paddingRight: boxEndProperties.paddingRight
                                    },
                                    onEnd: lang.hitch(this, function () {
                                        //console.log("minimized!");
                                        this.state = "minimized";
                                    })
                                });
                                coreFx.combine([badgeSlide, hGrow]).play();
                            })
                        });

                        coreFx.chain([vShrink, hShrink]).play();
                        this.state = "minimizing";
                    }
                    catch (err) { console.error(err); }
                }
            },

            selectPanel: function (index) {
                if (index !== this.widget.panelIndex) {
                    try {
                        this.onResizeStart(this.id, { dh: this.boxMaximized.h[index] - this.boxMaximized.h[this.widget.panelIndex] });

                        var firstHalf = fx.fadeOut({
                            node: this.contentNode,
                            duration: 150,
                            onEnd: lang.hitch(this, function () {
                                this.widget.showPanel(index);
                            })
                        });

                        var secondHalf = fx.fadeIn({
                            node: this.contentNode,
                            duration: 150
                        });

                        var resize = fx.animateProperty({
                            node: this.boxNode,
                            duration: 150,
                            properties: {
                                height: this.boxMaximized.h[index]
                            },
                            onEnd: lang.hitch(this, function () {
                                this.onResizeEnd(this);
                            })
                        });

                        coreFx.chain([firstHalf, resize, secondHalf]).play();
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            },

            maximize: function (duration) {
                var boxEndProperties = {
                    height: this.boxMaximized.h[this.widget.panelIndex],
                    paddingTop: this.boxMaximized.paddingTop,
                    paddingBottom: this.boxMaximized.paddingBottom,
                    marginTop: 0,
                    marginLeft: this.boxMaximized.marginLeft,
                    width: this.boxMaximized.w,
                    paddingLeft: this.boxMaximized.paddingLeft,
                    paddingRight: this.boxMaximized.paddingRight
                };
                var badgeEndProperties = {
                    left: 0
                };

                var startHeight = domStyle.get(this.boxNode, "height") + domStyle.get(this.boxNode, "paddingTop")
                    + domStyle.get(this.boxNode, "paddingBottom") + domStyle.get(this.boxNode, "marginTop");
                var endHeight = boxEndProperties.height + boxEndProperties.paddingTop
                    + boxEndProperties.paddingBottom + boxEndProperties.marginTop;
                this.onResizeStart(this.id, { dh: (endHeight) - (startHeight) });

                if (duration !== 0 && !duration) {
                    duration = 350;
                }
                if (duration <= 0) {
                    // 不使用动画效果
                    for (var key in boxEndProperties) {
                        boxEndProperties[key] = boxEndProperties[key] + "px";
                    }
                    for (var key in badgeEndProperties) {
                        badgeEndProperties[key] = badgeEndProperties[key] + "px";
                    }
                    domStyle.set(this.badgeNode, badgeEndProperties);
                    domStyle.set(this.boxNode, boxEndProperties);
                    domStyle.set(this.contentNode, "overflow", "auto");
                    query(".widgetButton", this.domNode).style("display", "block");
                    this.state = "maximized";
                }
                else {
                    try {

                        var badgeSlide = fx.animateProperty({
                            node: this.badgeNode,
                            properties: badgeEndProperties
                        });

                        var hShrink = fx.animateProperty({
                            node: this.boxNode,
                            properties: {
                                marginLeft: 0,
                                width: 10,
                                paddingLeft: 0,
                                paddingRight: 0
                            },
                            onEnd: lang.hitch(this, function () {
                                var hGrow = fx.animateProperty({
                                    node: this.boxNode,
                                    properties: {
                                        width: boxEndProperties.width,
                                        paddingLeft: boxEndProperties.paddingLeft,
                                        paddingRight: boxEndProperties.paddingRight,
                                        marginLeft: boxEndProperties.marginLeft
                                    }
                                });

                                var vGrow = fx.animateProperty({
                                    node: this.boxNode,
                                    beforeBegin: lang.hitch(this, function () {
                                        domStyle.set(this.contentNode, "display", "block");
                                    }),
                                    onEnd: lang.hitch(this, function () {
                                        this.state = "maximized";
                                        domStyle.set(this.contentNode, "overflow", "auto");
                                        query(".widgetButton", this.domNode).style("display", "block");
                                        this.onResizeEnd(this);
                                    }),
                                    properties: {
                                        height: boxEndProperties.height,
                                        paddingTop: boxEndProperties.paddingTop,
                                        paddingBottom: boxEndProperties.paddingBottom,
                                        marginTop: boxEndProperties.marginTop
                                    }
                                });
                                coreFx.chain([hGrow, vGrow]).play();
                            })
                        });

                        coreFx.combine([badgeSlide, hShrink]).play();
                        this.state = "maximizing";
                    }
                    catch (err) {
                        console.error(err);
                    }
                }
            },

            getBoundingBox: function () {
                var domBox = domGeom.getMarginBox(this.domNode);
                var boxBox = domGeom.getMarginBox(this.boxNode);
                var bb = {
                    w: domBox.w, h: boxBox.h, t: domBox.t, l: domBox.l
                };
                //console.dir(bb);
                return bb;
            },

            onResizeStart: function (/*String*/frameId, /*Object*/endBounds) {
            },

            onResizeEnd: function (/*ontainedWidgetFrame*/frame) {
            },

            onClose: function (/*String*/frameId) {
            }
        });
    });
