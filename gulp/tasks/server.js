import gulp from 'gulp';
import browserSync from 'browser-sync';

import config from '../config';

gulp.task('dev', done => {
  browserSync(config.devServer, done);
});

gulp.task('dist', gulp.series('build', done => {
  browserSync(config.distServer, done);
}));
