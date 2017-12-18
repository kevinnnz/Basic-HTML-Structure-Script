let fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// directories
let directoryName = "";
const js = "js";
const style = "style";

const styleSheet = "style.css";
const javaScript = "script.js";

function engine() {
    rl.question("Enter Site Directory Name: ", (newDirectory) => {
        directoryName = newDirectory;
        writeFolderToSystem();
        rl.close();
    });
}

function writeFolderToSystem() {
    function writeSubDirectories() {
        fs.mkdirSync(directoryName + "/" + style);
        fs.mkdirSync(directoryName + "/" + js);
    }

    try {
        fs.mkdirSync(directoryName);
    } catch (err) {
        if (err.code == 'EEXIST') {
            console.log(directoryName + " exists already");
            failSafe();
        }
        console.log(err);
    }

    writeSubDirectories();
    createFiles();
}

function createFiles() {
    const documentObjectModel = '<!DOCTYPE html> \r' +
        '<html> \r' +
        '\t <head> \r' +
        '\t \t <title></title> \r' +
        '\t \t <link rel="stylesheet" type="text/css" href="/style/' + styleSheet + '"> \r' +
        '\t \t <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script> \r' +
        '\t \t <script src="/js/"' + javaScript + '"></script> \r' +
        '\t </head> \r' +
        '\t <body> \r' +
        '\t </body> \r' +
        '</html> \r';

    fs.writeFileSync(directoryName + "/" + "index.html", documentObjectModel, function (err) {
        if (err) console.log(err);
    }); 

    fs.writeFileSync(directoryName + '/' + style + '/' +  styleSheet, function (err) {
        if (err) {
            console.log(err);
        }
    });

    fs.writeFileSync(directoryName + '/' + js + '/' + javaScript, function (err) {
        if (err) {
            console.log(err);
        }
    }); 

}

function failSafe() { 
     rl.question("Enter Site Directory Name: ", (newDirectory) => {
        directoryName = newDirectory;
        writeFolderToSystem();
        rl.close();
    });
}

engine();
