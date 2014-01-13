var bookshelfControllers = angular.module('bookshelfControllers',[]);
bookshelfControllers.controller('bookListCtrl',['$scope','$http',
    function($scope,$http){
        $http.get('books/books.json').success(function(data){
            $scope.books = data;
        });

        /*$.ajax({url:'http://api.douban.com/v2/book/6801488?apikey=0d0ddd1b987ff58827299752c97fe098',dataType:'jsonp'}).done(function(data){
            console.log(data['author']+','+data['id']);
        });*/

    $scope.orderProp = '-year';
}]);

bookshelfControllers.controller('bookDetailCtrl',['$scope','$routeParams','$http',function($scope,$routeParams,$http){
    $http.get('books/' + $routeParams.bookId + '.json').success(function(data) {
        $scope.book = data;
    });
}]);