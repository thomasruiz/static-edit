"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var file_upload_1 = require("./file-upload");
var BgEditable = (function (_super) {
    __extends(BgEditable, _super);
    function BgEditable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BgEditable.prototype, "value", {
        get: function () {
            return this.elem.style.backgroundImage;
        },
        enumerable: true,
        configurable: true
    });
    BgEditable.prototype.changeValue = function (value, name) {
        this.elem.dataset.fileName = name;
        this.elem.style.backgroundImage = "url(" + value + ")";
    };
    return BgEditable;
}(file_upload_1.FileUpload));
exports.BgEditable = BgEditable;
