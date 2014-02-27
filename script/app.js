var bookshelfApp = angular.module('bookshelfApp',['ngRoute','bookshelfControllers','bookshelfAnimations','ngSanitize']);
bookshelfApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
    when('/books', {
        templateUrl: 'partials/book-list.html',
        controller: 'bookListCtrl'
    }).
    when('/book/:bookId', {
        templateUrl: 'partials/book-detail.html',
        controller: 'bookDetailCtrl'
    }).
    otherwise({
        redirectTo: '/books'
    });
}]);

angular.module('bookshelfAnimations', ['ngAnimate']);