define(["dojo/_base/declare", "dojo/_base/array", "dojo/query", "dojo/dom-attr", "dojo/dom-style", "dojo/on", "dojo/_base/lang",
    "./_Widget", "dojo/text!./templates/_BaseWidget.html"],
    function (declare, array, query, domAttr, domStyle, on, lang, _Widget, template) {
	return declare(_Widget, {
		constructor: function(/*Object*/ params) {
			this.connects = [];
			this.widgets = {};
		},

		templateString: template,
		panels: null,
		panelIndex: -1,

		postMixInProperties: function() {		    
		    if (this.icon === "") {
		        this.icon = "assets/images/icons/i_pushpin.png";
		    }
		},

		postCreate: function() {
		    // ������ڶ����壬��ֻ��ʾ��һ��
		    this.panels = query(".widgetPanel", this.domNode);
		    this.panels.forEach(function(item, idx, arr) {
		        item.buttonIcon = domAttr.get(item, "buttonIcon");
		        item.buttonText = domAttr.get(item, "buttonText");
		    });
		    this.showPanel(0);
		},

		onShowPanel: function(index) {
		    // ��С���������WidgetFrame����ʹ��
		},

		showPanel: function(/*Number*/index) {
		    this.panelIndex = index;
		    array.forEach(this.panels, function (item, idx, arr) {
		        if (idx == index) {
		            domStyle.set(item, "display", "block");
		        }
		        else {
		            domStyle.set(item, "display", "none");
		        }
		    });
		},

		startup: function() {
		    if (this._started) {
		        return;
		    }

		    var children = this.getChildren();
		    array.forEach(children, function (child) {
		        child.startup();
		    });

		    // ��С���������WidgetFrame����
		    var frame = this.getParent();
		    if (frame && frame.declaredClass === "webgis2book.widgets.WidgetFrame") {
		        this.connects.push(on(this, "onShowPanel", frame, "selectPanel"));
		    }

		    this.inherited(arguments);
		    console.log("_BaseWidget startup.");
		},

		shutdown: function() {
		    // �����า�Ǹ÷�����ʵ�ֹر�ʱ���ռ����Դ
		},

		uninitialize: function() {
		    array.forEach(this.connects, function (handle) {
		        handle.remove(); // dojo.disconnect(handle);
		    });
		    this.connects = [];
		},

		getAllNamedChildDijits: function() {
		    // ������е���С����
		    var w = query("[widgetId]", this.containerNode || this.domNode);
		    var children = w.map(dijit.byNode);

		    this.widgets = {};
		    children.forEach(lang.hitch(this, function (item, idx) {
		        if (item.name) {
		            this.widgets[item.name] = item;
		        }
		    }));
		}
    		
	});
});
