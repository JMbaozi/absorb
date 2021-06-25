define(["dojo/_base/declare", "dojo/_base/array", "dojo/query", "dojo/topic", "dojo/dom-style", "dojo/on", "dojo/fx", "dojo/_base/fx", "dojo/_base/lang", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-geometry", "dojo/NodeList-fx",
    "./ContainedWidgetFrame", "dijit/_Widget", "dijit/_Container", "dojo/dnd/Moveable", "dijit/_TemplatedMixin", "dojo/text!./templates/WidgetContainer.html"],
    function (declare, array, query, topic, domStyle, on, coreFx, fx, lang, domAttr, domClass, domGeom, nodeListFx, ContainedWidgetFrame, _Widget, _Container, Moveable, _TemplatedMixin, template) {
        return declare([_Widget, _TemplatedMixin, _Container], {
            showHideButton: null,
            contentWidth: 0,
            _containerPadding: 0,
            templateString: template,

            postCreate: function () {
                console.log("WidgetContainer::postCreate");
                this.showHideButton = query(".wbHide", this.domNode)[0];
                this._scrollDiv = query(".widgetContainerControls", this.domNode)[0];
                this._containerPadding = domStyle.get(this.domNode, "paddingTop");

                // 订阅showWidget事件
                topic.subscribe("showWidget", lang.hitch(this, "onShowWidget"));
            },

            startup: function () {
                if (this._started) {
                    return;
                }
                console.log("WidgetContainer:startup");

                var children = this.getChildren();
                array.forEach(children, function (child) { child.startup(); });

                for (var i = 0; i < children.length; i++) {
                    on(children[i], "onResizeStart", lang.hitch(this, "frameResizing"));
                    on(children[i], "onClose", lang.hitch(this, "closeWidget"));
                    on(children[i], "onResizeEnd", lang.hitch(this, "ensureFrameIsVisible"));
                }

                try {
                    var w = parseInt(dojo.style(this.domNode, "width"));
                    var r = parseInt(dojo.style(this.domNode, "right"));

                    // 保存宽度信息
                    this.contentWidth = w;

                    domStyle.set(this.domNode, "width", "0px");
                    domStyle.set(this.domNode, "right", (r + w) + "px");
                    domStyle.set(this._scrollDiv, "left", (w + 6) + "px");
                }
                catch (err) {
                    console.error(err);
                }
                console.log("WidgetContainer::startup finished");
                this.inherited(arguments);
            },

            onShowWidget: function (widget) {
                console.log("WidgetContainer::onShowWidget");

                if (widget) {
                    // 查找是否已经存在该小部件
                    var bFound = false;
                    var frames = this.getChildren();
                    for (var i = 0; i < frames.length; i++) {
                        var frame = frames[i];
                        if (frame.widget === widget) {
                            if (frame.state === "minimized") {
                                // onResizeEnd将调用ensureFrameIsVisible
                                frame.maximize();
                            }
                            else {
                                this.ensureFrameIsVisible(frame);
                            }
                            bFound = true;
                            break;
                        }
                    }

                    if (!bFound) {
                        // 没有找到小部件，那么新创建一框架，并在其中加入小部件
                        var frame = new ContainedWidgetFrame();
                        frame.setWidget(widget);

                        // 在调用addChild时才调用WidgetFrame的startup
                        this.addChild(frame);
                        on(frame, "ResizeStart", lang.hitch(this, "frameResizing"));
                        on(frame, "Close", lang.hitch(this, "closeWidget"));
                        on(frame, "ResizeEnd", lang.hitch(this, "ensureFrameIsVisible"));

                        if (frames.length > 0) {
                            // 在最后一个小部件后面显示新加入的小部件
                            this.positionFrameAfterFrame(frame, frames[frames.length - 1]);
                        }
                        this.ensureFrameIsVisible(frame);
                    }

                    if (domClass.contains(this.showHideButton, "wbShow")) {
                        this.onClickShow();
                    }
                }
            },

            closeWidget: function (/*String*/frameId) {
                try {
                    var containerBox = domGeom.getContentBox(this.domNode);
                    var children = this.getChildren();

                    var target = null;
                    var targetTop = 0;
                    var firstFrameOffTop = null;
                    var ffOffTopTop = 0;
                    var nodesBefore = new dojo.NodeList();
                    var nodesAfter = new dojo.NodeList();
                    var upShiftDistance = 0;
                    var downShiftDistance = 0;

                    for (var i = 0; i < children.length; i++) {
                        var frame = children[i];

                        var frameBox = frame.getBoundingBox();
                        if (frame.id === frameId) {
                            target = frame;
                            targetTop = frameBox.t;

                            // Odd case where a widget is closed when partly off the top
                            if (targetTop < this._containerPadding) {
                                targetTop = this._containerPadding;
                            }
                        }
                        else {
                            if (frameBox.t < this._containerPadding) {
                                firstFrameOffTop = frame;
                                ffOffTopTop = frameBox.t;
                            }

                            if (target) {
                                nodesAfter.push(frame.domNode);

                                if (upShiftDistance === 0) {
                                    upShiftDistance = dojo.style(frame.domNode, "top") - targetTop;
                                }
                            }
                            else {
                                nodesBefore.push(frame.domNode);
                            }
                        }
                    }

                    if (target) {
                        if (firstFrameOffTop) {
                            // 计算downShiftDistance
                            downShiftDistance = this._containerPadding - ffOffTopTop; //单位为像素

                            // 调整upShiftDistance
                            upShiftDistance -= downShiftDistance;
                        }

                        // 淡出小部件，并移走小部件，但不销毁
                        fx.fadeOut({
                            node: target.domNode,
                            onEnd: dojo.hitch(this, function () {
                                this.removeChild(target); // remove, don't destroy Widget
                                if (target.widget && target.widget.shutdown) {
                                    target.widget.shutdown();
                                }
                            })
                        }).play();

                        // Slide all nodes before down
                        // (If nothing is off the top, downShiftDistance is zero, no shift)
                        this.moveFrames(nodesBefore, downShiftDistance);

                        // Slide all nodes after up
                        this.moveFrames(nodesAfter, upShiftDistance * -1);
                    }
                }
                catch (err) { console.error(err); }
            },

            frameResizing: function (/*String*/frameId, /*Object*/deltas) {
                // One of the frames is resizing. Make room, or snug up
                try {
                    var children = this.getChildren();

                    var target = null;
                    var nodesAfter = new dojo.NodeList();
                    var shiftDistance = 0;

                    for (var i = 0; i < children.length; i++) {
                        var frame = children[i];

                        var frameBox = frame.getBoundingBox();
                        if (frame.id === frameId) {
                            target = frame;
                            targetTop = frameBox.t;
                            // Growth will cause a shift down, shrink a shift up
                            shiftDistance = deltas.dh;
                        }
                        else {
                            if (target) {
                                // target already found, this is after
                                nodesAfter.push(frame.domNode);
                            }
                        }
                    }

                    if (target) {
                        // Nodes after the target slide up or down
                        this.moveFrames(nodesAfter, shiftDistance);
                    }
                }
                catch (err) { console.error(err); }
            },

            ensureFrameIsVisible: function (/*ContainedWidgetFrame*/target) {
                var containerBox = dojo.contentBox(this.domNode);
                var frameBox = target.getBoundingBox();

                // Off the top?
                if (frameBox.t < this._containerPadding) {
                    var downShiftDistance = this._containerPadding - frameBox.t; //pixels

                    // Move all of the frames downShiftDistance
                    var nodes = query(".widgetFrame", this.domNode);
                    this.moveFrames(nodes, downShiftDistance);
                }
                    // Off the bottom?
                else if (frameBox.t + frameBox.h > containerBox.h - this._containerPadding) {
                    var upShiftDistance = frameBox.t - (containerBox.h - frameBox.h - this._containerPadding); //pixels

                    // 将所有的框架小部件上移upShiftDistance距离
                    var nodes = query(".widgetFrame", this.domNode);
                    this.moveFrames(nodes, upShiftDistance * -1);
                }
            },

            positionFrameAfterFrame: function (/*ContainedWidgetFrame*/frameToPlace, /*ContainedWidgetFrame*/afterFrame) {
                var bBox = afterFrame.getBoundingBox();
                y = bBox.t + bBox.h + 20;
                domStyle.set(frameToPlace.domNode, "top", y + "px");
            },

            moveFrames: function (/*NodeList*/frameDomNodes, /*Number*/distance) {
                if (frameDomNodes && frameDomNodes.length > 0 && distance !== 0) {
                    var animations = [];
                    frameDomNodes.forEach(function (n) {
                        var t = domStyle.get(n, "top");
                        var a = fx.animateProperty({
                            node: n,
                            properties: {
                                top: t + distance
                            }
                        });
                        animations.push(a);
                    });

                    coreFx.combine(animations).play();
                }
            },

            onClickShow: function (evt) {
                if (domClass.contains(this.showHideButton, "wbHide")) {
                    domClass.add(this.showHideButton, "wbShow");
                    domClass.remove(this.showHideButton, "wbHide");
                    this.minimize();
                }
                else {
                    domClass.add(this.showHideButton, "wbHide");
                    domClass.remove(this.showHideButton, "wbShow");
                    this.maximize();
                }
            },

            onClickUp: function (evt) {
                try {
                    var children = this.getChildren();
                    var containerBox = dojo.contentBox(this.domNode);

                    // Are there any frames off the top of the screen?
                    // Get the last frame which is at least partly off the screen
                    if (children.length === 0) { return; }
                    var target = null;
                    for (var i = children.length - 1; i >= 0; i--) {
                        var frameBox = children[i].getBoundingBox();
                        if (frameBox.t < 0) {
                            target = children[i];
                            break;
                        }
                    }

                    if (target) {
                        this.ensureFrameIsVisible(target);
                    }
                }
                catch (err) { console.error(err); }
            },

            onClickDown: function (evt) {
                try {
                    var children = this.getChildren();
                    var containerBox = domGeom.getContentBox(this.domNode);

                    // Are there any frames off the bottom of the screen?
                    // Get the first frame which is at least partly off the screen
                    if (children.length === 0) { return; }
                    var target = null;
                    for (var i = 0; i < children.length; i++) {
                        var frameBox = children[i].getBoundingBox();
                        if (frameBox.t + frameBox.h > containerBox.h) {
                            target = children[i];
                            break;
                        }
                    }

                    if (target) {
                        this.ensureFrameIsVisible(target);
                    }
                }
                catch (err) { console.error(err); }
            },

            minimize: function () {
                var slideDistance = parseInt(dojo.style(this.domNode, "right"));
                var allFrames = query(".widgetFrame", this.domNode);

                allFrames.fadeOut().play();
                allFrames.animateProperty({
                    properties: {
                        left: slideDistance
                    }
                }).play();
            },

            maximize: function () {
                var allFrames = query(".widgetFrame", this.domNode);

                allFrames.fadeIn().play();
                allFrames.animateProperty({
                    properties: {
                        left: 0
                    }
                }).play();
            }

        });
    }
);