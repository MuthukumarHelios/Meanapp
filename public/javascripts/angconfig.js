// config file which provides us a particular state and routes;
console.log("angularconfig.js");
angular.module('app', ['angcontroller','ui.router', 'angservice']).
config(function($stateProvider, $urlRouterProvider, $qProvider, $httpProvider){
    $stateProvider.
        state('users', {   //this state is meant for user login
          url: '/login',
          templateUrl: '/view/login.html',
          controller:'maincontroller'
      }).state('posts', {   //user to view all available posts
          url: '/allposts',
          templateUrl: '/view/allposts.html',
          controller:'maincontroller'
      }).state('createPosts', {   //home api's
          url: '/createPosts',
          templateUrl: '/view/createPosts.html',
          controller:'maincontroller'
      }).state('userRegister', {
          url: '/userRegister',
          templateUrl: '/view/userRegister.html',
          controller:'maincontroller'
      });
$urlRouterProvider.otherwise('/login');
// $httpProvider.interceptors.push('authInterceptor');
$httpProvider.defaults.headers.post['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibXV0aHVAZ21haWwuY29tIiwiZXhwaXJlc0luTWludXRlcyI6MTQ0MCwiaWF0IjoxNTAxOTI0Mzk4fQ.sWIn69p87Cn3WAsCm5Wn2Gx_Yci-uNXz5wd57H6GqNg';
   // this the built in promises handling
  $qProvider.errorOnUnhandledRejections(false);
});
