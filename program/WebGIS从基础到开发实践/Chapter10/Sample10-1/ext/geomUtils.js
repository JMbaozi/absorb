define(["esri/geometry/Point", "esri/geometry/Polyline", "esri/geometry/Polygon", "esri/geometry/Extent", "dojo/_base/array"],
    function (Point, Polyline, Polygon, Extent, array) {

    var geomUtils = {
    };

    /**
	 * CREATE POINT OBJECT FROM ARRAY OF DOUBLES
	 * @method
	 * @param {Array} Array of coordinates as two doubles.
	 * @return {esri.geometry.Point} The new point.
	 */
    geomUtils.createPoint = function(coords) {
        return new Point(coords[0],coords[1]);
    };
	
    /**
	 * GET ALL POINTS
	 * @method
	 * @param {esri.geometry.Polyline | esri.geometry.Polygon} polyGeom The input geometry.
	 * @return {Array} The array of points.
	 */
    geomUtils.getAllPoints = function(polyGeom){		

        var result = [];
        var parts = null;
		
        switch (polyGeom.type) {
            case 'extent':
                var pnt1 = new Point(polyGeom.xmin,polyGeom.ymin,polyGeom.spatialReference);
                var pnt2 = new Point(polyGeom.xmin,polyGeom.ymax,polyGeom.spatialReference);
                var pnt3 = new Point(polyGeom.xmax,polyGeom.ymax,polyGeom.spatialReference);
                var pnt4 = new Point(polyGeom.xmax,polyGeom.ymin,polyGeom.spatialReference);
                result.push(pnt1);
                result.push(pnt2);
                result.push(pnt3);
                result.push(pnt4);
                break;
            case 'polyline':
                parts = polyGeom.paths;
                break;
            case 'polygon':
                parts = polyGeom.rings;
                break;
            default:
                console.debug("[ APLGeomUtils.getAllPoints ] Invalid Geometry Type: " + polyGeom.type + ".  Only Extents, Polyline and Polygon geometries are supported.");
                break;
        }
	
        if (result.length == 0) {		
            array.forEach(parts, function(part){
                var pnts = array.map(part, function(coords){
                    return new Point(coords[0], coords[1], polyGeom.spatialReference);
                });
                result = result.concat(pnts);
            });
        }
        return result;
    };
	
    /**
	 * MOVE
	 * @method
	 * @param {esri.geometry.Polyline | esri.geometry.Polygon} polyGeom The input geometry.
	 * @param {double} deltaX Offsets the point in the x direction. Units are map units.
 	 * @param {double} deltaY Offsets the point in the y direction. Units are map units.
	 * @return {Array} The array of moved points.
	 */
    geomUtils.move = function(polyGeom,deltaX,deltaY){		

        var result;

        if ((polyGeom.type == 'point') || (polyGeom.type == 'extent')) {
            result = polyGeom.offset(deltaX, deltaY);
        }
        else {
		
            var allPnts = this.getAllPoints(polyGeom);
			
            var movedPnts = array.map(allPnts, function(pnt){
                return pnt.offset(deltaX, deltaY);
            });
						
            switch (polyGeom.type) {
                case 'polyline':
                    result = new Polyline(polyGeom.spatialReference);
                    result.addPath(movedPnts);
                    break;
                case 'polygon':
                    result = new Polygon(polyGeom.spatialReference);
                    result.addRing(movedPnts);
                    break;
            }
        }
		
        return result;
    };
		
    /**
	 * GET POINT AT PART INDEX AND POINT INDEX
	 * @method
	 * @param {esri.geometry.Polyline | esri.geometry.Polygon} polyGeom The input geometry.
	 * @param {Integer} partIndex The part index; use -1 for last part.
 	 * @param {Integer} pointIndex The point index; use -1 for last point.
	 * @return {esri.geometry.Point} The point.
	 */
    geomUtils.getPointAtIndex = function(polyGeom, partIndex, pointIndex){
        var result = null;
        switch (polyGeom.type) {
            case 'polyline':
                partIndex = (partIndex == -1) ? (polyGeom.paths.length - 1) : partIndex;
                pointIndex = (pointIndex == -1) ? (polyGeom.paths[partIndex].length - 1) : pointIndex;
                result = this.createPoint(polyGeom.paths[partIndex][pointIndex]);
                break;
            case 'polygon':
                partIndex = (partIndex == -1) ? (polyGeom.rings.length - 1) : partIndex;
                pointIndex = (pointIndex == -1) ? (polyGeom.rings[partIndex].length - 1) : pointIndex;
                result = this.createPoint(polyGeom.rings[partIndex][pointIndex]);
                break;
            default:
                console.debug("[ APLGeomUtils.getPoint ] Invalid Geometry Type: " + polyGeom.type + ".  Only Polyline and Polygon geometries are supported.");
                break;
        }
        return result;
    };
		
    /**
	 * GET MIDPOINT
	 * @method
	 * @param {esri.geometry.Polyline | esri.geometry.Polygon} polyGeom The input geometry.
 	 * @return {esri.geometry.Point} The middle point.
	 */
    geomUtils.getMidPoint = function (polyGeom) {
        var result = null;
        switch(polyGeom.type) {
            case 'polyline':
                var partIndex = Math.floor(polyGeom.paths.length/2);
                var pointIndex = Math.floor(polyGeom.paths[partIndex].length/2);
                result = this.createPoint(polyGeom.paths[partIndex][pointIndex]);
                break;
            case 'polygon':
                var partIndex = Math.floor(polyGeom.rings.length/2);
                var pointIndex = Math.floor(polyGeom.rings[partIndex].length/2);
                result = this.createPoint(polyGeom.rings[partIndex][pointIndex]);
                break;
            default:
                console.debug("[ APLGeomUtils.getMidPoint ] Invalid Geometry Type: " + polyGeom.type + ".  Only Polyline and Polygon geometries are supported.");
                break;
        }
        return result;
    },
	
	
    /**
	 * GET FIRST POINT
	 * @method
	 * @param {esri.geometry} geom The input geometry.
 	 * @return {esri.geometry.Point} The first point.
	 */	
    geomUtils.getFirstPoint = function (geom){
        var result = null;
        switch(geom.type) {
            case 'point':
                result = geom;
                break;
            case 'multipoint':	
                result = this.createPoint(geom.points[0]);
                break;
            case 'polyline':
                result = getPointAtIndex(geom,0,0);
                break;
            case 'polygon':
                result = getPointAtIndex(geom,0,0);
                break;
            case 'extent':
                result = new esri.geometry.Point(geom.xmin,geom.ymin);
                break;
        }
        return result;
    },
	
    /**
	 * GET LAST POINT 
	 * @method
	 * @param {esri.geometry} geom The input geometry.
 	 * @return {esri.geometry.Point} The last point.
	 */
    geomUtils.getLastPoint = function (geom){
        var result = null;
        switch(geom.type) {
            case 'point':
                result = geom;
                break;
            case 'multipoint':	
                result = this.createPoint(geom.points[geom.points.length-1]);
                break;
            case 'polyline':
                result = getPointAtIndex(geom,-1,-1);
                break;
            case 'polygon':
                result = getPointAtIndex(geom,-1,-1);
                break;
            case 'extent':
                result = new esri.geometry.Point(geom.xmax,geom.ymax);
                break;
        }
        return result;
    };
		
    /**
	 * GET CENTER POINT
	 * @method
	 * @param {esri.geometry} geom The input geometry.
 	 * @return {esri.geometry.Point} The center point.
	 */	
    geomUtils.getCenter = function (geom){
        var result = null;
        switch(geom.type) {
            case 'point':
                result = geom;
                break;
            case 'multipoint':
                result = geom.getExtent().getCenter();
                break;
            case 'polyline':
                result = geom.getExtent().getCenter();
                break;
            case 'polygon':
                result = geom.getExtent().getCenter();
                break;
            case 'extent':
                result = geom.getCenter();
                break;
        }
        return result;	
    };
	
    /**
	 * GET EXTENT
	 * @method
	 * @param {esri.geometry} geom The input geometry.
 	 * @return {esri.geometry.Extent} The extent.
	 */	
    geomUtils.getExtent = function (geom){
        var result = null;
        switch(geom.type) {
            case 'point':
                var expandSize = 0.05;
                result = new Extent(geom.x - expandSize, geom.y - expandSize, geom.x + expandSize, geom.y + expandSize, geom.spatialReferece);
                break;
            case 'multipoint':
                result = geom.getExtent();
                break;
            case 'polyline':
                result = geom.getExtent();
                break;
            case 'polygon':
                result = geom.getExtent();
                break;
            case 'extent':
                result = geom;
                break;
        }		
		
        return result;	
    };
	
    /**
	 * GET ZOOM EXTENT
	 * @method
	 * @param {esri.geometry} geom The input geometry.
 	 * @return {esri.geometry.Extent} The zoom extent.
	 */	
    geomUtils.getZoomExtent = function (geom) {
        var result = null;
        switch (geom.type) {
            case 'point':
                var expandSize = 0.05;
                result = new Extent(geom.x - expandSize, geom.y - expandSize, geom.x + expandSize, geom.y + expandSize, geom.spatialReferece);
                break;
            case 'multipoint':
                result = geom.getExtent();
                break;
            case 'polyline':
                result = geom.getExtent();
                break;
            case 'polygon':
                result = geom.getExtent();
                break;
            case 'extent':
                result = geom;
                break;
        }
        result = result.expand(2.0);

        return result;
    };

    return geomUtils;
});