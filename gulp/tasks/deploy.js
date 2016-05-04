import gulp from 'gulp';
import gutil from 'gulp-util';
import ghPages from 'gulp-gh-pages';

import config from '../config';

gulp.task('deploy', gulp.series('build', () => {
  gutil.log('deploying to', gutil.colors.magenta(config.deploy.ghPages.branch || 'gh-pages'), 'in', gutil.colors.magenta(config.deploy.ghPages.remoteUrl || 'default'));
  return gulp.src([`${config.paths.dist}/**/*`], {followSymlinks: true, dot: true})
    .pipe(ghPages(config.deploy.ghPages));
}));
