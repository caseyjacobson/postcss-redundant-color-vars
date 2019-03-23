const postcss = require('postcss');

module.exports = postcss.plugin('postcss-redundant-color-vars', () => root => {
  const regex = /(rgb|hsl)a?\(.*var\(--.*\)$/gm;

  root.walkDecls(/border|box-shadow/, decl => {
    const matches = decl.value.match(regex);

    if (matches && matches.length > 0) {
      decl.replaceWith([
        decl.clone({ prop: `--redundant-${decl.prop}`, value: matches[0] }),
        decl.clone({
          value: decl.value.replace(regex, `var(--redundant-${decl.prop})`)
        })
      ]);
    }
  });
});
