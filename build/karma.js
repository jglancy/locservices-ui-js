"use strict";

module.exports = function(grunt) {
  return {
    run: {
      configFile: "<%= config.karmaconf %>"
    },
    debug: {
      logLevel: "DEBUG"
    }
  };
};
