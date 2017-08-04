console.log("js")
angular.module('angcontroller',['angservice'])
.controller('maincontroller', function(factoryname, $scope){
  factoryname.users().then(function(data){
    if(data.status == 200){
    $scope.alluser = data.data;
    console.log(data.data);
   }
  });
  factoryname.posts().then(function(data){
    if(data.status == 200){
    $scope.allposts = data.data;
    console.log(data.data);
   }
  });
  factoryname.login().then(function(data){
    console.log("login", data);
    if(data.status == 200){
    $scope.allposts = data.data;
    console.log(data.data);
   }
  });




});
