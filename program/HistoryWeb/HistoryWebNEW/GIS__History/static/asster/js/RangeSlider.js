$(document).ready(function(){

    $('.single-slider').jRange({
        from: 1,
        to: 24,
        step: 0.1,
        scale: ["春秋", "战国", "秦", "西汉", "东汉", "曹魏", "西晋", "东晋", "刘宋", "北魏", "东魏", "北齐", "隋代", "唐", "后梁", "后唐", "后晋", "后汉", "后周", "北宋", "金", "元代", "明", "清代"],
        width: 1000,
        showLabels: false,
        snap: true,
        onstatechange: function () {//数字变化的时候的回调函数
            oSpanNum = $(this).val();

            alert(oSpanNum);
            changelayer();
            //滑块的值改变的话，滑块的值赋值给方框，实现动态变化
        }
    });
    // $('.single-slider').change(function() {// 滑块的值改变，运行这个函数
           //
           //  });
        });
//创建遮罩层函数体
function createMask(){
    var node=document.createElement('div');
        node.setAttribute('id','container');
        node.style='position:fixed;top:0;left:0;right:0;bottom:0;z-index:1000;background:#000;opacity:0.8';
        node.style.display="none";
    var html='<div style="width: 100%;height: 100%;">';
        html+='<div style="text-align:center;margin-top: 20rem;">';
        html+='<img src="static/asster/images/loading.gif" style="width:120px;height:120px;">';
        html+='<div style="padding-left:10px;font-size:30px;color:#FFF;">正在穿越时空...</div>';
        html+='</div>';
        html+='</div>';
        node.innerHTML=html;
    var body=document.querySelector('body');
        body.appendChild(node);
}
//开启遮罩层函数体
function showMask(){
    var backdrop=document.getElementById('container');
        backdrop.style.display='block';
}
//关闭遮罩层函数体
function closeMask(){
    var backdrop=document.getElementById('container');
        backdrop.style.display='none';
}
    //加载geojson模块
    function loadVectData(type,dataUrl) {
       if(vectorLayer != null|| vectorLayer ==="undefined") {
             map.removeLayer(vectorLayer);
         }
        var vectorSource = new ol.source.Vector({
        url: dataUrl,
        format: new ol.format.GeoJSON(),
    });
    vectorLayer = new ol.layer.Vector({
        source: vectorSource,

    });
    map.addLayer(vectorLayer);
}
//geoserver模块
    function sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
                return;
        }
    }

    function changelayer() {
        map.removeLayer(wmslayer);
        map.removeLayer(layerhighlight);
        Num=Math.round(oSpanNum-1);
        loadgeo(Num);
        document.getElementById("txt").innerHTML = chaodainm[Num];
}
    function loadgeo(Num){
        wmslayer = new ol.layer.Image({//wms图层
            //extent:[114.79473845077413,34.36189456889595,122.6741768280149,38.12993904964089],
            source:new ol.source.ImageWMS({
                url:'http://localhost:8080/geoserver/History/wms',
                params:{
                    'LAYERS':chaidainme[Num],
                    'TILED':true
                },
                serverType: 'geoserver',
                projection:'EPSG:4326'
            })
        });
        var layersArray = map.getLayers();
         // map.removeLayer(layersArray.item(1));
         layersArray.insertAt(1,wmslayer);

         var a=layersArray.getLength();
         for(var i=2;i<a;i++)
         {
             map.removeLayer(layersArray.item(2));
         }
         chaodairenwu_change(Num);
         // map.addLayer(wmslayer);
}
