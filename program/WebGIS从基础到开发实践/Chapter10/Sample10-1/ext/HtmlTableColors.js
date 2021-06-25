define(["dojo/_base/declare"],
    function (declare) {
        return declare(null, {
            /** 
	 * Create a new instance of ESRI.APL.HtmlTableColors
	 * 
	 * @param {String} borderClr The border color.
	 * @param {String} headerClr The header color.
	 * @param {String} rowClr The row bakground color.
	 * @param {String} altClr The alternate row background color.
	 * @return (ESRI.APL.HtmlTableColors} HTML table colors object.
	 * @constructor
	 */
            constructor: function (borderClr, headerClr, rowClr, altClr, highlightClr) {
                this.borderClr = borderClr;
                this.headerClr = headerClr;
                this.rowClr = rowClr;
                this.altClr = altClr;
                this.highlightClr = highlightClr;
            }
        });
    }
)
