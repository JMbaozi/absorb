var app = {};
require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", 
    "esri/SpatialReference", "esri/InfoTemplate", "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol", "esri/graphic", "esri/InfoTemplate",
    "dojo/request/script", "dojo/parser",
    
    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"],
    function (Map, ArcGISTiledMapServiceLayer, SpatialReference, InfoTemplate,
        Point, PictureMarkerSymbol, Graphic,
        InfoTemplate, script, parser) {

        parser.parse();
        document.getElementById("info").innerHTML = "初始化 ...";

        var map = new Map("map");
        map.infoWindow.resize(320, 350);

        var street = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
        map.addLayer(street);

        var sr = new SpatialReference({
            wkid: 4326
        });
        var picSymbol = new PictureMarkerSymbol("images/camera-24x24.png", 24, 24);        
        var timeout = null;
        var dirty = false;
        var filtertag = "technology";
        app.getFlickrFeed = getFlickrFeed;
        app.jsonFlickrFeeds = jsonFlickrFeeds;
        app.slowmo = slowmo;
        app.refreshFeed = refreshFeed;
        app.search = search;
        refreshFeed();

        function refreshFeed() {
            if (timeout != null)
                clearTimeout(timeout);
            if (dirty) {
                document.getElementById("info").innerHTML = "重新设置 ...";
                if (map.infoWindow.isShowing)
                    map.infoWindow.hide();

                if (map.graphics)
                    map.graphics.clear();

                gs = null;
            }
            else {
                document.getElementById("info").innerHTML = "正在获取新的RSS提要 ...";
            }
            timeout = window.setTimeout("app.getFlickrFeed()", 3000);
        }

        function getFlickrFeed() {
            if (timeout != null)
                clearTimeout(timeout);
            document.getElementById("info").innerHTML = "正获取相片 ...";
            script.get("http://api.flickr.com/services/feeds/geo?lang=en-us&format=json&tags=" + filtertag);
        }

        function jsonFlickrFeeds(items) {
            if (!items || (items.length == 0)) {
                alert("没有找到相关条目");
                return;
            }                     

            done = -1;
            gs = [];
            dirty = false;
            var itemsLength = items.length;
            for (var i = 0; i < itemsLength; i++) {
                try {
                    var item = items[i];

                    var xVal = item.longitude;
                    var yVal = item.latitude;

                    if (isNaN(xVal) || isNaN(yVal)) {
                        if (console)
                            console.log("不能从提要中获取经纬度");
                        continue;
                    }

                    var point = new Point(xVal, yVal, sr);

                    var attrs = {
                        title: item.title,
                        desc: item.description + "<b>作者：</b>" + item.author + "<br/><b>发布：</b>" + item.published
                    };

                    var info = new InfoTemplate("${title}", "${desc}");
                    var graphic = new Graphic(point, picSymbol, attrs, info);
                    gs.push(graphic);
                }
                catch (ex) {
                    if (console)
                        console.error(ex);
                }
            }

            for (var i = gs.length - 1; i >= 0; i--) {
                map.graphics.add(gs[i]);
            }

            done = gs.length - 1;
            document.getElementById("info").innerHTML = "找到" + gs.length + "张相片";
            timeout = window.setTimeout("app.slowmo()", 3000);
        }

        function slowmo() {
            if (timeout != null)
                clearTimeout(timeout);
            if (done < 0) {
                document.getElementById("info").innerHTML = "完成！";
                filtertag = "";
                dirty = true;
                timeout = window.setTimeout("app.refreshFeed()", 3000);
                return;
            }
            else {
                if (gs != null && gs[done].getContent() != null && gs[done].getContent() != "") {
                    map.infoWindow.hide();
                    map.infoWindow.setContent(gs[done].getContent());
                    map.infoWindow.setTitle(gs[done].getTitle());

                    var testExtent = map.extent.expand(0.9);

                    if (!testExtent.contains(gs[done].geometry)) {
                        map.centerAt(gs[done].geometry);
                    }

                    var evt = map.toScreen(gs[done].geometry);
                    console.log("x:" + evt.x + ";y:" + evt.y);
                    map.infoWindow.show(evt);
                    document.getElementById("info").innerHTML = "还剩余" + done + "张相片";
                }
                done--;
                dirty = false;
                timeout = window.setTimeout("app.slowmo()", 10000);
            }
        }

        function search() {
            filtertag = document.getElementById("searchbox").value;
            document.getElementById("info").innerHTML = "搜索属于" + filtertag + "类的相片...";
            dirty = true;
            refreshFeed();
        }
});

function jsonFlickrFeed(results) {
    app.jsonFlickrFeeds(results.items);
}

function flickrError(type, data, evt) {
    document.getElementById("info").innerHTML = "错误！";
    if (console)
        console.error(data);
}