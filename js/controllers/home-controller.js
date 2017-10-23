app.controller('homeController', function ($scope, $location, userService) {

    $scope.WORD_LIMIT = 10;
    $scope.topTenList = [];
    $scope.isLoading = true;

    $scope.getTopScore = function () {
        $scope.topTenPromise = userService.getTopTenList($scope.WORD_LIMIT);
        $scope.topTenPromise.then(function success(response) {
            $scope.topTenList = response.data;
            enablePage(true);
        }).catch(function () {
            console.log("Home controller :: Get top ten list failed.");
        });
    };

    $scope.refresh = function () {
        enablePage(false);
        $scope.getTopScore();
    };

    $scope.refresh();

});