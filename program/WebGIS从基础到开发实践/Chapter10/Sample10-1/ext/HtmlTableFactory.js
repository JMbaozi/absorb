define(["dojo/_base/declare", "./geomUtils", "./HtmlTableColors", "./HtmlTable", "dojo/string"],
    function (declare, geomUtils, HtmlTableColors, HtmlTable, string) {
        return declare(null, {
            /**
	 * Geometry Utilities.
	 * @property {ESRI.APL.GeomUtils}
	 */
            //aplGeomUtils: new ESRI.APL.geomUtils(),

            /**
             * COLLECTION OF DEFAULT TABLE COLORS
             * @property {Object}
             */
            defaultTableColors: {
                /**
                 * Input Table Colors.
                 * @property {ESRI.APL.HtmlTableColors}
                 */
                inTableColors: new HtmlTableColors('lightblue', 'dcdcdc', 'e0ffff', 'azure', 'cyan'),
                /**
                 * Output Table Colors.
                 * @property {ESRI.APL.HtmlTableColors}
                 */
                outTableColors: new HtmlTableColors('red', 'dcdcdc', 'lightyellow', 'e0ffff', 'yellow')
            },

            /**
             * BUILD TABLE FOR OBJECT
             * @method
             * @param {oBJECT} OBJ The input object.
             * @param {ESRI.APL.HtmlTableColors} tblClrs The input html table colors.
             * @return {String} An html table.
             */
            createObjectTable: function (obj, maxWidth, tblClrs) {

                // HTML TABLE COLORS
                if (tblClrs == null) {
                    tblClrs = this.defaultTableColors.inTableColors;
                }

                var attTable = [];
                attTable.push("<table width='" + maxWidth + "px' style='font-size:85%; border:dashed thin " + tblClrs.borderClr + "'>");

                attTable.push("<tr style='background-color:" + tblClrs.headerClr + "' >");
                attTable.push("<td align='left' valign='top'>FIELD</td>");
                attTable.push("<td align='left' valign='top' style='padding-left:10'>VALUE</td>");
                attTable.push("</tr>");


                for (var attName in obj) {
                    var clr = (clr === tblClrs.altClr) ? tblClrs.rowClr : tblClrs.altClr;
                    attTable.push(string.substitute("<tr style='background-color:${0}'>", [clr]));

                    var val;
                    if (typeof obj[attName] == "object") {
                        val = this.createObjectTable(obj[attName], Math.floor(maxWidth * 0.85), tblClrs);
                    } else {
                        val = obj[attName].toString();
                        if (val.indexOf('http://') == 0) {
                            val = val.link(val).replace(">", " target='_blank' >");
                        }
                    }

                    attTable.push(string.substitute("<td align='left' valign='top' style='padding-left:10; color:darkblue'>${0}</td><td align='left' valign='top' style='padding-left:10'>${1}</td>", [attName, val]));
                    attTable.push("</tr>");
                }
                attTable.push("</table>");

                return attTable.join("");
            },

            /**
             * BUILD TABLE FOR SINGLE FEATURE
             * @method
             * @param {esri.geometry} graphic The input graphic.
             * @param {ESRI.APL.HtmlTableColors} tblClrs The input html table colors.
             * @return {String} An html table.
             */
            createFeatureTable: function (graphic, tblClrs) {

                // HTML TABLE COLORS
                if (tblClrs == null) {
                    tblClrs = this.defaultTableColors.inTableColors;
                }

                var attTable = [];
                attTable.push("<table width='100%' style='font-size:85%; border:dashed thin " + tblClrs.borderClr + "'>");

                attTable.push("<tr style='background-color:" + tblClrs.headerClr + "' >");
                attTable.push("<td align='right'>FIELD</td>");
                attTable.push("<td align='left' style='padding-left:10'>VALUE</td>");
                attTable.push("</tr>");

                var atts = graphic.attributes;
                for (var attName in atts) {
                    var clr = (clr === tblClrs.altClr) ? tblClrs.rowClr : tblClrs.altClr;
                    attTable.push(string.substitute("<tr style='background-color:${0}'>", [clr]));
                    var val = atts[attName].toString();
                    if (val.indexOf('http://') == 0) {
                        val = val.link(val).replace(">", " target='_blank' >");
                    }
                    attTable.push(string.substitute("<td align='right' style='padding-left:10; color:darkblue'>${0}</td><td align='left' style='padding-left:10'>${1}</td>", [attName, val]));
                    attTable.push("</tr>");
                }
                attTable.push("</table>");

                return attTable.join("");
            },

            /**
             * BUILD IDENTIFY RESULTS TABLE
             * @method
             * @param {esri.tasks.IdentifyResult} identifyResults The results of performing an Identify operation.
             * @param {ESRI.APL.HtmlTableColors} tblClrs The input html table colors.
             * @return {String} An html table.
             */
            createIdentifyResultsTable: function (identifyResults, tblClrs) {

                // HTML TABLE COLORS
                if (tblClrs == null) {
                    tblClrs = this.defaultTableColors.inTableColors;
                }

                var attTable = [];
                attTable.push("<table width='100%' style='font-size:70%; border:dashed thin " + tblClrs.borderClr + "'>");

                // COLUMN NAMES
                attTable.push("<tr style='background-color:" + tblClrs.headerClr + "' >");
                attTable.push("<td>SHAPE</td>");
                attTable.push("<td>LayerId</td>");
                attTable.push("<td>LayerName</td>");
                attTable.push("<td>DisplayFieldName</td>");
                attTable.push("<td>DisplayFieldValue</td>");
                attTable.push("</tr>");

                // FOUND FEATURES
                for (var fIdx = 0; fIdx < identifyResults.length; fIdx++) {
                    var clr = (clr === tblClrs.altClr) ? tblClrs.rowClr : tblClrs.altClr;
                    var f = identifyResults[fIdx];
                    var center = geomUtils.getCenter(f.feature.geometry);
                    attTable.push(string.substitute("<tr style='background-color:${0}' onclick='map.centerAt(\{x:${1},y:${2}\})'>", [clr, center.x, center.y]));
                    attTable.push("<td>" + f.feature.geometry.type + "</td>");
                    attTable.push("<td>" + f.layerId + "</td>");
                    attTable.push("<td>" + f.layerName + "</td>");
                    attTable.push("<td>" + f.displayFieldName + "</td>");

                    var val = f.feature.attributes[f.displayFieldName].toString();
                    if (val.indexOf('http://') == 0) {
                        val = val.link(val).replace(">", " target='_blank' >");
                    }

                    attTable.push("<td>" + val + "</td>");
                    attTable.push("</tr>");
                }

                attTable.push("</table>");

                return attTable.join("");
            },

            /**
             * BUILD FIND RESULTS TABLE
             * @method
             * @param {esri.tasks.FindResult} findResults The results of performing a Find operation.
             * @param {ESRI.APL.HtmlTableColors} tblClrs The input html table colors.
             * @return {String} An html table.
             */
            createFindResultsTable: function (findResults, tblClrs) {

                // HTML TABLE COLORS
                if (tblClrs == null) {
                    tblClrs = this.defaultTableColors.inTableColors;
                }

                var attTable = [];
                attTable.push("<table width='100%' style='font-size:70%; border:dashed thin " + tblClrs.borderClr + "'>");

                // COLUMN NAMES
                attTable.push("<tr style='background-color:" + tblClrs.headerClr + "' >");
                attTable.push("<td>SHAPE</td>");
                attTable.push("<td>LayerId</td>");
                attTable.push("<td>LayerName</td>");
                attTable.push("<td>DisplayFieldName</td>");
                attTable.push("<td>DisplayFieldValue</td>");
                attTable.push("<td>FoundFieldName</td>");
                attTable.push("<td>FoundFieldValue</td>");
                attTable.push("</tr>");

                // FOUND FEATURES
                for (var fIdx = 0; fIdx < findResults.length; fIdx++) {
                    var clr = (clr === tblClrs.altClr) ? tblClrs.rowClr : tblClrs.altClr;
                    var f = findResults[fIdx];
                    var center = geomUtils.getCenter(f.feature.geometry);
                    attTable.push(string.substitute("<tr style='background-color:${0}' onclick='map.centerAt(\{x:${1},y:${2}\})'>", [clr, center.x, center.y]));
                    attTable.push("<td>" + f.feature.geometry.type + "</td>");
                    attTable.push("<td>" + f.layerId + "</td>");
                    attTable.push("<td>" + f.layerName + "</td>");
                    attTable.push("<td>" + f.displayFieldName + "</td>");

                    var val = f.feature.attributes[f.displayFieldName].toString();
                    if (val.indexOf('http://') == 0) {
                        val = val.link(val).replace(">", " target='_blank' >");
                    }
                    attTable.push("<td>" + val + "</td>");
                    attTable.push("<td>" + f.foundFieldName + "</td>");

                    val = f.feature.attributes[f.foundFieldName].toString();
                    if (val.indexOf('http://') == 0) {
                        val = val.link(val).replace(">", " target='_blank' >");
                    }

                    attTable.push("<td>" + val + "</td>");
                    attTable.push("</tr>");
                }

                attTable.push("</table>");

                return attTable.join("");
            },

            /**
             * BUILD ATTRIBUTE TABLE
             * @method
             * @param {esri.tasks.FeatureSet} featureSet A Feature Set.
             * @param {String} displayField The display field name.
             * @param {ESRI.APL.HtmlTableColors} tblClrs The input html table colors.
             * @param {String} actionCallbackName The name of the function to call when row is clicked; passed back to this method will be the displayField value.
             * @return {String} An html table.
             */
            createAttributeTable: function (featureSet, displayField, tblClrs, actionCallbackName) {

                // HTML TABLE COLORS
                if (tblClrs == null) {
                    tblClrs = this.defaultTableColors.inTableColors;
                }

                // ARRAY OF FEATURES IN FEATURESET
                var features = featureSet.features;

                // MAKE SURE WE HAVE A VALID DISPLAY FIELD
                if ((displayField == null) || (!features[0].attributes.hasOwnProperty(displayField))) {
                    // USE FIRST FIELD AS DISPLAY FIELD
                    for (var attName in features[0].attributes) {
                        displayField = attName;
                        break;
                    }
                }

                var attTable = [];
                attTable.push("<table width='100%' style='font-size:70%; border:dashed thin " + tblClrs.borderClr + "'>");

                attTable.push("<tr style='background-color:" + tblClrs.headerClr + "'>");
                attTable.push("<td>SHAPE</td>");
                for (var attName in features[0].attributes) {
                    attTable.push("<td>" + attName + "</td>");
                }
                attTable.push("</tr>");

                for (var fIdx = 0; fIdx < features.length; fIdx++) {
                    var clr = (clr === tblClrs.altClr) ? tblClrs.rowClr : tblClrs.altClr;
                    var f = features[fIdx];

                    var displayFieldVal = f.attributes[displayField].toString();

                    attTable.push(string.substitute("<tr style='backgound-color:\"${1}\"' bgColor='${1}' onMouseOver='this.bgColor=\"${0}\";' onMouseOut='this.bgColor=\"${1}\";' onClick='${2}(\"${3}\",\"${4}\")' >", [tblClrs.highlightClr, clr, actionCallbackName, displayField, displayFieldVal]));
                    attTable.push("<td>" + f.geometry.type + "</td>");
                    for (var attName in f.attributes) {
                        var val = f.attributes[attName].toString();
                        if (val.indexOf('http://') == 0) {
                            val = val.link(val).replace(">", " target='_blank' >");
                        }
                        attTable.push(string.substitute("<td>${0}</td>", [val]));
                    }
                    attTable.push("</tr>");
                }
                attTable.push("</table>");

                return attTable.join("");
            },

            /**
             * BUILD FEATURE LIST
             * @method
             * @param {esri.tasks.FeatureSet} features An array of graphics.
             * @param {String} displayField The display field name.
             * @param {ESRI.APL.HtmlTableColors} tblClrs The input html table colors.
             * @param {String} actionCallbackName The name of the function to call when row is clicked; passed back to this method will be the displayField value.
             * @return {String} An html table.
             */
            createFeatureList: function (features, displayField, tblClrs, actionCallbackName) {

                // HTML TABLE COLORS
                if (tblClrs == null) {
                    tblClrs = this.defaultTableColors.inTableColors;
                }

                // MAKE SURE WE HAVE A VALID DISPLAY FIELD
                if ((displayField == null) || (!features[0].attributes.hasOwnProperty(displayField))) {
                    // USE FIRST FIELD AS DISPLAY FIELD
                    for (var attName in features[0].attributes) {
                        displayField = attName;
                        break;
                    }
                }

                var attTable = [];
                attTable.push("<table width='100%' style='border:dashed thin " + tblClrs.borderClr + "'>");

                attTable.push("<tr style='background-color:" + tblClrs.headerClr + "'>");
                attTable.push(string.substitute("<td align='center'>${0}</td>", [displayField.toUpperCase()]));
                attTable.push("</tr>");

                for (var fIdx = 0; fIdx < features.length; fIdx++) {
                    var clr = (clr === tblClrs.altClr) ? tblClrs.rowClr : tblClrs.altClr;
                    var f = features[fIdx];
                    var val = f.attributes[displayField].toString();

                    attTable.push(string.substitute("<tr style='backgound-color:\"${0}\"' bgColor='${0}' onClick='${1}(\"${2}\",\"${3}\")'>", [clr, actionCallbackName, displayField, val]));
                    attTable.push(string.substitute("<td style='padding-left:10' onMouseOver='this.bgColor=\"${0}\";' onMouseOut='this.bgColor=\"${1}\";'>${2}</td>", [tblClrs.highlightClr, clr, val]));
                    attTable.push("</tr>");
                }
                attTable.push("</table>");

                return new HtmlTable(attTable.join(""));
            }
        });
    }
)
