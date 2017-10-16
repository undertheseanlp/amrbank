app.controller("NewCorpusCtrl", function ($scope, $stateParams, Corpus, $state) {

    $scope.corpus = {
        "title": "",
        "description": ""
    };

    $scope.hideMessages = function () {
        $scope.MESSAGES = {
            "TITLE_MISSING": false,
            "DESCRIPTION_MISSING": false
        };
    };

    $scope.hideMessages();

    $scope.save = function () {
        if (!$scope.corpus.title) {
            $scope.MESSAGES.TEXT_MISSING = true;
            return
        }

        $scope.hideMessages();
        Corpus.save($scope.corpus).$promise.then(function (corpus) {
            $state.go("detailCorpus", {"id": corpus.id});
        })
    }
});