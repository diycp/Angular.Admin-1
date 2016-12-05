define(['angular', 'myView', 'myForm'], function (angular) {
    /**
     * 定义模块函数
     * @param {string} module 默认模块名
     * @param {string} controller 默认模块控制器
     * @return {function}
     */
    return function (module, controller) {
        /*! 创建默认模块及默认控制器 */
        angular.module(module, ['myView', 'myForm']).controller(controller, ['$scope', '$location', '$view', '$rootScope', function ($scope, $location, $view, $rootScope) {
                $scope.app.layout.class.body = 'login';
            }
        ]);
    };
});