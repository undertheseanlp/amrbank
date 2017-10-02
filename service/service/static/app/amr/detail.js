app.controller("DetailAMRCtrl", function ($scope, $stateParams, AMRDoc, $state) {

    function syncAMR(raw) {
        window.amr = textToTree(raw);
        $scope.doc.amr = treeToText(window.amr, true);
        makeAMRListView(window.amr);
        draw(window.amr);
    };

    $scope.id = $stateParams.id;
    AMRDoc.get({id: $scope.id}, function (doc) {
        $scope.doc = doc;
        try {
            syncAMR($scope.doc.amr);
        } catch (e) {
            console.log(e);
            $("#SYNTAX_ERROR").show();
        }
    });

    $scope.hideMessages = function () {
        $scope.MESSAGES = {
            "SYNTAX_ERROR": false,
            "LOADING": false,
            "CREATE_SUCCESS": false
        };
    };

    $scope.hideMessages();

    $scope.save = function (createNew) {
        try {
            $scope.hideMessages();
            $scope.LOADING = true;
            syncAMR($scope.doc.amr);
            var action = AMRDoc.update({id: $scope.id}, $scope.doc);
            action.$promise.then(function () {
                $scope.MESSAGES.CREATE_SUCCESS = true;
                $scope.LOADING = false;
                if(createNew){
                    $state.go('amrNew');
                }
                setTimeout(function(){
                    $scope.MESSAGES.CREATE_SUCCESS = false;
                    $scope.$apply();
                }, 2000);
            });
        } catch (e) {
            $scope.MESSAGES.SYNTAX_ERROR = true;
            $scope.LOADING = false;
        }
    };

    $scope.delete = function(){
      AMRDoc.delete({id: $scope.id}).$promise.then(function(){
          $state.go('amrList');
      })
    }
});