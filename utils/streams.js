const fs = require('fs');
const path = require('path');
const through = require('through2');
const csvtojson = require('csvtojson');
const { promisify } = require('util');

const readdirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);
const appendFileAsync = promisify(fs.appendFile);


// Main actions to be called

const reverse = str => str.toString().split('').reverse().join('');

const transform = str => str.toString().toUpperCase();

const outputFile = filePath => {
  if (typeof filePath !== 'string') { 
    return showTips('You must fill the --file option');
  }

  fs.createReadStream(filePath).pipe(process.stdout);
}

const convertFromFile = filePath => {
  if (typeof filePath !== 'string') {
    return showTips('You must fill the --file option');
  }

  if (path.extname(filePath) !== '.csv') { 
    return showTips('File must have .csv extension'); 
  }

  return csvtojson().fromFile(filePath).pipe(process.stdout);
}

const convertToFile = filePath => {
  if (typeof filePath !== 'string') {
    return showTips('You must fill the --file option');
  }

  if (path.extname(filePath) !== '.csv') { 
    return showTips('File must have .csv extension'); 
  }

  return csvtojson().fromFile(filePath).pipe(fs.createWriteStream(`${path.parse(filePath).name}.json`));
}

const cssBundler = folderPath => {
  if (typeof folderPath !== 'string') {
    return showTips('You must fill the --path option');
  }

  const bundlePath = path.join(folderPath, 'bundle.css');

  try {
    const files = await readdirAsync(folderPath);

    files
      .filter(file => path.extname(file) === '.css')
      .forEach(fileName => {
        fs.createReadStream(path.join(folderPath, fileName))
          .pipe(through(chunk => appendFileAsync(bundlePath, `${chunk.toString()}\n\n`)));
      });

  } catch (err) {
    console.error(err);
  }
}

const printHelpMessage = () => {
  console.log(
    `
    Usage: streams [options]

    Options:

      -h, --help                              output usage information
      -f, --file=<path_to_file>               path to the file for action
      -p, --path=<path_to_folder>             path to the folder for cssBundler action            
      -a, --action=<type>                     actions to perform:

          reverse - reverse the string data from process.stdin to process.stdout
          transform - convert the data from process.stdin to upper-cased data on process.stdout
          outputFile - output the file provided by --file option to process.stdout
          convertFromFile - convert the file provided by --file option from csv to json and output data to process.stdout
          cssBundler - concat all css files provided by --path option into one file 'bundle.css'
    `
  );
}

// Utils functions

const showTips = msg => console.error(msg) || printHelpMessage();

const throughInToOut = transformFn => {
  process.stdin.pipe(through(function(chunk, encoding, cb) {
    this.push(transformFn(chunk));
    cb();
  })).pipe(process.stdout);
};

/*
 * 
 * **** CODE WHICH IMPLEMENTS COMMAND LINE INTERACTION ****
 *
 */

const argv = require('minimist')(process.argv.slice(2), {
  alias: {
    'a': 'action',
    'f': 'file',
    'h': 'help',
    'p': 'path'
  },
  unknown: (arg) => console.error(`Unknown option: ${arg}`)
});

switch(argv.action) {
  case 'reverse':
    throughInToOut(reverse);
    break;
  case 'transform':
    throughInToOut(transform);
    break;
  case 'outputFile':
    outputFile(argv.file);
    break;
  case 'convertFromFile':
    convertFromFile(argv.file);
    break;
  case 'convertToFile':
    convertToFile(argv.file);
    break;
  case 'cssBundler':
    cssBundler(argv.path);
    break;
  default:
    printHelpMessage();
    break;
}