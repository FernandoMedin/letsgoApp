// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('letsgo',
    ['ionic'
    ,'satellizer'
    ,'letsgo.menu'
    ,'letsgo.login'
    ,'letsgo.dashboard'
    ,'letsgo.profile'
    ,'letsgo.event'
    ])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('intro', {
        url: '/login'
      , templateUrl: "templates/intro.html"
      , controller: 'LoginController'
    })
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'MenuController'
    })
    .state('app.dashboard', {
        url: "/dashboard"
      , authenticate: true
      , views: {
            'menuContent': {
                templateUrl: "templates/dashboard.html"
              , controller: "DashboardController"
            }
        }
    })
    .state('app.events', {
        url: "/events"
      , authenticate: true
      , views: {
            'menuContent': {
                templateUrl: "templates/events.html"
              , controller: "EventController"
            }
        }
    })
    .state('app.profile', {
        url: "/profile",
        views: {
            'menuContent': {
                templateUrl: "templates/profile.html",
                controller: 'ProfileController'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
})
.config(function ($ionicConfigProvider, $authProvider) {

    // Enable native scrolls for Android platform only,
    // as you see, we're disabling jsScrolling to achieve this.
    if(ionic.Platform.isAndroid())
        $ionicConfigProvider.scrolling.jsScrolling(true);

    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid())
        $authProvider.platform = 'mobile';

    var commonConfig = {
        popupOptions: {
            location: 'no',
            toolbar: 'no',
            width: window.screen.width,
            height: window.screen.height
        },
    };

    // $authProvider.baseUrl = 'http://localhost:8000/';
    $authProvider.baseUrl = 'https://shrouded-castle-8160.herokuapp.com/';
    $authProvider.loginUrl = '/api-auth/';
    $authProvider.loginRedirect = '/app/dashboard';
    $authProvider.logoutRedirect = '/login';
    $authProvider.signupUrl = '/users/';
    $authProvider.signupRedirect = '/app/dashboard';
    $authProvider.authToken = 'Token';
    $authProvider.facebook(angular.extend({}, commonConfig, {
        clientId: '1393877900943102',
        url: '/auth/facebook/'
    }));
})
.run(function($rootScope, $state, $auth){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if(toState.authenticate === true){
            if($auth.isAuthenticated() === false) {
                $state.transitionTo('intro');
            }
        }
    });
});
