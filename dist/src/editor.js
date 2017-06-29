"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var block_1 = require("./block");
var line_1 = require("./line");
var Editor = (function () {
    function Editor(options) {
        this.options = options;
        this.elems = [];
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
            this.elems.push(elm);
        }
        this.handleOptions();
    }
    Editor.prototype.handleOptions = function () {
        var _this = this;
        if (this.options.saveButton === true) {
            var button = document.createElement('button');
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var saving = new CustomEvent('static_edit.saving', { detail: { changed: _this.elems.filter(function (e) { return e.hasChanged; }) } });
                window.dispatchEvent(saving);
            });
            button.textContent = 'Save';
            button.style.position = 'absolute';
            button.style.top = '20px';
            button.style.left = '20px';
            document.body.appendChild(button);
        }
    };
    Editor.prototype.editionStarted = function () {
        if (this.editing) {
            return false;
        }
        this.editing = true;
        return true;
    };
    Editor.prototype.editionEnded = function (elem, oldValue, newValue) {
        this.editing = false;
        var editionEnded = new CustomEvent('static_edit.edited', { detail: { elem: elem, oldValue: oldValue, newValue: newValue } });
        window.dispatchEvent(editionEnded);
    };
    return Editor;
}());
exports.Editor = Editor;
