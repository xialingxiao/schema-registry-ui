angularAPP.controller('SubjectListCtrl', function ($scope, $rootScope, $log, $mdMedia, SchemaRegistryFactory) {

  $log.info("Starting schema-registry controller : list ( initializing subject cache )");

//  $scope.pageSize = 5;
//  console.log("christina " + $scope.pageSize)
//  if($scope.items != undefined) {
//    $scope.itemsPerPage = $scope.items;
//  } else {
//    $scope.itemsPerPage = 10;
//  }

  /**
   * Watch the 'newCreated' and update the subject-cache accordingly
   */
  $scope.$watch(function () {
    return $rootScope.newCreated;
  }, function (a) {
    if (a != undefined && a == true) {
      loadCache(); //When new is created refresh the list
      $rootScope.newCreated = false;
    }
  }, true);

  /**
   * Load cache by fetching all latest subjects
   */
  loadCache();
  function loadCache() {
    $rootScope.allSchemas = [];
    var promise = SchemaRegistryFactory.refreshLatestSubjectsCACHE();
    promise.then(function (cachedData) {
      $rootScope.allSchemas = cachedData;
    }, function (reason) {
      $log.error('Failed at loadCache : ' + reason);
    }, function (update) {
      $log.debug('Got notification: ' + update);
    });
  }

});

angularAPP.directive("schemaList", function($compile) {
    return {
       restrict: 'AE',
       controller: 'SubjectListCtrl',
       templateUrl: 'src/schema-registry/list/list.html',
       compile: function (tElem, tAttrs) {
         console.log(name + ': compile');
         return {
           pre: function (scope, iElem, iAttrs) {
             scope.pageSize = iAttrs.schemaList;
           }
         }
       }
    };
});

//In small devices the list is hidden
// $scope.$mdMedia = $mdMedia;
// $scope.$watch(function () {
//   return $mdMedia('gt-sm');
// }, function (display) {
//   $rootScope.showList = display;
// });
