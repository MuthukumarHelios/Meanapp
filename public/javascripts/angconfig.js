// config file which provides us a particular state and routes;
console.log("angularconfig.js");
angular.module('app', ['angcontroller','ui.router']).
config(function($stateProvider, $urlRouterProvider){
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
});

//below the configuration can go
