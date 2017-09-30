app.controller("ListAMRCtrl", function ($scope) {
    $.ajax({
      type: "GET",
      url: "http://localhost:8000/api/tasks",
      contentType: 'application/json'
    }).done(function (data) {
      $scope.docs = data;
      $scope.$apply();
    }).fail(function () {
    });
});