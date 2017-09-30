app.controller("DetailAMRCtrl", function ($scope, $stateParams) {

    var id = $stateParams.id;
    $.ajax({
        type: "GET",
        url: sprintf("http://localhost:8000/api/tasks/%1$s", id),
        contentType: 'application/json'
    }).done(function (data) {
        $scope.doc = data;
        $scope.$apply();
        try {
            syncAMR(data.amr);
        } catch (e) {
            $("#SYNTAX_ERROR").show();
        }
    }).fail(function (e) {
        console.log(e);
    });
});