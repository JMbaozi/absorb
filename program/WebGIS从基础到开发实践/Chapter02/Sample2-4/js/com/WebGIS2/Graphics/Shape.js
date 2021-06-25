define(["dojo/_base/declare"], function(declare) {	
	return declare( // 类名省略
		null, // 无父类，使用null
		{
			color: 0,
			setColor: function(color) {
				this.color = color;
			}
		}
	);
});