angular.module('myApp', ['myApp.controllers', 'myApp.factories', 'myApp.services', 'ngRoute', 'ngResource'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'views/landing.html',
            controller: 'LandingController'
        })
        .when('/compose', {
            templateUrl: 'views/compose.html',
            controller: 'ComposeController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/logout', {
            templateUrl: 'views/logout.html',
            controller: 'LogoutController'
        })
        .when('/users', {
            templateUrl: 'views/user_list.html',
            controller: 'UserListController',
            // requiresLogin: true,
            // requiresAdmin: true
        })
        .when('/:id/update', {
            templateUrl: 'views/single_update.html',
            controller: 'SingleUpdateController'
        })
        .when('/:id', {
            templateUrl: 'views/single_post.html',
            controller: 'SinglePostController'
        })
        .otherwise({
            redirectTo: '/'
        });
        
}]);
// .run(['$rootScope', '$location', 'UserService', function($rootScope, $location, UserService) {
//     $rootScope.$on('$routeChangeStart', function(event, nextRoute, previousRoute) {
//         if (nextRoute.$$route.requiresLogin && !UserService.isLoggedIn()) {
//             event.preventDefault();
//             UserService.loginRedirect();
//         } else if (nextRoute.$$route.requiresAdmin && !UserService.isAdmin()) {
//             event.preventDefault();
//             $location.replace().path('/');
//         }
//     });
// }]);