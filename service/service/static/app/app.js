window.app = angular.module("myApp", ['ui.router', 'ngResource']);

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

app.factory('AMRDoc', function ($resource) {
    return $resource('/api/amrdocs/:id/', {
        'filter': '@filter'
    }, {
        'update': {method: 'PUT'}
    })
});