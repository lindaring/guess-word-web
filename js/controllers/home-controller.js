app.controller('homeController', function ($scope, $location, userService) {

    $scope.TOP_TEN_LIMIT = 10;
    $scope.topTenList = [];

    $scope.getTopScore = function () {
        $scope.topTenPromise = userService.getTopTenList($scope.TOP_TEN_LIMIT);
        $scope.topTenPromise.then(function success(response) {
            $scope.topTenList = response.data;
        }).catch(function () {
            console.log("Home controller :: Get top ten list failed.");
        });
    };

    $scope.refresh = function () {
        $scope.getTopScore();
    };

    $scope.refresh();

});