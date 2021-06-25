define(["dojox/charting/Theme", "dojo/_base/Color"], function (Theme, Color) {
    var CustomTheme = new Theme({
        chart: {
            stroke: null,
            fill: "inherit"
        },
        plotarea: {
            stroke: null,
            fill: "transparent"
        },
        axis: {
            stroke: null,
            majorTick: {
                color: "black",
                width: 1,
                length: 0
            },
            minorTick: {
                color: "#666",
                width: 1,
                length: 0
            },
            font: "normal normal normal 0pt Tahoma",
            fontColor: "#999",
            fill: "transparent"
        },
        series: {
            outline: { width: 10, color: "black" },
            stroke: {width:1, color: "red"},
            fill: new Color([0x3b, 0x44, 0x4b, 0.85]),
            font: "normal normal normal 7pt Tahoma",
            fontColor: "#717171"
        },
        marker: {
            stroke: { width: 1, color: "black" },
            fill: "#333",
            font: "normal normal normal 7pt Tahoma",
            fontColor: "black"
        },
        colors: [
			Color.fromRgb("rgb(152,141,194)"),
			Color.fromRgb("rgb(126,182,204)"),
			Color.fromRgb("rgb(108,217,150)"),
			Color.fromRgb("rgb(164,230,90)"),
			Color.fromRgb("rgb(242,166,65)")
		]
    });
    return CustomTheme;
});