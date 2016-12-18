/**
 * Created by mbmarkus on 16/12/2016.
 */
app.controller('NewCtrl', function($scope, $http) {

  //Init values
  $scope.activeButton = 'a';
  $scope.NewStudent = {
    name: '',
    address: '',
    contacts:{
      home: '',
      work: ''
    }
  };
  $scope.NewSubject = {
    name: '',
    when: ''
  };

  $scope.CleanInputs = function () {
    $scope.NewStudent = {
      name: '',
      address: '',
      contacts:{
        home: '',
        work: ''
      }
    };
    $scope.NewSubject = {
      name: '',
      when: ''
    };
  };

  $scope.CreateStudent = function(){
    $http.post(base_url+'/studentid/', $scope.NewStudent)
      .success(function(data){

        console.log(data);
        var work, home = false;


        if((typeof($scope.NewStudent.contacts.home) != 'undefined')){

          $http.post(base_url+'/student/add/home',
            {student_id: data._id,
            number: $scope.NewStudent.contacts.home
            })
            .success(function(data) {
              console.log(data);
              if((typeof($scope.NewStudent.contacts.work) != 'undefined')){
                $http.post(base_url+'/student/add/work',
                  {student_id: data._id,
                  number: $scope.NewStudent.contacts.work
                  })
                  .success(function(data) {
                    console.log(data);
                    work = true;
                  })
                  .error(function(data) {
                    console.log('Error:' + data);
                  });
              }

            })
            .error(function(data) {
              console.log('Error:' + data);
            });

        }
        if((typeof($scope.NewStudent.contacts.work) != 'undefined') && !work){

          $http.post(base_url+'/student/add/work', {student_id: data._id,
            number: $scope.NewStudent.contacts.work
            })
            .success(function(data) {
              console.log(data);
            })
            .error(function(data) {
              console.log('Error:' + data);
            });
        }
        $scope.CleanInputs();
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

  $scope.CreateSubject = function(){
    console.log($scope.NewSubject);
    $http.post(base_url+'/subject', $scope.NewSubject)
      .success(function(data){
        console.log(data);
        $scope.CleanInputs();
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

});



