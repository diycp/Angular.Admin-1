define(['require', 'angular', 'oclazyload', 'angular-ui-router', 'angular-ui-bootstrap'], function (require, angular) {

    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'oc.lazyLoad']);

    app.provider('RouterHelper', function () {
        this.filter = function (uri) {
            return  (uri === '' || uri === '/') ? '/welcome/hello' : uri;
        };
        this.loadTemplate = function (uri) {
            return  'pages' + this.filter(uri) + '.html'
        };
        this.loadScript = function (uri) {
            return 'pages' + this.filter(uri) + '.js';
        };
        this.$get = {};

    });

    app.config(['$ocLazyLoadProvider', '$stateProvider', 'RouterHelperProvider', function ($ocLazyLoadProvider, $stateProvider, helper) {
            $ocLazyLoadProvider.config({asyncLoader: require});
            $stateProvider.state('root', {
                views: {
                    'menu.top': {
                        templateUrl: function () {
                            return helper.loadTemplate('/menu/top');
                        },
                        resolve: {
                            load: function ($ocLazyLoad) {
                                return $ocLazyLoad.load(helper.loadScript('/menu/top'));
                            }
                        }
                    },
                    "main": {
                        templateUrl: function () {
                            return helper.loadTemplate(app.$location.$$path);
                        },
                        resolve: {
                            load: function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    files: [helper.loadScript(app.$location.$$path)]
                                });
                            }
                        }
                    }
                }
            });
        }]);

    app.run(['$state', '$stateParams', '$rootScope', '$location', function ($state, $stateParams, $rootScope, $location) {
            app.$location = $location;
            app.$state = $state;
            app.$stateParams = $stateParams;
            $state.go('root', $stateParams);
        }]);

    return app;
});