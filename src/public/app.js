var app = angular.module('pgstatus', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'components/home/home.html',
            controller: 'homeCtrl'
        });
});

app.controller('homeCtrl', function($scope, statusService){
    $scope.status = 'retrieving...';
    $scope.posted = false;

    statusService.get().then(function(res){
        $scope.status = res.data.status;
    });

    $scope.post = function(status){
        statusService.post(status).then(function(res){
            $scope.posted = true;
        })
    };
});
