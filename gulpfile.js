const { series, src, dest, watch, parallel } = require("gulp");
const del = require("del");
const fileInclude = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

const path = {
  html: {
    /* faqat "src/*.html" fayllarni "dest"ga o'tqazmoqdamiz, 
    "src/_*.html" fayllarni esa o'tishlarini inkor ("!") qilmoqdamiz*/
    src: ["src/*.html", "!" + "src/_*.html"],
    dest: "./dist/",
  },
  styles: {
    src: "src/styles/**/*.scss",
    dest: "./dist/css",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "./dist/js",
  },
};
//todo Clean
function clean() {
  return del(["dist/*"]);
}
//todo Html
function html() {
  return src(path.html.src)
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(fileInclude())
    .pipe(dest(path.html.dest))
    .pipe(browserSync.stream());
}
//todo Style
function styles() {
  return src(path.styles.src)
    .pipe(sass())
    // .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(dest(path.styles.dest))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "./dist",
      open: false,
      // online: false,
      // notify: false
    }
  });
  watch(path.html.src, html);
  watch(path.styles.src, styles);
}

// exports.clean = clean;
// exports.html = html;
// exports.styles = styles;
// exports.watching = watching;

exports.default = series(clean, html, styles, watching);
