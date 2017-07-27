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
var editable_1 = require("./editable");
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image.prototype.createField = function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        return input;
    };
    Image.prototype.bindEvents = function () {
        var _this = this;
        this.elem.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var file = _this.createField();
            file.addEventListener('change', function () {
                var uploadedFile = file.files[0];
                if (!!uploadedFile.type.match(/image.*/)) {
                    var reader = new FileReader();
                    reader.addEventListener('loadend', function (e) {
                        var newValue = e.target.result;
                        var oldValue = _this.elem.src;
                        _this.elem.src = newValue;
                        _this.elem.dataset.fileName = uploadedFile.name;
                        _this.elem.parentNode.removeChild(file);
                        setTimeout(function () { return _this.editor.editionEnded(_this.elem, oldValue, newValue); }, 100);
                    });
                    reader.readAsDataURL(uploadedFile);
                }
            });
            _this.elem.parentNode.appendChild(file);
            file.click();
        }, true);
    };
    return Image;
}(editable_1.Editable));
exports.Image = Image;
