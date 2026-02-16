"use strict";

module.exports = function isChar(value) {
  return typeof value === "string" && value.length === 1;
};
