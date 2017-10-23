app.controller('guessWordController', function ($scope, $timeout, $route, wordService, userService) {

    $scope.WORD_LIMIT = 3;
    $scope.TEN_TOP_LIST = 10;
    $scope.CORRECT = 5;
    $scope.WRONG = 2;
    $scope.PROMISE_LENGTH = 3;

    $scope.randomWordList = [];
    $scope.topTenList = [];
    $scope.definition = {};
    $scope.wordCounter = 0;
    $scope.promiseCounter = 0;

    $scope.form = {
        correctWord: "",
        enteredWord: "",
        score: 0,
        result: "",
        resultTimeOut: "",
        topTenQualified: false,
        topScoreName: ""
    };
    $scope.user = {
        userId: 0,
        name: "",
        score: 0
    };

    $scope.getTopTen = function () {
        $scope.topTenPromise = userService.getTopTenList($scope.TEN_TOP_LIST);
        $scope.topTenPromise.then(function success(response) {
            $scope.topTenList = response.data;
            $scope.isPageLoaded();
        }).catch(function () {
            console.log("Guess word controller :: Get top ten list failed.");
        });
    };

    $scope.saveTopTen = function () {
        $scope.user.score = $scope.form.score;
        $scope.saveTopTenPromise = userService.saveTopTen($scope.user);
        $scope.saveTopTenPromise.then(function success(response) {
            if (response.data) {
                window.location = '/guess-word-web';
            } else {
                $scope.reload();
            }
        }).catch(function () {
            console.log("Guess word controller :: Get top ten list failed.");
        });
    };

    $scope.getRandomWords = function () {
        $scope.randomWordPromise = wordService.getRandomList($scope.WORD_LIMIT);
        $scope.randomWordPromise.then(function success(response) {
            $scope.randomWordList = response.data;

            $scope.isPageLoaded();
            $scope.getDefinition($scope.randomWordList[$scope.wordCounter].wordId);
        }).catch(function () {
            console.log("Guess word controller :: Get random words.");
        });
    };

    $scope.getDefinition = function (wordId) {
        enablePage(false);
        $scope.definitionPromise = wordService.getDefinition(wordId);
        $scope.definitionPromise.then(function success(response) {
            $scope.definition = response.data;
            $scope.isPageLoaded();
        }).catch(function () {
            console.log("Guess word controller :: Get definition.");
            $scope.isPageLoaded();
        });
    };

    $scope.getNextDefinition = function () {
        if ($scope.form.enteredWord !== '') {
            if (($scope.wordCounter + 1) < $scope.WORD_LIMIT) {
                //Next question
                $scope.evaluateScore();
                $scope.wordCounter++;
                //Reset words
                $scope.form.enteredWord = "";
                $scope.getDefinition($scope.randomWordList[$scope.wordCounter].wordId);
            } else {
                //End of questions
                $scope.evaluateScoreEnd();
                var lastTopTen = $scope.topTenList[$scope.TEN_TOP_LIST - 1] !== null ? $scope.topTenList[$scope.TEN_TOP_LIST - 1].score :
                    $scope.topTenList[$scope.topTenList.length - 1].score;
                if ($scope.form.score > lastTopTen) {
                    $scope.form.topTenQualified = true;
                }
            }
        }
    };

    $scope.evaluateScore = function () {
        $scope.form.correctWord = $scope.randomWordList[$scope.wordCounter].word;
        //Check score
        if ($scope.form.enteredWord.toLowerCase() === $scope.form.correctWord.toLowerCase()) {
            $scope.form.score += $scope.CORRECT;
            $scope.form.result = "correct";
            $scope.timeOutResult();
            _("txtAnswer").focus();
        } else {
            $scope.form.score -= $scope.WRONG;
            $scope.form.result = "wrong";
            $scope.timeOutResult();
            _("txtAnswer").focus();
        }
    };

    $scope.evaluateScoreEnd = function () {
        $timeout.cancel($scope.form.resultTimeOut);
        $scope.form.correctWord = $scope.randomWordList[$scope.wordCounter].word;
        //Check score
        if ($scope.form.enteredWord.toLowerCase() === $scope.form.correctWord.toLowerCase()) {
            $scope.form.score += $scope.CORRECT;
        } else {
            $scope.form.score -= $scope.WRONG;
        }
        //Complete
        $scope.form.result = "done";
        _("txtTopScore").focus();
    };

    $scope.skipQuestion = function () {
        if (($scope.wordCounter + 1) < $scope.WORD_LIMIT) {
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

    $scope.isPageLoaded = function () {
        $scope.promiseCounter += 1;
        if ($scope.promiseCounter >= $scope.PROMISE_LENGTH) {
            enablePage(true)
        }
    };

    $scope.timeOutResult = function () {
        $scope.form.resultTimeOut = $timeout(function() {
            $scope.form.result = "";
        }, 2500);
    };

    $scope.enterKeyListener = function () {
        window.onkeyup = function(e) {
            if (e.keyCode === 13) {
                $scope.getNextDefinition();
            }
        }
    };

    $scope.reload = function () {
        $route.reload();
    };

    $scope.refresh = function () {
        enablePage(false)
        $scope.getRandomWords();
        $scope.getTopTen();
        _("txtAnswer").focus();
        //$scope.enterKeyListener();
    };

    $scope.refresh();

});