define(["dojo/_base/declare", "dojo/_base/array", "dojo/query", "dojo/dom-style", "dojo/_base/html", "dojo/dom-geometry", "dojo/on", "dojo/_base/lang", "dojo/fx", "dojo/_base/fx",
    "./MenuItem", "dijit/_Widget", "dijit/_Container", "dijit/_TemplatedMixin", "dojo/text!./templates/Menu.html"],
    function (declare, array, query, domStyle, html, domGeom, on, lang, coreFx, fx, MenuItem, _Widget, _Container, _TemplatedMixin, template) {
        return declare([_Widget, _TemplatedMixin, _Container], {
            templateString: template,

            constructor: function (/*Object*/params) {
            },

            positionAsPct: 0,
            icon: "",
            label: "",
            visible: "",

            dropDownNode: null,
            _expandedPadding: 0,
            _timeout: null,
            _menuIsVisible: false,
            _mouseIsOverIcon: false,
            _mouseIsOverDropDown: false,

            postMixInProperties: function () {
                //console.log("ControllerMenu postMixInProperties");
                if (this.icon === "") {
                    this.icon = "assets/images/icons/i_icp.png";
                }
                if (this.label === "") {
                    this.label = "无标签";
                }
            },

            postCreate: function () {
                this.setIcon(require.toUrl("webgis2book/widgets/" + this.icon));
                this.setLabel(this.label);
            },

            startup: function () {
                this.layout();

                // Pass to children
                var children = this.getChildren();
                array.forEach(children, function (child) { child.startup(); });
            },

            layout: function () {
                // 以百分比的方式设置菜单图标的位置
                var iconNode = query(".menuIcon", this.domNode)[0];
                domStyle.set(iconNode, "left", this.positionAsPct + "%");

                // 得到菜单图标的位置与宽度
                var iconCoords = html.coords(iconNode);
                var iconLeft = iconCoords.l;
                var iconWidth = iconCoords.w;
                var iconLMargin = domStyle.get(iconNode, "marginLeft");

                // 计算菜单的中心线的位置
                var menuCenter = iconLeft + ((iconWidth + iconLMargin) / 2);

                // 设置下拉菜单项的位置
                this.dropDownNode = query(".menuDropDown", this.domNode)[0];
                var ddWidth = domStyle.get(this.dropDownNode, "width");
                domStyle.set(this.dropDownNode, "left", (menuCenter - (ddWidth / 2)) + "px");

                // 设置整个菜单的宽度
                var contentBox = domGeom.getContentBox(this.dropDownNode);
                var boxNode = query(".menuBox", this.domNode)[0];
                var lPad = domStyle.get(boxNode, "paddingLeft");
                var rPad = domStyle.get(boxNode, "paddingRight");
                var boxWidth = contentBox.w - (lPad + rPad + 2);
                dojo.style(boxNode, "width", boxWidth + "px");

                // Make note of any extra padding at the top
                this._expandedPadding = domStyle.get(this.dropDownNode, "paddingTop");

                // Remove the border-bottom from the last menu item
                var itemList = query(".menuItem", this.domNode);
                domStyle.set(itemList[itemList.length - 1], "borderBottom", 0);

                // 显示菜单
                domStyle.set(this.dropDownNode, "height", 0 + "px");
                domStyle.set(this.dropDownNode, "visibility", "visible");
                domStyle.set(this.dropDownNode, "paddingTop", "0px");
            },

            addMenuItem: function (/*Object*/params) {
                var menuItem = new MenuItem(params);
                on(menuItem, "onMenuItemClick", this, "onMenuItemClick");

                this.addChild(menuItem);
            },

            setIcon: function (/*URL*/iconUrl) {
                var element = query(".menuIcon", this.domNode)[0];
                domStyle.set(element, "backgroundImage", "url(" + iconUrl + ")");
            },

            setLabel: function (/*String*/label) {
                var element = query(".menuLabel", this.domNode)[0];
                element.innerHTML = label;
            },

            onMenuItemClick: function (info) {
                // stub for event propagation
                this.hideMenu();
            },

            onMouseOverIcon: function (evt) {
                this._mouseIsOverIcon = true;
                this.delayedCheckMenuState(200);
            },

            onMouseOutIcon: function (evt) {
                this._mouseIsOverIcon = false;
                this.delayedCheckMenuState(50);
            },

            onMouseOverDD: function (evt) {
                this._mouseIsOverDropDown = true;
                this.delayedCheckMenuState(200);
            },

            onMouseOutDD: function (evt) {
                this._mouseIsOverDropDown = false;
                this.delayedCheckMenuState(50);
            },

            delayedCheckMenuState: function (/*Number*/delay) {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                }
                this.timeout = setTimeout(lang.hitch(this, function () {
                    this.checkMenuState();
                }), delay);
            },

            checkMenuState: function () {
                if (this._menuIsVisible === false) {
                    if (this._mouseIsOverIcon === true || this._mouseIsOverDropDown === true) {
                        this.showMenu();
                    }
                }
                else {
                    if (this._mouseIsOverIcon === false && this._mouseIsOverDropDown === false) {
                        this.hideMenu();
                    }
                }
            },

            showMenu: function () {
                domStyle.set(this.dropDownNode, "paddingTop", this._expandedPadding + "px");
                coreFx.wipeIn({
                    node: this.dropDownNode,
                    duration: 250
                }).play();
                this._menuIsVisible = true;
            },

            hideMenu: function () {
                fx.animateProperty({
                    node: this.dropDownNode,
                    duration: 150,
                    properties: {
                        height: 0
                    },
                    onEnd: lang.hitch(this, function () {
                        domStyle.set(this.dropDownNode, "paddingTop", "0px");
                    })
                }).play();
                this._menuIsVisible = false;
            }


        });
    }
);