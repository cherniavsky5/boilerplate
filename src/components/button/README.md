# Button

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

## Example

```js
+component-button({
  title: 'ClickMe!',
  type: 'primary'
}, {
  class: 'header__button',
  disabled: true
})
```

## Options

```js
{
  type: String,
  title: String,
  size: String
}
```

#### type

```
Default: 'primary'
```

#### title

```
Default: ''
```

#### size

```
Default: ''
```

## Attributes
Any HTML attributes
