app.controller("NewAMRCtrl", function ($scope, $stateParams, AMRDoc, $state) {

    function syncAMR(raw) {
        window.amr = textToTree(raw);
        $scope.doc.amr = treeToText(window.amr, true);
        makeAMRListView(window.amr);
        draw(window.amr);
    };

    $scope.doc = {
        "text": "",
        "amr": ""
    };

    $scope.hideMessages = function () {
        $scope.MESSAGES = {
            "TEXT_MISSING": false,
            "AMR_MISSING": false
        };
    };

    $scope.hideMessages();

    $scope.save = function () {
        if (!$scope.doc.text) {
            $scope.MESSAGES.TEXT_MISSING = true;
        } else {
            $scope.hideMessages();
            AMRDoc.save($scope.doc).$promise.then(function (doc) {
                $state.go("amrDetail", {"id": doc.id});
            })
        }
    }
});