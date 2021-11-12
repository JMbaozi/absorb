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

// function becomelayer_politicians(source) {
//     return new ol.layer.Vector({
//         name: "政治人物",
//         source: source,
//     });
// }
//
// function becomelayer_strategist(source) {
//     return new ol.layer.Vector({
//         name: "军事人物",
//         source: source,
//     });
// }
//
// function becomelayer_sociologist(source) {
//     return new ol.layer.Vector({
//         name: "社会人物",
//         source: source,
//     });
// }
//
// function becomelayer_ideologist(source) {
//     return new ol.layer.Vector({
//         name: "思想家",
//         source: source,
//     });
// }
//
// function becomelayer_litterateur(source) {
//     return new ol.layer.Vector({
//         name: "文学家",
//         source: source,
//     });
// }


function chaodairenwu_change(Num)  //点击根据参数Num数字切换人物相应图层
{
    console.log(Num);
    loadPopup_re(chaodirenwu_separate[Num]);

}

function chaodai_separate() {

// var chunqiu = new ol.source.Vector();//春秋
// var zhanguo = new ol.source.Vector();//战国
// var qin = new ol.source.Vector();//秦
// var xihan = new ol.source.Vector();//西汉
// var donghan = new ol.source.Vector();//东汉
// var caowei = new ol.source.Vector();//曹魏
// var xijin = new ol.source.Vector();//西晋
// var dongjin = new ol.source.Vector();//东晋
// var liusong = new ol.source.Vector();//刘宋
// var beiwei = new ol.source.Vector();//北魏
// var dongwei = new ol.source.Vector();//东魏
// var beiqi = new ol.source.Vector();//北齐
// var sui = new ol.source.Vector();//隋朝
// var tang = new ol.source.Vector();//唐
// var houliang = new ol.source.Vector();//后梁
// var houtang = new ol.source.Vector();//后唐
// var houjin = new ol.source.Vector();//后晋
// var houhan = new ol.source.Vector();//后汉
// var houzhou = new ol.source.Vector();//后周
// var beisong = new ol.source.Vector();//北宋
// var jin = new ol.source.Vector();//金
// var yuan = new ol.source.Vector();//元
// var ming = new ol.source.Vector();//明
// var qing = new ol.source.Vector();//清
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

// var createLabelStyle = function (feature) {
//     return new ol.style.Style({
//         image: new ol.style.Icon(
//             /** @type {olx.style.IconOptions} */
//             ({
//                 //设置图标点
//                 anchor: [0.5, 100],
//                 //图标起点
//                 anchorOrigin: 'top-right',
//                 //指定x值为图标点的x值
//                 anchorXUnits: 'fraction',
//                 //指定Y值为像素的值
//                 anchorYUnits: 'pixels',
//                 //偏移
//                 offsetOrigin: 'top-right',
//                 // offset:[0,10],
//                 //图标缩放比例
//                 // scale:0.5,
//                 scale: map.getView().getZoom() / 8,
//                 //透明度
//                 opacity: 0.75,
//                 //图标的url
//                 src: '/static/asster/img/1.png',
//                 // geometry: feature.getGeometry(),
//             })),
//         text: new ol.style.Text({
//             //位置
//             textAlign: 'center',
//             //基准线
//             textBaseline: 'bottom',
//             //文字样式
//             font: 'normal 14px 微软雅黑',
//             //文本内容
//             text: feature.get('name'),
//             //文本填充样式（即文字颜色）
//             fill: new ol.style.Fill({color: '#aa3300'}),
//             stroke: new ol.style.Stroke({color: '#ffcc33', width: 2})
//         }),
//         geometry: feature.getGeometry(),
//         /*            geometryFunction:function () {
//                         return feature.getGeometry();
//                     }*/
//     });
// }
//
// for (var i = 0; i < peoples.length; i++) {
//     var iconFeature = new ol.Feature({
//         index: i,
//         //坐标点
//         geometry: new ol.geom.Point(ol.proj.fromLonLat([peoples[i].lon, peoples[i].lat])),
//         //名称属性
//         name: peoples[i].name,
//     });
//     iconFeature.setStyle(createLabelStyle(iconFeature));
//     switch (peoples[i].chaodai) {
//         case "三国":
//             caowei.addFeature(iconFeature);
//             break;
//         case "东晋":
//             dongjin.addFeature(iconFeature);
//             break;
//         case "东汉":
//             donghan.addFeature(iconFeature);
//             break;
//         case "元":
//             yuan.addFeature(iconFeature);
//             break;
//         case "北宋":
//             beisong.addFeature(iconFeature);
//             break;
//         case "金":
//             jin.addFeature(iconFeature);
//             break;
//         case "唐":
//             tang.addFeature(iconFeature);
//             break;
//         case "战国":
//             zhanguo.addFeature(iconFeature);
//             break;
//         case "明":
//             ming.addFeature(iconFeature);
//             break;
//         case "春秋":
//             chunqiu.addFeature(iconFeature);
//             break;
//         case "清":
//             qing.addFeature(iconFeature);
//             break;
//         case "秦":
//             qin.addFeature(iconFeature);
//             break;
//         case "西晋":
//             xijin.addFeature(iconFeature);
//             break;
//         case "刘宋":
//             liusong.addFeature(iconFeature);
//             break;
//         case "北魏":
//             beiwei.addFeature(iconFeature);
//             break;
//         case "东魏":
//             dongwei.addFeature(iconFeature);
//             break;
//         case "北齐":
//             beiqi.addFeature(iconFeature);
//             break;
//         case "后唐":
//             houtang.addFeature(iconFeature);
//             break;
//         case "后晋":
//             houjin.addFeature(iconFeature);
//             break;
//         case "隋":
//             sui.addFeature(iconFeature);
//             break;
//         case "后梁":
//             houliang.addFeature(iconFeature);
//             break;
//         case "后汉":
//             houhan.addFeature(iconFeature);
//             break;
//         case "后周":
//             houzhou.addFeature(iconFeature);
//             break;
//         case "西汉":
//             xihan.addFeature(iconFeature);
//             break;
//     }
//
// }
//
// chaodirenwu.push(becomelayer(chunqiu));
// chaodirenwu.push(becomelayer(zhanguo));
// chaodirenwu.push(becomelayer(qin));
// chaodirenwu.push(becomelayer(xihan));
// chaodirenwu.push(becomelayer(donghan));
// chaodirenwu.push(becomelayer(caowei));
// chaodirenwu.push(becomelayer(xijin));
// chaodirenwu.push(becomelayer(dongjin));
// chaodirenwu.push(becomelayer(liusong));
// chaodirenwu.push(becomelayer(beiwei));
// chaodirenwu.push(becomelayer(dongwei));
// chaodirenwu.push(becomelayer(beiqi));
// chaodirenwu.push(becomelayer(sui));
// chaodirenwu.push(becomelayer(tang));
// chaodirenwu.push(becomelayer(houliang));
// chaodirenwu.push(becomelayer(houtang));
// chaodirenwu.push(becomelayer(houjin));
// chaodirenwu.push(becomelayer(houhan));
// chaodirenwu.push(becomelayer(houzhou));
// chaodirenwu.push(becomelayer(beisong));
// chaodirenwu.push(becomelayer(jin));
// chaodirenwu.push(becomelayer(yuan));
// chaodirenwu.push(becomelayer(ming));
// chaodirenwu.push(becomelayer(qing));
// function add_all() {
//     all_Source.addFeatures(chunqiu.getFeatures());
//     all_Source.addFeatures(zhanguo.getFeatures());
//     all_Source.addFeatures(qin.getFeatures());
//     all_Source.addFeatures(xihan.getFeatures());
//     all_Source.addFeatures(donghan.getFeatures());
//     all_Source.addFeatures(caowei.getFeatures());
//     all_Source.addFeatures(xijin.getFeatures());
//     all_Source.addFeatures(dongjin.getFeatures());
//     all_Source.addFeatures(liusong.getFeatures());
//     all_Source.addFeatures(beiwei.getFeatures());
//     all_Source.addFeatures(dongwei.getFeatures());
//     all_Source.addFeatures(beiqi.getFeatures());
//     all_Source.addFeatures(sui.getFeatures());
//     all_Source.addFeatures(tang.getFeatures());
//     all_Source.addFeatures(houliang.getFeatures());
//     all_Source.addFeatures(houtang.getFeatures());
//     all_Source.addFeatures(houjin.getFeatures());
//     all_Source.addFeatures(houhan.getFeatures());
//     all_Source.addFeatures(houzhou.getFeatures());
//     all_Source.addFeatures(beisong.getFeatures());
//     all_Source.addFeatures(jin.getFeatures());
//     all_Source.addFeatures(yuan.getFeatures());
//     all_Source.addFeatures(ming.getFeatures());
//     all_Source.addFeatures(qing.getFeatures());
//
// }

function init() {

    loadBaseMap();
    // zhanguo_layer = loadVectData("geojson", "jsonData//Export_Output_3.json", "战国");
    chaodai_separate(); //将所有人按朝代分开，分为24个数组，数据格式同peoples相同
    // loadPopup();
    // loadPopup_re(chaodirenwu_separate[1]);
    loadSelectEvent();
     // changelayer();
    setTimeout(zoomToSD, 1000);
    changelayer();
    // loadLayersControl_test("layerTree");
}
function loadBaseMap() {
    view = new ol.View({
        center: ol.proj.fromLonLat([0, 0]),
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
            new ol.control.ZoomSlider({}),
            new ol.control.ZoomToExtent({})
        ]),
    });
    prezoom = view.getZoom();
    precenter = ol.proj.fromLonLat([118, 36]);
    sd = ol.proj.fromLonLat([118, 36]);
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





function loadPopup() {
    var featureInfoes = new Array();
    // var peoples=
    // console.log(peoples);
    // var peoples = [{
    //     name: "鲍叔牙",
    //     info: "鲍叔牙（？～公元前644年），姒姓，鲍氏，名叔牙，颍上人，春秋时期齐国大臣，大夫鲍敬叔之子。早年交好管仲的交情，人称“管鲍之交”，支持公子小白师傅回国即位，是为齐桓公。知人善任，推荐挚友管仲为相。在鲍叔牙的协助下，管仲实行了治国之道，促进齐国迅速由乱转治，由弱变强。齐桓公三十年（公元前656年），参与“召陵之盟”，使得齐桓公成为“春秋五霸”之一。齐桓公四十一年（公元前645年），担任国相，病逝于任上，安葬于今山东省济南市历城区鲍山街道济钢新村。",
    //     place: "山东省临淄区",
    //     chaodai: "春秋",
    //     shuxing: "政治人物",
    //     lon: 118.35,
    //     lat: 36.8322936351522,
    // },
    //     {
    //         name: "齐景公",
    //         info: "齐景公（？～公元前490年），姜姓，吕氏，名杵臼，齐灵公之子，齐庄公之弟，春秋时期齐国君主。他的大臣中早期的相国有崔杼庆封，后有相国晏婴、司马穰苴以及梁丘据等人。齐景公既有治国的壮怀激烈，又贪图享乐。作为君主，他不愿放弃其中的任何一个，与此相应，他的身边就必有不同的两批大臣，一批是治国之臣，一批是乐身之臣，齐景公也和历史上许多君主一样，运用如此的治国用人之道。齐景公在位58年，国内治安相对稳定，然因无有嫡子，身后诸子展开了激烈的王位之争。",
    //         place: "山东省临淄区",
    //         chaodai: "春秋",
    //         shuxing: "政治人物",
    //         lon: 118.315394609345,
    //         lat: 36.8322936351522
    //     },
    //     {
    //         name: "颜回",
    //         info: "颜回（公元前521年—公元前481年），曹姓，颜氏，名回，字子渊，鲁国都城人（今山东曲阜市），居陋巷（今山东省曲阜市旧城内的陋巷街，颜庙所在之地）尊称复圣颜子，春秋末期鲁国思想家，儒客大家，孔门七十二贤之首。十三岁拜孔子为师，终生师事之，是孔子最得意的门生。孔子对颜回称赞最多，赞其好学仁人。历代儒客文人学士对颜回推尊有加，配享孔子、祀以太牢，追赠兖国公，封为复圣，陪祭于孔庙。",
    //         place: "山东省曲阜市",
    //         chaodai: "春秋",
    //         shuxing: "思想家",
    //         lon: 116.993415971694,
    //         lat: 35.5873722864878
    //     }];
    //示例标注点北京市的信息对象
    for (var i = 0; i < peoples.length; i++) {
        var featuerInfo = {
            geo: ol.proj.fromLonLat([peoples[i].lon, peoples[i].lat]),
            att: {
                people_name: peoples[i].name,
                people_info: peoples[i].info,
                people_place: peoples[i].place,
                people_dynasty: peoples[i].chaodai,
                people_attribute: peoples[i].shuxing,
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
     var political_createLabelStyle = function (feature) {
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
                    scale: map.getView().getZoom() / 8,
                    //透明度
                    opacity: 0.75,
                    //图标的url
                    src: '/static/asster/img/where.png',
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
     var mil_createLabelStyle = function (feature) {
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
                    scale: map.getView().getZoom() / 8,
                    //透明度
                    opacity: 0.75,
                    //图标的url
                    src: '/static/asster/img/where.png',
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
     var society_createLabelStyle = function (feature) {
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
                        scale: map.getView().getZoom() / 8,
                        //透明度
                        opacity: 0.75,
                        //图标的url
                        src: '/static/asster/img/where.png',
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
     var thought_createLabelStyle = function (feature) {
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
                        scale: map.getView().getZoom() / 8,
                        //透明度
                        opacity: 0.75,
                        //图标的url
                        src: '/static/asster/img/where.png',
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
     var literature_createLabelStyle = function (feature) {
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
                    scale: map.getView().getZoom() / 8,
                    //透明度
                    opacity: 0.75,
                    //图标的url
                    src: '/static/asster/img/where.png',
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
    for (var i = 0; i < peoples.length; i++) {
        var iconFeature = new ol.Feature({
            index: i,
            //坐标点
            geometry: new ol.geom.Point(ol.proj.fromLonLat([peoples[i].lon, peoples[i].lat])),
            //名称属性
            name: peoples[i].name,
        });
        // iconFeature.setStyle(political_createLabelStyle(iconFeature));
        switch (peoples[i].shuxing) {
            case "政治人物":
                iconFeature.setStyle(political_createLabelStyle(iconFeature));
                politicians_Source.addFeature(iconFeature);
                break;
            case "军事人物":
                iconFeature.setStyle(mil_createLabelStyle(iconFeature));
                strategist_Source.addFeature(iconFeature);
                break;
            case "社会人物":
                iconFeature.setStyle(society_createLabelStyle(iconFeature));
                sociologist_Source.addFeature(iconFeature);
                break;
            case "思想家":
                iconFeature.setStyle(thought_createLabelStyle(iconFeature));
                ideologist_Source.addFeature(iconFeature);
                break;
            case "文学家":
                iconFeature.setStyle(literature_createLabelStyle(iconFeature));
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