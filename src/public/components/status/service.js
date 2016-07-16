angular.module('pgstatus')
.factory('statusService', function($http){
    var statusService = {};

    statusService.get = function(){
        return $http.get('/api/status');
    };

    statusService.post = function(status){
        return $http.post('/api/status', {
            status: status
        });
    };

    return statusService;
});
