angularAPP.controller('HomeCtrl', function ($log, SchemaRegistryFactory, toastFactory, $scope, env) {
  $log.info("Starting schema-registry controller - home");
  toastFactory.hideToast();

    $scope.$watch(function () {
      return env.getSelectedCluster().NAME;
    }, function (a) {
        $scope.cluster = env.getSelectedCluster().NAME;
    }, true);


});