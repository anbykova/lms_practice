var gulp    = require('gulp');
var nodemon = require('nodemon');
var exec = require('child_process').exec;


gulp.task('prepare_db', function (cb) {
   exec('node ./scripts/init_db.js', function (err, stdout, stderr) {
     console.log(stdout);
     console.log(stderr);
     cb(err);
   });
// start initdb

});