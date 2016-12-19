/**
 * Created by mbmarkus on 16/12/2016.
 */
app.controller('SubjectsdtlCtrl', function($scope, $http) {

  var id = window.location.href.split("/").pop();
  console.log(id);
  //Obtenemos a los estudiantes
  $http.get(base_url + '/students')
    .success(function(data) {
      $scope.students = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.AddStudentinSubject = function(stu){
    console.log(stu);
    $http.put(base_url+'/subject/studentadd/' + id, stu)
      .success(function(data) {
        console.log(data);
        $scope.subjects = data;
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  };

  $scope.DeleteSubject = function(){
    $http.delete(base_url+'/subject/' + id)
      .success(function(data) {
        $scope.subjects = data;

      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  };
});
