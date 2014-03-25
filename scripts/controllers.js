var bookshelfControllers = angular.module('bookshelfControllers', []);
bookshelfControllers.controller('bookListCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.get('admin/books/books.json').success(function (data) {
            var page_num = parseInt($routeParams.pageId);
            if (page_num > 0) {
                var tem_num = (page_num - 1) * 9;
                $scope.books = data.slice(tem_num, tem_num + 9);
                $scope.pageNum = page_num;
                var total_pages = (data.length / 9 | 0) + 1;
                $scope.pagination = [];
                if (total_pages == 1) {
                    $scope.hidePagi = true;
                } else {
                    if (page_num == 1) {
                        $scope.lDisabled = 'disabled';
                        if (page_num == total_pages) {
                            $scope.rDisabled = 'disabled';
                        }
                    } else if (page_num == total_pages) {
                        $scope.rDisabled = 'disabled';
                    }
                }
                for (var i = 0; i < total_pages; i++) {
                    if (i == page_num) {
                        $scope.pagination.push(i + 1);
                    } else {
                        $scope.pagination.push(i + 1);
                    }
                }
            } else if (!$routeParams.pageId) {
                $scope.pageNum = 1;
                var total_pages = (data.length / 9 | 0) + 1;
                $scope.books = data.slice(0, 9);
                $scope.pagination = [];
                if (total_pages == 1) {
                    $scope.hidePagi = true;
                } else {
                    $scope.lDisabled = 'disabled';
                    for (var i = 0; i < total_pages; i++) {
                        if (i == page_num) {
                            $scope.pagination.push(i + 1);
                            $scope.pagination[i]['active'] = 'active';
                        } else {
                            $scope.pagination.push(i + 1);
                        }
                    }
                }
            } else {
                console.log('Error Url Parameters');
            }
        });

        $scope.orderProp = '-year';
}]);

bookshelfControllers.controller('bookDetailCtrl', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.get('admin/books/detail/' + $routeParams.bookId + '.json').success(function (data) {
            $scope.book = data;
        });
}]);