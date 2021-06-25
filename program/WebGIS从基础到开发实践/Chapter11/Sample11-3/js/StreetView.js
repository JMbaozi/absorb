var ptFeatures = [
    { "geometry": { x: 116.508894266450040, y: 39.781289534900125 }, "attributes": { url: 'posed000000.jpg', attitudez: 55.289144260282690 } },
    { "geometry": { x: 116.508920823701940, y: 39.781302035780023 }, "attributes": { url: 'posed000001.jpg', attitudez: 55.246842316635963 } },
    { "geometry": { x: 116.508949641533680, y: 39.781316209547128 }, "attributes": { url: 'posed000002.jpg', attitudez: 55.874884884498464 } },
    { "geometry": { x: 116.508981190043740, y: 39.781332084527953 }, "attributes": { url: 'posed000003.jpg', attitudez: 55.913043217177162 } },
    { "geometry": { x: 116.509015177998340, y: 39.781349308774409 }, "attributes": { url: 'posed000004.jpg', attitudez: 56.079101007834431 } },
    { "geometry": { x: 116.509051284301580, y: 39.781367598279552 }, "attributes": { url: 'posed000005.jpg', attitudez: 56.166601018622252 } },
    { "geometry": { x: 116.509089316013540, y: 39.781386712481641 }, "attributes": { url: 'posed000006.jpg', attitudez: 56.531510400582995 } },
    { "geometry": { x: 116.509128535098780, y: 39.781406157656114 }, "attributes": { url: 'posed000007.jpg', attitudez: 56.638851227636252 } },
    { "geometry": { x: 116.509168238755590, y: 39.781425642076314 }, "attributes": { url: 'posed000008.jpg', attitudez: 57.943444060464728 } },
    { "geometry": { x: 116.509207440508520, y: 39.781444951733938 }, "attributes": { url: 'posed000009.jpg', attitudez: 57.924252013995300 } }
];

require(["esri/map", "esri/layers/WMTSLayer", "esri/layers/WMTSLayerInfo",
    "esri/geometry/Extent", "esri/layers/TileInfo", "esri/SpatialReference", "esri/layers/GraphicsLayer",
    "esri/renderers/SimpleRenderer", "esri/symbols/PictureMarkerSymbol", "esri/graphic",
    "dojo/parser", "esri/Color", "dojo/dom-construct", "dojo/dom-style",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"
], function (Map, WMTSLayer, WMTSLayerInfo,
    Extent, TileInfo, SpatialReference, GraphicsLayer, SimpleRenderer, PictureMarkerSymbol, Graphic,
    parser, Color, domConstruct, domStyle
    ) {
    parser.parse();

    var map = new Map("mapDiv", {
        center: [116.508894266450040, 39.781289534900125],
        zoom: 19
    });

    var tileInfo = new TileInfo({
        "dpi": 90.71428571428571,
        "format": "image/png",
        "compressionQuality": 0,
        "spatialReference": new SpatialReference({
            "wkid": 4326
        }),
        "rows": 256,
        "cols": 256,
        "origin": {
            "x": -180,
            "y": 90
        },
        "lods": [
            { "level": 0, "resolution": 1.40625, "scale": 590995197.14166909755553014475 },
            { "level": 1, "resolution": 0.703125, "scale": 295497598.57083454877776507238 },
            { "level": 2, "resolution": 0.3515625, "scale": 147748799.28541727438888253619 },
            { "level": 3, "resolution": 0.17578125, "scale": 73874399.642708637194441268094 },
            { "level": 4, "resolution": 0.087890625, "scale": 36937199.821354318597220634047 },
            { "level": 5, "resolution": 0.0439453125, "scale": 18468599.910677159298610317023 },
            { "level": 6, "resolution": 0.02197265625, "scale": 9234299.955338579649305158512 },
            { "level": 7, "resolution": 0.010986328125, "scale": 4617149.9776692898246525792559 },
            { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9888346449123262896279 },
            { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.494417322456163144814 },
            { "level": 10, "resolution": 0.001373291015625, "scale": 577143.74720866122808157240698 },
            { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.87360433061404078620349 },
            { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93680216530702039310175 },
            { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.968401082653510196550873 },
            { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.484200541326755098275436 },
            { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.742100270663377549137718 },
            { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.871050135331688774568859 },
            { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9355250676658443872844296 },
            { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677625338329221936422148 },
            { "level": 19, "resolution": 0.000002682209014892578125, "scale": 1127.2338812669164610968211074 },
            { "level": 20, "resolution": 0.0000013411045074462890625, "scale": 563.61694063345823054841055369 }
        ]
    });
    var tileExtent = new Extent(-180.0, -90.0, 180.0, 90.0, new SpatialReference({
        wkid: 4326
    }));    
    var layerInfo = new WMTSLayerInfo({
        tileInfo: tileInfo,
        fullExtent: tileExtent,
        initialExtent: tileExtent,
        identifier: "BJMAP",
        tileMatrixSet: "CustomCRS4326ScaleBJMap",
        format: "png",
        style: "default"
    });
    var resourceInfo = {
        version: "1.0.0",
        layerInfos: [layerInfo]
    };
    var options = {
        serviceMode: "KVP",
        resourceInfo: resourceInfo,
        layerInfo: layerInfo
    };
    wmtsLayer = new WMTSLayer("http://www.bjmap.gov.cn/services/ogc/wmts/12", options);
    map.addLayer(wmtsLayer);

    var ptLayer = new GraphicsLayer({ id: "streetViewLayer" });
    for (var i = 0, m = ptFeatures.length; i < m; i++) {
        var graphics = new Graphic(ptFeatures[i]);
        ptLayer.add(graphics);
    }
    var symbol = new PictureMarkerSymbol({
        'angle': 0, 'xoffset': 0, 'yoffset': 1,
        'type': 'esriPMS', 'url': 'images/blue-dot-small.png',
        'contentType': 'image/png', 'width': 12, 'height': 12
    });
    ptLayer.renderer = new SimpleRenderer(symbol);

    dojo.connect(ptLayer, "onClick", showStreetScape);
    map.addLayer(ptLayer);

    initializeScene();

    // 由二维地图进入街景视图
    function showStreetScape(evt) {
        var mapUrl = evt.graphic.attributes["url"];
        draw(evt.graphic);

        var contentDiv = document.getElementById("mapDiv_container");
        contentDiv.style.animation = "3s linear 0s normal forwards 1 fadeOut";

        var skyImage = document.getElementById("skyImage");
        skyImage.style.animation = "3s linear 0s normal forwards 1 slideIn";

        setTimeout(function () {
            domStyle.set("threeDiv", "display", "block");
            domStyle.set("mapDiv", "display", "none");

            contentDiv.style.animation = "";
            skyImage.style.animation = "";
        }, 3000);
    }
});