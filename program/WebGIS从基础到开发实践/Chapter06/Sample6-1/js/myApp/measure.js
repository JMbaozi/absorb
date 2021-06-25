define(["esri/geometry/Point", "esri/geometry/Extent"], function (Point, Extent) {
    
    var measure = {
    };

    measure.getMidPoint = function (p1, p2) {
        var theReturn = null;
        if (p1 && p1.type && p1.type == "point" && p2 && p2.type && p2.type == "point") {
            var x = (p1.x + p2.x) / 2;
            var y = (p1.y + p2.y) / 2;
            theReturn = new Point(x, y, p1.spatialReference);
        }
        return theReturn;
    };

    measure.getAngle = function (p1, p2) {
        var theReturn = 0;
        if (p1 && p1.type && p1.type == "point" && p2 && p2.type && p2.type == "point") {
            var dx = (p1.x - p2.x);
            var dy = (p1.y - p2.y);
            var rad = Math.PI / 2;
            if (dx !== 0) {
                rad = Math.atan(dy / dx) * -1;
            }
            theReturn = measure.radiansToDegrees(rad);
        }
        return theReturn;
    };

    measure.radiansToDegrees = function (radians) {
        return radians * 180 / Math.PI;
    };

    measure.getRingExtent = function (polygon, ringIndex) {
        var ext = null;
        if (polygon && polygon.type && polygon.type == "polygon") {
            var minX = null;
            var maxX = null;
            var minY = null;
            var maxY = null;

            for (var j = 0; j < polygon.rings[ringIndex].length; j++) {
                x = polygon.rings[ringIndex][j][0];
                y = polygon.rings[ringIndex][j][1];

                if (minX) {
                    minX = Math.min(minX, x);
                }
                else {
                    minX = x;
                }

                if (minY) {
                    minY = Math.min(minY, y);
                }
                else {
                    minY = y;
                }

                if (maxX) {
                    maxX = Math.max(maxX, x);
                }
                else {
                    maxX = x;
                }

                if (maxY) {
                    maxY = Math.max(maxY, y);
                }
                else {
                    maxY = y;
                }
            }

            ext = new Extent(minX, minY, maxX, maxY, polygon.spatialReference);
        }
        return ext;
    };

    measure.calculateLength = function (polyline, isGeographic) {
        var length = [];
        if (polyline && polyline.type && polyline.type == "polyline") {
            for (var i in polyline.paths) {
                var l = 0;

                for (var j = 0; j < polyline.paths[i].length - 1; j++) {
                    var x1 = polyline.paths[i][j][0];
                    var y1 = polyline.paths[i][j][1];
                    var x2 = polyline.paths[i][j + 1][0];
                    var y2 = polyline.paths[i][j + 1][1];

                    var d;
                    if (isGeographic) {
                        d = measure.getGreatCircleDistance2(y1, x1, y2, x2);
                    }
                    else {
                        d = measure.getDistanceXYXY(x1, y1, x2, y2);
                    }

                    l += d;
                }
                length.push(l);
            }
        }
        return length;
    };

    measure.getDistanceXYXY = function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    measure.getGreatCircleDistance2 = function (/*Number*/lat1, /*Number*/lon1, /*Number*/lat2, /*Number*/lon2) {
        try {
            var rlat1 = measure.degreesToRadians(lat1);
            var rlon1 = measure.degreesToRadians(lon1);
            var rlat2 = measure.degreesToRadians(lat2);
            var rlon2 = measure.degreesToRadians(lon2);

            var ellipse = {
                name: "WGS80",
                a: 6378.137 / 1.852,
                invf: 298.257223563
            };

            // Some util functions
            var mod = function (x, y) {
                return x - y * Math.floor(x / y);
            };

            var modcrs = function (x) {
                return mod(x, 2 * Math.PI);
            };

            var a = ellipse.a;
            var f = 1 / ellipse.invf;

            var r, tu1, tu2, cu1, su1, cu2, s1, b1, f1;
            var x, sx, cx, sy, cy, y, sa, c2a, cz, e, c, d;
            var EPS = 0.00000000005;
            var faz, baz, s;
            var iter = 1;
            var MAXITER = 100;
            if ((rlat1 + rlat2 === 0.0) && (Math.abs(rlon1 - rlon2) == Math.PI)) {
                alert("Course and distance between antipodal points is undefined");
                rlat1 = rlat1 + 0.00001; // allow algorithm to complete
            }
            if (rlat1 == rlat2 && (rlon1 == rlon2 || Math.abs(Math.abs(rlon1 - rlon2) - 2 * Math.PI) < EPS)) {
                //console.warn("Points 1 and 2 are identical- course undefined");
                return 0;
            }
            r = 1 - f;
            tu1 = r * Math.tan(rlat1);
            tu2 = r * Math.tan(rlat2);
            cu1 = 1.0 / Math.sqrt(1.0 + tu1 * tu1);
            su1 = cu1 * tu1;
            cu2 = 1.0 / Math.sqrt(1.0 + tu2 * tu2);
            s1 = cu1 * cu2;
            b1 = s1 * tu2;
            f1 = b1 * tu1;
            x = rlon2 - rlon1;
            d = x + 1; // force one pass

            while ((Math.abs(d - x) > EPS) && (iter < MAXITER)) {
                iter = iter + 1;
                sx = Math.sin(x);
                cx = Math.cos(x);
                tu1 = cu2 * sx;
                tu2 = b1 - su1 * cu2 * cx;
                sy = Math.sqrt(tu1 * tu1 + tu2 * tu2);
                cy = s1 * cx + f1;
                y = measure.atan2(sy, cy);
                sa = s1 * sx / sy;
                c2a = 1 - sa * sa;
                cz = f1 + f1;
                if (c2a > 0.0) {
                    cz = cy - cz / c2a;
                }
                e = cz * cz * 2.0 - 1.0;
                c = ((-3.0 * c2a + 4.0) * f + 4.0) * c2a * f / 16.0;
                d = x;
                x = ((e * cy * c + cz) * sy * c + y) * sa;
                x = (1.0 - c) * x * f + rlon2 - rlon1;
            }
            faz = modcrs(measure.atan2(tu1, tu2));
            baz = modcrs(measure.atan2(cu1 * sx, b1 * cx - su1 * cu2) + Math.PI);
            x = Math.sqrt((1 / (r * r) - 1) * c2a + 1);
            x += 1;
            x = (x - 2.0) / x;
            c = 1.0 - x;
            c = (x * x / 4.0 + 1.0) / c;
            d = (0.375 * x * x - 1.0) * x;
            x = e * cy;
            s = ((((sy * sy * 4.0 - 3.0) * (1.0 - e - e) * cz * d / 6.0 - x) * d / 4.0 + cz) * sy * d + y) * c * a * r;
            var out = {};
            out.d = s;
            out.dist = s * 1852; // to meters
            out.crs12 = faz;
            out.crs21 = baz;
            if (Math.abs(iter - MAXITER) < EPS) {
                alert("Algorithm did not converge");
            }
            return out.dist;
        }
        catch (err) {
            console.error("Error calculating great circle distance", err);
            return 0;
        }
    };

    measure.degreesToRadians = function (degrees) {
        return Math.PI * degrees / 180;
    };

    measure.atan2 = function (y, x) {
        var out;
        if (x < 0) { out = Math.atan(y / x) + Math.PI; }
        if ((x > 0) && (y >= 0)) { out = Math.atan(y / x); }
        if ((x > 0) && (y < 0)) { out = Math.atan(y / x) + 2 * Math.PI; }
        if ((x === 0) && (y > 0)) { out = Math.PI / 2; }
        if ((x === 0) && (y < 0)) { out = 3 * Math.PI / 2; }
        if ((x === 0) && (y === 0)) {
            console.error("com.esri.solutions.jsviewer.util.atan2(0,0) undefined");
            out = 0.0;
        }
        return out;
    };

    measure.convertDistanceUnits = function (distance, fromUnits, toUnits) {
        if (fromUnits == "DecimalDegrees") {
            console.error("convertDistanceUnits: DecimalDegrees are not a distance unit");
            return 0;
        }

        // Number of meters in a unit
        var cFactors = {
            "Feet": 0.3048,
            "Meters": 1,
            "Miles": 1609.344,
            "Kilometers": 1000,
            "Yards": 0.9144
        };

        if (!cFactors[fromUnits]) {
            console.error("convertDistanceUnits: Unknown units '" + fromUnits + "'");
            return 0;
        }
        if (!cFactors[toUnits]) {
            console.error("convertDistanceUnits: Unknown units '" + toUnits + "'");
            return 0;
        }

        // Convert to meters
        var dInMeters = distance * cFactors[fromUnits];

        // Convert to output units
        var convDistance = dInMeters / cFactors[toUnits];

        return convDistance;
    };

    measure.convertAreaUnits = function (area, fromUnits, toUnits) {
        if (fromUnits == "DecimalDegrees") {
            console.error("convertDistanceUnits: DecimalDegrees are not an area unit");
            return 0;
        }

        // Number of square meters in a unit
        var cFactors = {
            "Feet": 0.09290304,
            "Meters": 1,
            "Miles": 2589988.11,
            "Kilometers": 1000000,
            "Yards": 0.83612736,
            "Acres": 4046.85642,
            "Hectares": 10000
        };

        if (!cFactors[fromUnits]) {
            console.error("convertAreaUnits: Unknown units '" + fromUnits + "'");
            return 0;
        }
        if (!cFactors[toUnits]) {
            console.error("convertAreaUnits: Unknown units '" + toUnits + "'");
            return 0;
        }


        // Convert to meters
        var aInMeters = area * cFactors[fromUnits];

        // Convert to output units
        var convArea = aInMeters / cFactors[toUnits];

        return convArea;
    };

    measure.significantDigits = function (number, numSignificantDigits) {
        var text = number + "";
        //console.debug("significantDigits(" + text + ", " + numSignificantDigits + ")");
        var output = "";

        var bCounting = false;
        var count = 0;
        var bFoundDot = false;
        for (var i = 0; i < text.length; i++) {
            var char = text.substr(i, 1);
            bFoundDot = bFoundDot || char == ".";
            bCounting = bCounting || (char != "-" && char != "." && char != "0");

            if (bCounting && char != ".") {
                count++;
            }

            if (count == numSignificantDigits) {
                if (char == ".") {
                    break;
                }
                if (i == text.length - 1) {
                    output += char;
                }
                else {
                    var next = text.substr(i + 1, 1);
                    if (next == ".") {
                        next = text.substr(i + 2, 1);
                    }
                    var frag = char + "." + next;
                    output += Math.round(parseFloat(frag));
                }
            }
            else if (count > numSignificantDigits) {
                if (bFoundDot) {
                    break;
                }
                else {
                    output += 0;
                }
            }
            else {
                output += char;
            }
        }
        //console.debug(output);
        if (output.length > 0) {
            output = parseFloat(output);
        }
        return output;
    };

    measure.round = function (number, numPlaces) {
        //console.debug("round(" + number + ", " + numPlaces + ")");
        if (!numPlaces) { numPlaces = 0; }
        if (numPlaces > 5) { numPlaces = 5; }
        if (numPlaces < -5) { numPlaces = -5; }
        numPlaces = Math.round(numPlaces);

        //console.debug("rounding " + number + " to " + numPlaces + " places");
        var factor = Math.pow(10, numPlaces);

        return Math.round(number * factor) / factor;
    };

    return measure;

});