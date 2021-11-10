const os = require('os');
const fs = require("fs")
const {resolve} = require('path')
const platform = os.platform();

let genPath=resolve('./')

let genFileName='READEME.md'


let firstRun = true; // getDirTree首次执行
let defaultSplitType='\\'
if (platform.lastIndexOf('win')>-1){
} else {
	defaultSplitType='/'
}

fs.writeFileSync(genFileName, "");

function getDirTree(dir, parentDir) {
  let obj = {
    dir: dir,
    relativePath: parentDir,
    childFiles: [],
    childDir: {},
  };

  let objStr = JSON.stringify(obj);

  if (firstRun && isFile(dir)) {
    return console.log(`${dir}: 不是文件夹`.redBG);
  }

  let files = readDir(dir);

  firstRun = false;

  // 遍历文件
  files.forEach((file) => {
    let tempDir = `${dir}\\${file}`;
    let dirname = getDirName(tempDir);
    let fullDir = `${dir}${defaultSplitType}${file}`;
    

    if (isFile(`${dir}/${file}`)) {
    	if (parentDir.length==0){
    		write(file, '.')
    	} else {
    		write(file, './'+parentDir)
    	}
    	
		obj.childFiles.push({
			short: file, // 文件名
			full: fullDir, // 完整路径
			relativePath: parentDir+"./"+file
		});
    } else {
	    if (file.indexOf('.')!=0){
		    // 在当前文件夹的对象下 childDir 属性(1)，以文件夹名作为key(2)，
		    // (2)的值是该目录下 路径dir、childFiles子文件、childDir子文件夹组成的对象或null
		    obj.childDir[dirname] = getDirTree(`${dir}${defaultSplitType}${file}`, `${file}`);
	    }
    }
  });

  return JSON.stringify(obj) === objStr ? null : obj;
}



/**
 * 读取路径下的文件、文件夹
 * @param {读取的路径} dir
 * @returns 返回 dir目录下的文件
 */
function readDir(dir) {
  return fs.readdirSync(dir, (err, files) => {
    if (err) throw err;
    if (firstRun && !files.length) console.log(`${dir}: 文件夹为空`.redBG);
    return files;
  });
}

/**
 * 判断制定路径是否是文件
 * @param {读取的路径} dir
 * @returns boolean
 */
function isFile(dir) {
  return fs.statSync(dir).isFile();
}

/**
 * 获取目录名
 * @param {读取的路径} dir
 * @returns 目录名
 */
function getDirName(dir) {
  return dir.substr(dir.lastIndexOf("\\") + 1, dir.length);
}

function write(fileName,filePath){
	let tempFileName = fileName.toLowerCase();
	if (tempFileName.lastIndexOf('.md')>0){
		fileName = fileName.substr(0, tempFileName.lastIndexOf('.md'))
	}
	let str = '['+fileName+']('+filePath+'/'+fileName+'.html)\n\n';

	fs.appendFile(genFileName, str, (err) => {
	  if (err) {
	    console.error(err)
	    return
	  }
	})
}

let dirTree = getDirTree(genPath, '')
// console.log(dirTree)
