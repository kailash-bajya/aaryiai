var knex = require('./connection');
 
exports.signupDBController =(name,pass,dob,passport,pstatus,pfilename,aadhar,aastatus,aafilename,pan,panstatus,panfilename,address)=>{
  return new Promise(function(resolve){
    knex('userdetails').select('username').where({username:name}).then(function(result){
        if(result.length==0){
          knex('userdetails').insert({username:name,password:pass,dofb:dob,passportnum:passport,pastatus:pstatus,pafile:pfilename,aadharnum:aadhar,aadharstatus:aastatus,aadharfile:aafilename,pannum:pan,panstatus:panstatus,panfile:panfilename,uaddress:address}).then(function(result){
          resolve({status:true,data:"Congratulation! Now you are Registered"})
          },function(err){
              console.log(err);
              resolve({status:false,data:"Something went wrong. contact to admin team"})
          })  
        }
        else
        {
            resolve({status:false,data:"you are allready Registered"})   
        }
        },function(err){
            console.log(err); 
            resolve({status:false,data:"Something went wrong. contact to admin team"})  
        })    
  },function(reject){
    reject({status:false,data:"Something went wrong. contact to admin team"})
    
  })
}

exports.login =(username,password)=>{

}

exports.adminverify=(adminuser,password)=>{
   return new Promise(function(resolve){
       knex('admindetails').select('adminname').where({adminname:adminuser,adminpassword:password}).then(function(result){
        resolve({status:true,data:"You are logedIn"})
        
       },function(err){
        resolve({status:false,data:"Something went wrong. contact to admin team"})
        
       })
   },function(reject){
    reject({status:false,data:"Something went wrong. contact to admin team"})
    
   })
}

exports.senddetails = ()=>{
   return new Promise(function(resolve){
     knex('userdetails').select('name','passportnum','aadharnum','pannum','dofb').then(function(result){
       resolve({status:true,"data":result})
     },function(err){
       resolve({status:false,data:"please contact with admin."})
     })
   },function(reject){
    reject({status:false,data:"something went wrong."})
   }) 
}

exports.sendpassportreports = ()=>{
    return new Promise(function(resolve){
       knex('userdetails').select('username','passportname','pafilename').where({pastatus:true}).then(function(result){
            resolve({status:true,data:result,total:result.length})
       },function(err){
            resolve({status:false,data:"contact to admin",length:0})
       }
       )
    },function(reject){
        resolve({status:false,data:"contact to admin",length:0})   
    })
}

exports.sendaadharreports = ()=>{
    return new Promise(function(resolve){
       knex('userdetails').select('username','aadharnum','aadharfile').where({aadharstatus:true}).then(function(result){
            resolve({status:true,data:result,total:result.length})
       },function(err){
            resolve({status:false,data:"contact to admin",length:0})
       }
       )
    },function(reject){
        resolve({status:false,data:"contact to admin",length:0})   
    })
}


exports.sendpanreports = ()=>{
    return new Promise(function(resolve){
       knex('userdetails').select('username','pannum','panfile').where({panstatus:true}).then(function(result){
            resolve({status:true,data:result,total:result.length})
       },function(err){
            resolve({status:false,data:"contact to admin",length:0})
       }
       )
    },function(reject){
        reject({status:false,data:"contact to admin",length:0})   
    })
}

exports.totaluser = ()=>{
    return new Promise(function(resolve){
        knex('userdetails').count().then(function(result){
        console.log(result);
          resolve({status:true,total:result})
        },function(err){
          resolve({status:false,total:0});
        })
    },function(reject){
          reject({status:false,total:0});
    })
}


exports.getuseralldetails = ()=>{
    return new Promise(function(resolve){
         knex('userdetails').select('username','dofb','passportnum','aadharnum','pannum').then(function(result){
            resolve({status:true,data:result});
         },function(err){
           console.log(err);
           resolve({status:false,data:"contact to admin"});
         })
    },function(reject){
           reject({status:false,data:"contact to admin."});
    })
}