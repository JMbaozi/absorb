define(["dojo/_base/declare", "dijit/_Widget", "dijit/_TemplatedMixin", "dijit/_Container"],
    function (declare, _Widget, _TemplatedMixin, _Container) {
        return declare([_Widget, _TemplatedMixin, _Container], {
		constructor: function(/*Object*/params) {
		},
		
		mapId: "",
		map: null,
		title: "",
		icon: "",
		state: "maximized",
		
		setId: function(/*Number*/id) {
			this.id = id;
		},
		setTitle: function(/*String*/title) {
			this.title = title;
		},
		setIcon: function(/*String*/icon) {
			this.icon = icon;
		},
		setState: function(/*String*/state) {
			this.state = state;
		},
		setMap: function(/*esri.Map*/map) {
			this.map = map;
		}
    		
	});
});
