app.factory('userService', function ($http, HOST, USER_ENDPOINT) {

    return {
        getTopTenList: function (limit) {
            var promise = $http({
                method: 'GET',
                url: HOST + USER_ENDPOINT + '/topscore/' + limit
            });
            return promise;
        },
        saveTopTen: function (user) {
            var promise = $http({
                method: 'POST',
                url: HOST + USER_ENDPOINT + '/add',
                data: user
            });
            return promise;
        }
    };

});