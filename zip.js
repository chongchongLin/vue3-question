const compressing = require('compressing');
compressing.zip.compressDir('./dist', './dist'+'.zip')
.then(() => {
    console.log('ok');
})
.catch(err => {
    console.log(err);
    return
});
