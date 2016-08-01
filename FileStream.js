var Thing require('./Thing');
var fs = require('fs');

class FileStream extends Thing{
  constructor(path){
    super('FileStream');
    this._path = path;
  }

  write(textToWrite){
    var fs = require('fs');

    return new Promise(function(resolve, reject){

      fs.writeFile(path, textToWrite, function(err) {
          if(err) {
              reject(err);
          }

          resolve("The file was saved!");
      }); 
    });
  }
}

