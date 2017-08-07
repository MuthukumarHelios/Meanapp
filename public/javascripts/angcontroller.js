console.log("js")
angular.module('angcontroller',['angservice'])
.controller('maincontroller', function(factoryname, authInterceptor,$scope, $state, $window) {
  // $httpProvider.defaults.headers.post['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibXV0aHVAZ21haWwuY29tIiwiZXhwaXJlc0luTWludXRlcyI6MTQ0MCwiaWF0IjoxNTAxOTI0Mzk4fQ.sWIn69p87Cn3WAsCm5Wn2Gx_Yci-uNXz5wd57H6GqNg';

 console.log(authInterceptor);
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
    console.log(data);
   }
  });
  var user_id = $window.localStorage.getItem("user_id");
          // login function for user
      $scope.loginuser = function(dataval){
        var valid = $scope.formdata.email !== undefined && $scope.formdata.password !== undefined;
           console.log("valid", valid);
            if(valid){
                // console.log($scope.formdata);
                   factoryname.login($scope.formdata).then(function(data){

                     $window.sessionStorage.token = data.data.jwt;
                       $window.localStorage.setItem("user_id",data.data.user_id);
                       if(data.status == 200){
                          if(data.data.error == false){
                            console.log(data.data.user_id);
                            alert(data.data.message);
                               $state.go('posts');
                                 $scope.formdata = {};
                             }else{alert(data.data.message);}
                        }else{
                       alert("check your bakcend");
                        }
                   });
              }
             else{alert('kindly fill out the mandatory field');}
           };
    $scope.registerUser = function(dataval)  {
    var valid = $scope.formdata.name && $scope.formdata.email && $scope.formdata.password && $scope.formdata.confirmpass;

      console.log(valid);
      if(valid){
             factoryname.register($scope.formdata).then(function(data){
               console.log($scope.formdata);
                   if(data.status == 200){
                       console.log("user register",data);
                          if(data.data.error == false){
                               alert(data.data.message);
                                 $state.go('posts');
                                  $scope.formdata = {};
                          }else{alert(data.data.message);}
                   }
                  else{alert("check your bakcend");}
            });
         }
         else{
           alert("kindly fill out all mandatory fields");
         }
  };
$scope.createPost = function(dataval)  {
  $scope.formdata.uid = user_id;
  var valid = $scope.formdata.title && $scope.formdata.body;
  console.log("inside createPost",$scope.formdata);
   console.log(valid);
   if(valid){
        factoryname.createPost($scope.formdata).then(function(data){
           console.log($scope.formdata);
             if(data.status == 200){
              console.log("user register",data);
                if(data.data.error == false){
                    alert(data.data.message);
                      $state.go('posts');
                        $scope.formdata = {};
                         }else{alert(data.data.message);}
             }else{alert("check your bakcend");}
          });
     }else{ alert("kindly fill out all mandatory fields");
 }
};
// the below function is used for upvote the particular votes
$scope.upvote = (dataval) => {
         var overloading = {};
         console.log(user_id);
         console.log("dataval",dataval);
    overloading.voted_by = user_id;
    overloading.post_id  = dataval;
  // var overloading = {voted_by: dataval, post_id: user_id};
console.log(overloading,"==>objects");

            factoryname.applyvote(overloading).then(function(data){
               if(data.status == 200){
                  console.log("applying vote", data);
                  if(!data.data.error){
                    alert(data.data.message);
                  }
                  else{return alert(data.data.message);}
               }
               overloading = {};
            });
};
// the below scope is used to down vote the posts

$scope.downvote = (dataval) => {
        $scope.formdata.voted_by = user_id;
        $scope.formdata.post_id  = dataval;
  console.log("after overloading",$scope.formdata);
            factoryname.deletevote($scope.formdata).then(function(data){
               if(data.status == 200){
                  console.log("applying vote", data);
                  if(data.data.error == false){
                    alert(data.data.message);
                  }
                  else{return alert(data.data.message);}
               }
            });
};
    $scope.logout = function(){
      $window.localStorage.removeItem("user_id");
      $window.sessionStorage.token = "";
     $state.go('users');
   };
});
