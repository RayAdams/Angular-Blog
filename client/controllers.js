angular.module('myApp.controllers', [])
.controller('LandingController', ['$scope', 'Post', '$location', 'SEOService', 'UserService', function($scope, Post, $location, SEOService, UserService) {
    $scope.posts = Post.query(function() {
        SEOService.setSEO({
            title: 'Welcome',
            // image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
            url: $location.url(),
            description: 'Welcome to ["hip","hip"], a blog for beginnner web devs and their friends.'
        });
    });


}])
.controller('ComposeController', ['$scope', 'Post', 'User', 'Category', function($scope, Post, User, Category) {
    $scope.posts = Post.query();
    $scope.users = User.query();
    $scope.categories = Category.query();

    $scope.createPost = function() {
        var p = new Post ({
            userid: $scope.selectedUser, 
            title: $scope.titleToPost,
            content: $scope.contentToPost,
            categoryid: $scope.selectedCategory
        });
        p.$save(function(success) {
            $scope.posts = Post.query();
            window.history.back();
        });
    }
}])
.controller('SinglePostController', ['$scope', 'Post', 'User', 'Category', '$routeParams', 'SEOService', '$location', function($scope, Post, User, Category, $routeParams, SEOService, $location) {
    $scope.post = Post.get({id: $routeParams.id}, function() {
        SEOService.setSEO({
            title: $scope.post.title,
            // image: 'http://' + $location.host() + '/images/contact-us-graphic.png',
            url: $location.url(),
            description: 'Please login'
        });
    });

    $scope.deletePost = function() {
        if(confirm('Are you sure you want to delete?')){
            $scope.post.$delete(function() {
                window.history.back();
            }, function(err) {
                console.log(err);
            });
        }
    }

    

}])
.controller('SingleUpdateController', ['$scope', 'Post', 'CategoryService', '$routeParams', function($scope, Post, CategoryService, $routeParams) {
    $scope.post = Post.get({id: $routeParams.id});
    CategoryService.getCategories().then(function(response) { $scope.category = response });
        
    var postFactory = $scope.post;
    $scope.updatePost = function() {
        postFactory.title = $scope.titleToPost;
        postFactory.content = $scope.contentToPost;
        postFactory.categoryid = $scope.selectedCategory;
        postFactory.$update();
        window.history.back();
    }
}])
.controller('LoginController', ['$scope', 'UserService', '$location', 'SEOService', function($scope, UserService, $location, SEOService) {
    UserService.me().then(function() {
        redirect();
    });
  
   $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err);
        });
    }

    function redirect() {
        var dest = $location.search().dest;
        if (!dest) { 
            dest = '/'; 
        }
        $location.replace().path(dest).search('dest', null);
    }

    SEOService.setSEO({
        title: 'Login',
        url: $location.url(),
        description: 'Please login'
    });

}])
.controller('LogoutController', ['$scope', '$location', function($scope, $location) {
    
        window.location.replace('/');

}])
.controller('UserListController', ['$scope', 'User', 'UserService', function($scope, User, UserService) {
    UserService.requireLogin();
    $scope.users = User.query();
}]);