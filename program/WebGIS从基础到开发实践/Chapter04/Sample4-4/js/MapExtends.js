require(["dojo/_base/lang", "esri/map", "esri/layers/LOD"], function (lang, Map, LOD) {
    lang.extend(Map, {
        addNumLevels: function (num) {
            for (var i = 0; i < num; i++) {
                var ln = this.__tileInfo.lods.length;
                var newLod = new LOD();
                newLod.level = ln;
                newLod.resolution = this.__tileInfo.lods[ln - 1].resolution / 2;
                newLod.startTileRow = this.__tileInfo.lods[ln - 1].startTileRow * 2;
                newLod.startTileCol = this.__tileInfo.lods[ln - 1].startTileCol * 2;
                newLod.endTileRow = this.__tileInfo.lods[ln - 1].endTileRow * 2;
                newLod.endTileCol = this.__tileInfo.lods[ln - 1].endTileCol * 2;
                
                if (this.__tileInfo.lods[ln - 1]._frameInfo) {
                    newLod._frameInfo = new Array();
                    newLod._frameInfo[0] = this.__tileInfo.lods[ln - 1]._frameInfo[0] * 2;
                    newLod._frameInfo[1] = this.__tileInfo.lods[ln - 1]._frameInfo[1] * 2;
                    newLod._frameInfo[2] = this.__tileInfo.lods[ln - 1]._frameInfo[2] * 2;
                    newLod._frameInfo[3] = this.__tileInfo.lods[ln - 1]._frameInfo[3] * 2;
                }
                this.__tileInfo.lods[ln] = newLod;
            }
            
            this._params.lods = this.__tileInfo.lods;
            this._params.maxScale = this.__tileInfo.lods[this.__tileInfo.lods.length - 1].scale;
            this._params.maxZoom = this.__tileInfo.lods.length - 1;
        }
    });
});