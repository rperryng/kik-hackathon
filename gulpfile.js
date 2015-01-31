var gulp = require('gulp'),
  del = require('del');

var plugins = require('gulp-load-plugins')();

var paths = {
  source: {
    scripts: [
      './client/src/app/app.module.js',
      './client/src/app/**/*.js',
      './client/src/app/*.js',
    ],
    styles: [
      './client/src/styles/*.less'
    ]
  },
  build: {
    root: './client/dist',
    scripts: './client/dist/app(.min).js',
    styles: './client/dist/theme(.min).css'
  }
};

gulp.task('scripts', function () {
  del(paths.build.scripts, function () {
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

gulp.task('styles', function () {
  del(paths.build.scripts, function () {
    return gulp.src(paths.source.styles)
      .pipe(plugins.less())
      .pipe(plugins.concat('theme.css'))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions']
      }))
      .pipe(gulp.dest(paths.build.root))
      .pipe(plugins.minifyCss())
      .pipe(plugins.rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(paths.build.root));
  });
});

gulp.task('default', ['scripts', 'styles'], function () {
  gulp.watch(paths.source.scripts, ['scripts']);
  gulp.watch(paths.source.styles, ['styles']);
});
