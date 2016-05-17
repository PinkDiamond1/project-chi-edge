import fs from 'fs';

import gulp from 'gulp';
import gutil from 'gulp-util';
import jspm from 'jspm';

import config from '../config';

function readJSONSync (file) {
  let pjson;
  try {
    pjson = fs.readFileSync(file).toString();
  } catch (e) {
    console.log(e);
    if (e.code === 'ENOENT') {
      pjson = '{}';
    }
  }
  try {
    return JSON.parse(pjson);
  } catch (e) {
    throw new Error(`Error parsing package.json file ${file}`);
  }
}

gulp.task('rm-local-modules', () => {
  const pkg = readJSONSync('package.json');
  const deps = pkg.jspm.dependencies;
  const locals = [];

  for (const d in deps) {
    if (deps[d].indexOf('local:') === 0) {
      gutil.log('removing jspm dependency local:', d);
      locals.push(d);
    }
  }

  return jspm.uninstall(locals);
});

gulp.task('rm-peer-deps', () => {
  const pkg = readJSONSync('package.json');
  const peers = Object.keys(pkg.jspm.peerDependencies);
  gutil.log('uninstalling jspm peer dependencies');

  return jspm.uninstall(peers);
});

gulp.task('install-dataset', () => {
  // const dataset = path.join('./', config.paths.dataset);
  gutil.log('installing jspm dependencies for', config.paths.dataset);

  return jspm.link(config.paths.dataset);
});

gulp.task('install', gulp.series('install-dataset', 'rm-local-modules'));
