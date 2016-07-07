var gulp    = require('gulp');
var eslint  = require('gulp-eslint');

gulp.task('lint', () => {
    return gulp.src(['app/**/*.js', 'index.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});