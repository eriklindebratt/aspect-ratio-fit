# aspect-ratio-fit

Makes your iframe embeds responsive, without any JS library.

This project is inspired by the great [FitVids.js](https://github.com/davatron5000/FitVids.js) but aims for a more lightweight approach that doesn't rely on jQuery.

## Usage

Include aspect-ratio-fit.js in your HTML:

```html
<iframe width="420" height="315" src="https://www.youtube.com/embed/WbYMexOHJCQ" frameborder="0" allowfullscreen></iframe>

<!--
If you don't like the thought about JavaScript changing your
DOM structure you could just wrap your embeds manually.
The default behavior is that aspect-ratio-fit.js will wrap
your element with `<div class="aspect-ratio-wrapper"></div>`.
-->
<div class="aspect-ratio-wrapper">
  <iframe width="420" height="315" src="https://www.youtube.com/embed/WbYMexOHJCQ" frameborder="0" allowfullscreen></iframe>
</div>

<script src="aspect-ratio-fit.js"></script>
```

Instantiate AspectRatioFit for each element:

```javascript
var elems = document.querySelectorAll('iframe');
for (var i = 0; i < elems.length; i++) {
  new AspectRatioFit(elems[i]);
}

// or with custom arguments
for (var i = 0; i < elems.length; i++) {
  new AspectRatioFit(document.querySelector('iframe'), {
    wrapperClassName: 'some-custom-wrapper-class-name',  // class name of the wrapping element
    stylesheetIdentifier: 'aspect-ratio-fit-styles'  // ID of the stylesheet created by aspect-ratio-fit.js
  });
}
```

## License
[MIT](http://eriklindebratt.mit-license.org/)
