var mp4Controllers = angular.module('mp4Controllers', []);


mp4Controllers.controller('UsersController', ['$scope', 'Users', '$window'  , function($scope, Users, $window) {
  $scope.getData= function(){  
  Users.get().success(function(data){
    $scope.message= data.message;
    $scope.data=data.data;
    $scope.result="";
  }).error(function(err){
    $scope.result=err.message;
  });
  };
  $scope.getData();
   $scope.displayText = $scope.data;
   $scope.removeUser = function(Id){
    Users._delete(Id).success(function(result){
//      $scope.getData();
      $scope.getData();
      $scope.result= "";
    }).error(function(err){
      $scope.result=result.message;
    });

  }
}]);
mp4Controllers.controller('addUsersController', ['$scope', 'Users' , function($scope, Users) {
  $scope.data = "";
  $scope.username;
  $scope.email;
  $scope.result;
  $scope.addUser= function(){
    var input={};
    input.name=$scope.username;
    input.email=$scope.email;
    Users.addUser(input).success(function(data){
      
      $scope.result= data.message;
    }).error(function(err){
      $scope.result=err.message;
    });
  };
}]);

mp4Controllers.controller('addTaskController', ['$scope', 'Tasks' , 'Users', function($scope, Tasks, Users) {
  $scope.getUser = function(){
  Users.get().success(function(data){
    $scope.data=data.data;
    $scope.result="";
  }).error(function(err){
    $scope.result=err.message;
  });

  };
  $scope.addTask = function(){
    var input={};
    input.name=$scope.name;
    input.description=$scope.description;
    input.deadline=$scope.deadline;
    input.completed=false;
    if($scope.user.name){
      input.assignedUserName=$scope.user.name;
    }
    else{
      input.assignedUserName ="unassigned";
    }
    if( $scope.user._id){
      input.assignedUser = $scope.user._id;
    }
    else{
      input.assignedUser =""; 
    }

//    $scope.user.pendingTasks.push($scope.name);
    Tasks.addTask(input).success(function(result){
      $scope.result=result.message;
      //Users.modifyUser($scope.user, $scope.user._id);
    }).error(function(err){
      $scope.result=err.message;
    });
  };
  //$scope.result;
  $scope.getUser();
}]);

mp4Controllers.controller('TaskDetailCtrl', ['$scope', 'Tasks' , '$routeParams', '$window', function($scope, Tasks, $routeParams, $window) {
$scope.getData= function(){

  Tasks.getSpecificTask($routeParams.id).success(function(result){
    $scope._id=result.data._id;
    $scope.name = result.data.name;
    var day  = new Date(result.data.deadline);
    $scope.deadline = ""+day.getDate()+"/"+day.getMonth()+"/"+day.getFullYear();
    $scope.assignedUserName = result.data.assignedUserName;
    $scope.description = result.data.description;
    $scope.completed = result.data.completed;
    $scope.created = result.data.dateCreated;
    $scope.result="";
  }).error(function(err){
    $scope.result = err.message;
  });
}
$scope.getData();

}]);

mp4Controllers.controller('editTaskCtrl', ['$scope',  'Tasks' , '$routeParams','Users',function($scope, Tasks, $routeParams, Users) {

$scope.getData= function(){
  Tasks.getSpecificTask($routeParams.id).success(function(result){
    $scope.name = result.data.name;
    $scope.deadline  = new Date(result.data.deadline);
//  $scope.deadline = ""+day.getDate()+"/"+day.getMonth()+"/"+day.getFullYear();
//  $scope.user = result.data.assignedUserName;
    $scope.userName = result.data.assignedUserName;
    $scope.description = result.data.description;
    $scope.comp = result.data.completed.toString();
    $scope.created = result.data.dateCreated;
    $scope.userSelected= result.data;
    $scope.d=result.data;
    $scope.result=result.message;
  }).error(function(err){
    $scope.result = result.message;
  });
}
$scope.getData();

$scope.getUsers = function(){  
  Users.get().success(function(data){
    $scope.userList = data.data;
    var day  = new Date(data.data.deadline);
    $scope.d = ""+day.getDate()+"/"+day.getMonth()+"/"+day.getFullYear();

  }).error(function(err){
    $scope.result=err.message;
  });
};

$scope.getUsers();
$scope.editTask= function(){
  var query={};
  query.name = $scope.name;

  query.description = $scope.description;
  query.deadline= $scope.deadline;
  query.completed= $scope.comp;
  query.assignedUser = $scope.userSelected._id;
  query.assignedUserName = $scope.userSelected.name;
  Tasks.modifyTask(query, $routeParams.id).success(function(result){
    $scope.result= result.message;
  }).error(function(err){
    $scope.result=result.message;
  })
};

}]);


mp4Controllers.controller('TaskController', ['$scope', 'Tasks' , function($scope, Tasks) {
  var count=10;  
  var skip=0;
  var limit=10;

  $scope.removeTask = function(Id){
      Tasks.deleteTask(Id).success(function(){
        $scope.result="";
        count--;
        if(skip>=count){
          $scope.prevPage();
        }
        else{
          $scope.filter();
        }
      }).error(function(err){
        $scope.result=err.message;
      });
  };

  $scope.query= {where:"'completed':'false'", sort:"name"}
//  $scope.query.where="completed':'false'";
  $scope.ordering= 1;  
  //$scope.getTasks();
  $scope.print = function(){
    console.log($scope.query);
  };
  $scope.filter = function(){
    var str = "?where={"+$scope.query.where+"}&sort={'"+$scope.query.sort+"':'"+$scope.ordering+"'}"+"&skip="+skip+"&limit="+limit;
    Tasks.filterTask(str).success(function(result){
      $scope.result="";
      $scope.data=result.data;
      $scope.data.forEach(function(entry){
        var deadline= new Date(entry.deadline);
        entry.Deadline= ""+deadline.getDate()+"/"+deadline.getMonth()+"/"+deadline.getFullYear();
      });

    }).error(function(err){
      $scope.result=err.message;
      $scope.data=[];
    }); 
  };

  $scope.nextPage= function(){
    var str = "?where={"+$scope.query.where+"}&sort={'"+$scope.query.sort+"':'"+$scope.ordering+"'}"+"&skip="+skip+"&limit="+limit;
    Tasks.count(str).success(function(result){
      count= result.data;
      if(skip>=count-10){
        return;
      }
      skip+=10;
      $scope.filter();
    }).error(function(err){
      $scope.result= err.message;
    });
  }
  $scope.prevPage = function(){
    if(skip==0){
      return;
    }
    skip-=10;
    $scope.filter();
  };
  var decrementCount =function(){

  }
  $scope.filter();
}]);


mp4Controllers.controller('UserDetailCtrl', ['$scope', '$http', 'Users', '$window' , '$routeParams', 'Tasks',function($scope, $http,  Users, $window, $routeParams, Tasks) {
  $scope.getUserData = function(){
    Users.getSpecificUser($routeParams.id).success(function(data){
    $scope.value= data.data;
  }).error(function(err){
    $scope.result=err.message;
  });
  };
  $scope.getUserData();
  $scope.getUserTask = function(){
    Tasks.getUnfinishedUserTasks($routeParams.id).success(function(data){

      $scope.tasks = data.data;
      $scope.tasks.forEach(function(entry){
        var deadline= new Date(entry.deadline);
        entry.Deadline= ""+deadline.getDate()+"/"+deadline.getMonth()+"/"+deadline.getFullYear();
      });
    }).error(function(err){
      $scope.tasks = [];
      $scope.result=err.message;
      
    });
  };
  $scope.getCompleteTasks = function(){
    Tasks.getFinishedUserTasks($routeParams.id).success(function(data){

      $scope.finishedTasks = data.data;
      $scope.finishedTasks.forEach(function(entry){
        var deadline= new Date(entry.deadline);
        entry.Deadline= ""+deadline.getDate()+"/"+deadline.getMonth()+"/"+deadline.getFullYear();
      });
    }).error(function(err){
      $scope.finishedTasks = [];
      $scope.result=err.message;
  
    });

  };
  $scope.getCompleteTasks();
  $scope.getUserTask();
  $scope.completeTask = function(task){
    task.completed=true;
    Tasks.modifyTask(task, task._id).success(function(result){
      $scope.getUserTask();

      $scope.getCompleteTasks();
    }).error(function(err){
      $scope.result=err.message
    });
 //   $scope.getCompleteTasks();
  };
$scope.showComplete =false;
    $scope.show = function(){
      $scope.showComplete=true;
    }

}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);
