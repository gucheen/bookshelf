var bookshelfControllers = angular.module('bookshelfControllers',[]);
bookshelfControllers.controller('bookListCtrl',['$scope','$http',
    function($scope,$http){
        $http.get('admin/books/books.json').success(function(data){
            $scope.books = data;
        });

    $scope.orderProp = '-year';
}]);

bookshelfControllers.controller('bookDetailCtrl',['$scope','$routeParams','$http',function($scope,$routeParams,$http){
    $http.get('admin/books/detail/' + $routeParams.bookId + '.json').success(function(data) {
        $scope.book = data;
    });
}]);