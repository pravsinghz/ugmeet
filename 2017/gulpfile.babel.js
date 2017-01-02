'use strict';

import gulp from 'gulp';
import clean from 'gulp-rimraf';
import sass from 'gulp-sass';
import pug from 'gulp-pug';
import browser_sync from 'browser-sync';
import runSequence from 'run-sequence';

var browserSync = browser_sync.create();

const paths = {
  scripts: {
    src: 'js/**/*.js',
    dest: 'docs/assets/js'
  },
  styles: {
    src: 'scss/**/*.scss',
    dest: 'docs/assets/css/'
  },
  pug: {
    src: '*.pug',
    dest: 'docs/'
  },
  images: {
    src: 'img/**/*.*',
    dest: 'docs/assets/img'
  },
  fonts: 'fonts/*'
};

gulp.task('clean:dist', () => {
  console.log("Clean all files in docs folder");
  return gulp.src("docs/*", {read: false}).pipe(clean());
});

gulp.task('styles', () => {
  return gulp.src(paths.styles.src)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src(paths.pug.src)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.pug.dest))
    .pipe(browserSync.stream());
});

gulp.task('copy', () => {

  // gulp.src('bower_components/bootstrap/docs/css/*.min.css').pipe(gulp.dest('docs/assets/css'));
  // gulp.src('bower_components/bootstrap/docs/fonts/*.*').pipe(gulp.dest('docs/assets/fonts'));
  // gulp.src('bower_components/bootstrap/docs/js/*.js').pipe(gulp.dest('docs/assets/js'));
  //
  // gulp.src('bower_components/jquery/docs/*.js').pipe(gulp.dest('docs/assets/js'));
  //
  // gulp.src(paths.scripts.src).pipe(gulp.dest(paths.scripts.dest));
  //
  // gulp.src(paths.images.src, {dot: true})
  //     .pipe(gulp.dest(paths.images.dest))
  //     .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch(paths.styles.src, ['styles']);
  gulp.watch(paths.pug.src, ['html']);
  gulp.watch('**/*.pug', ['html']);
});

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'docs'
    }
  });
});

gulp.task('build', () => {
  runSequence(['clean:dist', 'styles', 'html', 'copy']);
});

gulp.task('default', () => {
  runSequence(['build', 'serve', 'watch']);
});
