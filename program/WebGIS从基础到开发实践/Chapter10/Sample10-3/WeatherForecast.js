var currentSlide = 0;

require(["esri/map", "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer", "esri/InfoTemplate", "esri/geometry/Point",
    "esri/symbols/PictureMarkerSymbol", "esri/graphic", 
    "dojo/parser",

    "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/domReady!"],
    function (Map, ArcGISTiledMapServiceLayer, FeatureLayer, SimpleRenderer, InfoTemplate,
        Point, PictureMarkerSymbol, Graphic, 
        parser) {

        parser.parse();
        
        var map = new Map('map', { center: [-28, 40], zoom: 2 });
        var street = new ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/ESRI_StreetMap_World_2D/MapServer");
        map.addLayer(street);

        var infoTemplate = new InfoTemplate();
        infoTemplate.setTitle('天气预报');
        infoTemplate.setContent(getWindowContent);
        var s = 'http://services.arcgis.com/oKgs2tbjK6zwTdvi/arcgis/rest/services/' +
            'Major_World_Cities/FeatureServer/0';
        var featureLayer = new FeatureLayer(s, {
            mode: FeatureLayer.MODE_SNAPSHOT,
            outFields: ["*"],
            opacity: .90,
            infoTemplate: infoTemplate
        });
        var symbol = new PictureMarkerSymbol({
            'angle': 0, 'xoffset': 0, 'yoffset': 1,
            'type': 'esriPMS', 'url': 'images/blue-dot-small.png',
            'contentType': 'image/png', 'width': 12, 'height': 12
        });
        featureLayer.renderer = new SimpleRenderer(symbol);
        map.addLayer(featureLayer);
        
        var weatherIconMap = [
            'storm', 'storm', 'storm', 'lightning', 'lightning', 'snow', 'hail', 'hail',
            'drizzle', 'drizzle', 'rain', 'rain', 'rain', 'snow', 'snow', 'snow', 'snow',
            'hail', 'hail', 'fog', 'fog', 'fog', 'fog', 'wind', 'wind', 'snowflake',
            'cloud', 'cloud_moon', 'cloud_sun', 'cloud_moon', 'cloud_sun', 'moon', 'sun',
            'moon', 'sun', 'hail', 'sun', 'lightning', 'lightning', 'lightning', 'rain',
            'snowflake', 'snowflake', 'snowflake', 'cloud', 'rain', 'snow', 'lightning'
        ];

        function getWindowContent(graphic) {
            var deferred = new dojo.Deferred();
            var results;
            var q = "select * from geo.places where text='" + graphic.attributes.NAME +
                " " + graphic.attributes.COUNTRY + "'";
            var yql = 'http://query.yahooapis.com/v1/public/yql?q=' +
                encodeURIComponent(q) + '&format=json';
            var woeid, content;
            $.ajax({
                async: false, url: yql, dataType: 'json',
                success: function (r) {
                    if (r.query.count == 1) {
                        woeid = r.query.results.place.woeid;
                    }
                    else if (r.query.count > 1) {
                        woeid = r.query.results.place[0].woeid;
                    }
                    q = "select * from weather.forecast where woeid=" + woeid + " and u='c'";
                    yql = 'http://query.yahooapis.com/v1/public/yql?q=' +
                        encodeURIComponent(q) + '&format=json'; 
                    $.ajax({
                        async: false, url: yql, dataType: 'json',
                        success: function (r) {
                            if (r.query.results.channel.item.title == 'City not found') {
                                content = '<p>Information unavailable</p>';
                            }
                            else {
                                var item = r.query.results.channel.item.condition;
                                content = '<p>' + r.query.results.channel.title + '</p><div id="weather" class="loaded" ><ul id="scroller">' +
                                '<li><img src="images/icons/' + weatherIconMap[item.code] + '.png"/>' +
                                '<p class="day">当前</p>' +
                                '<p class="cond">' + item.text +
                                '<b>' + item.temp + '°C</b></p></li>';
                                var length = r.query.results.channel.item.forecast.length;
                                for (var i = 0; i < length; i++) {
                                    item = r.query.results.channel.item.forecast[i];
                                    content +=
                                    '<li><img src="images/icons/' + weatherIconMap[item.code] + '.png"/>' +
                                    '<p class="day">' + item.day + '</p>' +
                                    '<p class="cond">' + item.text +
                                    '<b>' + item.low + '°C / ' + item.high + '°C</b></p></li>';
                                }
                                content += '</ul>' +
                                '<button onclick="showPrevSlide()" class="arrow previous"></button>' +
                                '<button onclick="showNextSlide()" class="arrow next"></button>' +
                                '</div>';
                                deferred.callback(content);
                            }
                        }
                    });
                }
            });
            currentSlide = 0;
            return deferred.results[0];
        }
});

function showPrevSlide() {
    showSlide(currentSlide - 1);
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showSlide(i) {
    var weatherDiv = $('#weather');
    var scroller = $('#scroller');
    var items = scroller.find('li');
    if (i >= items.length || i < 0 || scroller.is(':animated')) {
        return false;
    }
    weatherDiv.removeClass('first last');
    if (i == 0) {
        weatherDiv.addClass('first');
    }
    else if (i == items.length - 1) {
        weatherDiv.addClass('last');
    }
    scroller.animate({
            left: (-i * 100) + '%'
        },
        function () {
            currentSlide = i;
        });
}