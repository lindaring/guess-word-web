app.factory('userService', function ($http, HOST, USER_ENDPOINT) {

    return {
        getTopTenList: function (limit) {
            var promise = $http({
                method: 'GET',
                url: HOST + USER_ENDPOINT + '/topscore/' + limit
            });
            return promise;
        }
    };

});