angular.module('letsgo.profile.controllers', [])
.controller('ProfileController', ProfileController);


ProfileController.$inject = ['$scope', '$auth', 'ProfileService'];
function ProfileController($scope, $auth, ProfileService){
    ProfileService.getProfile().then(function(data){
        $scope.user = data.data;
        ProfileService.current = $scope.user;
    });
}
