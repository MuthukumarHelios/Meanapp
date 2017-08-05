console.log("js")
angular.module('angcontroller',['angservice'])
.controller('maincontroller', function(factoryname, $scope, $state) {
  $scope.formdata = {};
  factoryname.users().then((data) => {
    if(data.status == 200){
      $scope.alluser = data.data;
    console.log(data.data);
   }
  });
  factoryname.posts().then((data) => {
    if(data.status == 200){
    $scope.allposts = data.data;
    console.log(data.data);
   }
  });
          // login function for user
      $scope.loginuser = function(dataval){
            if($scope.formdata.email !== undefined && $scope.formdata.password !== undefined){
                // console.log($scope.formdata);
                   factoryname.login($scope.formdata).then(function(data){
                       if(data.status == 200){
                          if(data.data.error == false){
                            alert(data.data.message);
                            $scope.formdata = {};
                         $state.go('posts');
                       }else{alert(data.data.message);}
                        }else{
                       alert("check your bakcend");
                        }
              });
             }
             else{
               alert('kindly fill out the mandatory field');
             }
           }

});
