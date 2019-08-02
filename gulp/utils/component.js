const fs = require('fs');
const del = require('del');
const argv = require('yargs').argv;
const camel = require('to-camel-case');
const gutil = require('gulp-util');

const template = {
  pug: function(name) {
    return `mixin ${name}-component(data, attrs)\n  .${name}&attributes(attrs)\n`;
  },

  css: function(name) {
    return `.${name} {\n  \n}\n`
  },

  js: function(name) {
    let formatterName = camel(name);
    formatterName = formatterName[0].toUpperCase() + formatterName.slice(1);
    
    return `
'use strict';

//////////
// ${name}
//////////
(function($, APP) {
  APP.Components.${formatterName} = {
    init: function() {
      
    }
  };
})(jQuery, window.APP);`.trim();
  }
}

function component(done) {
  if (argv.add === undefined && argv.delete === undefined) {
    throw new Error(gutil.colors.red.bold(`Enter method and component name. Example: gulp component [--add, --delete] componentName`));
  }
  
  // add component
  if (argv.add) {
    if (argv.add === true) {
      throw new Error(gutil.colors.red.bold(`Enter component name. Example: gulp component --add componentName`));
    } else {
      fs.mkdirSync(`./src/components/${argv.add}`);

      if (argv.pug === undefined && argv.css === undefined && argv.js === undefined) {
        fs.appendFileSync(`./src/components/${argv.add}/template.pug`, template.pug(argv.add));
        fs.appendFileSync(`./src/components/${argv.add}/styles.css`, template.css(argv.add));
        fs.appendFileSync(`./src/components/${argv.add}/scripts.js`, template.js(argv.add));
      }

      if (argv.pug === true) {
        fs.appendFileSync(`./src/components/${argv.add}/template.pug`, template.pug(argv.add));
      }

      if (argv.css === true) {
        fs.appendFileSync(`./src/components/${argv.add}/scripts.css`, template.css(argv.add));
      }

      if (argv.js === true) {
        fs.appendFileSync(`./src/components/${argv.add}/styles.js`, template.css(argv.add));
      }

      done();

      console.log(gutil.colors.green.bold(`Component "${argv.add}" has been created!`))
    }
  }


  // delete component
  if (argv.delete) {
    if (argv.delete === true) {
      throw new Error(gutil.colors.red.bold(`Enter component name. Example: gulp component --delete componentName`));
    } else {
      del(`./src/components/${argv.delete}`, {
        force: true
      });

      done();

      console.log(gutil.colors.green.bold(`Component "${argv.delete}" has been deleted!`));
    }
  }
}

module.exports = component;
