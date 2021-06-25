require(["esri/map", "esri/InfoTemplate", "esri/layers/FeatureLayer",
    "esri/dijit/HistogramTimeSlider", "dojo/parser", "dojo/dom-construct",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane",
    "dojo/domReady!"],
    function (Map, InfoTemplate, FeatureLayer, HistogramTimeSlider,
        parser, domConstruct) {
        parser.parse();

        var map = new Map("mapDiv", {
            basemap: "oceans",
            center: [-100, 40],
            zoom: 4
        });

        var featuresUrl = "http://services.arcgis.com/nzS0F0zdNLvs7nc8/arcgis/rest/services/cicadas/FeatureServer/0";
        var layer = new FeatureLayer(featuresUrl, {
            id: "cicadas",
            infoTemplate: new InfoTemplate(
              "蝉",
              "<strong>${date}</strong><br><hr><em>${tweet}<em>"
            ),
            mode: FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"]
        });

        var layerUpdateEnd = layer.on("update-end", initDijit);
        map.addLayer(layer);

        function initDijit() {
            layerUpdateEnd.remove();

            var sliderElem = domConstruct.create("div", {
                id: "timeSlider_" + map.id,
                style: "margin-bottom:10px; bottom:33px"
            }, "bottomDiv");
            var sliderParams = {
                dateFormat: "DateFormat(selector: 'date', fullYear: true)",
                layers: [layer],
                mode: "show_all",
                timeInterval: "esriTimeUnitsHours"
            };
            var slider = new HistogramTimeSlider(sliderParams, sliderElem);
            map.setTimeSlider(slider);
        }
});