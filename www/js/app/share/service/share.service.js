angular.module('letsgo.share.services', [])
.service('ShareService', ShareService);

ShareService.$inject = ['$http'];
function ShareService($http){

    this.wakeUpDynos = function(){
        return $http.get('https://shrouded-castle-8160.herokuapp.com');
    };
}
