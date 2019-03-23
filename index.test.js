const postcss = require('postcss');
const plugin = require('./');

const run = (input, output) =>
  postcss([plugin])
    .process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings()).toHaveLength(0);
    });

it('does nothing', function() {
  return run('a { border: 1px solid red; }', 'a { border: 1px solid red; }');
});

it('ignores other border declarations', function() {
  return run(
    'a { border-color: rgb(var(--bd)); border-top: 1px solid rgb(var(--bd)); }',
    'a { border-color: rgb(var(--bd)); border-top: 1px solid rgb(var(--bd)); }'
  );
});

it('adds redundant custom properties', function() {
  return run(
    'a { border: 1px solid rgb(var(--bd)); box-shadow: inset 1px 2em 3q hsla(var(--h), var(--s), var(--l), .3); }',
    'a { --redundant-border: rgb(var(--bd)); border: 1px solid var(--redundant-border); --redundant-box-shadow: hsla(var(--h), var(--s), var(--l), .3); box-shadow: inset 1px 2em 3q var(--redundant-box-shadow); }'
  );
});
