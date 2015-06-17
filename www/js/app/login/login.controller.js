angular.module('letsgo.login.controllers', [])
.controller('LoginController', LoginController);

LoginController.$inject = ['$scope', '$state', '$auth', '$ionicModal', '$ionicPopup', 'ShareService'];
function LoginController($scope, $state, $auth, $ionicModal, $ionicPopup, ShareService ){

    if($auth.isAuthenticated()) {
        console.log("redirect");
        $state.transitionTo('app.dashboard');
    }
    else
        ShareService.wakeUpDynos();

    $scope.login = function() {
        $auth.login({
            email: $scope.email
          , password: $scope.password
        }).then(function(response) {
            // Successful login
            console.log(response);
        }).catch(function(err){
            console.log(JSON.stringify(err));
            if(err.status === 400){
                $ionicPopup.alert({
                    title: 'Erro',
                    template: err.data.non_field_errors
                });
            }
        });
    };

    $scope.signup = function(form) {
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
            console.log(JSON.stringify(error));
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
