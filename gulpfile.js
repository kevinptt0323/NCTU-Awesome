const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const less = require('gulp-less');
const watchLess = require('gulp-watch-less2');
const gutil = require('gulp-util');

const expose = {
  'jquery': '$',
  'componentHandler': 'componentHandler',
};

function addCourseTask() {
  const taskName = 'course';
  const rebundle = (b, entry) => (
    b.transform('exposify', { expose })
      .bundle()
      .pipe(source(entry.split('/').reverse()[0]))
      .pipe(gulp.dest(`${__dirname}/dist/course`))
  );
  const files = {
    script: [
      `${__dirname}/src/course/index.js`,
      `${__dirname}/src/course/testCourse.js`,
    ],
    style: [
      `${__dirname}/src/course/index.less`,
      `${__dirname}/src/course/table.less`,
      `${__dirname}/src/course/testCourse.less`,
    ],
  };

  gulp.task(`build:${taskName}`, [`build:${taskName}:script`, `build:${taskName}:style`]);
  gulp.task(`watch:${taskName}`, [`watch:${taskName}:script`, `watch:${taskName}:style`]);
  gulp.task(`build:${taskName}:script`, (done) => {
    Promise.all(files.script.map(entry => {
      let b = browserify({
        entries: [entry],
        transform: [babelify],
      })
      b = rebundle(b, entry);
      return new Promise((resolve, reject) => {
        b.on('end', resolve);
      });
    }))
      .then(() => done());
  });

  gulp.task(`build:${taskName}:style`, (done) => {
    Promise.all(files.style.map(entry => {
      gulp.src(entry)
        .pipe(less())
        .pipe(gulp.dest(`${__dirname}/dist/course`));
    }))
      .then(() => done());
  });

  gulp.task(`watch:${taskName}:script`, () => {
    files.script.map(entry => {
      let b = browserify({
        entries: [entry],
        transform: [babelify],
      })
      b = watchify(b);
      b.on('update', () => rebundle(b, entry));
      b.on('log', gutil.log);
      rebundle(b, entry);
    });
  });

  gulp.task(`watch:${taskName}:style`, () => {
    files.style.map(entry => {
      gulp.src(entry)
        .pipe(watchLess(entry, { verbose: true }))
        .pipe(less())
        .pipe(gulp.dest(`${__dirname}/dist/course`));
    });
  });
}

function addE3NewTask() {
  const taskName = 'e3new';
  const rebundle = (b, entry) => (
    b.transform('exposify', { expose })
      .bundle()
      .pipe(source(entry.split('/').reverse()[0]))
      .pipe(gulp.dest(`${__dirname}/dist/${taskName}`))
  );
  const files = {
    style: [
      `${__dirname}/src/e3new/index.less`,
    ],
  };

  gulp.task(`build:${taskName}`, (done) => {
    Promise.all(files.style.map(entry => {
      gulp.src(entry)
        .pipe(less())
        .pipe(gulp.dest(`${__dirname}/dist/${taskName}`));
    }))
      .then(() => done());
  });
  gulp.task(`watch:${taskName}`, () => {
    files.style.map(entry => {
      gulp.src(entry)
        .pipe(watchLess(entry, { verbose: true }))
        .pipe(less())
        .pipe(gulp.dest(`${__dirname}/dist/${taskName}`));
    });
  });
}

addCourseTask();

addE3NewTask();

gulp.task('build', ['build:course', 'build:e3new']);
gulp.task('watch', ['watch:course', 'build:e3new']);
