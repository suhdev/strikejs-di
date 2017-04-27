const gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'); 


gulp.task('default',()=>{
    gulp.src('./lib/di.js')
        .pipe(uglify('di.min.js'))
        .pipe(gulp.dest('./lib')); 
}); 