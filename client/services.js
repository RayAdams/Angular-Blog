angular.module('myApp.services', [])
.service('UserService', ['$http', '$location', function($http, $location) {
    var currentUser;
    this.isLoggedIn = function() {
        return !!currentUser;
    }

    this.isAdmin = function() {
        if (currentUser && currentUser.role === 'admin') {
            return true;
        } else {
            return false;
        }
    }

//(replaced requireLogin-wont redirect to the original)
    this.loginRedirect = function() {
        var current = $location.path();
        $location.replace().path('/login').search('dest', current);
    }
    
    this.login = function(email, password) {
        return $http({
        method: 'POST',
        url: '/api/users/login',
        data: {email: email, password: password}
        }).then(function(response) {
            currentUser = response.data;
            return currentUser;
        }, function(err) {
            console.log(err);
        });
    }

    this.logout = function() {
        return $http({
        method: 'GET',
        url: '/api/users/logout'
        }).then(function() {
            currentUser = undefined;
        });
    }

    this.me = function() {
        if (currentUser) { 
            return Promise.resolve(currentUser); 
        }
        else {
            return $http({
                method: 'GET',
                url: 'http://localhost:3000/api/users/me'
            }).then(function (response) {
                currentUser = response.data;
                return currentUser;
            });
        }
    }

}])
.service('CategoryService', ['$http', '$location', function($http, $location) { 
    var currentCategories; 
    this.getCategories = function() {   
        if (currentCategories) {
            return Promise.resolve(currentCategories); 
        }
        else {
            return $http({
            method: 'GET',
            url: 'http://localhost:3000/api/categories' 
        }).then(function (response) {
            return response.data;
        });
        }
    }
}])
.service('SEOService', ['$rootScope', function($rootScope) {
    this.setSEO = function(data) {
        $rootScope.seo = {};
        for(var p in data) {
        $rootScope.seo[p] = data[p];
        }
    }
}]);