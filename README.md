# Static-Edit

A simple yet powerful static website editor.

## Usage

Initialize the static editor:

```html
<script src="../dist/static-edit.js"></script>
<script>
    (function () {
        new StaticEdit.Editor({saveButton: true})
    })()
</script>
```

Add the HTML class `editable` to any content that you want to edit.

For example:

```html
<p class="editable">Hello world!</p>
<h1 class="editable">Foo Bar</h1>
<img class="editable" src="img/my-img.png">

## COMING SOON

<div class="bg-editable" style="background-image: url(img/bg-img.png)"></div>
```

## 
