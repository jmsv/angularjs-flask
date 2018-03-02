var app = angular.module('todoApp', []);

app.controller('TodoListController', function ($scope, $http) {

  $scope.todos = [{
      text: 'learn AngularJS',
      done: true
    },
    {
      text: 'build an AngularJS app',
      done: false
    }
  ];

  $http({
    method: 'GET',
    url: '/api/example-todos'
  }).then(function successCallback(response) {
      $scope.todos = $scope.todos.concat(response.data);
    },
    function errorCallback(response) {
      console.log("Error loading example todos");
    });


  $scope.addTodo = function () {
    $scope.todos.push({
      text: $scope.todoText,
      done: false
    });
    $scope.todoText = '';
  };

  $scope.remaining = function () {
    var count = 0;
    angular.forEach($scope.todos, function (todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function () {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function (todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
});