# Static-Edit

A simple yet powerful static website editor.

## Installation

You can install this via npm or yarn.

```bash
$ yarn add static-edit
# OR
$ npm install static-edit
```

You can also download the file directly from here:
    - [static-edit.min.js](https://raw.githubusercontent.com/thomasruiz/static-edit/master/dist/static-edit.min.js)
    - [static-edit.js](https://raw.githubusercontent.com/thomasruiz/static-edit/master/dist/static-edit.js)

## Getting started

Add the script at the end of the page that you want to edit.

```html
<script src="static-edit.js"></script>
```

Initialize the script right after that line
```html
<script>
    (function () {
        new StaticEdit.Editor()
    })()
</script>
```

Add the HTML class `editable` to any content that you want to edit.

For example:

```html
<p class="editable">Hello world!</p>
<h1 class="editable">Foo Bar</h1>
<img class="editable" src="img/my-img.png">
<div class="bg-editable" style="background-image: url(img/bg-img.png)"></div>
```

## Options

You can customize the editor with the following options (the examples show the default):

```html
<script>
    (function () {
        new StaticEdit.Editor({
            saveButton: false, // Whether to show the save button or not
            selector: '.editable', // The selector to use for all the elements
            bgSelector: '.bg-editable', // The selector to use for all background image edition
        })
    })()
</script>
```

## API

The following events are dispatched to the current window:

```javascript
window.addEventListener('static_edit.editing', function (e) {
    // An editable element was clicked
    // e.detail.elem: the element that is changing
    // e.detail.oldValue: the current value of the element
})

window.addEventListener('static_edit.edited', function (e) {
    // An editable element was changed
    // e.detail.elem: the element that has been changed
    // e.detail.oldValue: the old value of the element
    // e.detail.newValue: the new value of the element
})

window.addEventListener('static_edit.saving', function (e) {
    // The "save" button was clicked
    // e.detail.changed: contains a list of the elements that have been changed
})
```

All the elements are instances of a class that have the following public methods/properties:

```typescript
class Element {
    value: string // the current value of the element
    element: HTMLElement // the corresponding element in the DOM
    hasChanged: boolean // whether the element has changed or not
}
```
