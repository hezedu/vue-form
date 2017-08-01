var compiler = require('vueify').compiler;
process.env.NODE_ENV = 'production'
var fs = require('fs');
var path = require('path');

function compile(name){
  var fpath = path.join(__dirname, './src/cmpt/' + name + '.vue')
  var fileContent = fs.readFileSync(fpath);
  compiler.compile(fileContent.toString(), fpath,  function (err, result) {
    if(err){
      return console.log('error', err);
    }
    fs.writeFileSync('./dist/cmpt/' + name + '.js', result)
    // result is a common js module string
  })
}
compile('VForm')
compile('VInput')
compile('VSubmit')
