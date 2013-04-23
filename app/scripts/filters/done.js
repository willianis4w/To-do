'use strict';

angular.module('ToDo')
  .filter('done', function() {
      return function( items, userAccessLevel ) {
        var dones = [];
        angular.forEach(items, function(item) {
          if( item.status === 'Done' ) {
            dones.push(item);
          }
        });
        return dones;
      };
  });