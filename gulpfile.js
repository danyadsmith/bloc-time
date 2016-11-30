var gulp = require("gulp");
var beeper = require("beeper");
var browsersync = require("browser-sync");
var del = require("del");
var imagemin = require("gulp-imagemin");
var jshint = require("gulp-jshint");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");

function onError(err) {
  beeper();
  console.log(err);
}

gulp.task("browsersync", function(cb){
  return browsersync({
    server: {
      baseDir: "./app"
    }
  }, cb);
});

gulp.task("clean_assets", function(cb){
  return del(["app/assets/*"], cb);
});
gulp.task("clean_scripts", function(cb){
  return del(["app/scripts/*"], cb);
});
gulp.task("clean_styles", function(cb){
  return del(["app/styles/*"], cb);
});

gulp.task("images", function(){
  return gulp.src("_/dev/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("app/assets/images")); 
});

gulp.task("soundEffects", function(){
  return gulp.src("_/dev/audio/*")
    .pipe(imagemin())
    .pipe(gulp.dest("app/assets/audio")); 
});

gulp.task("scripts", function() {
  return gulp.src("_/dev/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(gulp.dest("app/scripts"));
});

gulp.task("styles", function() {
  return gulp.src("_/dev/sass/*.scss")
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({
      outputStyle: "compressed",
      includePaths: ["node_modules/susy/sass"]
    }).on("error", sass.logError))
    .pipe(gulp.dest("app/styles"));
});

gulp.task("watch", function(){
  gulp.watch("app/*.html", browsersync.reload);
  gulp.watch("app/templates/*.html", browsersync.reload);
  gulp.watch("_/dev/sass/*", 
  gulp.series("styles", browsersync.reload));
  gulp.watch("_/dev/js/**/*.js", 
  gulp.series("scripts", browsersync.reload));
  gulp.watch("_/dev/img/*", 
  gulp.series("images", browsersync.reload));
});

gulp.task("clean", gulp.parallel("clean_assets", "clean_scripts", "clean_styles"));

gulp.task("default", gulp.parallel("browsersync", "styles", "scripts", "images", "soundEffects", "watch"));