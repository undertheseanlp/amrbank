app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state({
            url: '/?status&quality',
            name: 'amrList',
            controller: 'ListAMRCtrl',
            templateUrl: "./static/app/amr/list.html"
        })
        .state({
            url: '/newdocs/',
            name: 'amrNew',
            controller: 'NewAMRCtrl',
            templateUrl: "./static/app/amr/new.html"
        })
        .state({
            url: '/docs/:id',
            name: 'amrDetail',
            controller: 'DetailAMRCtrl',
            templateUrl: "./static/app/amr/detail.html"
        });
});