define(['angular', 'myView', 'ngCookies'], function (angular) {
    /**
     * 定义模块函数
     * @param {type} moduleName 默认模块名
     * @param {type} controllerName 默认模块控制器
     * @returns {undefined}
     */
    return function (moduleName, controllerName) {
        /*! 创建默认模块及默认控制器 */
        angular.module(moduleName, ['myView', 'ngCookies']).controller(controllerName, ['$scope', '$location', '$view',
            function ($scope, $location, $view, $cookies) {
                $scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1) || 'home';
                    return page === currentRoute ? 'active' : '';
                };
                $scope.views = $view.views;
            }
        ]);
    };
});