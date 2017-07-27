"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var block_1 = require("./block");
var line_1 = require("./line");
var image_1 = require("./image");
var Editor = (function () {
    function Editor(options) {
        this.options = options;
        this.selector = '.editable';
        this.handleOptions();
        this.elems = [];
        var elems = document.querySelectorAll(this.selector);
        for (var i = 0; i < elems.length; ++i) {
            var elm = void 0;
            if (elems[i].tagName === 'P') {
                elm = new block_1.Block(elems[i], this);
            }
            else if (elems[i].tagName === 'IMG') {
                elm = new image_1.Image(elems[i], this);
            }
            else {
                elm = new line_1.Line(elems[i], this);
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
