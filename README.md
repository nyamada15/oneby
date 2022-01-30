Oneby
=======

Creates an effect that randomly displays text one character at a time.

## Notes
- All modern browsers and IE11 are supported.
- jQuery is not required.
- No support for HTML tags in text.

## Start
Include the JS file from the dist folder.
```html
<script src="./dist/oneby.min.js" ></script>
```

Create the text.
data-oneby-delay, data-oneby-interval and data-oneby-duration attributes are optional.
```html
<p id="test_oneby" data-oneby-delay="0.2" data-oneby-interval="0.1" data-oneby-duration="0.6">Oneby test</p>
```

Execution.
In case of Id selector.
```javascript
var idElm = new Oneby('#demo_oneby');
idElm.runEffect();  // Parameter is unnecessary.
```

Execution.
In case of Class selector.
```javascript
var idElm = new Oneby('.demo_oneby_class');
var nodelist = document.querySelectorAll('.demo_oneby_class');
for (var i = 0; i < nodelist.length; i++) {
    classElm.runEffect(nodelist[i]);    // Parameter of Element Object is required.
}
```

## Options
### data-oneby-delay
You can set delay time(s) until effect starting.

### data-oneby-interval
You can set interval time(s) between each character appearance.

### data-oneby-duration
You can set duration time(s) of appearance.

## Customize
Effect of characters appear can customize override css properties.
See /src/style.scss for details.

## Demo
See /index.html.