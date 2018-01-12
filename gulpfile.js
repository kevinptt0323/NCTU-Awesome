const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');

gulp.task('build:course', () => {
  const b = browserify({
    entries: `${__dirname}/src/course/index.js`
  });
  b.bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest(`${__dirname}/dist/course`));
});

gulp.task('build', ['build:course']);
