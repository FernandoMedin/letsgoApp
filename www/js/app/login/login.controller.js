angular.module('letsgo.login.controllers', [])
.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$auth', '$ionicModal'];

function LoginController($scope, $auth, $ionicModal){

    $scope.login = function(){
        $auth.login({
            email: $scope.email
          , password: $scope.password
        });
    };

    $scope.signup = function(form){
        $auth.signup(form).then(function(data){
            console.log(data);
            $scope.closeLogin();
        }).catch(function(err){
            console.log(err);
        });
    };

    $scope.authenticate = function(provider){
        $auth.authenticate(provider).then(function(data){
            $scope.authenticated = true;
            console.log(data);
        }, function(error) {
            console.log(error);
        });
    };

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.signupModal = function() {
        $scope.modal.show();
    };

    $scope.closeLogin = function() {
        $scope.modal.hide();
    };
}
