const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const i = file.originalname.lastIndexOf(".");
      const ext = i ? file.originalname.substr(i + 1) : "jpeg";
      cb(null, `${file.fieldname}-${Date.now()}.${ext}`)
    }
  })
   
  var upload = multer({ storage: storage })

  module.exports = upload;