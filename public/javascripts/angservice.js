// backend http services
angular.module("angservice", []).factory('factoryname', function($http, $q, $window){
  console.log("angular services");
  return {
  users :  () => {
     return $http.post('/user/all');
  },
  posts : ()  => {
     return $http.post('/post/all');
  },
   login: (obj) =>{
             return $http.post('/user/login', obj);
   },
   register: (obj) =>{
     return $http.post('/user/register', obj);
   },
   createPost: (obj) => {
     return $http.post('/post/create', obj);
   },
   applyvote: (obj) => {
     return $http.post('/vote/create', obj);
   },
   deletevote: (obj) => {
     return $http.post('/vote/delete', obj);
   },
   countvote: (obj) => {
     return $http.post('/vote/count', obj);
   },
 };
 // the seperate service for the session storage with jwt
}).service('authInterceptor', function ($q, $window) {
return  {
     request: function (config) {
       config.headers = config.headers || {};
       if ($window.sessionStorage.token) {
         config.headers.Authorization = $window.sessionStorage.token;
       }
        return config;
     },
     response: function (response) {
       if (response.status === 401) {
         // handle the case where the user is not authenticated
       }
       return response || $q.when(response);
     },
   };
// $httpProvider.interceptors.push('authInterceptor');
});
