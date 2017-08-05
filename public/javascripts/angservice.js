// backend http services
angular.module("angservice", []).factory('factoryname', function($http){
  console.log("angular services");
  return {
  users :  ()=> {
     return $http.post('/user/all');
  },
  posts : () => {
     return $http.post('/post/all');
  },
   login: (obj)=>{
        return $http.post('/user/login', obj);
      // return $http({method: 'POST',url: "/user/login",headers: {'Content-Type': undefined},
      //              data: obj,transformRequest: function (data, headersGetter) {
      //               var formData = new FormData();
      //               angular.forEach(obj, function (value, key)
      //               {formData.append(key, value);});
      //               var headers = headersGetter();
      //                delete headers['Content-Type'];
      //                return formData;}});
   },
}

});
