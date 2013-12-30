var bookshelfControllers = angular.module('bookshelfControllers',[]);

bookshelfControllers.controller('bookListCtrl',['$scope','$http',
    function($scope,$http){
        $http.get('books/books.json').success(function(data){
        $scope.books = data;
    });

    $scope.orderProp = '-year';
}]);

bookshelfControllers.controller('bookDetailCtrl',['$scope','$routeParams',function($scope,$routeParams){
    $scope.bookId = $routeParams.bookId;
}]);