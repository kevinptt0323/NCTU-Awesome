const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const less = require('gulp-less');

const expose = {
  'jquery': '$',
  'componentHandler': 'componentHandler',
};

gulp.task('build:course', ['build:course:js', 'build:course:css']);
gulp.task('build:course:js', (done) => {
  const files = [
    `${__dirname}/src/course/index.js`,
  ];
  Promise.all(files.map(entry => {
    const stream = browserify({
      entries: [entry],
      transform: [babelify],
    })
      .transform('exposify', { expose })
      .bundle()
      .pipe(source(entry.split('/').reverse()[0]))
      .pipe(gulp.dest(`${__dirname}/dist/course`));
    return new Promise((resolve, reject) => {
      stream.on('end', () => resolve());
    });
  }))
    .then(() => done());
});

gulp.task('build:course:css', (done) => {
  const files = [
    `${__dirname}/src/course/index.less`,
    `${__dirname}/src/course/table.less`
  ];
  Promise.all(files.map(entry => {
    gulp.src(entry)
      .pipe(less())
      .pipe(gulp.dest(`${__dirname}/dist/course`));
  }))
    .then(() => done());
});

gulp.task('build', ['build:course']);
