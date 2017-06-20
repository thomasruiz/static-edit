(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
exports.__esModule = true;
var editable_1 = require("./editable");
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Block.prototype.createField = function () {
        return document.createElement('textarea');
    };
    return Block;
}(editable_1.Editable));
exports.Block = Block;

},{"./editable":2}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
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
            if (!_this.editor.editionStarted()) {
                return false;
            }
            var input = _this.createField();
            input.value = _this.elem.innerText;
            input.addEventListener('blur', function () {
                _this.elem.innerText = input.value;
                input.parentNode.replaceChild(_this.elem, input);
                // Make sure that no one triggers a new click on an editable while this is running
                setTimeout(function () { return _this.editor.editionEnded(); }, 50);
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
            input.style.fontSize = window.getComputedStyle(_this.elem).fontSize;
            _this.elem.parentNode.replaceChild(input, _this.elem);
            input.focus();
            resize();
        }, true);
    };
    return Editable;
}());
exports.Editable = Editable;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var block_1 = require("./block");
var line_1 = require("./line");
var Editor = (function () {
    function Editor() {
        var elems = document.getElementsByClassName('editable');
        for (var i = 0; i < elems.length; ++i) {
            var elm = void 0;
            if (elems[i].tagName === 'P') {
                elm = new block_1.Block(elems[i], this);
            }
            else {
                elm = new line_1.Line(elems[i], this);
            }
            elm.bindEvents();
        }
    }
    Editor.prototype.editionStarted = function () {
        if (this.editing) {
            return false;
        }
        this.editing = true;
        return true;
    };
    Editor.prototype.editionEnded = function () {
        this.editing = false;
    };
    return Editor;
}());
exports.Editor = Editor;

},{"./block":1,"./line":4}],4:[function(require,module,exports){
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
exports.__esModule = true;
var editable_1 = require("./editable");
var Line = (function (_super) {
    __extends(Line, _super);
    function Line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Line.prototype.createField = function () {
        return document.createElement('input');
    };
    return Line;
}(editable_1.Editable));
exports.Line = Line;

},{"./editable":2}],5:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var editor_1 = require("./editor");
(function () {
    new editor_1.Editor();
})();

},{"./editor":3}]},{},[5])

//# sourceMappingURL=bundle.js.map
