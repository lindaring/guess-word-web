app.controller('guessWordController', function ($scope, $timeout, wordService) {

    $scope.TOP_TEN_LIMIT = 10;
    $scope.randomWordList = [];
    $scope.definition = {};
    $scope.wordCounter = 0;

    $scope.form = {
        correctWord: "",
        enteredWord: "",
        score: 0,
        result: ""
    }

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
        if ($scope.form.enteredWord != '') {
            if (($scope.wordCounter + 1) < $scope.TOP_TEN_LIMIT) {
                //Next question
                $scope.evaluateScore();
                $scope.wordCounter++;
            } else {
                //End of questions
                $scope.form.result = "done";
            }
            //Reset words
            $scope.form.enteredWord = "";
            $scope.getDefinition($scope.randomWordList[$scope.wordCounter].wordId);
        }
    };

    $scope.evaluateScore = function () {
        $scope.form.correctWord = $scope.randomWordList[$scope.wordCounter].word;
        if ($scope.form.enteredWord.toLowerCase() == $scope.form.correctWord.toLowerCase()) {
            $scope.form.score += 5;
            $scope.form.result = "correct";
            $scope.timeOutResult();
            _("txtAnswer").focus();
        } else {
            $scope.form.score -= 2;
            $scope.form.result = "wrong";
            $scope.timeOutResult();
            _("txtAnswer").focus();
        }
    };

    $scope.skipQuestion = function () {
        if (($scope.wordCounter + 1) < $scope.TOP_TEN_LIMIT) {
            //Next question
            $scope.wordCounter++;
            $scope.form.enteredWord = "";
            $scope.getDefinition($scope.randomWordList[$scope.wordCounter].wordId);
            _("txtAnswer").focus();
        } else {
            //End of questions
            $scope.form.result = "done";
        }
    };

    $scope.timeOutResult = function () {
        $timeout(function() {
            $scope.form.result = "";
        }, 2500);
    };

    $scope.enterKeyListener = function () {
        window.onkeyup = function(e) {
            if (e.keyCode == 13) {
                $scope.getNextDefinition();
            }
        }
    };

    $scope.refresh = function () {
        $scope.getRandomWords();
        _("txtAnswer").focus();
        $scope.enterKeyListener();
    };

    $scope.refresh();

});