const fs = require('fs');
const del = require('del');
const argv = require('yargs').argv;
const camel = require('to-camel-case');
const gutil = require('gulp-util');


function part(done) {
  if (argv.type !== 'component' && argv.type !== 'module' && argv.type !== 'modal') {
    throw new Error(gutil.colors.red.bold(`--type "${argv.type}" не существует. Укажите --type component | module | modal`));
  }

  let folder = `${argv.type}s`;

  if (argv.A || argv.D) {
    if (argv.name === undefined || argv.name === true) {
      let message = '';

      if (argv.type === 'component') {
        message = 'Введите название компонента. Пример: gulp part --name componentName [-A, -D]';
      } else if (argv.type === 'module') {
        message = 'Введите название модуля. Пример: gulp part --name moduleName [-A, -D]';
      } else if (argv.type === 'modal') {
        message = 'Введите название модального окна. Пример: gulp part --name modalName [-A, -D]';
      }

      throw new Error(gutil.colors.red.bold(message));
    }
  }

  if (!argv.A && !argv.D) {
    let message = '';

    throw new Error(gutil.colors.red.bold(`Укажите флаг -A (создать) или -D (удалить). Пример: gulp part --name ${argv.type}Name [-A, -D]`));
  }

  if (argv.A) {
    if (fs.existsSync(`./src/${folder}/${argv.name}`)) {
      let message = '';

      if (argv.type === 'component') {
        message = `Компонент "${argv.name}" уже существует`;
      } else if (argv.type === 'module') {
        message = `Модуль "${argv.name}" уже существует`;
      } else if (argv.type === 'modal') {
        message = `Модуль "${argv.name}" уже существует`;
      }

      throw new Error(gutil.colors.red.bold(message));
    }

    fs.mkdir(`./src/${folder}/${argv.name}`, (error) => {
      if (error) throw error;
  
      if (!argv.pug && !argv.css && !argv.js) {
        createTemplateFile(argv.name, argv.type);
        createScriptFile(argv.name, argv.type);

        if (argv.type !== 'modal') {
          createStyleFile(argv.name, argv.type);
        }
      }

      if (argv.pug) {
        createTemplateFile(argv.name, argv.type);
      }

      if (argv.css && argv.type !== 'modal') {
        createStyleFile(argv.name, argv.type);
      }

      if (argv.js) {
        createScriptFile(argv.name, argv.type);
      }
    });

    done();

    let message = '';

    if (argv.type === 'component') {
      message = `Компонент "${argv.name}" был успешно создан`;
    } else if (argv.type === 'module') {
      message = `Модуль "${argv.name}" был успешно создан`;
    } else if (argv.type === 'modal') {
      message = `Модальное окно "${argv.name}" было успешно создано`;
    }

    console.log(gutil.colors.green.bold(message));
  }

  if (argv.D) {
    if (fs.existsSync(`./src/${folder}/${argv.name}`) === false) {
      let message = '';

      if (argv.type === 'component') {
        message = `Компонента "${argv.name}" не существует`;
      } else if (argv.type === 'module') {
        message = `Модуля "${argv.name}" не существует`;
      } else if (argv.type === 'modal') {
        message = `Модального окна "${argv.name}" не существует`;
      }

      throw new Error(message);
    }

    del(`./src/${folder}/${argv.name}`, {
      force: true
    });

    done();

    let message = '';

    if (argv.type === 'component') {
      message = `Компонент "${argv.name}" был успешно удален`;
    } else if (argv.type === 'module') {
      message = `Модуль "${argv.name}" был успешно удален`;
    } else if (argv.type === 'modal') {
      message = `Модальное окно "${argv.name}" было успешно удалено`;
    }

    console.log(gutil.colors.green.bold(message));
  }

  function createTemplateFile(partName, type) {
    fs.readFile(`./gulp/utils/templates/${type}/template.pug`, 'utf8', (error, data) => {
      if (error) throw error;
      
      fs.writeFileSync(`./src/${folder}/${partName}/template.pug`, data.replace(/NAME/g, partName));
    });
  }
  
  function createStyleFile(partName, type) {
    fs.readFile(`./gulp/utils/templates/${type}/styles.css`, 'utf8', (error, data) => {
      if (error) throw error;
      
      fs.writeFileSync(`./src/${folder}/${partName}/styles.css`, data.replace(/NAME/g, partName));
    });
  }
  
  function createScriptFile(partName, type) {
    fs.readFile(`./gulp/utils/templates/${type}/scripts.js`, 'utf8', (error, data) => {
      if (error) throw error;

      let partNameCase = camel(partName);
      partNameCase = partNameCase[0].toUpperCase() + partNameCase.slice(1);
      
      let dataFormatted = data.replace(/NAME/g, partName);
      dataFormatted = dataFormatted.replace(/CAMEL/g, partNameCase);
  
      fs.writeFileSync(`./src/${folder}/${partName}/scripts.js`, dataFormatted);
    });
  }
}

module.exports = part;
