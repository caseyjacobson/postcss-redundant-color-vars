# PostCSS Redundant Color Vars

[![npm](https://img.shields.io/npm/v/postcss-redundant-color-vars.svg)](https://www.npmjs.com/package/postcss-redundant-color-vars)
[![Build Status][ci-img]][ci]

[PostCSS] plugin that fixes a [bug in safari](https://bugs.webkit.org/show_bug.cgi?id=185940) when using custom properties in certain color declarations.

[postcss]: https://github.com/postcss/postcss
[ci-img]: https://travis-ci.com/caseyjacobson/postcss-redundant-color-vars.svg
[ci]: https://travis-ci.com/caseyjacobson/postcss-redundant-color-vars

### Input

```css
.foo {
  border: 1px solid hsla(var(--primary-color), 0.5);
}

.bar {
  box-shadow: inset 1px 1px 4px rgb(var(--secondary-color));
}
```

### Output

```css
.foo {
  --redundant-border: hsla(var(--primary-color), 0.5);
  border: 1px solid var(--redundant-border);
}

.bar {
  --redundant-box-shadow: rgb(var(--secondary-color));
  box-shadow: inset 1px 1px 4px var(--redundant-box-shadow);
}
```

## Usage

```js
postcss([require('postcss-redundant-color-vars')]);
```

See [PostCSS] docs for examples for your environment.
