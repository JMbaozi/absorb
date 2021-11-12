var map;
var precenter;
var prezoom;
var view;
var sd;
var zhanguo_layer;
var pop_layer;
var popup_ovealay;
var oSpanNum = 1;//总的时期数
//var chaodai = ["static/jsonData/春秋.json","static/jsonData/战国.json", "static/jsonData/秦.json", "static/jsonData/西汉.json", "static/jsonData/东汉.json", "static/jsonData/曹魏.json","static/jsonData/西晋.json","static/jsonData/东晋.json","static/jsonData/刘宋.json","static/jsonData/北魏.json","static/jsonData/东魏.json","static/jsonData/北齐.json","static/jsonData/隋代.json","static/jsonData/唐.json","static/jsonData/后梁.json","static/jsonData/后唐.json","static/jsonData/后晋.json","static/jsonData/后汉.json","static/jsonData/后周.json","static/jsonData/北宋.json","static/jsonData/金.json","static/jsonData/元代.json","static/jsonData/明.json","static/jsonData/清代.json"]
var chaodainm = ["春秋(公元前770-公元前476年)", "战国(公元前475年—公元前221年)", "秦(公元前221年-公元前207年）", "西汉(公元前202年-公元8年)", "东汉(公元25年—公元220年)", "曹魏(公元220年—公元266年)", "西晋(公元265年—公元317年)", "东晋(公元317年-公元420年)", "刘宋(公元420年—公元479年)", "北魏(公元386年-公元534年)", "东魏(公元534年—公元550年)", "北齐(公元550年—公元577年)", "隋代(公元581年—公元618年)", "唐(公元618年—公元907年)", "后梁(公元907年—公元923年)", "后唐(公元923年—公元936年)", "后晋(公元936年—公元947年)", "后汉(公元947年-公元950年)", "后周(公元951年—公元960年)", "北宋(公元960年—公元1127年)", "金(公元1115年-公元1234年)", "元代", "明", "清代"];
var chaidainme = ['History:chunqiu', 'History:zhanguo', 'History:qin', 'History:xihan', 'History:donghan', 'History:caowei', 'History:xijin', 'History:dongjin', 'History:liusong', 'History:beiwei', 'History:dongwei', 'History:beiqi', 'History:sui', 'History:tang', 'History:houliang', 'History:houtang', 'History:houjin', 'History:houhan', 'History:houzhou', 'History:beisong', 'History:jin', 'History:yuan', 'History:ming', 'History:qing'];
var url = 'History:chunqiu';//初始化图层名
var chaodirenwu_separate = []; //分好的朝代 加进数组 [[],[],[],[],[]]
var wmslayer;
var tiled;
//var vectorLayer;
var layerhighlight;
var Num;
/**
 * 创建标注样式函数,设置image为图标ol.style.Icon
 * @param {ol.Feature} feature 要素
 */
var chunqiu = [];//春秋
var zhanguo = [];//战国
var qin = [];//秦
var xihan = [];//西汉
var donghan = [];//东汉
var caowei = [];//曹魏
var xijin = [];//西晋
var dongjin = [];//东晋
var liusong = [];//刘宋
var beiwei = [];//北魏
var dongwei = [];//东魏
var beiqi = [];//北齐
var sui = [];//隋朝
var tang = [];//唐
var houliang = [];//后梁
var houtang = [];//后唐
var houjin = [];//后晋
var houhan = [];//后汉
var houzhou = [];//后周
var beisong = [];//北宋
var jin = [];//金
var yuan = [];//元
var ming = [];//明
var qing = [];//清

function init() {

    loadBaseMap();
    chaodai_separate(); //将所有人按朝代分开，分为24个数组，数据格式同peoples相同
    // loadPopup();
    // loadPopup_re(chaodirenwu_separate[1])
    loadSelectEvent();

    changelayer();
    $('#search_name').val(re_name);
    $('#search_btn').trigger("click")


}

function chaodairenwu_change(Num)  //点击根据参数Num数字切换人物相应图层
{
    console.log(Num);
    loadPopup_re(chaodirenwu_separate[Num]);

}

function chaodai_separate() {

    for (var i = 0; i < peoples.length; i++) {
        switch (peoples[i].chaodai) {
            case "三国":
                caowei.push(peoples[i]);

                break;
            case "东晋":
                dongjin.push(peoples[i]);

                break;
            case "东汉":
                donghan.push(peoples[i]);

                break;
            case "元":
                yuan.push(peoples[i]);

                break;
            case "北宋":
                beisong.push(peoples[i]);

                break;
            case "金":
                jin.push(peoples[i]);

                break;
            case "唐":
                tang.push(peoples[i]);

                break;
            case "战国":
                zhanguo.push(peoples[i]);

                break;
            case "明":
                ming.push(peoples[i]);

                break;
            case "春秋":
                chunqiu.push(peoples[i]);

                break;
            case "清":
                qing.push(peoples[i]);

                break;
            case "秦":
                qin.push(peoples[i]);

                break;
            case "西晋":
                xijin.push(peoples[i]);

                break;
            case "刘宋":
                liusong.push(peoples[i]);

                break;
            case "北魏":
                beiwei.push(peoples[i]);

                break;
            case "东魏":
                dongwei.push(peoples[i]);
                break;
            case "北齐":
                beiqi.push(peoples[i]);
                 break;
            case "后唐":
                houtang.push(peoples[i]);
               break;
            case "后晋":
                houjin.push(peoples[i]);
                 break;
            case "隋":
                sui.push(peoples[i]);
               break;
            case "后梁":
                houliang.push(peoples[i]);
              break;
            case "后汉":
                houhan.push(peoples[i]);
                break;
            case "后周":
                houzhou.push(peoples[i]);
                break;
            case "西汉":
                xihan.push(peoples[i]);
                 break;
        }
    }
    console.log(qin);
    chaodirenwu_separate.push(chunqiu);
    chaodirenwu_separate.push(zhanguo);
    chaodirenwu_separate.push(qin);
    chaodirenwu_separate.push(xihan);
    chaodirenwu_separate.push(donghan);
    chaodirenwu_separate.push(caowei);
    chaodirenwu_separate.push(xijin);
    chaodirenwu_separate.push(dongjin);
    chaodirenwu_separate.push(liusong);
    chaodirenwu_separate.push(beiwei);
    chaodirenwu_separate.push(dongwei);
    chaodirenwu_separate.push(beiqi);
    chaodirenwu_separate.push(sui);
    chaodirenwu_separate.push(tang);
    chaodirenwu_separate.push(houliang);
    chaodirenwu_separate.push(houtang);
    chaodirenwu_separate.push(houjin);
    chaodirenwu_separate.push(houhan);
    chaodirenwu_separate.push(houzhou);
    chaodirenwu_separate.push(beisong);
    chaodirenwu_separate.push(jin);
    chaodirenwu_separate.push(yuan);
    chaodirenwu_separate.push(ming);
    chaodirenwu_separate.push(qing);

}  //将所有人按朝代分开，分为24个数组，数据格式同peoples相同 并将所有朝代加入一列表用num索引

function loadBaseMap() {
    view = new ol.View({
        center: ol.proj.fromLonLat([120, 30]),
        zoom: 3
    });
    map = new ol.Map({
        target: 'map',
        loadTilesWhileInteracting: true,
        layers: [
            new ol.layer.Tile({
                name: "OSM切片底图",
                source: new ol.source.OSM(),
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
            // new ol.control.ZoomSlider({}),
            // new ol.control.ZoomToExtent({})
        ]),
    });
    prezoom = view.getZoom();
    precenter = ol.proj.fromLonLat([118, 36]);
    sd = ol.proj.fromLonLat([118, 36]);
}

function loadLayersControl(id) {
    var layer = new Array();
    var layerName = new Array();
    var layerVisibility = new Array();
    var treeContent = document.getElementById(id);    //图层列表容器
    var layers = map.getLayers();    //获取所有图层
    // treeContent.remove(3);
    // alert(layers.getLength());
    $("#layerTree").empty();
    for (var i = 2; i < layers.getLength(); i++) {

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
        var text_element = document.getElementById('status');
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
            text_element.innerHTML = "";
        }
        if (select !== null) {
            map.addInteraction(select);
            select.on('select', function (e) {
                var features = e.selected;
                var feature = features[0];
                if (feature != null) {
                    text_element.innerHTML =
                        '图层名：' + " " + feature.get('name');
                }
            });
        }
    };
    selectElement.onchange = changeInteraction;
    changeInteraction();
}
function loadPopup_re(chaodairenwu) {
    var featureInfoes = new Array();
    for (var i = 0; i < chaodairenwu.length; i++) {
        var featuerInfo = {
            geo: ol.proj.fromLonLat([chaodairenwu[i].lon, chaodairenwu[i].lat]),
            att: {
                people_name: chaodairenwu[i].name,
                people_info: chaodairenwu[i].info,
                people_place: chaodairenwu[i].place,
                people_dynasty: chaodairenwu[i].chaodai,
                people_attribute: chaodairenwu[i].shuxing,
                //标注详细信息链接
                // people_nameURL: "http://www.openlayers.org/",
                //标注的图片
                people_imgURL: "/static/asster/img/1.png",
            }
        }
        featureInfoes[i] = featuerInfo;
    }
    /**
     * 创建标注样式函数,设置image为图标ol.style.Icon
     * @param {ol.Feature} feature 要素
     */
     var createLabelStyle = function (feature,attributes){
        return new ol.style.Style({
            image: new ol.style.Icon(
                /** @type {olx.style.IconOptions} */
                ({
                    //设置图标点
                    anchor: [0.5, 100],
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
                    scale: prezoom / 8,
                    //透明度
                    opacity: 0.75,
                    //图标的url
                    src: '/static/asster/img/'+attributes.toString()+'.png',
                    // geometry: feature.getGeometry(),
                })),
            /*            image: new ol.style.Circle({
                            radius: 10,
                            fill: new ol.style.Fill({
                                color: 'black'
                            })
                        }),*/
            text: new ol.style.Text({
                //位置
                textAlign: 'center',
                //基准线
                textBaseline: 'bottom',
                //文字样式
                font: 'normal 14px 微软雅黑',
                //文本内容
                text: feature.get('name'),
                //文本填充样式（即文字颜色）
                fill: new ol.style.Fill({color: '#aa3300'}),
                stroke: new ol.style.Stroke({color: '#ffcc33', width: 2})
            }),
            geometry: feature.getGeometry(),
            /*            geometryFunction:function () {
                            return feature.getGeometry();
                        }*/
        });
    }

    //实例化Vector要素，通过矢量图层添加到地图容器中
    // 矢量标注的数据源
    var politicians_Source = new ol.source.Vector();//政治人物
    var strategist_Source = new ol.source.Vector();//军事人物
    var sociologist_Source = new ol.source.Vector();//社会人物
    var ideologist_Source = new ol.source.Vector();//思想家
    var litterateur_Source = new ol.source.Vector();//文学家
    for (var i = 0; i < chaodairenwu.length; i++) {
        var iconFeature = new ol.Feature({
            index: i,
            //坐标点
            geometry: new ol.geom.Point(ol.proj.fromLonLat([chaodairenwu[i].lon, chaodairenwu[i].lat])),
            //名称属性
            name: chaodairenwu[i].name,
        });
        // iconFeature.setStyle(createLabelStyle(iconFeature));
        switch (chaodairenwu[i].shuxing) {
            case "政治人物":
                iconFeature.setStyle(createLabelStyle(iconFeature,chaodairenwu[i].shuxing));
                politicians_Source.addFeature(iconFeature);
                break;
            case "军事人物":
                iconFeature.setStyle(createLabelStyle(iconFeature,chaodairenwu[i].shuxing));
                strategist_Source.addFeature(iconFeature);
                break;
            case "社会人物":
               iconFeature.setStyle(createLabelStyle(iconFeature,chaodairenwu[i].shuxing));
                sociologist_Source.addFeature(iconFeature);
                break;
            case "思想家":
                iconFeature.setStyle(createLabelStyle(iconFeature,chaodairenwu[i].shuxing));
                ideologist_Source.addFeature(iconFeature);
                break;
            case "文学家":
                iconFeature.setStyle(createLabelStyle(iconFeature,chaodairenwu[i].shuxing));
                litterateur_Source.addFeature(iconFeature);
                break;
        }
    }
    var all_Source = new ol.source.Vector();
    all_Source.addFeatures(politicians_Source.getFeatures());
    all_Source.addFeatures(strategist_Source.getFeatures());
    all_Source.addFeatures(sociologist_Source.getFeatures());
    all_Source.addFeatures(ideologist_Source.getFeatures());
    all_Source.addFeatures(litterateur_Source.getFeatures());
    //矢量标注图层
    var politicians_layer = new ol.layer.Vector({
        name: "政治人物",
        source: politicians_Source,
    });
    var strategist_layer = new ol.layer.Vector({
        name: "军事人物",
        source: strategist_Source,
    });
    var sociologist_layer = new ol.layer.Vector({
        name: "社会人物",
        source: sociologist_Source,
    });
    var ideologist_layer = new ol.layer.Vector({
        name: "思想家",
        source: ideologist_Source,
    });
    var litterateur_layer = new ol.layer.Vector({
        name: "文学家",
        source: litterateur_Source,
    });
     map.addLayer(politicians_layer);
    map.addLayer(strategist_layer);
    map.addLayer(sociologist_layer);
    map.addLayer(ideologist_layer);
    map.addLayer(litterateur_layer);

    /**
     * 实现popup的html元素
     */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    /**
     * 在地图容器中创建一个Overlay
     */
    var popup_ovealay = new ol.Overlay(
        ({
            //要转换成overlay的HTML元素
            element: container,
            //当前窗口可见
            autoPan: true,
            //Popup放置的位置
            positioning: 'center',
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


    /**
     * 动态创建popup的具体内容
     * @param {string} title
     */
    function addFeatrueInfo(info) {
        //新增a元素
        var elementA = document.createElement('a');
        elementA.className = "markerInfo";
        // elementA.href = info.att.people_nameURL;
        //elementA.innerText = info.att.title;
        var text = info.att.people_name + "(" + info.att.people_dynasty + "," + info.att.people_place + "," + info.att.people_attribute + ")";
        setInnerText(elementA, text);
        // 新建的div元素添加a子节点
        content.appendChild(elementA);
        //新增img元素
        var elementImg = document.createElement('img');
        elementImg.className = "markerImg";
        elementImg.src = info.att.people_imgURL;
        // 为content添加img子节点
        content.appendChild(elementImg);

        //时空轨迹表单
        var elementform = document.createElement('form');
        elementform.action = "trace";
        elementform.method = 'post';
        content.appendChild(elementform);
        //新增form button元素
        var elementbutton = document.createElement('button');
        elementbutton.innerText = "时空轨迹";
        elementform.appendChild(elementbutton);
        var elementinput = document.createElement('input');
        elementinput.value = info.att.people_name.toString();
        elementinput.name = "name";
        elementinput.style.display = "none";
        elementform.appendChild(elementinput);

        //关系图谱表单
        var elementformT = document.createElement('form');
        elementformT.action = "RelationshipGraph";
        elementformT.method = 'post';
        content.appendChild(elementformT);
        //新增form button元素
        var elementbuttonT = document.createElement('button');
        elementbuttonT.innerText = "关系图谱";
        elementformT.appendChild(elementbuttonT);
        // 为form添加name子节点
        var elementinputT = document.createElement('input');
        elementinputT.value = info.att.people_name.toString();
        elementinputT.name = "name";
        elementinputT.style.display = "none";
        elementformT.appendChild(elementinputT);
        elementformT.target = "_Blank";
        elementform.target = "_Blank";

        //新增div元素
        var elementDiv = document.createElement('div');
        elementDiv.className = "markerText";
        elementDiv.style.overflow = "auto;";
        //elementDiv.innerText = info.att.text;
        setInnerText(elementDiv, info.att.people_info.substr(0, 100) + "...");
        var elementa = document.createElement('a');
        elementa.text = "查看详情";
        elementa.href = "http://www.baidu.com";
        // 为content添加div子节点
        content.appendChild(elementDiv);
        content.appendChild(elementa);

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

    //聚合
    var cluster_distance = document.getElementById('clusher_distance');
    var clusher_distance_value = document.getElementById('clusher_distance_value');
    var clusterSource = new ol.source.Cluster({
        distance: parseInt(cluster_distance.value, 10),
        source: all_Source,
    });

    var styleCache = {};
    var clusters = new ol.layer.Vector({
        name: "聚合层",
        source: clusterSource,
        style: function (feature, resolution) {
            var size = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                if (size > 1) {
                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 7,
                            stroke: new ol.style.Stroke({
                                color: '#fff',
                            }),
                            fill: new ol.style.Fill({
                                color: '#3399CC',
                            }),
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#fff',
                            }),
                        }),
                    });
                }
                styleCache[size] = style;
            }
            return style;
        },
    });

    map.addLayer(clusters);
    cluster_distance.addEventListener('input', function () {
        clusterSource.setDistance(parseInt(cluster_distance.value, 10));
        clusher_distance_value.innerHTML = cluster_distance.value;
    });

    /**
     * 为map添加点击事件监听，渲染弹出popup
     */
    var judgefirst = true;
    closer.onclick = function () {
        //未定义popup位置
        popup_ovealay.setPosition(undefined);
        //失去焦点
        closer.blur();
        judgefirst = true;
        return false;
    };
    map.on('click', function (evt) {
        //判断当前单击处是否有要素，捕获到要素时弹出popup
        if (judgefirst) {
            var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, vectorLayer) {
                if (all_Source.hasFeature(feature) && feature.getGeometry() instanceof ol.geom.Point) {
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

    map.on('pointermove', function (e) {
        var feature = map.forEachFeatureAtPixel(e.pixel, function (feature) {
            if (all_Source.hasFeature(feature)) {
                return feature;
            } else if (clusterSource.hasFeature(feature)) {
                return feature;
            }
        });
        var hit;
        if (feature) {
            hit = true;
        } else {
            hit = false;
        }
        map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
    /*    map.getView().on('change:resolution', function () {
            var features = new Array();
            features.push(politicians_Source.getFeatures(),strategist_Source.getFeatures(),sociologist_Source.getFeatures(),ideologist_Source.getFeatures(),litterateur_Source.getFeatures());
            for (var i = 0; i < features.length; i++) {
                features[i].setStyle(createLabelStyle(features[i]));
                // features[i].setProperties('scale',map.getView().getZoom() / 100);
            }
        })*/
     globle_all_source=all_Source;
    var search_name = document.getElementById('search_name');
    var search_btn = document.getElementById('search_btn');
    let remind_message = document.getElementById('remind_message');
    let close_btn = document.getElementById('close_btn');
    search_btn.addEventListener('click', function () {
        var name = search_name.value;
        if (name != '') {
            let feature;
            let fratures = all_Source.getFeatures();
            for (let i = 0; i < fratures.length; i++) {
                if (fratures[i].get('name') === name) {
                    feature = fratures[i];
                }
            }
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
                    map.getView().animate({center: featureInfoes[i].geo, zoom: 7});
                }
                remind_message.innerHTML = "查询成功!";

            } else {
                remind_message.innerHTML = "未查询到该要素!";
            }
        } else {
            remind_message.innerHTML = "查询内容不可为空!";
        }
        judgefirst = false;
    });
    close_btn.addEventListener('click', function () {
        remind_message.innerHTML = '';
        search_name.value = '';
    })


    loadLayersControl("layerTree");
}



