angular.module('letsgo.event.controllers', [])
.controller('EventController', EventController);

EventController.$inject = ['$scope', '$state', '$stateParams', '$filter', '$auth', '$ionicModal', 'EventService', 'OrgService', 'ProfileService'];
function EventController($scope, $state, $stateParams, $filter, $auth, $ionicModal, EventService, OrgService, ProfileService){

    $scope.data = {
        eventType: 'private',
        org: {},
        organization: null
    };

    ProfileService.getProfile().then(function(data){
        $scope.user = data.data;
    });

    EventService.findAll().then(function(data){
        $scope.events = data.data;
        if($stateParams.id)
            $scope.event = $scope.events[$stateParams.id];
    });

    EventService.categories().then(function(data){
        $scope.categories = data.data;
    });

    EventService.types().then(function(data){
        $scope.types = data.data;
    });

    $scope.create = function(data){

        //Set date format yyyy-MM-dd
        data.date = $filter('date')(data.datepicker, 'yyyy-MM-dd');
        data.time = $filter('date')(data.timepicker, 'hh:mm:ss');

        console.log(data);
        data.user = $scope.user.id;
        if($scope.data.eventType === 'private'){
            data.event_type = 1;
            EventService.create(data).then(function(data){
                $scope.events.push(data.data);
                GoBack();
            }).catch(function(err){
                console.log(err);
            });

        } else {
            // Create an Organization
            data.org.premium = false;
            data.org.user = $scope.user.id;
            OrgService.create(data.org).then(function(org){

                data.event_type = 2;
                data.organization = org.id;
                data.user = null;
                EventService.create(data).then(function(data){
                    $scope.events.push(data.data);
                    GoBack();
                }).catch(function(err){
                    console.log(err);
                });
            });
        }

    };

    $ionicModal.fromTemplateUrl('templates/events/modal/event.new.html', {
        scope: $scope
    }).then(function(modal){
        $scope.modal = modal;
    });

    $scope.newModal = function(){
        if($scope.data.eventType === 'public') {
            if(typeof($scope.data.org.name) !== 'undefined')
                $scope.modal.show();
        } else {
            $scope.modal.show();
        }
    };

    $scope.close = function(){
        $scope.modal.hide();
    };

    function GoBack(){
        $scope.modal.hide();
        $state.transitionTo('app.events');
    }
}
