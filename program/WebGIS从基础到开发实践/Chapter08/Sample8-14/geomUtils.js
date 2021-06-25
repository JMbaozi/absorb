define(["esri/geometry/Point"], function (Point) {
    var geomUtils = {
    };

    geomUtils.getMidPoint = function(polyGeom) {
        var result = null;
        switch (polyGeom.type) {
            case 'polyline':
                var partIndex = Math.floor(polyGeom.paths.length / 2);
                var pointIndex = Math.floor(polyGeom.paths[partIndex].length / 2);
                result = this.createPoint(polyGeom.paths[partIndex][pointIndex]);
                break;
            case 'polygon':
                var partIndex = Math.floor(polyGeom.rings.length / 2);
                var pointIndex = Math.floor(polyGeom.rings[partIndex].length / 2);
                result = this.createPoint(polyGeom.rings[partIndex][pointIndex]);
                break;
            default:
                console.debug("Invalid Geometry Type: " + polyGeom.type + ".  Only Polyline and Polygon geometries are supported.");
                break;
        }
        return result;
    }

    geomUtils.createPoint = function(coords) {
        return new Point(coords[0],coords[1]);
    }

    return geomUtils;
});