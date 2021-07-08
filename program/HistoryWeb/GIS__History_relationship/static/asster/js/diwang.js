var style = new ol.style.Style({
    fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
        color: 'rgba(255, 110, 100,0.6)'
    }),
    stroke: new ol.style.Stroke({ //边界样式
        color: '#cec1d3',
        width: 1
    }),
    text: new ol.style.Text({ //文本样式
        font: '12px Calibri,sans-serif',
        fill: new ol.style.Fill({
            color: '#000'
        }),
        stroke: new ol.style.Stroke({
            color: '#1e3bff',
            width: 3
        })
    })
});
var vector = new ol.layer.Vector({});
//实例化Map对象加载地图
var map = new ol.Map({
    //地图容器div的ID
    target: 'mapCon',
    //地图容器中加载的图层
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        vector
    ],
    //地图视图设置
    view: new ol.View({
        //地图初始中心点
        center: ol.proj.fromLonLat([117, 36]),
        //地图初始显示级别
        zoom: 7
    })
});



var coor = {};  //数据库读取坐标
var times = -1; //逐个预览次数记录
var br;




function next() {
    times = times + 1;
    var coorchange = $.parseJSON(coor); //转化
    if (times < coorchange.length) {
        var obj = eval(coorchange); //转化后坐标数组对象
        var p = ol.proj.transform([obj[times].lon, obj[times].lat], 'EPSG:4326', 'EPSG:3857');
        $('#info').text(obj[times].info_place);
        map.getView().animate({center: p, zoom: 9});
        var createLabelStyle = function (feature) {
            return new ol.style.Style({
                /**{olx.style.IconOptions}类型*/
                image: new ol.style.Icon(
                    ({
                        anchor: [0.5, 0],
                        anchorOrigin: 'bottom-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'bottom-right',
                        //图标缩放比例
                        scale: 0.2,
                        //透明度
                        opacity: 1,
                        //图标的url
                        src: '../static/asster/img/where.png'
                    })
                ),
                text: new ol.style.Text({
                    //位置
                    textAlign: 'center',
                    //基准线
                    textBaseline: 'middle',
                    //文字样式
                    font: 'normal 30px  微软雅黑',
                    //文本内容
                    text: feature.get('name'),
                    //文本填充样式（即文字颜色）
                    fill: new ol.style.Fill({color: '#050505'}),
                    stroke: new ol.style.Stroke({color: '#f8d1d1', width: 2})
                })
            });
        };
        //实例化Vector要素，通过矢量图层添加到地图容器中
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(p),
            name: obj[times].name,
            info: obj[times].info_place,
            imgURL: "../../images/label/bj.png",
            geo: p
        });
        iconFeature.setStyle(createLabelStyle(iconFeature));
        //矢量标注的数据源
        var vectorSource = new ol.source.Vector({
            features: [iconFeature]
        });
        //矢量标注图层
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        map.addLayer(vectorLayer);

        if (times > 0) {

            var plast = ol.proj.transform([obj[times - 1].lon, obj[times - 1].lat], 'EPSG:4326', 'EPSG:3857');
            var pnow = ol.proj.transform([obj[times].lon, obj[times].lat], 'EPSG:4326', 'EPSG:3857');
            console.log(plast[1])
            var Line = new ol.Feature({
                geometry: new ol.geom.LineString([plast, pnow])
            });

            //设置线的样式
            Line.setStyle(new ol.style.Style({
                //填充色
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                //边线颜色
                stroke: new ol.style.Stroke({
                    color: '#0c18d3',
                    lineDash: [1, 9],
                    width: 5
                }),
                //形状
                image: new ol.style.Circle({
                    radius: 7,

                    fill: new ol.style.Fill({
                        color: '#2eb1ff'
                    })
                })
            }));

            //实例化一个矢量图层Vector作为绘制层
            var source = new ol.source.Vector({
                features: [Line]
            });
            //创建一个图层
            var vector = new ol.layer.Vector({
                source: source
            });
            //将绘制层添加到地图容器中
            map.addLayer(vector);
        }

    } else {
        alert("无之后路径");
    }
}

function pop() {
    /**
     * 实现popup的html元素
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');

    /**
     * 在地图容器中创建一个Overlay
     */
    var popup = new ol.Overlay(
        /** @type {olx.OverlayOptions} */
        ({
            //要转换成overlay的HTML元素
            element: container,
            //当前窗口可见
            autoPan: true,
            //Popup放置的位置
            positioning: 'bottom-center',
            //是否应该停止事件传播到地图窗口
            stopEvent: true,
            autoPanAnimation: {
                //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
                duration: 250
            }
        }));
    map.addOverlay(popup);

    /**
     * 添加关闭按钮的单击事件（隐藏popup）
     * @return {boolean} Don't follow the href.
     */
    closer.onclick = function () {
        //未定义popup位置
        popup.setPosition(undefined);
        //失去焦点
        closer.blur();
        return false;
    };

    /**
     * 动态创建popup的具体内容
     * @param {string} title
     */

    /**
     * 动态设置元素文本内容（兼容）
     */
    function setInnerText(element, text) {
        if (typeof element.textContent == "string") {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    }

    /**
     * 为map添加点击事件监听，渲染弹出popup
     *
     *
     */

    function addFeatrueInfo(info) {
        //新增a元素
        var elementA = document.createElement('a');
        elementA.className = "markerInfo";
        elementA.href = info.get("imgURL");
        //elementA.innerText = info.att.title;
        setInnerText(elementA, info.get("name"));
        // 新建的div元素添加a子节点
        content.appendChild(elementA);
          //新增img元素
        var elementImg = document.createElement('img');
        elementImg.className = "markerImg";
        elementImg.src = info.get("imgURL");
        // 为content添加img子节点
        content.appendChild(elementImg);
        //新增div元素
        var elementDiv = document.createElement('div');
        elementDiv.className = "markerText";
        setInnerText(elementDiv, info.get("info"));
        // 为content添加div子节点
        content.appendChild(elementDiv);

    }

    map.on('click', function (evt) {
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        });
        if (feature) {
            content.innerHTML = '';
            //在popup中加载当前要素的具体信息
            addFeatrueInfo(feature);
            if (popup.getPosition() == undefined) {
                //设置popup的位置
                popup.setPosition(feature.get("geo"));
            }
        }
    });

}

$('#lastpoint').click(function () {
    if (times >= 0) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2 * times + 2));
        if (times > 0) {
            map.removeLayer(layer.item(2 * times + 1));
        }
        times = times - 1;
        var coorchange = $.parseJSON(coor); //转化
        var obj = eval(coorchange); //转化后坐标数组对象
        var p = ol.proj.transform([obj[times].lon, obj[times].lat], 'EPSG:4326', 'EPSG:3857');
        $('#info').text(obj[times].info_place);
        map.getView().animate({center: p, zoom: 9});
    } else {
        alert("无之前路径");
    }
});
$('#nextpoint').click(function () {
    next();
});
pop();
/**
 * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
 */
map.on('pointermove', function (e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
$('#allpoint').click(function () {     //显示全局
    var p = ol.proj.transform([117, 36], 'EPSG:4326', 'EPSG:3857');
    map.getView().animate({center: p, zoom: 7});
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    var coorchange = $.parseJSON(coor); //转化
    for (times = 0; times < coorchange.length; times++) {
        var obj = eval(coorchange); //转化后坐标数组对象
        var p = ol.proj.transform([obj[times].lon, obj[times].lat], 'EPSG:4326', 'EPSG:3857');
        var createLabelStyle = function (feature) {
            return new ol.style.Style({
                /**{olx.style.IconOptions}类型*/
                image: new ol.style.Icon(
                    ({
                        anchor: [0.5, 0],
                        anchorOrigin: 'bottom-right',
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        offsetOrigin: 'bottom-right',
                        //图标缩放比例
                        scale: 0.2,
                        //透明度
                        opacity: 1,
                        //图标的url
                        src: '../static/asster/img/where.png'
                    })
                ),
                text: new ol.style.Text({
                    //位置
                    textAlign: 'center',
                    //基准线
                    textBaseline: 'middle',
                    //文字样式
                    font: 'normal 20px 微软雅黑',
                    //文本内容
                    text: feature.get('name'),
                    //文本填充样式（即文字颜色）
                    fill: new ol.style.Fill({color: '#050505'}),
                    stroke: new ol.style.Stroke({color: '#f8d1d1', width: 2})
                })
            });
        };
        //实例化Vector要素，通过矢量图层添加到地图容器中
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(p),
            name: obj[times].name,
            info: obj[times].info_place,
            imgURL: "../../images/label/bj.png",
            geo: p
        });
        iconFeature.setStyle(createLabelStyle(iconFeature));
        //矢量标注的数据源
        var vectorSource = new ol.source.Vector({
            features: [iconFeature]
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        map.addLayer(vectorLayer);
        if (times > 0) {
            var plast = ol.proj.transform([obj[times - 1].lon, obj[times - 1].lat], 'EPSG:4326', 'EPSG:3857');
            var pnow = ol.proj.transform([obj[times].lon, obj[times].lat], 'EPSG:4326', 'EPSG:3857');
            var Line = new ol.Feature({
                geometry: new ol.geom.LineString([pnow, plast])
            });

            //设置线的样式
            Line.setStyle(new ol.style.Style({
                //填充色
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                //边线颜色
                stroke: new ol.style.Stroke({
                    color: '#0c18d3',
                    lineDash: [1, 9],
                    width: 5
                }),
                //形状
                image: new ol.style.Circle({
                    radius: 7,

                    fill: new ol.style.Fill({
                        color: '#2eb1ff'
                    })
                })
            }));

            //实例化一个矢量图层Vector作为绘制层
            var source = new ol.source.Vector({
                features: [Line]
            });
            //创建一个图层
            var vector = new ol.layer.Vector({
                source: source
            });
            //将绘制层添加到地图容器中
            map.addLayer(vector);
        }
    }
});
$('#clearallpoint').click(function () {     //显示全局
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1; //逐个预览次数记录
});

$('#autopoint').click(function () {  //自动预览
    var coorchange = $.parseJSON(coor); //转化
    if (times < coorchange.length) {
        br = setInterval(next, 2000);
    } else {
        alert("无之后路径");
    }
});
$('#stoppoint').click(function () {  //停止预览
    clearInterval(br);
});
$('#qing1').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qing').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[0].where;
        $('#name').text(res[0].name);
        $('#time').text(res[0].time);
        $('#info').text(res[0].info);
        $('#img_di').attr('src', 'static/jsonData/秦始皇.jpg');
    })
});
$('#qing2').click(function () {
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    $('#info_window1').show();
    $('#con_button1').show();
    data = $('#qing').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[1].where;
        $('#name').text(res[1].name);
        $('#time').text(res[1].time);
        $('#info').text(res[1].info);
        $('#img_di').attr('src', 'static/jsonData/秦始皇.jpg');
    })
});
$('#qing3').click(function () {
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    $('#info_window1').show();
    $('#con_button1').show();
    data = $('#qing').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[2].where;
        $('#name').text(res[2].name);
        $('#time').text(res[2].time);
        $('#info').text(res[2].info);
        $('#img_di').attr('src', 'static/jsonData/秦始皇.jpg');

    })
});


$('#han1').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#han').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[0].where;
        $('#name').text(res[0].name);
        $('#time').text(res[0].time);
        $('#info').text(res[0].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han2').click(function () {

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;


    $('#info_window1').show();
    $('#con_button1').show();
    data = $('#han').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[1].where;
        $('#name').text(res[1].name);
        $('#time').text(res[1].time);
        $('#info').text(res[1].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han3').click(function () {
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;

    $('#info_window1').show();
    $('#con_button1').show();

    data = $('#han').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[2].where;
        $('#name').text(res[2].name);
        $('#time').text(res[2].time);
        $('#info').text(res[2].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han4').click(function () {

    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#han').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[3].where;
        $('#name').text(res[3].name);
        $('#time').text(res[3].time);
        $('#info').text(res[3].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han5').click(function () {

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;


    $('#info_window1').show();
    $('#con_button1').show();
    data = $('#han').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[4].where;
        $('#name').text(res[4].name);
        $('#time').text(res[4].time);
        $('#info').text(res[4].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han6').click(function () {
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;

    $('#info_window1').show();
    $('#con_button1').show();

    data = $('#han').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[5].where;
        $('#name').text(res[5].name);
        $('#time').text(res[5].time);
        $('#info').text(res[5].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han7').click(function () {

    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#han').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[6].where;
        $('#name').text(res[6].name);
        $('#time').text(res[6].time);
        $('#info').text(res[6].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han8').click(function () {

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;


    $('#info_window1').show();
    $('#con_button1').show();
    data = $('#han').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[7].where;
        $('#name').text(res[7].name);
        $('#time').text(res[7].time);
        $('#info').text(res[7].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han9').click(function () {
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;

    $('#info_window1').show();
    $('#con_button1').show();

    data = $('#han').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[8].where;
        $('#name').text(res[8].name);
        $('#time').text(res[8].time);
        $('#info').text(res[8].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');
    })
});
$('#han10').click(function () {
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;

    $('#info_window1').show();
    $('#con_button1').show();

    data = $('#han').text();
    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[9].where;
        $('#name').text(res[9].name);
        $('#time').text(res[9].time);
        $('#info').text(res[9].info);
        $('#img_di').attr('src', 'static/jsonData/汉武帝.jpg');

    })
});

$('#kang1').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#kang').text();

    var params = {};

    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[0].where;
        $('#name').text(res[0].name);
        $('#time').text(res[0].time);
        $('#info').text(res[0].info);
        $('#img_di').attr('src', 'static/jsonData/康熙.jpg');
    })
});
$('#kang2').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#kang').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[1].where;
        $('#name').text(res[1].name);
        $('#time').text(res[1].time);
        $('#info').text(res[1].info);
        $('#img_di').attr('src', 'static/jsonData/康熙.jpg');
    })
});
$('#kang3').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#kang').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[0].where;
        $('#name').text(res[0].name);
        $('#time').text(res[0].time);
        $('#info').text(res[0].info);
        $('#img_di').attr('src', 'static/jsonData/康熙.jpg');
    })
});
$('#kang4').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#kang').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[3].where;
        $('#name').text(res[3].name);
        $('#time').text(res[3].time);
        $('#info').text(res[3].info);
        $('#img_di').attr('src', 'static/jsonData/康熙.jpg');
    })
});
$('#kang5').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#kang').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[4].where;
        $('#name').text(res[4].name);
        $('#time').text(res[4].time);
        $('#info').text(res[4].info);
        $('#img_di').attr('src', 'static/jsonData/康熙.jpg');
    })
});
$('#kang6').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#kang').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[5].where;
        $('#name').text(res[5].name);
        $('#time').text(res[5].time);
        $('#info').text(res[5].info);
        $('#img_di').attr('src', 'static/jsonData/康熙.jpg');
    })
});


$('#qian1').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();
    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[0].where;
        $('#name').text(res[0].name);
        $('#time').text(res[0].time);
        $('#info').text(res[0].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian2').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[1].where;
        $('#name').text(res[1].name);
        $('#time').text(res[1].time);
        $('#info').text(res[1].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian3').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[2].where;
        $('#name').text(res[2].name);
        $('#time').text(res[2].time);
        $('#info').text(res[2].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian4').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[3].where;
        $('#name').text(res[3].name);
        $('#time').text(res[3].time);
        $('#info').text(res[3].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian5').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[4].where;
        $('#name').text(res[4].name);
        $('#time').text(res[4].time);
        $('#info').text(res[4].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian6').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[5].where;
        $('#name').text(res[5].name);
        $('#time').text(res[5].time);
        $('#info').text(res[5].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian7').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[6].where;
        $('#name').text(res[6].name);
        $('#time').text(res[6].time);
        $('#info').text(res[6].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian8').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[7].where;
        $('#name').text(res[7].name);
        $('#time').text(res[7].time);
        $('#info').text(res[7].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian9').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[8].where;
        $('#name').text(res[8].name);
        $('#time').text(res[8].time);
        $('#info').text(res[8].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian10').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[9].where;
        $('#name').text(res[9].name);
        $('#time').text(res[9].time);
        $('#info').text(res[9].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
$('#qian11').click(function () {
    $('#info_window1').show();
    $('#con_button1').show();

    var i = 0;
    for (i; i < 2 * (times + 1); i = i + 1) {
        var layer = map.getLayers();
        map.removeLayer(layer.item(2));
    }
    times = -1;
    data = $('#qian').text();

    var params = {};
    url = '/diwang/qa';
    params.data = data;
    console.log(params);
    $.post(url, params, function (res) {
        coor = res[10].where;
        $('#name').text(res[10].name);
        $('#time').text(res[10].time);
        $('#info').text(res[10].info);
        $('#img_di').attr('src', 'static/jsonData/乾隆.jpg');
    })
});
