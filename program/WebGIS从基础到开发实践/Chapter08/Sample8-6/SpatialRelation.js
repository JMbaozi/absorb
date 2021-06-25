require(['dojo/on', "esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/GraphicsLayer", "esri/graphic", "esri/toolbars/draw",
    "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color", "esri/tasks/GeometryService", "esri/tasks/RelationParameters", "dojo/domReady!"],
    function (Map, ArcGISTiledMapServiceLayer, GraphicsLayer, Graphic, Draw, SimpleLineSymbol, SimpleFillSymbol, Color, GeometryService, RelationParameters) {
        var map = new esri.Map("map");
        var streetMap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
        map.addLayer(streetMap);

        var graphicLayer = new GraphicsLayer();
        map.addLayer(graphicLayer);

        var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.5]));
        var resultSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 2), new dojo.Color([0, 255, 0, 0.5]));

        // 实例化几何服务
        var gsvc = new GeometryService("http://sampleserver1.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");
        var relationParams = new RelationParameters();

        on(document.getElementById("polygonBtn"), "click", function () {
            tb.activate(Draw.POLYGON);
        });

        on(document.getElementById("removeBtn"), "click", function () {
            graphicLayer.clear();
        });

        var tb = new Draw(map);
        tb.on("draw-end", addGraphic);

        function addGraphic(evt) {
            if (graphicLayer.graphics.length >= 2) {
                alert("请先使用删除多边形按钮删除原来的多边形，才能继续！");
                return;
            }

            var handgraphic = new Graphic(evt.geometry, symbol);
            graphicLayer.add(handgraphic);

            if (graphicLayer.graphics.length === 2) {
                var relationship = document.getElementById("relation").value;
                if (relationship === "SPATIAL_REL_WITHIN") {
                    relationParams.relation = RelationParameters.SPATIAL_REL_WITHIN;
                } else if (relationship === "SPATIAL_REL_INTERSECTION") {
                    relationParams.relation = RelationParameters.SPATIAL_REL_INTERSECTION;
                } else {
                    relationParams.relation = RelationParameters.SPATIAL_REL_DISJOINT;
                }
                relationParams.geometries1 = [graphicLayer.graphics[0].geometry];
                relationParams.geometries2 = [graphicLayer.graphics[1].geometry];
                gsvc.relation(relationParams, addRelateResultsToMap);
            }
        }

        function addRelateResultsToMap(relations) {
            for (var i = 0; i < relations.length; i++) {
                graphicLayer.graphics[relations[i].geometry1Index].setSymbol(resultSymbol);
            }
        }
 });