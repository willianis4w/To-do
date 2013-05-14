'use strict';

angular.module('ToDo')
  .filter('doing', function() {
      return function( items, userAccessLevel ) {
        var doing = [];
        angular.forEach(items, function(item) {
          if( item.status === 'Doing' ) {
            doing.push(item);
          }
        });
        return doing;
      };
  });