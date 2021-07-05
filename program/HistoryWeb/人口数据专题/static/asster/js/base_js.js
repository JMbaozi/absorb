function init() {
    var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
    ],
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 2
    }),
});
    var vectorLayer;
    loadVectData("geojson","static/jsonData/Export_output_3.json");
    var image = new ol.style.Circle({
        radius: 5,
        fill: null,
        stroke: new ol.style.Stroke({color:'red',width:1})
    });
        var styles = {
        'MultiPolygon':[new ol.style.Style({
            stroke: new ol.style.Stroke({color:'red',width:10}),
            fill: new ol.style.Fill({color: 'rgba(255,255,0,0.1)'})
        })],
    };
    var styleFunction = function (feature,resolution) {
        return styles[feature.getGeometry().getType()];
    };
    function loadVectData(type,dataUrl) {
        if(vectorLayer != null|| vectorLayer ==="undefined") {
            map.removeLayer(vectorLayer);
        }
        if(type === "geojson") {
            var vectorSource = new ol.source.Vector({
                url: dataUrl,
                format: new ol.format.GeoJSON(),
            });

        }else {
            alert("错误");
        }
        vectorLayer = new ol.layer.Vector({
            source: vectorSource,
            style: styleFunction,
        });
        map.addLayer(vectorLayer);
    }

}


