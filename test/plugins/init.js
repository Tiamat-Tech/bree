const test = require('ava');
const path = require('path');

const Bree = require('../../src');

const root = path.join(__dirname, '..', 'jobs');
const baseConfig = {
  root,
  timeout: 0,
  interval: 0,
  hasSeconds: false,
  defaultExtension: 'js'
};

test('plugin can extend init', (t) => {
  t.plan(3);

  const plugin = (_, c) => {
    const origInit = c.prototype.init;

    c.prototype.init = function () {
      origInit.bind(this)();

      t.pass();
    };
  };

  Bree.extend(plugin);

  t.is(plugin.$i, true);

  const bree = new Bree({ ...baseConfig });

  t.true(bree instanceof Bree);
});
