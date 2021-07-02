var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();


//require multer for file uploads
var multer = require('multer');


//setUp
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});



//creating diskStorage
let fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './fileStorage')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname + "-" + Date.now())
  }
})

//middleware
var upload = multer({storage: fileStorage})

//post --- upload.single() parameter must be the same as the form name attribute 
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
