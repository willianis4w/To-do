'use strict';

angular.module('ToDo')
  .controller('MainCtrl', function ($scope,$locale,$filter) {
    
    // list
  	$scope.list = [];
  	$scope.todo = '';

  	var init = function(data) {
      // primeiro uso
      if( Object.keys(data).length === 0 ) {
        $locale.id = 'pt-br';
        document.querySelector('.first-use').style.display = 'block';
      }

      angular.forEach( data , function(item) {
        // verifico se locale está definido
        if(item.name == 'locale') {
          $locale.id = item.l;
        }

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
  		var resp = prompt( $filter('i18n')('rename') , item.name );
  		
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

  		if( confirm( $filter('i18n')('confirm') ) ) {
  			var item 	= get(name);
  			var index = $scope.list.indexOf(item);

        // removo da lista
        $scope.list.splice(index,1);

        // localStorage, remove
        store.remove(item.name);
  		}

  		
  	};

  	/* Changes */

  	// move to todo
  	$scope.moveTodo = function(name) {
  		var item = get(name);
  		item.status = 'Todo';
  		
  		// localStorage, todo
  		store.set( item.name , item );
  	};

    // move to doing
    $scope.moveDoing = function(name) {
      var item = get(name);
      item.status = 'Doing';

      // localStorage, done
      store.set( item.name , item );
    };

    // move to done
    $scope.moveDone = function(name) {
      var item = get(name);
      item.status = 'Done';

      // localStorage, done
      store.set( item.name , item );
    };

    /*
    * i18n
    */

    $scope.setLocale = function(l) {
      $locale.id = l;
      var item = new Object();
      item.name = 'locale';
      item.l = l;
      store.set( 'locale' , item );
      introJs().exit();
    }

    /*
    * How
    */

    $scope.how = function() {
      store.set( 'how' , true );
      introJs().start();
    };

    $scope.close_first_use = function () {
      store.set( 'how' , true );
      document.querySelector('.first-use').style.display = 'none';
    };
    
    

    /*
    * init
    */

    init( store.getAll() );

  });