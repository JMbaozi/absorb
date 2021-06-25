var scene, camera, renderer, mesh, loader, earthTexture;
var cameraCube, sceneCube;
var fov = 70, lon = 0, lat = 0, phi = 0, theta = 0;
var isUserInteracting = false, onPointerDownLon = 0, onPointerDownLat = 0;
var onPointerDownPointerX = 0, onPointerDownPointerY = 0;
var arrowMaterial, arrowFocusMaterial; //箭头/三角指示块
var arrowShapeFront, arrowMeshFront, arrowShapeBack, arrowMeshBack, arrowShapeLeft, arrowMeshLeft, arrowShapeRight, arrowMeshRight;
var navigationArrows; // 箭头对象的集合
var northLon = 0; // 北向时的lon值

var aroundFeatures = null;
var initDis = 9.9;
/**
* Initialze the scene.
*/
function initializeScene() {
    var container = document.getElementById('threeDiv');
    var width = dojo.style("mapDiv", "width");
    var height = dojo.style("mapDiv", "height");
    dojo.style('threeDiv', 'left', dojo.style('mapDiv', 'left') + 'px');
    dojo.style('threeDiv', 'top', dojo.style('mapDiv', 'top') + 'px');
    dojo.style('threeDiv', 'width', width + 'px');
    dojo.style('threeDiv', 'height', height + 'px');
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(fov, width / height, 1, 5000);
    camera.position.z = 2000;

    cameraCube = new THREE.PerspectiveCamera(fov, width / height, 1, 100);

    earthTexture = new THREE.Texture();
    loader = new THREE.ImageLoader();
    loader.addEventListener('load', function (event) {
        earthTexture.image = event.content;
        earthTexture.needsUpdate = true;
        console.log("texture loaded!");
        render();
    });

    scene = new THREE.Scene();
    scene.add(camera);
    THREE.Object3D._threexDomEvent.camera(camera);
    sceneCube = new THREE.Scene();

    arrowMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, opacity: 0.8, transparent: true });
    arrowFocusMaterial = new THREE.MeshBasicMaterial({ color: 0x55FF00, opacity: 1, transparent: false }); //高亮状态

    dojo.connect(renderer.domElement, 'mousedown', onDocumentMouseDown);
    dojo.connect(renderer.domElement, 'mousemove', onDocumentMouseMove);
    dojo.connect(renderer.domElement, 'mouseup', onDocumentMouseUp);
    document.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
}

function createMesh(imgUrl) {
    loader.load(imgUrl);

    if (mesh != null) {
        mesh.material.map.image = earthTexture.image;
        mesh.material.map.needsUpdate = true;
    }
    else {
        mesh = new THREE.Mesh(new THREE.SphereGeometry(100, 60, 40), new THREE.MeshBasicMaterial({ map: earthTexture }));
        sceneCube.add(mesh);
    }
    mesh.scale.x = -1;
    return mesh;
}

function draw(graphic) {
    var url = 'textures/' + graphic.attributes["url"];
    var attitudeZ = graphic.attributes["attitudez"];
    onPointerDownPointerX = 3;
    onPointerDownPointerY = 2;

    if (attitudeZ) {
        lon = 360 - attitudeZ;
        northLon = lon;
    }

    onPointerDownLon = lon;
    onPointerDownLat = lat;
    mesh = createMesh(url);

    addNavigationArrow(graphic);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);

    var delta = 100 * Math.cos(phi) - camera.position.y;
    camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
    camera.position.y = 100 * Math.cos(phi);
    camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);

    if (navigationArrows != null) {
        navigationArrows.position.y += delta;
    }

    camera.lookAt(scene.position);
    cameraCube.rotation.copy(camera.rotation);

    renderer.render(sceneCube, cameraCube);
    renderer.render(scene, camera);
}

function onDocumentMouseDown(event) {
    event.preventDefault();
    isUserInteracting = true;

    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;

    onPointerDownLon = lon;
    onPointerDownLat = lat; render();
}

function onDocumentMouseMove(event) {
    if (isUserInteracting) {
        lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
        render();
    }
}

function onDocumentMouseUp(event) {
    isUserInteracting = false;
}

function onDocumentMouseWheel(event) {

    // WebKit
    if (event.wheelDeltaY) {

        fov -= event.wheelDeltaY * 0.05;

        // Opera / Explorer 9

    } else if (event.wheelDelta) {

        fov -= event.wheelDelta * 0.05;

        // Firefox

    } else if (event.detail) {

        fov += event.detail * 1.0;

    }
    // 退出街景图
    if (fov > 70) {

        document.getElementById("mapDiv").style.display = "block";
        
        fov = 70;

        var contentDiv = dojo.byId("mapDiv_container");
        contentDiv.style.animation = "";
        contentDiv.style.transform = "perspective(600px) rotateX(60deg) scale3d(2, 1, 1)";
        contentDiv.style.transformOrigin = "50% 50%";

        var skyImage = dojo.byId("skyImage");
        skyImage.style.animation = "";

        var threeDiv = dojo.byId("threeDiv");
        threeDiv.style.animation = "";

        setTimeout(function () {
            contentDiv.style.animation = "3s linear 0s reverse forwards 1 fadeOut";
            skyImage.style.animation = "3s linear 0s reverse forwards 1 slideIn";
            threeDiv.style.animation = "500ms linear 0s normal forwards 1 scaleOut";
        }, 100);
        setTimeout(function () {
            document.getElementById("threeDiv").style.display = "none";
            contentDiv.style.animation = "";
            contentDiv.style.transform = "";
            contentDiv.style.transformOrigin = "";
            skyImage.style.animation = "";
            threeDiv.style.animation = "";
        }, 3200);
        return;
    }
    //最大只能放大到20°
    if (fov < 40) {
        fov = 40;
    }

    var width = dojo.style("mapDiv", "width");
    var height = dojo.style("mapDiv", "height");
    cameraCube.projectionMatrix.makePerspective(fov, width / height, 1, 100);
    render();
}

// 根据aroundFeatures绘制导航箭头
function addNavigationArrow(graphic) {
    if (navigationArrows != null) {
        if (arrowMeshFront)
            arrowMeshFront.off('mouseover', onMouseOverTriangleMesh).off('mouseout', onMouseOutTriangleMesh).off('click', onMouseClickTriangleMesh);
        if (arrowMeshBack)
            arrowMeshBack.off('mouseover', onMouseOverTriangleMesh).off('mouseout', onMouseOutTriangleMesh).off('click', onMouseClickTriangleMesh);
        if (arrowMeshLeft)
            arrowMeshLeft.off('mouseover', onMouseOverTriangleMesh).off('mouseout', onMouseOutTriangleMesh).off('click', onMouseClickTriangleMesh);
        if (arrowMeshRight)
            arrowMeshRight.off('mouseover', onMouseOverTriangleMesh).off('mouseout', onMouseOutTriangleMesh).off('click', onMouseClickTriangleMesh);
        scene.remove(navigationArrows);
        navigationArrows = null;
    }

    if (typeof graphic != "undefined") {
        findAroundViewPoints(graphic.geometry);
    }

    if (aroundFeatures == null)
        return;

    arrowMeshFront = null; arrowMeshBack = null; arrowMeshLeft = null; arrowMeshRight = null;
    navigationArrows = new THREE.Object3D();

    // 东向
    if (aroundFeatures.E) {
        arrowShapeFront = new THREE.Shape();
        arrowShapeFront.moveTo(-30, 0);
        arrowShapeFront.lineTo(-20, 10);
        arrowShapeFront.lineTo(-10, 10);
        arrowShapeFront.lineTo(-20, 0);
        arrowShapeFront.lineTo(-10, -10);
        arrowShapeFront.lineTo(-20, -10);
        arrowShapeFront.lineTo(-30, 0);
        arrowMeshFront = new THREE.Mesh(new THREE.ShapeGeometry(arrowShapeFront), arrowMaterial);
        var rotation = aroundFeatures.E.azimuth.angle - graphic.attributes.attitudez;
        console.log("E:" + rotation);
        arrowMeshFront.rotation.set(THREE.Math.degToRad(270), 0, THREE.Math.degToRad(rotation));
        navigationArrows.add(arrowMeshFront);
        arrowMeshFront.on('mouseover', onMouseOverTriangleMesh).on('mouseout', onMouseOutTriangleMesh).on('click', onMouseClickTriangleMesh);
    }

    // 西向
    if (aroundFeatures.W) {
        arrowShapeBack = new THREE.Shape();
        arrowShapeBack.moveTo(30, 0);
        arrowShapeBack.lineTo(20, 10);
        arrowShapeBack.lineTo(10, 10);
        arrowShapeBack.lineTo(20, 0);
        arrowShapeBack.lineTo(10, -10);
        arrowShapeBack.lineTo(20, -10);
        arrowShapeBack.lineTo(30, 0); // close path				 
        arrowMeshBack = new THREE.Mesh(new THREE.ShapeGeometry(arrowShapeBack), arrowMaterial);
        var rotation = aroundFeatures.W.azimuth.angle - graphic.attributes.attitudez - 180;
        console.log("W:" + rotation);
        arrowMeshBack.rotation.set(THREE.Math.degToRad(270), 0, THREE.Math.degToRad(rotation));
        navigationArrows.add(arrowMeshBack);
        arrowMeshBack.on('mouseover', onMouseOverTriangleMesh).on('mouseout', onMouseOutTriangleMesh).on('click', onMouseClickTriangleMesh);
    }

    // 南向
    if (aroundFeatures.S) {
        arrowShapeLeft = new THREE.Shape();
        arrowShapeLeft.moveTo(0, -30);
        arrowShapeLeft.lineTo(-10, -20);
        arrowShapeLeft.lineTo(-10, -10);
        arrowShapeLeft.lineTo(0, -20);
        arrowShapeLeft.lineTo(10, -10);
        arrowShapeLeft.lineTo(10, -20);
        arrowShapeLeft.lineTo(0, -30); // close path				 
        arrowMeshLeft = new THREE.Mesh(new THREE.ShapeGeometry(arrowShapeLeft), arrowMaterial);
        var rotation = aroundFeatures.S.azimuth.angle - graphic.attributes.attitudez + 270;
        console.log("S:" + rotation);
        arrowMeshLeft.rotation.set(THREE.Math.degToRad(270), 0, THREE.Math.degToRad(rotation));
        navigationArrows.add(arrowMeshLeft);
        arrowMeshLeft.on('mouseover', onMouseOverTriangleMesh).on('mouseout', onMouseOutTriangleMesh).on('click', onMouseClickTriangleMesh);
    }

    // 北向
    if (aroundFeatures.N) {
        arrowShapeRight = new THREE.Shape();
        arrowShapeRight.moveTo(0, 30);
        arrowShapeRight.lineTo(-10, 20);
        arrowShapeRight.lineTo(-10, 10);
        arrowShapeRight.lineTo(0, 20);
        arrowShapeRight.lineTo(10, 10);
        arrowShapeRight.lineTo(10, 20);
        arrowShapeRight.lineTo(0, 30);
        arrowMeshRight = new THREE.Mesh(new THREE.ShapeGeometry(arrowShapeRight), arrowMaterial);
        arrowMeshRight.rotation.set(THREE.Math.degToRad(270), 0, 0);
        var rotation = aroundFeatures.N.azimuth.angle - graphic.attributes.attitudez + 90;
        console.log("N:" + rotation);
        arrowMeshRight.rotation.set(THREE.Math.degToRad(270), 0, THREE.Math.degToRad(rotation));
        navigationArrows.add(arrowMeshRight);
        arrowMeshRight.on('mouseover', onMouseOverTriangleMesh).on('mouseout', onMouseOutTriangleMesh).on('click', onMouseClickTriangleMesh);
    }

    navigationArrows.position.set(0, -50, 0);
    navigationArrows.scale.set(0.5, 0.5, 0.5);
    scene.add(navigationArrows);
}

function onMouseOverTriangleMesh(event) {

    event.target.material = arrowFocusMaterial;
    render();
}

function onMouseOutTriangleMesh(event) {
    event.target.material = arrowMaterial;
    render();
}

function onMouseClickTriangleMesh(event) {
    var mapPoint = null;
    if (aroundFeatures == null)
        return;

    if (event.target == arrowMeshFront) {
        mapPoint = aroundFeatures.E.feature;
    }
    else if (event.target == arrowMeshBack) {
        mapPoint = aroundFeatures.W.feature;
    }
    else if (event.target == arrowMeshLeft) {
        mapPoint = aroundFeatures.S.feature;
    }
    else if (event.target == arrowMeshRight) {
        mapPoint = aroundFeatures.N.feature;
    }
    if (mapPoint != null) {
        aroundFeatures = null; // 将周边点对象设置为空
        draw(mapPoint);
    }
}

function findAroundViewPoints(currentPt) {
    aroundFeatures = {};
    var dis = [];
    dis["N"] = initDis;
    dis["E"] = initDis;
    dis["S"] = initDis;
    dis["W"] = initDis;

    for (var i = 0; i < ptFeatures.length; i++) {        
        var tempPnt = ptFeatures[i].geometry;
        var tempA = getAzimuthOfPoints(tempPnt, currentPt);
        if (tempA.dis < dis[tempA.direction] && tempA.dis > 1) {
            dis[tempA.direction] = tempA.dis;
            var tempFtr = {};
            tempFtr["feature"] = ptFeatures[i];
            tempFtr["azimuth"] = tempA;
            aroundFeatures[tempA.direction] = tempFtr;
        }
    }

    var removeDirections = new Array();
    for (var direc in aroundFeatures) {
        var tempFtr = aroundFeatures[direc];
        for (var tempdirec in aroundFeatures) {
            if (tempdirec == direc) { continue; }
            var ttftr = aroundFeatures[tempdirec];
            if (Math.abs(tempFtr.azimuth.angle - ttftr.azimuth.angle) < 20 && ttftr.azimuth.dis > tempFtr.azimuth.dis) {
                if (dojo.indexOf(removeDirections, tempdirec) == -1) {
                    removeDirections.push(tempdirec);
                }
            }
        }
    }
    for (var i = removeDirections.length - 1; i > -1; i--) {
        var di = removeDirections[i];
        delete aroundFeatures[di];
    }
}

function toWebMercator(pt) {
    var num = pt.x * 0.017453292519943295;
    var x = 6378137.0 * num;
    var a = pt.y * 0.017453292519943295;
    var y = 3189068.5 * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));

    return { "x": x, "y": y, "spatialReference": { "wkid": 102113 } };
}

function getDistanceOfPoints(pnt1, pnt2) {
    pnt1 = toWebMercator(pnt1);
    pnt2 = toWebMercator(pnt2);
    var sq = Math.pow((pnt1.x - pnt2.x), 2) + Math.pow((pnt1.y - pnt2.y), 2);
    return Math.sqrt(sq);
}

function getAzimuthOfPoints(tempPnt, pnt, dis) {
    var azimuth = {};
    azimuth["dis"] = getDistanceOfPoints(tempPnt, pnt);
    if (tempPnt.x == pnt.x) {
        if (tempPnt.y > pnt.y) {
            azimuth["angle"] = 0;
            azimuth["direction"] = "N";
        } else {
            azimuth["angle"] = 180;
            azimuth["direction"] = "S";
        }
    } else if (tempPnt.y == pnt.y) {
        if (tempPnt.x > pnt.x) {
            azimuth["angle"] = 90;
            azimuth["direction"] = "E";
        } else {
            azimuth["angle"] = 270;
            azimuth["direction"] = "W";
        }
    } else {
        var tan = (tempPnt.x - pnt.x) / (tempPnt.y - pnt.y);
        var angle = Math.atan(tan) * 180 / Math.PI;
        if (tempPnt.x > pnt.x && tempPnt.y > pnt.y) {
            azimuth["angle"] = angle;
        } else if (tempPnt.y < pnt.y) {
            azimuth["angle"] = angle + 180;
        } else {
            azimuth["angle"] = angle + 360;
        }
    }
    var angleGrade = 0;
    if (azimuth["angle"] >= 315 || azimuth["angle"] < 45) {
        azimuth["direction"] = "N";
        if (azimuth["angle"] < 45) {
            angleGrade = azimuth["angle"] / 9;
        } else {
            angleGrade = (360 - azimuth["angle"]) / 9;
        }
    } else if (azimuth["angle"] >= 45 && azimuth["angle"] < 135) {
        azimuth["direction"] = "E";
        angleGrade = Math.abs(azimuth.angle - 90) / 9;
    } else if (azimuth["angle"] >= 135 && azimuth["angle"] < 225) {
        azimuth["direction"] = "S";
        angleGrade = Math.abs(azimuth.angle - 180) / 9;
    } else if (azimuth["angle"] >= 225 && azimuth["angle"] < 315) {
        azimuth["direction"] = "W";
        angleGrade = Math.abs(azimuth.angle - 270) / 9;
    }
    //var disGrade = azimuth["dis"] / dis;
    return azimuth;
}
