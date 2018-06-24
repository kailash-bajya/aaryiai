var express = require('express');
var router = express.Router();
var path= require('path');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var multer = require('multer');
var upload = multer({dest:'public/images'})

var controller = require('../controller/controller')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root:path.join(__dirname,'../web')});
});
router.post('/registeruser',upload.any(),function(req,res){
  console.log('body',JSON.parse(req.body.user));
  req.body.user =JSON.parse(req.body.user); 
  //console.log(req.files)
  async function abc(){
   var r = await  req.files.forEach(function(data,name){
     console.log(data);
     req.body.user[data.fieldname] = data.filename;
    
     })
   r= req.body.user;
   await controller.signupDBController(r.name,r.password,r.dob,r.passportnum,r.passport,r.pfilename,r.aadharnum,r.aadhar,r.aafilename,r.pannum,r.pan,r.panfilename,r.address).then(function(data){
     res.send(data);
   });
}abc();
})
module.exports = router;
