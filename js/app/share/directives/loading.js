angular.module('letsgo.share.directive', [])
.directive('loading', function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/app/share/directives/loading.html',
        link: function(scope, element, attrs) {
            scope.$on('$destroy', function(){
                console.log('destroyed');
                element.remove();
            });
        }
    };
});
