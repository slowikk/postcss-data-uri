# PostCSS data-uri
PostCSS plugin. Generate base64 images in CSS

```css
.foo {
    background-image: data-uri(image.gif);
}
.bar {
    background: #fff data-uri(image.gif) no-repeat center center;
}
```
```css
.foo {
    background-image: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);
}
.bar {
    background: #fff url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==) no-repeat center center
}
```

## Usage

```js
postcss([ require('postcss-data-uri') ])
```
