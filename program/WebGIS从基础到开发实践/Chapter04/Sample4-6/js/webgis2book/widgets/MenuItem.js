define(["dojo/_base/declare", "dojo/dom", "dojo/dom-style",
    "dijit/_Widget", "dijit/_Container", "dijit/_TemplatedMixin", "dojo/text!./templates/MenuItem.html"],
    function (declare, dom, domStyle, _Widget, _Container, _TemplatedMixin, template) {
        return declare([_Widget, _TemplatedMixin, _Container], {

            templateString: template,
            label: "",
            icon: "",
            value: "",
            menuCode: "",
            title: "", // 动态提示信息
            url: "",

            constructor: function (/*Object*/ params) {
            },

            postMixInProperties: function () {
                if (this.icon === "") {
                    this.icon = "assets/images/icons/i_icp.png";
                }
                if (this.label === "") {
                    this.label = "No Label";
                }
                if (!this.value) {
                    this.value = this.label;
                }
                if (!this.title) {
                    if (this.url) {
                        this.title = this.url;
                    }
                    else {
                        this.title = this.label;
                    }
                }
            },

            postCreate: function () {
                var iconUrl = require.toUrl("webgis2book/widgets/" + this.icon);
                this.setIcon(iconUrl);
                dom.setSelectable(this.domNode, false);
            },

            onClick: function (evt) {
                this.onMenuItemClick({
                    value: this.value,
                    label: this.label,
                    menuCode: this.menuCode
                });
            },

            onMenuItemClick: function (data) {
                // 回调函数
            },

            setIcon: function (/*URL*/ iconUrl) {
                // full-size icons are in assets/images/icons/
                // small icons are in assets/images/small_icons/
                //return fullSizeIconUrl.replace(/assets\/images\/icons\//, "assets/images/small_icons/");
                var smallIconUrl = iconUrl.replace(/assets\/images\/icons\//, "assets/images/small_icons/");
                domStyle.set(this.domNode, "backgroundImage", "url(" + smallIconUrl + ")");
            }

        })
    }
);