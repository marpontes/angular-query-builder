(function(window, angular, undefined) {'use strict';
  var queryBuilder = angular.module('queryBuilder', []);
  queryBuilder.directive('queryBuilder', ['$compile', function ($compile) {
      return {
          restrict: 'E',
          scope: {
              group: '=',
              fields: '='
          },
          template: ''+
              '<div class="alert alert-warning alert-group">'+
              '    <div class="form-inline">'+
              '        <select ng-options="o.name as o.name for o in operators" ng-model="group.operator" class="form-control input-sm"></select>'+
              '        <button style="margin-left: 5px" ng-click="addCondition()" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-plus-sign"></span> Add Condition</button>'+
              '        <button style="margin-left: 5px" ng-click="addGroup()" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-plus-sign"></span> Add Group</button>'+
              '        <button style="margin-left: 5px" ng-click="removeGroup()" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-minus-sign"></span> Remove Group</button>'+
              '    </div>'+
              '    <div class="group-conditions">'+
              '        <div ng-repeat="rule in group.rules | orderBy:\'index\'" class="condition">'+
              '            <div ng-switch="rule.hasOwnProperty(\'group\')">'+
              '                <div ng-switch-when="true">'+
              '                    <query-builder group="rule.group" fields="fields"></query-builder>'+
              '                </div>'+
              '                <div ng-switch-default="ng-switch-default">'+
              '                    <div class="form-inline">'+
              '                        <select ng-options="t.name as t.name for t in fields" ng-model="rule.field" class="form-control input-sm"></select>'+
              '                        <select style="margin-left: 5px" ng-options="c.name as c.name for c in conditions" ng-model="rule.condition" class="form-control input-sm"></select>'+
              '                        <input style="margin-left: 5px" type="text" ng-model="rule.data" class="form-control input-sm"/>'+
              '                        <button style="margin-left: 5px" ng-click="removeCondition($index)" class="btn btn-sm btn-danger"><span class="glyphicon glyphicon-minus-sign"></span></button>'+
              '                    </div>'+
              '                </div>'+
              '            </div>'+
              '        </div>'+
              '    </div>'+
              '</div>'+
              '',
          compile: function (element, attrs) {
              var content, directive;
              content = element.contents().remove();
              return function (scope, element, attrs) {

                  scope.operators = [
                      { name: 'AND' },
                      { name: 'OR' }
                  ];

                  scope.conditions = [
                      { name: '=' },
                      { name: '<>' },
                      { name: '<' },
                      { name: '<=' },
                      { name: '>' },
                      { name: '>=' }
                  ];

                  scope.addCondition = function () {
                      scope.group.rules.push({
                          condition: '=',
                          field: scope.fields[0].name,
                          data: ''
                      });
                  };

                  scope.removeCondition = function (index) {
                      scope.group.rules.splice(index, 1);
                  };

                  scope.addGroup = function () {
                      scope.group.rules.push({
                          group: {
                              operator: 'AND',
                              rules: []
                          }
                      });
                  };

                  scope.removeGroup = function () {
                      "group" in scope.$parent && scope.$parent.group.rules.splice(scope.$parent.$index, 1);
                  };

                  directive || (directive = $compile(content));

                  element.append(directive(scope, function ($compile) {
                      return $compile;
                  }));
              }
          }
      }
  }]);
})(window, window.angular);
