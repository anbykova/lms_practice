var gulp    = require('gulp');
var nodemon = require('nodemon');

var constants = gulp.constants;

gulp.task('dev', ['lint', 'prepare_db'], function () {
    nodemon({
      script: constants.path.script
    })
});