var gulp = require('gulp');

var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
var server = require('gulp-express');
var spawn = require('child_process').spawn;

var mongoRunning = false;

gulp.task('lint', function () {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function () {
    return gulp.src('**/test/*.js', {read: false})
        .pipe(mocha());
});

gulp.task('sass', function () {
    return gulp.src('pages/resources/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('pages/resources/styles/dist'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('pages/resources/styles/dist/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('pages/resources/styles/dist'));
});

gulp.task('scripts', function () {
    // TODO add uglify back in once it works
    // TODO seperate each view's scripts
    // return gulp.src('pages/resources/scripts/*.js')
    //     .pipe(concat('all.js'))
    //     .pipe(gulp.dest('pages/resources/scripts/dist'))
    //     .pipe(rename('all.min.js'))
    //     .pipe(uglify())
    //     .pipe(gulp.dest('pages/resources/scripts/dist'));
    return gulp.src(['pages/resources/scripts/main/*.js', 'pages/resources/scripts/messaging/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('pages/resources/scripts/dist'));
});

gulp.task('node-server', function () {
    gulp.start('start-mongo');
    if (server !== undefined) {
        server.stop();
    }
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

gulp.task('watch', function () {
    gulp.watch('pages/resources/scripts/main/*.js', ['scripts']);
    gulp.watch('pages/resources/scripts/messaging/*.js', ['scripts']);
    gulp.watch('pages/resources/styles/*.scss', ['sass']);
    gulp.watch('server.js', ['node-server']);
    gulp.watch('modules/*.js', ['node-server']);
    gulp.watch('pages/resources/*.html', ['node-server']);
});

gulp.task('default', ['lint', 'test', 'sass', 'scripts']);
gulp.task('build-run', ['sass', 'scripts', 'node-server', 'watch']);
