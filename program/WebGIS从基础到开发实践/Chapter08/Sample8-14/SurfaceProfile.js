require(["dojo/parser", "dijit/registry", "dojo/_base/array", "dojo/string", "esri/map", "esri/geometry/Extent", "esri/SpatialReference", "esri/layers/ArcGISTiledMapServiceLayer", "esri/toolbars/draw",
    "esri/graphic", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/Color",
    "esri/tasks/Geoprocessor", "esri/tasks/FeatureSet", "esri/InfoTemplate", "CustomModules/geomUtils",
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/form/Button", "dojo/domReady!"],
    function (parser, registry, array, string, Map, Extent, SpatialReference, ArcGISTiledMapServiceLayer, Draw,
        Graphic, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color,
        Geoprocessor, FeatureSet, InfoTemplate, geomUtils) {
        parser.parse();

        var wgs84 = new SpatialReference({ wkid: 4326 });
        var extent = new Extent(-117.38917350769043, 32.499704360961914, -116.51026725769043, 33.02292823791504, wgs84)
        var map = new esri.Map("map", {
            extent: extent
        });
        map.infoWindow.resize(620, 300);

        var streetMap = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
        map.addLayer(streetMap);

        // 创建符号
        var inputSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([255, 0, 0]), 2);
        var profileSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 0, 255]), 3);

        // 地理处理服务
        gpTask_SurfaceProfile = new Geoprocessor("http://sampleserver2.arcgisonline.com/ArcGIS/rest/services/Elevation/ESRI_Elevation_World/GPServer/ProfileService");

        var drawToolbar = new Draw(map);
        drawToolbar.on("draw-end", onDrawEnd);

        registry.byId("ProfileTool").on("click", function () {
            activateGPTask('LINE');
        });
        registry.byId("ExecuteProfileTool").on("click", function () {
            activateGPTask('POLYLINE');
        });
        registry.byId("ClearProfilesTool").on("click", function () {
            map.infoWindow.hide();
            map.graphics.clear();
        });

        // ACTIVATE THE DRAW TOOLBAR
        function activateGPTask(geomType) {
            map.infoWindow.hide();

            switch (geomType) {
                case 'LINE':
                    drawToolbar.activate(Draw.LINE);
                    break;
                case 'POLYLINE':
                    drawToolbar.activate(Draw.POLYLINE);
                    break;
            }
        }

        // CALLED WHEN USER FINISHES DRAWING ON THE SCREEN
        function onDrawEnd(evt) {
            // CREATE GRAPHIC FEATURE
            var userGraphic = new Graphic(evt.geometry, inputSymbol);
            // ADD GRAPHIC FEATURE TO MAP
            map.graphics.add(userGraphic);

            // CREATE PROFILE
            //executeGPTask();
            var features = [];
            features.push(userGraphic);
            var featureSet = new FeatureSet();
            featureSet.features = features;
            // TASK PARAMETERS            
            var taskParams = {
                'Input_Polylines': featureSet,
                'Image_Width': 600,
                'Image_Height': 250,
                'Display_Segments': 'true'
            };

            // EXECUTE GP TASK
            gpTask_SurfaceProfile.setOutputSpatialReference(wgs84);
            gpTask_SurfaceProfile.execute(taskParams, getGPResultsAsFeatures);

            // DEACTIVATE
            drawToolbar.deactivate();
        }

        // GET GP RESULTS 
        function getGPResultsAsFeatures(results, messages) {

            // PROFILE RESULTS                
            var profileFeatures = results[0].value.features;
            for (var fIdx = 0; fIdx < profileFeatures.length; fIdx++) {
                var resultFeature = profileFeatures[fIdx];

                var imgHTML = string.substitute('<img id="profileImage_${FID}" src="${profileURL}"></img>', resultFeature.attributes);

                resultFeature.setSymbol(profileSymbol);
                resultFeature.setInfoTemplate(new InfoTemplate("剖面线长：${length2D} 米", imgHTML));
                map.graphics.add(resultFeature);
            }

            // SHOW INFO WINDOW FOR FIRST RESULT FEATURE
            if (profileFeatures.length > 0) {
                var firstFeature = profileFeatures[0];

                map.infoWindow.setTitle(firstFeature.getTitle());
                map.infoWindow.setContent(firstFeature.getContent());

                var midPnt = geomUtils.getMidPoint(firstFeature.geometry);
                var scrPnt = map.toScreen(midPnt);
                map.infoWindow.show(scrPnt, map.getInfoWindowAnchor(scrPnt));
            }
        }
});