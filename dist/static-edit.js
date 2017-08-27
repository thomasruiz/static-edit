(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.StaticEdit = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var block_1 = require("./elements/block");
var line_1 = require("./elements/line");
var image_1 = require("./elements/image");
var bg_editable_1 = require("./elements/bg-editable");
var Editor = (function () {
    function Editor(options) {
        this.options = options;
        this.selector = '.editable';
        this.bgSelector = '.bg-editable';
        this.handleOptions();
        this.elems = [];
        var elems = Array.from(document.querySelectorAll(this.selector));
        elems = elems.concat(Array.from(document.querySelectorAll(this.bgSelector)));
        for (var i = 0; i < elems.length; ++i) {
            var elm = void 0;
            var htmlElement = elems[i];
            if (htmlElement.matches(this.bgSelector)) {
                elm = new bg_editable_1.BgEditable(htmlElement, this);
            }
            else if (elems[i].tagName === 'P') {
                elm = new block_1.Block(htmlElement, this);
            }
            else if (elems[i].tagName === 'IMG') {
                elm = new image_1.Image(htmlElement, this);
            }
            else {
                elm = new line_1.Line(htmlElement, this);
            }
            elm.bindEvents();
            this.elems.push(elm);
        }
    }
    Editor.prototype.handleOptions = function () {
        if (this.options.saveButton === true) {
            this.createSaveButton();
        }
        if (this.options.selector !== undefined) {
            this.selector = this.options.selector;
        }
    };
    Editor.prototype.createSaveButton = function () {
        var _this = this;
        var button = document.createElement('button');
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent('static_edit.saving', { detail: { changed: _this.elems.filter(function (e) { return e.hasChanged; }) } }));
        });
        button.textContent = 'Save';
        button.style.position = 'absolute';
        button.style.top = '20px';
        button.style.left = '20px';
        document.body.appendChild(button);
    };
    Editor.prototype.editionStarted = function (elem, oldValue) {
        if (this.editing) {
            return false;
        }
        this.editing = true;
        window.dispatchEvent(new CustomEvent('static_edit.editing', { detail: { elem: elem, oldValue: oldValue } }));
        return true;
    };
    Editor.prototype.editionEnded = function (elem, oldValue, newValue) {
        this.editing = false;
        window.dispatchEvent(new CustomEvent('static_edit.edited', { detail: { elem: elem, oldValue: oldValue, newValue: newValue } }));
    };
    return Editor;
}());
exports.Editor = Editor;

},{"./elements/bg-editable":2,"./elements/block":3,"./elements/image":6,"./elements/line":7}],2:[function(require,module,exports){
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

},{"./file-upload":5}],3:[function(require,module,exports){
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
var text_1 = require("./text");
var Block = (function (_super) {
    __extends(Block, _super);
    function Block() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Block.prototype.createField = function () {
        return document.createElement('textarea');
    };
    return Block;
}(text_1.Text));
exports.Block = Block;

},{"./text":8}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
var FileUpload = (function (_super) {
    __extends(FileUpload, _super);
    function FileUpload() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileUpload.prototype.createField = function () {
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        return input;
    };
    FileUpload.prototype.bindEvents = function () {
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
                        var oldValue = _this.value;
                        _this.changeValue(newValue, uploadedFile.name);
                        _this.changed = true;
                        _this.elem.parentNode.removeChild(file);
                        setTimeout(function () { return _this.editor.editionEnded(_this.elem, oldValue, newValue); }, 100);
                    });
                    reader.readAsDataURL(uploadedFile);
                }
            });
            _this.elem.parentNode.appendChild(file);
            file.click();
        });
    };
    return FileUpload;
}(editable_1.Editable));
exports.FileUpload = FileUpload;

},{"./editable":4}],6:[function(require,module,exports){
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

},{"./file-upload":5}],7:[function(require,module,exports){
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
var text_1 = require("./text");
var Line = (function (_super) {
    __extends(Line, _super);
    function Line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Line.prototype.createField = function () {
        return document.createElement('input');
    };
    return Line;
}(text_1.Text));
exports.Line = Line;

},{"./text":8}],8:[function(require,module,exports){
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

},{"./editable":4}]},{},[1])(1)
});

//# sourceMappingURL=static-edit.js.map
