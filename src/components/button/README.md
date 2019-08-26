# Button

## Pug

```
include { button } from components
```

```js
/**
 * @param { Object } options
 * @param { Object } attrs
**/

+component-button(options, attributes)
```

### Example

#### Call
```
+component-button({
  title: 'Button',
  type: 'primary'
}, {
  class: 'header__button',
  disabled: true
})

+component-button({
  href: 'index.html',
  title: 'Link',
  type: 'primary'
}, {
  class: 'header__link'
})
```

#### Compiled
```html
<button class="button button--primary header__button" disabled>Button</button>

<a href="index.html" title="Link" class="button button--primary header__link">Link</a>
```

### Options

```js
{
  href: String,
  type: String,
  title: String,
  size: String
}
```

##### href

```
Default: ''
```

##### title

```
Default: ''
```

##### type

```
Default: 'primary'
```

##### size

```
Default: ''
```

### Attributes
Any HTML attributes


## Javascript
