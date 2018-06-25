var app = angular.module('myApp',['ui.bootstrap','ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when('/',{
                         templateUrl:'/signup'})
                         .when('/login',{
                             templateUrl:'/login'
                         })
})
app.controller('myCtrl',['$scope','$http','$window','$modal','$filter',function($scope,$http,$window,$modal,$filter){
    $scope.data={passport:false,aadhar:false,pan:false};
    $scope.userstatus=true;
    $scope.usersdata=false;
    $scope.userlogin={}
    console.log(localStorage.getItem('user'))
    if(localStorage.getItem('user')){
        $scope.userstatus=false;
        $scope.usersdata=true;
    }
    $scope.register = function(){
         
         console.log($scope.data);
         var fd = new FormData;
         fd.append('user',JSON.stringify($scope.data));
         if($scope.data.passport){
            var file = document.getElementById('passport').files[0];
         fd.append('pfilename',file);}
         if($scope.data.aadhar){
         var file1 = document.getElementById('aadharid').files[0];            
         fd.append('aafilename',file1);
         }
         if($scope.data.pan){
        var file2 = document.getElementById('panid').files[0];
         fd.append('panfilename',file2);}
        console.log(fd);
         $http.post("/registeruser",fd,
                { transformRequest: angular.identity,
                 headers: {
                 'Content-Type': undefined
                 }
                }
             )
             .then(function(response) {
                 console.log(response.data);
                     alert(response.data.data)
                     $scope.data={passport:false,aadhar:false,pan:false};
             })
        
    }
$scope.userlogin1 = function(){
    console.log($scope.userlogin);
    $http({method:'POST',url:'/userlogin',data:$scope.userlogin}).then(function(response){
        console.log(response.data);
        if(response.data.status){
            localStorage.setItem('user',$scope.userlogin.user)
              $scope.userstatus=false;
             $scope.usersdata=true;
            
             $scope.userfulldata = response.data.data[0]; 
             console.log(  $scope.userfulldata)
        }
        else
        {
            alert('invalid');
        }
    },function(err){
        alert('try again later');
    })
}
$scope.passport1 = function(){
    $http({method:'get',url:'/getpassport',data:$scope.userlogin}).then(function(response){
        console.log(response.data);
        if(response.data.status){
            var img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + btoa( response.data.data);
            document.body.appendChild(img);
            $scope.imagesrc = response.data.data;
        }
        else
        {
            alert('do login again/ or you didnt have uploded')
        }
    })
}
$scope.aadhar1 = function(){
    $http({method:'get',url:'/getpaadhar',data:$scope.userlogin}).then(function(response){
        console.log(response.data);
        if(response.data.status){
            var img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + btoa( response.data.data);
            document.body.appendChild(img);
            $scope.imagesrc = response.data.data;
        }
        else
        {
            alert('do login again/ or you didnt have uploded')
        }
    })
}
$scope.pan1 = function(){
    $http({method:'get',url:'/getpan',data:$scope.userlogin}).then(function(response){
        console.log(response.data);
        if(response.data.status){
            var img = document.createElement('img');
            img.src = 'data:image/jpeg;base64,' + btoa( response.data.data);
            document.body.appendChild(img);
            $scope.imagesrc = response.data.data;
        }
        else
        {
            alert('do login again/ or you didnt have uploded')
        }
    })
}
$scope.logout = function(){
    localStorage.removeItem('user')
    $scope.userstatus=true;
    $scope.usersdata=false;
}
}])