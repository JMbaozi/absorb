require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer",
      "esri/InfoTemplate",
      "esri/geometry/Point",
      "esri/graphic",
      "utils.js",
      "dojo/on",
      "dojo/dom",
      "dojo/domReady!"],
      function (Map, ArcGISTiledMapServiceLayer, InfoTemplate, Point, Graphic, utils, on, dom) {

          var map = new Map("mapDiv", {
              center: [-100, 53],
              zoom: 3
          });
          var street = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
          map.addLayer(street);

          utils.setPopup(map, "top", -1, 26);
          utils.autoRecenter(map);

          var symbol = utils.createPictureSymbol("images/blue-pin.png", 0, 12, 13, 24);

          on(dom.byId("btnGeolocation"), "click", showGeolocation);
          on(dom.byId("btnClear"), "click", clearGeolocationGraphics);

          function showGeolocation() {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(showLocation, errorHandler);
                  utils.setStyle("progress", "progress");
              } else {
                  alert("对不起，您的浏览器不支持Geolocation。");
              }
          }

          function showLocation(position) {
              var pt = new Point(position.coords.longitude, position.coords.latitude);
              var attributes = { "lat": pt.y.toFixed(2), "lon": pt.x.toFixed(2) };
              var infoTemplate = new InfoTemplate("我的位置", "纬度: ${lat} <br/>经度: ${lon}");
              var graphic = new Graphic(pt, symbol, attributes, infoTemplate);
              map.graphics.add(graphic);
              map.centerAndZoom(pt, 13);
              utils.setStyle("progress", "progress hidden");
          }

          function errorHandler(err) {
              utils.setStyle("progress", "progress hidden");
              if (err.code == 1) {
                  alert("错误：禁止方位！");
              } else if (err.code == 2) {
                  alert("错误：不能获得位置！");
              } else {
                  alert("错误：" + err);
              }
          }

          function clearGeolocationGraphics() {
              map.infoWindow.hide();
              map.graphics.clear();
          }
});