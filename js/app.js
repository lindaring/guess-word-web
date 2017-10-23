var app = angular.module('guessWordApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/guess-word', {templateUrl: 'partials/guess-word.html'});
    $routeProvider.otherwise({redirectTo: '/error-404'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
});

app.constant('HOST', 'http://localhost:8585');
app.constant('USER_ENDPOINT', '/guessword/v1/user');
app.constant('WORD_ENDPOINT', '/guessword/v1/word');

function _(element) {
    return document.getElementById(element);
}

function enablePage(state) {
    _("loading").style.display = state ? "none" : "block";
}