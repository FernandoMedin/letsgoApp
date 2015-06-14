angular.module('letsgo.profile.services', [])
.service('ProfileService', ProfileService);

ProfileService.$inject = ['$http', '$auth'];
function ProfileService($http, $auth){

    // console.log($auth);
    var baseUrl = 'https://shrouded-castle-8160.herokuapp.com';

    this.getProfile = function(){
        return $http.get(baseUrl+'/current/');
    };
}
