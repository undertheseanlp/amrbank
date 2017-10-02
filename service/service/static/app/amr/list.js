app.controller("ListAMRCtrl", function ($scope, AMRDoc) {
    AMRDoc.query(function(docs){
        $scope.docs = docs;
    })
});