/**
 * Created by mbmarkus on 16/12/2016.
 */
app.controller('SubjectsCtrl', function($scope, $http, $ionicPopup) {

  $scope.NewSearch = {
    name: '',
    newfilter: ''
  };

  $scope.orderQuery = {
    order: ''
  };

  //Obtenemos a los subjects
  $http.get(base_url + '/subjects')
    .success(function(data) {
      $scope.subjects = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  $scope.showPopupSearch = function() {

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template:
      '<label class="item item-input item-select">' +
      '<div class="input-label">' +
      'Type ' +
      '</div> ' +
      '<select ng-model="NewSearch.newfilter"> ' +
      '<option value="name" selected>Name</option> ' +
      '<option value="period">Quarter</option>' +
      '</select>' +
      '</label>' +
      '<div class="item item-input-inset">'+
      '<label class="item-input-wrapper">'+
      '<input type="text" placeholder="EA, Autumn 2016" ng-model="NewSearch.text">'+
      '</label>'+
      '</div>',
      title: 'Search',
      subTitle: 'Filter by:',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Do</b>',
          type: 'button-positive',
          onTap: function() {
            $scope.SearchSubjects();
          }
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };


  $scope.SearchSubjects = function(){
    RemoveOrderLength();
    console.log($scope.NewSearch);
    $http.get(base_url+'/subjects/find/' + $scope.NewSearch.newfilter +'/' +  $scope.NewSearch.text)
      .success(function(data){
        $scope.subjects = {};
        $scope.subjects = data;
        console.log(data);
        $scope.NewSearch.newfilter = null;
      })
      .error(function(data){
        console.log('Error:' + data);
      });

  };

  $scope.OrderSubjects = function(filter){
    RemoveOrderLength();
    $http.get(base_url+'/subjects/find/' + filter +'/' +filter)
      .success(function(data){
        $scope.subjects = {};
        $scope.subjects = data;
        console.log(data);
        $scope.newfilter = null;
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
});
