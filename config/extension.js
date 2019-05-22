const homeDir = require('os').homedir();

// vscode 扩展目录路径
const vscodeExtensionsFilePath = `${homeDir}/.vscode/extensions/`;
const extensionDir = 'ksSnippets-1.0.0';
const targetDirPath = `${vscodeExtensionsFilePath}${extensionDir}`;

module.exports = targetDirPath;