// backend http services
angular.module("angservice", []).factory('factoryname', ($http) => {
return {
  users :  ()=> {
     return $http.post('/user/all');
  },
  posts : () => {
     return $http.post('/post/all');
  },
   login: (email, password)=>{
      return $http.post('/user/login',"muthu@gmail.com", "muthu");
   },


}
});
