var mp4Services = angular.module('mp4Services', []);

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

mp4Services.factory('Llamas', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/llamas');
        }
    }
});

mp4Services.factory('Users', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            var data= $http.get(baseUrl+'/users');
            console.log(angular.toJson(data));
            return data;
        },
        _delete : function(Id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+'/users/'+Id);
           

        }
    }
});
