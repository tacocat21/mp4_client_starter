var mp4Controllers = angular.module('mp4Controllers', []);


mp4Controllers.controller('UsersController', ['$scope', 'Users', '$window'  , function($scope, Users, $window) {
  $scope.getData= function(){  
  Users.get().success(function(data){
    console.log(data);
    $scope.message= data.message;
    $scope.data=data.data;
  }).error(function(err){
    console.log(err);
  });
  };
  $scope.getData();
   $scope.displayText = $scope.data;
   $scope.removeUser = function(Id){
    Users._delete(Id).success(function(result){
//      $scope.getData();
      $scope.getData();
      console.log($scope.data);
      console.log("success");
    }).error(function(err){
      console.log(err);
    });

  }

  $scope.setData = function(){
    CommonData.setData($scope.data);
//    $scope.displayText = "Data set"
  };

}]);

mp4Controllers.controller('addUsersController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  console.log("gg");
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);


mp4Controllers.controller('TaskController', ['$scope', 'CommonData' , function($scope, CommonData) {
  console.log("task");
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


mp4Controllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl ="http://www.uiucwp.com:4000/api";

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);
