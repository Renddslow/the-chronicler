const mri = require('mri');
const pkg = require('./package.json');

const prog = mri(process.argv.slice(2), {
  boolean: ['watch', 'minify'],
});

const externals = [...Object.keys(pkg.dependencies), ...Object.keys(pkg.devDependencies)];

require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.js',
  minify: prog.minify,
  watch: prog.watch,
  define: {
    'process.env.VERSION': `"${require('./package.json').version}"`,
  },
  external: externals,
});
