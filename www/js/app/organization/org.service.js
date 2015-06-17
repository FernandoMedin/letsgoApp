angular.module('letsgo.org.services', [])
.service('OrgService', OrgService);

OrgService.$inject = ['$http', '$'];
function OrgService($http, $){

    this.create = function(data){
        return $http.post($.baseUrl+ 'organizations/', data);
    };
}
