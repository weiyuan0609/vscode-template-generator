const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const builtinFileNames = require('../config');
const targetDirPath = require('../config/extension');

const Eventer = new EventEmitter();

const fileList = Object.keys(builtinFileNames);

const simpleReadFileSync = (filePath) => {
  const buffer = fs.readFileSync(filePath, 'utf-8');
  return buffer
          .match(/.*(\r\n)/g)
          .map((line) => line.length ? line.replace(/(\r\n)/, '') : line)
          .concat(['']);
};

const transformToJsonFile = (fileName) => {
  const jsonName = `${fileName}.json`;
  const filepath = path.resolve(__dirname, '..') + `/snippets/${fileName}.js`;
  const bodyArray = simpleReadFileSync(filepath);
  const snippetJson = {
    [fileName]: {
      prefix: fileName,
      body: bodyArray,
      description: builtinFileNames[fileName]
    }
  };

  const formatedJson = JSON.stringify(snippetJson, null, '\t');
  const templateJsonPath = `${targetDirPath}/snippets/${jsonName}`;
  fs.writeFile(templateJsonPath, formatedJson, (err) => {
    if (err) {
      return console.log(`创建snippets/${jsonName}失败：${err.message}`);
    }
    console.log(`创建snippets/${jsonName}文件成功`);
    Eventer.emit('done');
  });
};

/**
 * 为 vscode 创建 snippet 扩展
 */
const vscodeSnippetSetter = () => {
  let total = 0;
  let count = 0;
  Eventer.on('total', num => total = num);
  Eventer.on('done', () => {
    count += 1;
    if (count === total) {
      console.log('\n🍺  所有模板生成成功, 请重启vscode');
      process.exit(0);
    }
  });

  // 设置异步事件总数
  Eventer.emit('total', fileList.length + 1);

  // 生成扩展文件夹
  console.log(`👉  ${targetDirPath}`);
  if (!fs.existsSync(targetDirPath)) {
    fs.mkdirSync(targetDirPath);
  }

  // 生成package.json配置文件
  const templatePackageJson = fs.readFileSync(`${path.resolve(__dirname, '..')}/package.json`);
  const packageJson = JSON.parse(templatePackageJson);
  fileList.forEach(type => {
    packageJson.contributes.snippets.push({
      language: 'javascript',
      path: `./snippets/${type}.json`
    });
  });

  const formatedJson = JSON.stringify(packageJson, null, '\t');
  fs.writeFile(`${targetDirPath}/package.json`, formatedJson, (err) => {
    if (err) {
      console.log(`创建package.json失败：${err.message}`);
    }
    console.log('创建package.json文件成功');
    Eventer.emit('done');
  });

  // 生成 snippet 模板json文件
  const snippetDirDirPath = `${targetDirPath}/snippets`;
  if (!fs.existsSync(snippetDirDirPath)) {
    fs.mkdirSync(`${targetDirPath}/snippets`);
  }

  fileList.forEach((fileName) => transformToJsonFile(fileName));
};

module.exports = vscodeSnippetSetter;
