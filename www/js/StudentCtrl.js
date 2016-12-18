/**
 * Created by mbmarkus on 16/12/2016.
 */

app.controller('StudentsCtrl', function($scope, $http) {

  //Obtenemos a los estudiantes
  $http.get(base_url + '/students')
    .success(function(data) {
      $scope.students = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.DeleteStudent = function(id){
    $http.delete(base_url+'/student/' + id)
      .success(function(data) {
        $scope.students = data;
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  };
});
