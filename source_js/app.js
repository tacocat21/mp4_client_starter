var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/usersview', {
    templateUrl: 'partials/users.html',
    controller: 'UsersController'
  }).
  when('/taskview', {
    templateUrl: 'partials/tasks.html',
    controller: 'TaskController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/llamalist', {
    templateUrl: 'partials/llamalist.html',
    controller: 'LlamaListController'
  }).
  when('/adduser',{
    templateUrl: 'partials/addUser.html',
    controller: 'addUserController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);
