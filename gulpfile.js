const { series } = require("gulp");
const sass = require("sass");
const del = require("del");

function clean() {
  return del(["build"]);
}

exports.default = series(clean);
