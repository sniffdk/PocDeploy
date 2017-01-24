'use strict'

//---------------- PLUGINS --------------------

var gulp =          require('gulp');
var yaml =          require('js-yaml');
var fs =            require('fs');
var rimraf =        require('rimraf');
var gulpsass =      require('gulp-sass');
var prefixer =      require('gulp-autoprefixer');
var mode =          require('gulp-mode')({ default: "development" });
var cssnano =       require('gulp-cssnano');
var sourcemaps =    require('gulp-sourcemaps');
var concat =        require('gulp-concat');
var uglify =        require('gulp-uglify');
var imagemin =      require('gulp-imagemin');
var browser =       require('browser-sync');
var sherpa =        require('style-sherpa');
var fileinclude =   require('gulp-file-include');
var babel =         require('gulp-babel');
var jshint =        require('gulp-jshint');



//---------------- CONFIG --------------------

// config: { COMPATIBILITY, PORT, PATHS }
var config = loadConfig();

// load config from config.yml
function loadConfig() {
    var ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}



//---------------- TASKS --------------------

// Just wanna compile it? 
// - > Use "gulp build" or "gulp build --production" 
// Build the "dist" folder by running all of the below tasks
gulp.task('build', 
    gulp.series(lint, clean, copyAssets, copyVendors, gulp.parallel(pages, sass, js, images), styleGuide));


// Want to build, watch for file changes and fire up browsersync?
// -> Use "gulp"
gulp.task('default',
  gulp.series('build', server, watch));


// just want to build and watch for file changes?
// -> Use "gulp watcher"
gulp.task('watcher',
  gulp.series('build', watch));


console.log("+++ AVAILABLE TASKS:\n"+
    "- Just wanna compile it? - > Use 'gulp build' or 'gulp build --production'\n"+
    "- Want to build, watch for file changes and fire up browsersync? -> Use 'gulp'\n"+
    "- Just want to build and watch for file changes? -> Use 'gulp watcher'\n+++");


//------------- TASKS METHODS -----------------

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
    rimraf(config.PATHS.dist, done);
}

// Copy relevant files out of the assets folder
function copyAssets() {
    return gulp.src(config.PATHS.copyAssets, {base: "./assets"})
        .pipe(gulp.dest(config.PATHS.dist));
}

function copyVendors() {
    return gulp.src(config.PATHS.jsvendor)
        .pipe(gulp.dest(config.PATHS.dist + '/js/vendor'));
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
    return gulp.src(config.PATHS.src + '/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(gulpsass({
            includePaths: config.PATHS.sass
        })
            .on('error', gulpsass.logError))
        .pipe(prefixer({
            browsers: config.COMPATIBILITY
        }))
        .pipe(mode.production(cssnano()))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(gulp.dest(config.PATHS.dist + '/css'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function js() {
    return gulp.src(config.PATHS.javascript)
        .pipe(sourcemaps.init())
        .pipe(babel({
            ignore: ['what-input.js'],
            presets: [config.BABEL.presets]
        }))
        .pipe(concat('app.js'))
        .pipe(mode.production(uglify()
            .on('error', e => { console.log(e); })
        ))
        .pipe(mode.production(sourcemaps.write()))
        .pipe(gulp.dest(config.PATHS.dist + '/js'));
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
    sherpa(config.PATHS.src + '/styleguide/index.md', {
        output: config.PATHS.dist + '/styleguide.html',
        template: config.PATHS.src + '/styleguide/template.html'
    }, done);
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
    return gulp.src(config.PATHS.src + '/imgs/**/*')
        .pipe(mode.production(imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(config.PATHS.dist + '/imgs'));
}

// build pages with included partials
function pages() {
    return gulp.src(config.PATHS.src + '/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(config.PATHS.dist + '/pages'));
}

// lint src js files
function lint(){
    return gulp.src([config.PATHS.src + '/**/*.js', '!vendor/**/*'])
        .pipe(jshint({
            esnext: true,
            globals: {
                '$': true,
                'angular': true
            }
        }))
        .pipe(jshint.reporter('default'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
    var bsConfig = {
        port: config.PORT
    }
    if(typeof config.HOST !== "undefined" && config.HOST !== null){
        bsConfig.proxy = config.HOST;
    } else {
        bsConfig.server = config.PATHS.dist;
        bsConfig.startPath = "/pages/";
    }
    browser.init(bsConfig);
    done();
}

// Reload the browser with BrowserSync
function reload(done) {
    browser.reload();
    done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
    gulp.watch(config.PATHS.assets, copyAssets, copyVendors);
    gulp.watch(config.PATHS.src + '/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
    gulp.watch(config.PATHS.src + '/scss/**/*.scss').on('all', gulp.series(sass, browser.reload));
    gulp.watch(config.PATHS.src + '/js/**/*.js').on('all', gulp.series(lint, js, browser.reload));
    gulp.watch(config.PATHS.src + '/imgs/**/*').on('all', gulp.series(images, browser.reload));
    gulp.watch(config.PATHS.src + '/**').on('all', gulp.series(styleGuide, browser.reload));
}