var gulp    = require('gulp');
var dir     = require('require-dir');


gulp.task('default', ['lint', 'dev'], function () {

});


var path = {
    script : 'index.js'
}

var constants = {
    path : path
}

gulp.constants = constants;

dir('./gulp');