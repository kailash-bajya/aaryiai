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
        console.log(result)
        if(result.length==1)
        resolve({status:true,data:"You are logedIn"})
        else
        resolve({status:false,data:"Invalid credentials"})
        
       },function(err){
           console.log(err);
        resolve({status:false,data:"Something went wrong. contact to admin team"})
        
       })
   },function(reject){
    reject({status:false,data:"Something went wrong. contact to admin team"})
    
   })
}

exports.senddetails = ()=>{
   return new Promise(function(resolve){
     knex('userdetails').select('username','passportnum','aadharnum','pannum','dofb').then(function(result){
       resolve({status:true,"data":result})
     },function(err){
         console.log(err);
       resolve({status:false,data:"please contact with admin."})
     })
   },function(reject){
    reject({status:false,data:"something went wrong."})
   }) 
}

exports.sendpassportreports = ()=>{
    return new Promise(function(resolve){
       knex('userdetails').select('username','passportnum').where({pastatus:true}).then(function(result){
            resolve({status:true,data:result,total:result.length})
       },function(err){
           console.log(err);
            resolve({status:false,data:"contact to admin",length:0})
       }
       )
    },function(reject){
        resolve({status:false,data:"contact to admin",length:0})   
    })
}

exports.sendaadharreports = ()=>{
    return new Promise(function(resolve){
       knex('userdetails').select('username','aadharnum').where({aadharstatus:true}).then(function(result){
            resolve({status:true,data:result,total:result.length})
       },function(err){
           console.log(err);
            resolve({status:false,data:"contact to admin",length:0})
       }
       )
    },function(reject){
        resolve({status:false,data:"contact to admin",length:0})   
    })
}


exports.sendpanreports = ()=>{
    return new Promise(function(resolve){
       knex('userdetails').select('username','pannum').where({panstatus:true}).then(function(result){
            resolve({status:true,data:result,total:result.length})
       },function(err){
           console.log(err);
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
          resolve({status:true,total:result[0].count})
        },function(err){
          resolve({status:false,total:0});
        })
    },function(reject){
          reject({status:false,total:0});
    })
}


exports.updatedata = (req)=>{
    console.log(req)
    return new Promise(function(resolve){
         knex('userdetails').update({passportnum:req.passportnum,pastatus:req.passport,aadharnum:req.aadharnum,aadharstatus:req.aadhar,pannum:req.pannum,panstatus:req.pan}).where({username:req.username}).then(function(result){
            resolve({status:true,data:result});
         },function(err){
           console.log(err);
           resolve({status:false,data:"contact to admin"});
         })
    },function(reject){
           reject({status:false,data:"contact to admin."});
    })
}

exports.deletedata = (req)=>{
    return new Promise(function(resolve){
         knex('userdetails').delete().where({username:req.username}).then(function(result){
            resolve({status:true,data:result});
         },function(err){
           console.log(err);
           resolve({status:false,data:"contact to admin"});
         })
    },function(reject){
           reject({status:false,data:"contact to admin."});
    })
}
exports.userlogin=(req)=>{
return new Promise(function(resolve){
    knex('userdetails').select('username','dofb','uaddress').where({username:req.user,password:req.pass}).then(function(result){
         console.log(result);
        if(result.length==1)
        resolve({status:true,"data":result});
        else
        resolve({status:false,"data":result});
    },function(err){
        console.log(err);
      resolve({status:false,data:"please contact with admin."})
    })
  },function(reject){
   reject({status:false,data:"something went wrong."})
  }) 
}

exports.getpassport=(req)=>{
    return new Promise(function(resolve){
        knex('userdetails').select('pafile','pastatus').where({username:req}).then(function(result){
             console.log(result);
            if(result.length==1)
            resolve({status:true,"data":result});
            else
            resolve({status:false,"data":result});
        },function(err){
            console.log(err);
          resolve({status:false,data:"please contact with admin."})
        })
      },function(reject){
       reject({status:false,data:"something went wrong."})
      }) 
    }

    
exports.getaadhar=(req)=>{
    return new Promise(function(resolve){
        knex('userdetails').select('aadharfile','aadharstatus').where({username:req}).then(function(result){
             console.log(result);
            if(result.length==1)
            resolve({status:true,"data":result});
            else
            resolve({status:false,"data":result});
        },function(err){
            console.log(err);
          resolve({status:false,data:"please contact with admin."})
        })
      },function(reject){
       reject({status:false,data:"something went wrong."})
      }) 
    }

    
exports.getpan=(req)=>{
    return new Promise(function(resolve){
        knex('userdetails').select('panfile','panstatus').where({username:req}).then(function(result){
             console.log(result);
            if(result.length==1)
            resolve({status:true,"data":result});
            else
            resolve({status:false,"data":result});
        },function(err){
            console.log(err);
          resolve({status:false,data:"please contact with admin."})
        })
      },function(reject){
       reject({status:false,data:"something went wrong."})
      }) 
    }