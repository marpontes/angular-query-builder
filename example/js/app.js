var app = angular.module('app', ['ngSanitize', 'queryBuilder']);
app.controller('QueryBuilderCtrl', ['$scope', function ($scope) {

    this.fields =  [{ name: 'ano_veiculo'},
                    { name: 'data_nascimento' },
                    { name: 'ano' },
                    { name: 'data_sinistro' },
                    { name: 'trem_das_11' }];

    $scope.labels = {
                        addCondition : "Add condition",
                        addGroup : "Add group",
                        removeGroup : "Remove Group"
                      }

    $scope.filter = {"group": {"operator": "AND","rules": []}};

    $scope.$watch('filter', function (newValue) {
        //console.log(JSON.stringify(newValue, null, 2));
    }, true);
}]);
