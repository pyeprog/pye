const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('less', () => {
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
  gulp.watch('./less/*.less', ['less']);
});

gulp.task('default', ['watch']);
