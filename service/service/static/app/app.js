window.app = angular.module("myApp", ['ui.router', 'ngResource', 'xeditable','ui.bootstrap']);

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.constant("SERVICE_URL", "http://localhost:8000/api/");

app.constant("STATUSES", [
    {
        "label": "New",
        "value": "NEW"
    },
    {
        "label": "Annotating",
        "value": "ANNOTATING"
    },
    {
        "label": "Annotated",
        "value": "ANNOTATED"
    },
    {
        "label": "Reviewing",
        "value": "REVIEWING"
    },
    {
        "label": "Reviewed",
        "value": "REVIEWED"
    }
]);

app.constant("QUALITIES", [
    {
        "label": "Poor",
        "value": "POOR"
    },
    {
        "label": "Acceptable",
        "value": "ACCEPTABLE"
    },
    {
        "label": "Perfect!",
        "value": "PERFECT"
    }
]);

app.config(function ($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.factory('Document', function ($resource) {
    return $resource('/api/documents/:id/', {
        'filter': '@filter'
    }, {
        'update': {method: 'PUT'}
    })
});

app.factory('Corpus', function ($resource) {
    return $resource('/api/corpora/:id/', {
        'filter': '@filter'
    }, {
        'update': {method: 'PUT'}
    })
});


app.directive( "mwConfirmClick", [
  function( ) {
    return {
      priority: -1,
      restrict: 'A',
      scope: { confirmFunction: "&mwConfirmClick" },
      link: function( scope, element, attrs ){
        element.bind( 'click', function( e ){
          // message defaults to "Are you sure?"
          var message = attrs.mwConfirmClickMessage ? attrs.mwConfirmClickMessage : "Are you sure?";
          // confirm() requires jQuery
          if( confirm( message ) ) {
            scope.confirmFunction();
          }
        });
      }
    }
  }
]);