var gulp = require('gulp'),
  del = require('del');

var plugins = require('gulp-load-plugins')();

var paths = {
  source: {
    scripts: [
      './client/src/home/*.js',
      './client/src/*.js'
    ]
  },
  build: {
    root: './client/dist',
    scripts: './client/dist/app.js'
  }
};

gulp.task('scripts', function () {
  return del(paths.build.scripts, function () {
    return gulp.src(paths.source.scripts)
      .pipe(plugins.concat('app.js'))
      .pipe(gulp.dest(paths.build.root))
      .pipe(plugins.uglify({

      }))
      .pipe(plugins.rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest(paths.build.root));
  });
});

gulp.task('default', ['scripts'], function () {
  gulp.watch(paths.source.scripts, ['scripts']);
});
