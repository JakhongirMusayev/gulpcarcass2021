const { series, src, dest } = require("gulp");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

const path = {
  html: {
    src: "src/html/**/*.html",
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
  return del(["dist"]);
}
//todo Style
function styles() {
  return src(path.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: "main",
      suffix: ".min"
    }))
    .pipe(dest(path.styles.dest));
}

exports.clean = clean;
exports.styles = styles;

// exports.default = series(clean, styles);
