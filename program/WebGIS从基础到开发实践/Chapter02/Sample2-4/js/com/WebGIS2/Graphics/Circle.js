define(["dojo/_base/declare", "./Shape"], function(declare, Shape) {	
	return declare( // 类名省略
		Shape, // 父类
		{
			radius: 0,

        		constructor: function(radius) {
            		this.radius = radius || this.radius;
        		},

        		setRadius: function(radius) {
            		this.radius = radius;
        		},

        		area: function() {
            		return Math.PI * this.radius * this.radius;
        		}
		}
	);
});