var map;
var precenter;
var prezoom;
var view;
var sd;
var zhanguo_layer;
var pop_layer;
var popup_ovealay;

function init() {
    loadBaseMap();
    zhanguo_layer = loadVectData("geojson", "/static/jsonData/Export_Output_3.json", "战国");
    loadPopup();
    loadSelectEvent();
    loadLayersControl("layerTree");
    setTimeout(zoomToSD, 1000);
}

function loadBaseMap() {
    view = new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
        zoom: 2
    });
    map = new ol.Map({
        target: 'map',
        loadTilesWhileInteracting: true,
        layers: [
            new ol.layer.Tile({
                name: "OSM切片底图",
                source: new ol.source.OSM()
            }),
        ],
        loadTilesWhileAnimating: true,
        view: view,
        controls: ol.control.defaults().extend([
            // new ol.control.FullScreen(),
            new ol.control.MousePosition({
                coordinateFormat: ol.coordinate.createStringXY(4),        //坐标格式
                projection: 'EPSG:4326',        //地图投影坐标系（若未设置则输出为默认投影坐标系下的坐标）
                className: 'custom-mouse-position',        //坐标信息显示样式类名，默认是'ol-mouse-position'
                target: document.getElementById('mouse-position'),        //显示鼠标位置信息的目标容器
                undefinedHTML: '&nbsp;'        //未定义坐标的标记
            }),
            /*            new ol.control.Rotate({
                            autoHide:false
                        }),*/
            new ol.control.ScaleLine({}),
            new ol.control.ZoomSlider({}),
            new ol.control.ZoomToExtent({})
        ]),
    });
    prezoom = view.getZoom();
    precenter = ol.proj.fromLonLat([118, 36]);
    sd = ol.proj.fromLonLat([118, 36]);
}

function loadVectData(type, dataUrl, layerName) {
    var vectorSource = new ol.source.Vector({
        url: dataUrl,
        format: new ol.format.GeoJSON(),
    });
    var image = new ol.style.Circle({
        radius: 5,
        fill: null,
        stroke: new ol.style.Stroke({color: 'red', width: 1})
    });
    var styles = {
        'Point': [new ol.style.Style({image: image})],
        'LineString': [new ol.style.Style({stroke: new ol.style.Stroke({color: 'green', width: 10})})],
        'MultiLineString': [new ol.style.Style({stroke: new ol.style.Stroke({color: 'red', width: 10})})],
        'MultiPoint': [new ol.style.Style({image: image})],
        'MultiPolygon': [new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'red', width: 10}),
            fill: new ol.style.Fill({color: 'rgba(255,255,0,0.1)'})
        })],
        'Polygon': [new ol.style.Style({   //山东样式
            stroke: new ol.style.Stroke({color: 'red', lineDash: [4], width: 2}),
            fill: new ol.style.Fill({color: 'rgba(0,0,255,0.1)'})
        })],
        'GeometryCollection': [new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'red', width: 20}),
            fill: new ol.style.Fill({color: 'red'}),
            image: new ol.style.Circle({
                radius: 10,
                fill: null,
                stroke: new ol.style.Stroke({color: 'red'})
            })
        })],
        'Circle': [new ol.style.Style({
            stroke: new ol.style.Stroke({color: 'red', width: 20}),
            fill: new ol.style.Fill({color: 'rgba(255,0,0,0.2)'})
        })]
    };


    var styleFunction = function (feature, resolution) {
        return styles[feature.getGeometry().getType()];
    };
    var vectorLayer = new ol.layer.Vector({
        name: layerName,
        source: vectorSource,
        style: styleFunction,
    });
    map.addLayer(vectorLayer);
    return vectorLayer;
}

function zoomToSD() {
    var duration = 2000;//动画的持续时间（以毫秒为单位）
    view.animate({
        center: sd,
        duration: duration
    });
    //第二个动画
    view.animate({
        zoom: prezoom,
        duration: duration / 2
    }, {
        zoom: prezoom + 4,
        duration: duration / 2
    });
}

function loadLayersControl(id) {
    var layer = new Array();
    var layerName = new Array();
    var layerVisibility = new Array();
    var treeContent = document.getElementById(id);    //图层列表容器
    var layers = map.getLayers();    //获取所有图层
    for (var i = 0; i < layers.getLength(); i++) {
        //获取图层属性、可见性
        layer[i] = layers.item(i);
        layerName[i] = layer[i].get('name');
        layerVisibility[i] = layer[i].getVisible();
        //新增li元素、用来保存图层项
        var elementLi = document.createElement('li');
        treeContent.appendChild(elementLi);
        //创建复选框元素
        var elementInput = document.createElement("input");
        elementInput.type = "checkbox";
        elementInput.name = "layers";
        elementLi.appendChild(elementInput);
        //创建label元素
        var elementLabel = document.createElement("label");
        elementLabel.className = "layer";
        //设置图层名称
        setInnerText(elementLabel, layerName[i]);
        elementLi.appendChild(elementLabel);
        //设置图层显示状态
        if (layerVisibility[i]) {
            elementInput.checked = true;
        }
        addChangeEvent(elementInput, layer[i]);
    }

    function addChangeEvent(element, layer) {//图层目录
        element.onclick = function () {
            if (element.checked) {
                layer.setVisible(true);
            } else {
                layer.setVisible(false);
            }
        }
    }

    function setInnerText(element, text) {//设置文本
        if (typeof element.textContent == "string") {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    }
}

function loadPopup() {
    var zuobiao = [ol.proj.fromLonLat([116.28, 39.54]), ol.proj.fromLonLat([118, 36])];
    var featureInfoes = new Array();
    var titles = ['title1', 'title2'];
    // var beijing =  ol.proj.fromLonLat([116.28, 39.54]);
    //示例标注点北京市的信息对象
    for (var i = 0; i < zuobiao.length; i++) {
        var featuerInfo = {
            geo: zuobiao[i],
            att: {
                //标注信息的标题内容
                title: titles[i],
                name:"孔子",
                //标注详细信息链接
                titleURL: "http://www.openlayers.org/",
                //标注内容简介
                text: "text" + (i+1),
                //标注的图片
                imgURL: "src/images/1.png",
            }
        }
        featureInfoes[i] = featuerInfo;
    }
    /**
     * 创建标注样式函数,设置image为图标ol.style.Icon
     * @param {ol.Feature} feature 要素
     */
    var createLabelStyle = function (feature) {
        return new ol.style.Style({
            image: new ol.style.Icon(
                /** @type {olx.style.IconOptions} */
                ({
                    //设置图标点
                    anchor: [0.5, 60],
                    //图标起点
                    anchorOrigin: 'top-right',
                    //指定x值为图标点的x值
                    anchorXUnits: 'fraction',
                    //指定Y值为像素的值
                    anchorYUnits: 'pixels',
                    //偏移
                    offsetOrigin: 'top-right',
                    // offset:[0,10],
                    //图标缩放比例
                    // scale:0.5,
                    scale: map.getView().getZoom() / 20,
                    //透明度
                    opacity: 0.75,
                    //图标的url
                    src: 'static/asster/img/1.png'
                })),
            text: new ol.style.Text({
                //位置
                textAlign: 'center',
                //基准线
                textBaseline: 'middle',
                //文字样式
                font: 'normal 14px 微软雅黑',
                //文本内容
                text: feature.get('name'),
                //文本填充样式（即文字颜色）
                fill: new ol.style.Fill({color: '#aa3300'}),
                stroke: new ol.style.Stroke({color: '#ffcc33', width: 2})
            })
        });
    }

    //实例化Vector要素，通过矢量图层添加到地图容器中
    // 矢量标注的数据源
    var vectorSource = new ol.source.Vector();
    for (var i = 0; i < zuobiao.length; i++) {
        var iconFeature = new ol.Feature({
            index: i,
            //坐标点
            geometry: new ol.geom.Point(zuobiao[i]),
            //名称属性
            name: 'people',
            //大概人口数（万）
            population: 2115
        });
        iconFeature.setStyle(createLabelStyle(iconFeature));
        vectorSource.addFeature(iconFeature);
    }

    //矢量标注图层
    pop_layer = new ol.layer.Vector({
        name: "注记层",
        source: vectorSource,
    });
    map.addLayer(pop_layer);

    /**
     * 实现popup的html元素
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    /**
     * 在地图容器中创建一个Overlay
     */
    popup_ovealay = new ol.Overlay(
        /** @type {olx.OverlayOptions} */
        ({
            //要转换成overlay的HTML元素
            element: container,
            //当前窗口可见
            autoPan: true,
            //Popup放置的位置
            positioning: 'bottom-center',
            //是否应该停止事件传播到地图窗口
            stopEvent: false,
            autoPanAnimation: {
                //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
                duration: 250
            }
        }));
    map.addOverlay(popup_ovealay);

    /**
     * 添加关闭按钮的单击事件（隐藏popup）
     * @return {boolean} Don't follow the href.
     */

    closer.onclick = function () {
        //未定义popup位置
        popup_ovealay.setPosition(undefined);
        //失去焦点
        closer.blur();
        return false;
    };
    ;

    /**
     * 动态创建popup的具体内容
     * @param {string} title
     */
    function addFeatrueInfo(info) {
        //新增a元素
        var elementA = document.createElement('a');
        elementA.className = "markerInfo";
        elementA.href = info.att.titleURL;
        //elementA.innerText = info.att.title;
        setInnerText(elementA, info.att.title);
        // 新建的div元素添加a子节点
        content.appendChild(elementA);

        //新增div元素
        var elementDiv = document.createElement('div');
        elementDiv.className = "markerText";
        //elementDiv.innerText = info.att.text;
        setInnerText(elementDiv, info.att.text);
        // 为content添加div子节点
        content.appendChild(elementDiv);
        //新增img元素
        var elementImg = document.createElement('img');
        elementImg.className = "markerImg";
        elementImg.src = info.att.imgURL;
        // 为content添加img子节点
        content.appendChild(elementImg);
        var elementform = document.createElement('form');
        elementform.action="trace";
        elementform.method='post';
        content.appendChild(elementform);
        //新增form button元素
        var elementbutton = document.createElement('button');
        elementbutton.innerText="时空轨迹";
        elementform.appendChild(elementbutton);
        //关系图谱表单
        var elementformT = document.createElement('form');
        elementformT.action="RelationshipGraph";
        elementformT.method='post';
        content.appendChild(elementformT);
        //新增form button元素
        var elementbuttonT = document.createElement('button');
        elementbuttonT.innerText="关系图谱";
        elementformT.appendChild(elementbuttonT);
        // 为form添加name子节点
        var elementinput = document.createElement('input');
        elementinput.value=info.att.name.toString();
        elementinput.name="name";
        elementinput.style.display="none";
        elementform.appendChild(elementinput);
        elementformT.appendChild(elementinput);
    }


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
     */
    var judgefirst = true;
    map.on('click', function (evt) {
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        if (judgefirst) {
            var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, vectorLayer) {
                if (vectorSource.hasFeature(feature) && feature.getGeometry() instanceof ol.geom.Point) {
                    return feature;
                }
            });
            if (feature) {
                popup_ovealay.setPosition(undefined);
                //清空popup的内容容器
                content.innerHTML = '';
                var i = feature.get('index');
                //在popup中加载当前要素的具体信息
                addFeatrueInfo(featureInfoes[i]);
                if (popup_ovealay.getPosition() == undefined) {
                    //设置popup的位置
                    popup_ovealay.setPosition(featureInfoes[i].geo);
                }
            }
            judgefirst = false;
        } else {
            closer.click();
            judgefirst = true;
        }

    });
    /**
     * 为map添加鼠标移动事件监听，当指向标注时改变鼠标光标状态
     */
    var hit;
    map.on('pointermove', function (e) {
        var feature = map.forEachFeatureAtPixel(e.pixel, function (feature, vectorLayer) {
            if (vectorSource.hasFeature(feature)) {
                return feature;
            }
        });
        if (feature) {
            hit = true;
        } else {
            hit = false;
        }
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    map.getView().on('change:resolution', function () {
        var features = vectorSource.getFeatures();
        for (var i = 0; i < features.length; i++) {
            features[i].setStyle(createLabelStyle(features[i]));
            // features[i].setProperties('scale',map.getView().getZoom() / 100);
        }
    })
}

function loadSelectEvent() {
    var select = null;
    var selectClick = new ol.interaction.Select({
        layers: [zhanguo_layer],
        condition: ol.events.condition.click,
    });
    var selectPointerMove = new ol.interaction.Select({
        layers: [zhanguo_layer],
        condition: ol.events.condition.pointerMove,
    });
    var selectElement = document.getElementById('select_type');

    function changeInteraction() {
        if (select !== null) {
            map.removeInteraction(select);
        }
        var value = selectElement.value;
        if (value === 'click') {
            select = selectClick;
        } else if (value === 'hover') {
            select = selectPointerMove;
        } else {
            select = null;
        }
        if (select !== null) {
            console.log(value);
            map.addInteraction(select);
                        select.on('select', function (e) {
                            var features = e.selected;
                            var feature = features[0];
                            if (feature != null) {
                                document.getElementById('status').innerHTML =
                                    '图层名：'+" " + feature.get('name');
                            }
                        });
}
    };
    selectElement.onchange = changeInteraction;
    changeInteraction();
}
