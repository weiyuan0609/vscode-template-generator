const vscodeSnippetSetter = require('./createTemplate');

class Engine {
  constructor() {
    // 编辑器 支持 vscode
    this.editorsMap = {
      vscode: {
        alias: ['1', 'vscode'],
        setter: vscodeSnippetSetter
      }
    };
    this.editors = Object.keys(this.editorsMap);
  }

  run() {
    // 输出操作提示
    process.stdout.write('\n');
    this.editors.forEach((editor, index) => {
      process.stdout.write(`${index + 1}. ${editor}\n`);
    });
    process.stdout.write('\n选择编辑器：');
    process.stdin.setEncoding('utf-8');

    // 根据输入执行对应回调
    process.stdin.on('data', (data) => {
      let selectedEditor;
      const input = data.toString().trim().toLowerCase();

      this.editors.forEach(editor => {
        const currentEditor = this.editorsMap[editor];
        if (currentEditor.alias.includes(input)) {
          selectedEditor = currentEditor;
        }
      });

      if (selectedEditor) {
        selectedEditor.setter();
      } else {
        console.log('不支持为该编辑器生成模板文件');
        process.exit(0);
      }
    });
  }
}

module.exports = Engine;
