"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Editable = (function () {
    function Editable(elem, editor) {
        this.elem = elem;
        this.editor = editor;
    }
    Object.defineProperty(Editable.prototype, "element", {
        get: function () {
            return this.elem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Editable.prototype, "hasChanged", {
        get: function () {
            return this.changed;
        },
        enumerable: true,
        configurable: true
    });
    return Editable;
}());
exports.Editable = Editable;
