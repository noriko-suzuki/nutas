// TODOs
// - jsえらーで通知
// - es lint



import gulp from 'gulp';
import source from 'vinyl-source-stream';
import rename from 'gulp-rename';
import merge from 'merge-stream';
import BrowserSync from 'browser-sync';
import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import extname from 'gulp-extname';

// html
import assemble from 'assemble';
import helpers from 'handlebars-helpers';
import prettify from 'gulp-prettify';
const yaml = require('js-yaml');

// css
import sass from 'gulp-sass';
import globImporter from 'sass-glob-importer';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

// js
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';

// image
import imagemin from 'gulp-imagemin';

// settings
import { PATH, URL } from './settings';

const app = assemble();

const browserSync = BrowserSync.create();


/**
 * html tasks
 */
gulp.task('init', () => {
  app.dataLoader('yml', function(str, fp) {
    return yaml.safeLoad(str);
  });
  app.data('src/hbs/{pages,partials,data}/**/*.yml', {namespace: true});
  app.data('assets', PATH.assets);
  app.data('url', URL);
});

gulp.task('assemble', () => {
  app.data('src/hbs/{pages,partials,data}/**/*.yml', {namespace: true});

  app.partials('src/hbs/partials/**/*.hbs');
  app.layouts('src/hbs/layouts/*.hbs');
  app.pages('src/hbs/pages/**/*.hbs');
  app.helpers(helpers());

  return app.toStream('pages')
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(app.renderFile())
    .pipe(extname())
    .pipe(prettify())
    .pipe(gulp.dest(`${PATH.static_html}`))
    .pipe(gulp.dest(`${PATH.public}`))
    .pipe(browserSync.stream());
});

/**
 * css task
 */
gulp.task('css', () => {
  return gulp.src(`${PATH.src.scss}/**/*.scss`)
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({
      outputStyle: 'expanded',
      importer: globImporter()
    }))
    .pipe(postcss(
      [
        autoprefixer({
          browsers: [
            'last 2 versions'
          ]
        }),
        require('postcss-normalize')
      ]
    ))
    .pipe(gulp.dest(`${PATH.static_html}/${PATH.css}`))
    .pipe(browserSync.stream());
});


// minify css
gulp.task('cssmin', ['css'], () => {
  return gulp.src([`${PATH.static_html}/${PATH.css}/**/*.css`, `!${PATH.static_html}/${PATH.css}/**/*.min.css`])
    .pipe(postcss([cssnano()]))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(`${PATH.static_html}/${PATH.css}`))
    .pipe(gulp.dest(`${PATH.public}/${PATH.css}`));
});


/**
 * js task
 */
gulp.task('js', () => {
  browserify(`${PATH.src.js}/index.js`)
    .transform('babelify', {
      presets: ['es2015']
    })
    .bundle()
    .on('error', (error) => {
      notify.onError('Error: <%= error.message %>');
      console.error('Error : ' + error.message);
    })
    .pipe(source('build.js'))
    .pipe(gulp.dest(`${PATH.static_html}/${PATH.js}`))
    .pipe(browserSync.stream());
});


// minify js
gulp.task('uglify:js', ['js'], () => {
  return gulp.src(`${PATH.static_html}/${PATH.js}/build.js`)
    .pipe(uglify())
    .pipe(rename('build.min.js'))
    .pipe(gulp.dest(`${PATH.static_html}/${PATH.js}`))
    .pipe(gulp.dest(`${PATH.public}/${PATH.js}`));
});


/**
 * image tasks
 */
gulp.task('image', () => {
  gulp.src(`${PATH.src.img}/**/*`)
    .pipe(gulp.dest(`${PATH.static_html}/${PATH.img}`));
});

gulp.task('imagemin', () => {
  gulp.src(`${PATH.static_html}/${PATH.img}/**/*`)
    .pipe(imagemin())
    .pipe(gulp.dest(`${PATH.public}/${PATH.img}`));
});


/**
 * browser-sync task
 */
gulp.task('browser-sync', () => {
  browserSync.init({
    server: `${PATH.static_html}`
  });
});

// reload
gulp.task('reload', function(){
  browserSync.reload();
});


gulp.task('default', ['browser-sync', 'init'], () => {
  gulp.watch(`${PATH.src.hbs}/**/*.hbs`, ['assemble']);
  gulp.watch(`${PATH.src.scss}/**/*.scss`, ['css', 'cssmin']);
  gulp.watch(`${PATH.src.js}/**/*.js`, ['uglify:js']);
  gulp.watch('gulpfile.babel.js', ['reload']);
});


/**
 * publish
 */
gulp.task('build', [
  'uglify:js',
  'imagemin',
  'cssmin'
]);
