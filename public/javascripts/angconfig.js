// config file which provides us a particular state and routes;
console.log("angularconfig.js");
angular.module('app', ['angcontroller','ui.router']).
config(function($stateProvider, $urlRouterProvider, $qProvider,$httpProvider){
    $stateProvider.
       state('users', {
          url: '/login',
          templateUrl: '/view/login.html',
          controller:'maincontroller'
      }).state('posts', {
          url: '/allposts',
          templateUrl: '/view/allposts.html',
          controller:'maincontroller'
      });

  $urlRouterProvider.otherwise('/login');
  // $httpProvider.defaults.headers.post['Content-Type'] =  'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.post['x-access-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibXV0aHVAZ21haWwuY29tIiwiZXhwaXJlc0luTWludXRlcyI6MTQ0MCwiaWF0IjoxNTAxOTI0Mzk4fQ.sWIn69p87Cn3WAsCm5Wn2Gx_Yci-uNXz5wd57H6GqNg';
// // this the built in promises handling
  $qProvider.errorOnUnhandledRejections(false);
});
