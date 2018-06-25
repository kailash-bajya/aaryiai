var app = angular.module('myApp',['ui.bootstrap','ngRoute','chart.js']);
app.controller('myCtrl',['$rootScope','$scope','$http','$window','$modal','$filter',function($rootScope,$scope,$http,$window,$modal,$filter){
  $scope.adminlogin ={}
 var passpor = [0, 0, 0];
  var Aadhar = [0,0,0];
  var Pan =[0,0,0];
  if(localStorage.getItem('adminuser')){
    $rootScope.adminstatus=true;
    $rootScope.admindata=false;
   var d= JSON.parse(localStorage.getItem('userslist'))
    $scope.labels = ["Passport", "Aadhar", "Pan Card"];
    $scope.data = [d.passdetails.total,d.aadhardetails.total,d.pandetails.total];
    var dt =  $filter('date')(new Date(),'yyyy');
    var tmpdata =  d.basic_details.data;
    $scope.userslist = tmpdata
    console.log(d);
    var passpor = [0, 0, 0];
    var Aadhar = [0,0,0];
    var Pan =[0,0,0];
    for(var item in tmpdata)
    {            
                 var dateOut2 =  $filter('date')(tmpdata[item].dofb,'yyyy');
                 d.basic_details.data[item].age = parseInt(Math.abs(dateOut2 - dt)/20)> 0 ? parseInt(Math.abs(dateOut2 - dt)/20):0;
                 d.basic_details.data[item].age = parseInt(Math.abs(dateOut2 - dt)/20)< 3 ?parseInt(Math.abs(dateOut2 - dt)/20):2;
              //  console.log(parseInt(Math.abs(dateOut2 - dt)/20))
                 if(tmpdata[item].passportnum != null || tmpdata[item].passportnum !=undefined)
                   { 
                      ++passpor[ d.basic_details.data[item].age];
                   }
                if(tmpdata[item].aadharnum != null || tmpdata[item].aadharnum != undefined)
                {   console.log('here');
                    ++Aadhar[d.basic_details.data[item].age];
                }
                if(tmpdata[item].pannum != null || tmpdata[item].pannum != undefined)
                {
                    ++Pan[ d.basic_details.data[item].age];
                }
    }
    console.log(passpor)
    $scope.labels1 = ["1-20", "21-40", "41-.."];
    $scope.series1 = ['Passport','Aadhar','Pan'];
    $scope.data1 = [
      passpor,
      Aadhar,
      Pan
    ];
}
  else
  {
    $rootScope.adminstatus=false;
    $rootScope.admindata=true;
  }
  $scope.logout= function(){
    localStorage.removeItem('userslit');
    localStorage.removeItem('adminuser')

    
$rootScope.adminstatus=false;
$rootScope.admindata=true;   
  }
 
  $scope.adminlogin1= function(){
      console.log($scope.adminlogin);
      $http({method:'POST',url:'/adminlogin',data:$scope.adminlogin}).
      then(function(response){
          console.log(response.data);
          if(response.data.status){
          localStorage.setItem('adminuser',$scope.adminlogin.adminuser)
          $rootScope.adminstatus = true; 
          $rootScope.admindata=false;
          $scope.labels = ["Passport", "Aadhar", "Pan Card","None of above"];
          $scope.data = [response.data.userslist.passdetails.total,response.data.userslist.aadhardetails.total,response.data.userslist.pandetails.total];
          localStorage.setItem('userslist',JSON.stringify(response.data.userslist));
          var dt =  $filter('date')(new Date(),'yyyy');
          var tmpdata =  response.data.userslist.basic_details.data;
          var d= response.data.userslist;
          $scope.userslist = tmpdata;
         // console.log(dt);
          var passpor = [0, 0, 0];
          var Aadhar = [0,0,0];
          var Pan =[0,0,0];
          for(var item in tmpdata)
          {            
                       var dateOut2 =  $filter('date')(tmpdata[item].dofb,'yyyy');
                       d.basic_details.data[item].age = parseInt(Math.abs(dateOut2 - dt)/20) > 0 ? parseInt(Math.abs(dateOut2 - dt)/20):0;
                       d.basic_details.data[item].age = parseInt(Math.abs(dateOut2 - dt)/20) < 3 ? parseInt(Math.abs(dateOut2 - dt)/20) :2;
                      
                       if(tmpdata[item].passportnum != null || tmpdata[item].passportnum !=undefined)
                         {   
                            ++passpor[ d.basic_details.data[item].age];
                         }
                      if(tmpdata[item].aadharnum != null || tmpdata[item].aadharnum != undefined)
                      {
                          ++Aadhar[ d.basic_details.data[item].age];
                      }
                      if(tmpdata[item].pannum != null || tmpdata[item].pannum != undefined)
                      {
                          ++Pan[ d.basic_details.data[item].age];
                      }
          }
         // console.log(passpor,Aadhar, Pan)
          $scope.labels1 = ["1-20", "21-40", "41-.."];
          $scope.series1 = ['Passport','Aadhar','Pan'];
          $scope.data1 = [
            passpor,
            Aadhar,
            Pan
          ];

        }
        else
        {
            alert(response.data.data);
        }
      })

  }
  $scope.usersedit = function(index){
      console.log(index);
    $scope.modalInstance = $modal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/updatedataview',
        controller :'ModelHandlerController',
        controllerAs: '$ctrl',backdrop:'static',
        keyboard  : false,
        size: 'lg',
        resolve:{
            selectitem: function () {
                               
           //  console.log($scope.data.selecteditem);
              return index;
            },
            userslist:function(){
            return $scope.userslist[index]
            }
        }
      })
  }
  $scope.csvdata= function(){
      var userslist = JSON.parse(localStorage.getItem('userslist')).basic_details.data;
      for(var item in userslist)
      {   var loc  = userslist[item];
          //  console.log(loc);
              if(userslist[item]['passportnum']== null || userslist[item]['passportnum']==undefined){
                  userslist[item].passportnum= 'N/A';
              }
              if(loc['aadharnum']== null || loc['aadharnum']==undefined){
                userslist[item].aadharnum= 'N/A';
            }
            if(userslist[item]['pannum']== null || userslist[item]['pannum']==undefined){
          
                //delete userslist[item].pannum;
                 userslist[item].pannum= 'N/A';
               
            }
        //  console.log(userslist);
      }
  var opts = [{sheetid: "Aadhar Number", headers: true},{sheetid: "DOB", headers: true},{sheetid: "Pan Number", headers: true},{sheetid: "Passport Number", headers: true},{sheetid: "User Name", headers: true}];
   opts.push(userslist)
  alasql('SELECT * INTO XLSX("usersrecords.xlsx",{headers:true}) FROM ?',[userslist]);
     
   }

}]);
app.controller("ModelHandlerController",function($http,$rootScope,$scope,$modalInstance,selectitem,userslist){
      console.log(selectitem, userslist);
      $scope.userdata = userslist;
      $scope.userdata.passport=true;
      $scope.userdata.aadhar=true;
      $scope.userdata.pan=true;
      $scope.cancelModal = function(){
      $modalInstance.close(false);
      }
      $scope.ok = function(){
          console.log($scope.userdata.passportnum)
          if($scope.userdata.passportnum =='' || $scope.userdata.passportnum == null || $scope.userdata.passportnum ==undefined){
              $scope.userdata.passport=false
          }
          if($scope.userdata.aadharnum =='' || $scope.userdata.aadharnum == null || $scope.userdata.aadharnum ==undefined){
            $scope.userdata.aadhar=false
        }
        if($scope.userdata.pannum =='' || $scope.userdata.pannum == null || $scope.userdata.pannum ==undefined){
            $scope.userdata.pan=false
        }
        $http({method:'PUT',url:'/updatedata',data:$scope.userdata}).then(function(response){
            if(response.data.status){
                localStorage.removeItem('userslit');
                localStorage.removeItem('adminuser')
                alert('Updated! login again.')
                
    $rootScope.adminstatus=false;
    $rootScope.admindata=true;
            }
            else
            {
                alert('try again later');
            }
        },function(err){
            alert('try again later');
        })
    
      $modalInstance.close(true);
      }
      $scope.del = function(){
        $http({method:'POST',url:'/deletedata',data:$scope.userdata}).then(function(response){
            if(response.data.status){
                alert('Deleted! Refersh the page.')
                localStorage.removeItem('userslit');
                localStorage.removeItem('adminuser')
           
                
    $rootScope.adminstatus=false;
    $rootScope.admindata=true;
            }
            else
            {
                alert('try again later');
            }
        },function(err){
            alert('try again later');
        })
          $modalInstance.close(true);
          }
     });