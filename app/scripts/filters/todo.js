'use strict';

angular.module('ToDo')
  .filter('todo', function() {
      return function( items, userAccessLevel ) {
        var todos = [];
        angular.forEach(items, function(item) {
          if( item.status === 'Todo' ) {
            todos.push(item);
          }
        });
        return todos;
      };
  });