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
  when('/adduser',{
    templateUrl: 'partials/addUser.html',
    controller: 'addUsersController'
  }).
  when('/users/:id',{
    templateUrl: 'partials/userDetail.html',
    controller: 'UserDetailCtrl'
  }).
  when('/tasks/:id',{
    templateUrl: 'partials/taskDetail.html',
    controller: 'TaskDetailCtrl'
  }).
    when('/edittask/:id',{
    templateUrl: 'partials/editTask.html',
    controller: 'editTaskCtrl'
  }).
  when('/addtask',{
    templateUrl: 'partials/addTask.html',
    controller: 'addTaskController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);
