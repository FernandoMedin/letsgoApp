angular.module('letsgo.profile.services', [])
.service('ProfileService', ProfileService);

ProfileService.$inject = ['$http', '$auth', '$'];
function ProfileService($http, $auth, $){

    this.current;

    this.getProfile = function(){
        return $http.get($.baseUrl+'current/');
    };

    this.getUser = function(id){
        return $http.get($.baseUrl+'users/'+id);
    };

    this.getCurrent = function(){
        console.log(this.current);
        return this.current;
    };
}
