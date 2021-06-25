define(["dojo/_base/declare"],
    function (declare) {
        return declare(null, {
            tableItems: [],
            tableAsHTML: '',
            tableClrs: null,

            constructor: function (tableAsHTML, tableClrs) {
                this.tableAsHTML = tableAsHTML;
                this.tableClrs = tableClrs;
            },

            asHTML: function () {
                return this.tableAsHTML;
            }
        });
    }
)
