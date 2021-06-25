define(["dojo/_base/declare", "dojo/_base/array", "dojo/query", "dojo/topic", "dojo/dom-style", "dojo/string", "dojo/_base/lang",
    "dijit/_Widget", "dijit/_Container", "dijit/_TemplatedMixin", "dojo/text!./templates/MenuFrame.html"],
    function (declare, array, query, topic, domStyle, string, lang, _Widget, _Container, _TemplatedMixin, template) {
        return declare([_Widget, _TemplatedMixin, _Container], {
            templateString: template,
            menuItemData: null,

            postCreate: function () {
                console.log("MenuFrame postCreate");

                topic.subscribe("mapToolChangedEvent", lang.hitch(this, "onMapToolChange"));
                topic.subscribe("statusChangedEvent", lang.hitch(this, "onStatusChange"));
            },

            startup: function () {
                if (this._started) { return; }

                // 循环启动子小部件
                var children = this.getChildren();
                array.forEach(children, function (child) { child.startup(); });
            },

            onMapToolChange: function (/*String*/toolName) {
                this.setToolText(toolName);
            },

            onStatusChange: function (/* String */status) {
                this.setStatus(status);
            },

            setTitle: function (/*String*/title) {
                var element = query(".controllerTitle", this.domNode)[0];
                element.innerHTML = title;
            },

            setSubtitle: function (/*String*/subtitle) {
                var element = query(".controllerSubtitle", this.domNode)[0];
                element.innerHTML = subtitle;
            },

            setStatus: function (/*String*/status) {
                var element = query(".controllerStatus", this.domNode)[0];
                element.innerHTML = status;
            },

            setToolText: function (/*String*/toolText) {
                var msg = "";
                if (toolText) {
                    msg = string.substitute("当前操作： ${0}", [toolText]);
                }
                this.setStatus(msg);
            },

            setFrameIcon: function (/*URL*/logoUrl) {
                var element = query(".controllerIcon", this.domNode)[0];
                domStyle.set(element, "backgroundImage", "url(" + logoUrl + ")");
            }

        })
    }
);