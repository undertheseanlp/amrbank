app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state({
            url: '/',
            name: 'amrList',
            controller: 'ListAMRCtrl',
            templateUrl: "./static/app/amr/list.html"
        })
        .state({
            url: '/docs/:id',
            name: 'amrDetail',
            controller: 'DetailAMRCtrl',
            templateUrl: "./static/app/amr/detail.html"
        });
});