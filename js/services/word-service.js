app.factory('wordService', function ($http, HOST, WORD_ENDPOINT) {

    return {
        getRandomList: function (limit) {
            var promise = $http({
                method: 'GET',
                url: HOST + WORD_ENDPOINT + '/random/' + limit
            });
            return promise;
        },
        getDefinition: function (wordId) {
            var promise = $http({
                method: 'GET',
                url: HOST + WORD_ENDPOINT + '/' + wordId
            });
            return promise;
        }
    };

});