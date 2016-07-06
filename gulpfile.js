var gulp = require('gulp');
var nodemon = require('nodemon');



   //nodemon, eslint


gulp.task('start', function () {
    nodemon({
      script: 'index.js'
    })
})