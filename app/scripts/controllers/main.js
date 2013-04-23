'use strict';

angular.module('ToDo')
  .controller('MainCtrl', function ($scope) {
    
    // list
  	$scope.list = [];
  	$scope.todo = '';

  	var init = function(data) {
  		angular.forEach( data , function(item) {
  		  $scope.list.push( item );
      });
  		
  	};

  	/*
	  * CRUD
  	*/

  	// get
  	var get = function(name) {
  		var obj = {};
  		angular.forEach( $scope.list , function(item) {
  		  if( item.name == name )
          	obj = item;
        });
        return obj;
  	};

  	// add
  	$scope.add = function(todo) {
  		event.preventDefault();

  		var data 	= {};
  		data.name 	= todo;
  		if( data.name !== '' ) {
  			data.status	= 'Todo';
	  		$scope.list.push( data );

	  		// localStorage, adicionar
	  		store.set( data.name , data );

	  		$scope.todo = '';
  		}
  	};

  	// edit
  	$scope.edit = function(name) {

  		var item = get(name);
  		var resp = prompt( 'Rename:' , item.name );
  		
  		if( resp !== null ) {
  			item.name = resp;

	  		// localStorage, removo o anterior
	  		store.remove(name);

	  		// localStorage, adiciono um novo
	  		store.set( item.name , item );
  		}
  	};

  	// remove
  	$scope.remove = function(name) {

  		if( confirm('Are you sure?') ) {
  			var item 	= get(name);
  			var index 	= $scope.list.indexOf(item);
			$scope.list.splice(index,1);
  		}

  		// localStorage, remove
  		store.remove(item.name);
  	};

  	/* Changes */

  	// move to done
  	$scope.moveDone = function(name) {
  		var item = get(name);
  		item.status = 'Done';

  		// localStorage, done
  		store.set( item.name , item );
  	};

  	// move to todo
  	$scope.moveTodo = function(name) {
  		var item = get(name);
  		item.status = 'Todo';
  		
  		// localStorage, todo
  		store.set( item.name , item );
  	};

    init( store.getAll() );

  });