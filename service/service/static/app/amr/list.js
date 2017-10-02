app.controller("ListAMRCtrl", function ($scope, AMRDoc, STATUSES, QUALITIES, $stateParams) {
    $scope.STATUSES = STATUSES;
    $scope.QUALITIES = QUALITIES;
    console.log($stateParams);
    $scope.status = $stateParams.status ? $stateParams.status : 'ALL';
    $scope.quality = $stateParams.quality ? $stateParams.quality : 'ALL';

    var query = {};
    if($scope.status != "ALL"){
        query["status"] = $scope.status;
    }
    if($scope.quality != "ALL"){
        query["quality"] = $scope.quality;
    }
    AMRDoc.query(query, function(data){
        $scope.docs = data;
    });

    $scope.updateStatus = function(value){
        $scope.status = value;
    };

    $scope.updateQuality = function(value){
        $scope.quality = value;
    };
});