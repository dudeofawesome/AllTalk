// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var server = require('gulp-express');
var spawn = require('child_process').spawn;

var mongoRunning = false;

// Lint Task
gulp.task('lint', function() {
    return gulp.src('pages/resources/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('pages/resources/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('pages/resources/styles/dist'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('pages/resources/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('pages/resources/scripts/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('pages/resources/scripts/dist'));
});

gulp.task('node-server', function() {
    gulp.start('start-mongo');
    server.stop();
    server.run(['server.js']);
});

gulp.task('start-mongo', function () {
    if (!mongoRunning) {
        var mongod = spawn('mongod', ['--dbpath', './db/']);
        mongod.stdout.on('data', function (data) {
            if (data.toString().indexOf('waiting for connections on port 27017') > -1) {
                mongoRunning = true;
                console.log('Mongo DB listening on *:27017');
            }
        });
    }
});
gulp.task('stop-mongo', function () {
    if (mongoRunning) {
        var mongod = spawn('mongod', ['--eval', '"use admin; db.shutdownServer();"']);
        mongod.stdout.on('data', function (data) {
            if (data !== undefined) {
                mongoRunning = false;
                console.log('Mongo DB stopped listening');
            }
        });
    }
});

// Watch Files For Changes
gulp.task('watch', function() {
//    gulp.watch('pages/resources/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('pages/resources/scripts/*.js', ['scripts']);
    gulp.watch('pages/resources/styles/*.scss', ['sass']);

    gulp.watch('pages/*.html', ['node-server']);
    gulp.watch('*.js', ['node-server']);
    gulp.watch('modules/*.js', ['node-server']);
});

// Default Task
gulp.task('default', ['sass', 'scripts']);
gulp.task('build-run', ['default', 'watch', 'node-server']);
