/**
 * Created by mbmarkus on 16/12/2016.
 */
app.controller('SubjectsCtrl', function($scope, $http) {

  //Obtenemos a los subjects
  $http.get(base_url + '/subjects')
    .success(function(data) {
      $scope.subjects = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.DeleteSubject = function(id){
    $http.delete(base_url+'/subject/' + id)
      .success(function(data) {
        $scope.subjects = data;
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  };
});
