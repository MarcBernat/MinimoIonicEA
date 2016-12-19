// Ionic Starter App
var base_url = "http://localhost:3000/api";
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('MinimoIonic', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position("bottom");
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:

  .state('tab.subjects', {
    url: '/subjects',
    cache: false,
    views: {
      "tab-subjects": {
        templateUrl: 'templates/SubjectsTab.html',
        controller: 'SubjectsCtrl'
      }
    }
  })
    .state('tab.subjects-detail', {
      url: '/subjectsdetail/:id',
      cache: false,
      views: {
        "tab-subjects": {
          templateUrl: 'templates/SubjectsdetailTab.html',
          controller: 'SubjectsdtlCtrl'
        }
      }
    })
  .state('tab.students', {
      url: '/students',
      cache: false,
      views: {
        "tab-students": {
          templateUrl: 'templates/StudentsTab.html',
          controller: 'StudentsCtrl'
        }
      }
    })
  .state('tab.new', {
    url: '/new',
    views: {
      "tab-new": {
        templateUrl: 'templates/NewTab.html',
        controller: 'NewCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/new');

});


