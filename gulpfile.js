const gulp = require('gulp');
const embedSvg = require('gulp-embed-svg');
const parcel = require('gulp-parcel');
const cssmin = require('gulp-cssnano');
const header = require('gulp-header');
const prefix = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');
const copyAssets = require('gulp-css-copy-assets').default;
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
purgecss = require('gulp-purgecss');

const themeKit = require('@shopify/themekit');
const mode = require('gulp-mode')({modes: ["production", "development", "staging"]});
const env = mode.production() ? 'production' : mode.staging() ? 'staging' : 'development';


function js() {
  return gulp.src('./sources/assets/javascripts/theme.js', {read:false})
    .pipe(parcel({minify: true}))
    .pipe(gulp.dest('./build/assets'));
}

function css() {
  return gulp.src(['./sources/assets/styles/**/*.scss', '!./sources/assets/styles/vendor/**/*'])
    .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
    .pipe(prefix({
      overrideBrowserslist: ['last 2 versions']
    }))
    // .pipe( 
    //   purgecss({
    //     content: ['./sources/**/*.liquid']
    //   })
    // )
    .pipe(cssmin())
    .pipe(copyAssets())
    .pipe(gulp.dest('./build/assets'));
}

function extraCss() {
  return gulp.src(['./sources/assets/extra.scss'])
    .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))
    .pipe(prefix({
      overrideBrowserslist: ['last 2 versions']
    }))    
    .pipe(cssmin())
    .pipe(copyAssets())
    .pipe(gulp.dest('./build/assets'));
}

function liquid() {
  return gulp.src('./sources/**/*.liquid')
    .pipe(embedSvg({
      root: './sources/assets/images'
    }))
    .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
    .pipe(header('{% comment %} ATTENTION!!! This is compiled version of ${filename} and it is overriding automatically. You should use theme development tool and sources\\${file.relative} file to code and save your changes. {% endcomment %}'))
    .pipe(gulp.dest('./build'));
}

function shopifyJson() {
  return gulp.src(['./sources/locales/*.json', './sources/config/*.json'], {base: './sources/'})
    .pipe(gulp.dest('./build'));
}

function images() {
  return gulp.src(['./sources/assets/images/*'])
    .pipe(gulp.dest('./build/assets'));
}


function watchFiles() {
  gulp.watch('./sources/assets/javascripts/**/*.js', js);  
  gulp.watch(['./sources/assets/images/*'], images);
  gulp.watch(['./sources/**/*.liquid', './sources/sections/*.json', './sources/assets/images/*'], liquid);
  gulp.watch(['./sources/assets/styles/**/*.scss', './sources/assets/fonts/*', './sources/assets/images/*'], css);
  gulp.watch(['./sources/assets/extra.scss', './sources/assets/fonts/*', './sources/assets/images/*'], extraCss);
  gulp.watch(['./sources/locales/*.json', './sources/config/*.json'], shopifyJson);

  themeKit.command('watch', {
    env: env
  })
}


function deployFiles() {
  themeKit.command('deploy', {
    env: env
  });
}


function syncFiles() {
  themeKit.command('download', {
    env: env
  });
}


const watch = gulp.series(watchFiles);
const build = gulp.series(js, images, liquid, css, extraCss, shopifyJson);
const deploy = gulp.series(js, images, liquid, css, extraCss, shopifyJson, deployFiles);
const sync = gulp.series(syncFiles);

exports.watch = watch;
exports.build = build;
exports.deploy = deploy;
exports.sync = sync;
exports.default = build;