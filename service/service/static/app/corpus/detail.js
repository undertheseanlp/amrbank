app.controller("DetailCorpusCtrl", function ($scope, $stateParams, Corpus, $state, STATUSES, QUALITIES) {

    function syncAMR(raw) {
        window.amr = textToTree(raw);
        $scope.doc.amr = treeToText(window.amr, true);
        makeAMRListView(window.amr);
        draw(window.amr);
    };
    $scope.STATUSES = STATUSES;

    $scope.QUALITIES = QUALITIES;

    $scope.id = $stateParams.id;
    Corpus.get({id: $scope.id}, function (corpus) {
        $scope.corpus = corpus;
        $scope.documents = corpus["documents"];
    });

    $scope.hideMessages = function () {
        $scope.MESSAGES = {
            "SYNTAX_ERROR": false,
            "LOADING": false,
            "CREATE_SUCCESS": false
        };
    };

    $scope.hideMessages();

    $scope.update = function(){
        return Corpus.update({id: $scope.id}, $scope.corpus);
    };

    $scope.save = function (createNew) {
        try {
            $scope.hideMessages();
            $scope.LOADING = true;
            syncAMR($scope.doc.amr);
            var action = Corpus.update({id: $scope.id}, $scope.doc);
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
      Corpus.delete({id: $scope.id}).$promise.then(function(){
          $state.go('listCorpus');
      })
    }
});