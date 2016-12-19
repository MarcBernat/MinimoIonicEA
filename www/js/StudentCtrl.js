/**
 * Created by mbmarkus on 16/12/2016.
 */

app.controller('StudentsCtrl', function($scope, $http, $ionicPopup) {

  $scope.NewSearch = {
    text: '',
  };
  $scope.orderQuery = {
    order: ''
  };

  //Obtenemos a los estudiantes
  $http.get(base_url + '/students')
    .success(function(data) {
      $scope.students = data;
      console.log($scope.students);
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

  $scope.showPopupSearch = function() {

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template:
      '<div class="item item-input-inset">'+
      '<label class="item-input-wrapper">'+
      '<input type="text" placeholder="Marc, Toni..." ng-model="NewSearch.text">'+
      '</label>'+
      '</div>',
      title: 'Search',
      subTitle: 'Name:',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Do</b>',
          type: 'button-positive',
          onTap: function() {
            $scope.SearchStudents();
          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };


  $scope.SearchStudents = function(){
    RemoveOrderLength();
    console.log($scope.NewSearch);
    $http.get(base_url+'/students/find/name/' +  $scope.NewSearch.text)
      .success(function(data){
        $scope.students = {};
        $scope.students = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

  $scope.OrderStudents = function(filter){
    RemoveOrderLength();
    $http.get(base_url+'/students/find/' + filter +'/' +filter)
      .success(function(data){
        $scope.students = {};
        $scope.students = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

  RemoveOrderLength = function(){
    $scope.orderQuery = {
      order: '',
    };
  };

  $scope.Clean = function(){
    $http.get(base_url+ '/students')
      .success(function(data) {
        $scope.students = {};
        $scope.students = data;
        console.log(data);

      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
});
