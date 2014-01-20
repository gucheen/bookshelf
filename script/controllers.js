var bookshelfControllers = angular.module('bookshelfControllers',[]);
bookshelfControllers.controller('bookListCtrl',['$scope','$http',
    function($scope,$http){
        $http.get('books/books.json').success(function(data){
            $scope.books = data;
        });

    $scope.orderProp = '-year';
}]);

bookshelfControllers.controller('bookDetailCtrl',['$scope','$routeParams','$http',function($scope,$routeParams,$http){
    $http.get('books/' + $routeParams.bookId + '.json').success(function(data) {
        $scope.book = data;
    });
}]);