app.controller('guessWordController', function ($scope, wordService) {

    $scope.TOP_TEN_LIMIT = 10;
    $scope.randomWordList = [];
    $scope.definition = {};
    $scope.wordCounter = 0;
    $scope.score = 0;

    $scope.getRandomWords = function () {
        $scope.randomWordPromise = wordService.getRandomList($scope.TOP_TEN_LIMIT);
        $scope.randomWordPromise.then(function success(response) {
            $scope.randomWordList = response.data;

            $scope.getDefinition($scope.randomWordList[$scope.wordCounter].wordId);
        }).catch(function () {
            console.log("Guess word controller :: Get random words.");
        });
    };

    $scope.getDefinition = function (wordId) {
        $scope.definitionPromise = wordService.getDefinition(wordId);
        $scope.definitionPromise.then(function success(response) {
            $scope.definition = response.data;
        }).catch(function () {
            console.log("Guess word controller :: Get definition.");
        });
    };

    $scope.getNextDefinition = function () {
        if ($scope.wordCounter < $scope.TOP_TEN_LIMIT) {
            //Next question
            $scope.wordCounter++;
            $scope.score++;
        } else {
            //End of questions
            //TODO - calculate final score
        }
        $scope.getDefinition($scope.randomWordList[$scope.wordCounter].wordId);
    };

    $scope.refresh = function () {
        $scope.getRandomWords();
    };

    $scope.refresh();

});