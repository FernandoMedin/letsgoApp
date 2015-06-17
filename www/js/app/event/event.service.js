angular.module('letsgo.event.services', [])
.service('EventService', EventService)
.service('OrgService', OrgService);

EventService.$inject = ['$http', '$'];
function EventService($http, $){

    this.findAll = function(){
        return $http.get($.baseUrl + 'events/');
    };

    this.categories = function(){
        return $http.get($.baseUrl + 'event_category/');
    };

    this.types = function(){
        return $http.get($.baseUrl + 'event_type/');
    };

    this.create = function(data){
        return $http.post($.baseUrl + 'events/', data);
    };
}

OrgService.$inject = ['$http', '$'];
function OrgService($http, $){

    this.create = function(data){
        return $http.post($.baseUrl + 'organizations/', data);
    };
}
