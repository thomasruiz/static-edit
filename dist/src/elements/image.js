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
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Image.prototype, "value", {
        get: function () {
            return this.elem.src;
        },
        enumerable: true,
        configurable: true
    });
    Image.prototype.changeValue = function (value, name) {
        this.elem.src = value;
        this.elem.dataset.fileName = name;
    };
    return Image;
}(file_upload_1.FileUpload));
exports.Image = Image;
