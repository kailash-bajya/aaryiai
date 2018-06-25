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
router.get('/admin', function(req, res, next) {
  res.sendFile('adminindex.html', {root:path.join(__dirname,'../web')});
});
router.get('/adminindex', function(req, res, next) {
  res.sendFile('adminuser.html', {root:path.join(__dirname,'../web')});
});
router.get('/updatedataview', function(req, res, next) {
  res.sendFile('editmodal.html', {root:path.join(__dirname,'../web')});
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
   await controller.signupDBController(r.name,r.password,r.dob,r.passportnum,r.passport,r.pfilename,r.aadharnum,r.aadhar,r.aafilename,r.pannum,r.pan,r.panfilename,r.address).
   then(function(data){
     res.send(data);
   });
}abc();
})
router.get('/signup',(req,res)=>{
 res.sendFile('signup.html',{root:path.join(__dirname,'../web')});
})
router.get('/login',(req,res)=>{
  res.sendFile('login.html',{root:path.join(__dirname,'../web')});
 })

 //admin login
router.post('/adminlogin',function(req,res){
  console.log(req.body);
  controller.adminverify(req.body.adminuser,req.body.password).then(function(data){
    console.log(data);
    var userslist={};
    if(data.status){
      controller.senddetails().then(function(basicdetails){
           userslist["basic_details"]=basicdetails;
        controller.sendpassportreports().then(function(passdetails){
             userslist["passdetails"]=passdetails;
          controller.sendaadharreports().then(function(aadharreports){
               userslist['aadhardetails']=aadharreports;
            controller.sendpanreports().then(function(panreports){
              userslist['pandetails']=panreports;
               controller.totaluser().then(function(totaluser){
                   userslist["totaluser"]=totaluser;
                   res.send({status:true,"userslist":userslist});
               })
            })
          })
        })
      })
    }
    else
    res.send(data);
  })
})
router.put('/updatedata',function(req,res){
  controller.updatedata(req.body).then(function(data){
    res.send(data);
  })
})
router.post('/deletedata',function(req,res){
   controller.deletedata(req.body).then(function(data){
     res.send(data);
   })
})
router.post('/userlogin',function(req,res){
controller.userlogin(req.body).then(function(data){
  res.send(data);
})
})
router.get('/getpassport',function(req,res){
  controller.getpassport(req).then(function(data){
    res.send(data);
  })
})
router.get('/getaadhar',function(req,res){
  controller.getaadhar(req).then(function(data){
    res.send(data);
  })
})
router.get('/getpan',function(req,res){
    controller.getpan(req).then(function(data){
      res.send(data);
    })
})
module.exports = router;
