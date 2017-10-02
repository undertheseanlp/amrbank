window.app = angular.module("myApp", ['ui.router', 'ngResource']);

app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});

app.constant("SERVICE_URL", "http://localhost:8000/api/");

app.config(function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.factory('AMRDoc', function($resource){
   return $resource('/api/amrdocs/:id/', null, {
       'update': {method: 'PUT'}
   })
});