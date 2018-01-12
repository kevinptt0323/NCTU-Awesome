const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

gulp.task('build:course', (done) => {
  const files = [
    `${__dirname}/src/course/index.js`,
  ];
  return files.map(entry => {
    const stream = browserify({
      entries: [entry],
      transform: [babelify]
    })
      .bundle()
      .pipe(source(entry.split('/').reverse()[0]))
      .pipe(gulp.dest(`${__dirname}/dist/course`));
    return new Promise((resolve, reject) => {
      stream.on('end', () => resolve());
    });
  });
});

gulp.task('build', ['build:course']);
