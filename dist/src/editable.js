"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Editable = (function () {
    function Editable(elem, editor) {
        this.elem = elem;
        this.editor = editor;
    }
    Editable.prototype.bindEvents = function () {
        var _this = this;
        this.elem.addEventListener('click', function (e) {
            e.stopPropagation();
            e.preventDefault();
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
                input.style.height = input.scrollHeight + 'px';
            };
            // Workaround for cut, paste, drop and keydown
            var delayedResize = function () { return window.setTimeout(resize, 0); };
            input.addEventListener('change', resize);
            input.addEventListener('cut', delayedResize);
            input.addEventListener('paste', delayedResize);
            input.addEventListener('drop', delayedResize);
            input.addEventListener('keydown', delayedResize);
            input.style.width = 'auto';
            input.style.height = _this.elem.offsetHeight + 'px';
            input.style.overflowY = "hidden";
            input.style.fontSize = window.getComputedStyle(_this.elem).fontSize;
            _this.elem.parentNode.replaceChild(input, _this.elem);
            input.focus();
            resize();
        }, true);
    };
    Object.defineProperty(Editable.prototype, "value", {
        get: function () {
            return this.elem.textContent;
        },
        enumerable: true,
        configurable: true
    });
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
