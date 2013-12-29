var bookshelfApp = angular.module('bookshelfApp',[]);
bookshelfApp.controller('bookListCtrl',function($scope,$http){
    $http.get('books/books.json').success(function(data){
        $scope.books = data;
    });

    $scope.orderProp = 'year';
});