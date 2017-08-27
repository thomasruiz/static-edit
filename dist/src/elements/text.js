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
var Text = (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype.bindEvents = function () {
        var _this = this;
        this.elem.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
            e.cancelBubble = true;
            if (!_this.editor.editionStarted(_this.elem, _this.elem.innerText)) {
                return false;
            }
            var input = _this.createField();
            input.value = _this.elem.innerText;
            input.addEventListener('blur', function () {
                var oldValue = _this.elem.innerText;
                var newValue = input.value;
                _this.elem.innerText = newValue;
                _this.changed = true;
                input.parentNode.replaceChild(_this.elem, input);
                // Make sure that no one triggers a new click on an editable while this is running
                setTimeout(function () { return _this.editor.editionEnded(_this.elem, oldValue, newValue); }, 100);
            });
            input.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            var resize = function () {
                input.style.height = 'auto';
                input.style.height = input.scrollHeight + "px";
            };
            // Workaround for cut, paste, drop and keydown
            var delayedResize = function () { return window.setTimeout(resize, 0); };
            input.addEventListener('change', resize);
            input.addEventListener('cut', delayedResize);
            input.addEventListener('paste', delayedResize);
            input.addEventListener('drop', delayedResize);
            input.addEventListener('keydown', delayedResize);
            input.style.width = 'auto';
            input.style.height = _this.elem.offsetHeight + "px";
            input.style.overflowY = "hidden";
            input.style.fontSize = window.getComputedStyle(_this.elem).fontSize;
            _this.elem.parentNode.replaceChild(input, _this.elem);
            input.focus();
            resize();
        }, true);
    };
    Object.defineProperty(Text.prototype, "value", {
        get: function () {
            return this.elem.textContent;
        },
        enumerable: true,
        configurable: true
    });
    return Text;
}(editable_1.Editable));
exports.Text = Text;
