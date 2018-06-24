var app = angular.module('myApp',['ui.bootstrap']);
app.controller('myCtrl',['$scope','$http','$window','$modal','$filter',function($scope,$http,$window,$modal,$filter){
    $scope.data={passport:false,aadhar:false,pan:false};
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
             })
        
    }
}])