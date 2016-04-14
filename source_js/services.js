var mp4Services = angular.module('mp4Services', []);
var baseUrl = "http://www.uiucwp.com:4000/api";
mp4Services.factory('CommonData', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        }
    }
});


mp4Services.factory('Users', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;

            console.log("URL"+baseUrl);
            return $http.get(baseUrl+'/users');
            
        },
        _delete : function(Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+'/users/'+Id);
        },
        addUser :function(query){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/users',query );
        },
        modifyUser : function(query, Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl+'/users/'+Id,query );  
        },
        getSpecificUser : function(Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/users/'+Id );  
        }
    }
});

mp4Services.factory('Tasks', function($http, $window) {
    return{
        getAll : function(){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/tasks');
        },
        addTask: function(query){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/tasks', query);
        },
        getSpecificTask: function(Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/tasks/'+Id);
        },
        modifyTask:function(query, Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl+'/tasks/'+Id, query);  
        },
        getUnfinishedUserTasks:function(Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/tasks?where={"assignedUser":"'+Id+'", "completed": "false"}');
        },
        getFinishedUserTasks: function(Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/tasks?where={"assignedUser":"'+Id+'", "completed": "true"}');  
        },
        deleteTask :function(Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+'/tasks/'+Id);
        },
        filterTask: function(str){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/tasks'+str);
        },
        count: function(str){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/tasks'+str+'&count=true');
        }

    }
});