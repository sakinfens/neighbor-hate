const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function($http){
  this.area = null;
  this.description = null;
  this.loggedInUser = false;
  this.indexOfEditFormToShow = null;

  const controller = this;

  this.signup = function(){
    $http({
      url: '/users',
      method: 'POST',
      data: {
        username: this.signupUsername,
        password: this.signupPassword
      }
    }).then(function(response){
      controller.loggedInUser = response.data;
    })
  }

  this.login = function(){
    $http({
      url: '/session',
      method: 'POST',
      data: {
        username: this.logInUsername,
        password: this.logInPassword
      }
    }).then(function(response){
      if(response.data.username){
        controller.loggedInUser = response.data
      } else {
        controller.logInUsername = null;
        controller.logInPassword = null;
      }
    });
  }

  this.createHate = function(){
    $http({
      method: 'POST',
      url: '/hate',
      data: {
        area: this.area,
        description: this.description
      }
    }).then(
      fubction(response){
        controller.area = null;
        controller.description = null;
        controller.getHate();
      },
      function(error){
        console.log(error);
      }
    )
  }

  this.deleteHate = function(hate){
    $http({
      method: 'DELTE',
      url: '/hate/' + hate._id
    }).then(
      function(){
        controller.getHate();
      },
      function(error){
        console.log(error);
      }
    )
  }

  this.editHate = function(hate){
    $http({
      method: 'PUT',
      url: '/hate/' + hate._id,
      data: {
        area: this.updatedArea,
        description: this.updatedDescription
      }
    }).then(
      function(response){
        controller.updatedArea = null;
        controller.updatedDescription = null;
        controller.indexOfEditFormToShow = null;
        controller.getHate();
      },
      function(error){
        console.log(error);
      }
    )
  }

  this.getHate = function(){
    $http({
      method:'Get',
      url: '/hate',
    }).then(
      function(response){
        controller.hates = response.data;
      },
      function(error){
        console.log(error);
      }
    )
  }

  this.getHate();

  $http({
    method: 'GET',
    url:'/session'
  }).then(function(response){
    if(response.data.username){
      controller.loggedInUser = response.data;
    }
  })

  tis.logout = function(){
    $http({
      url: '/session',
      method: 'DELETE'
    }).then(function(){
      controller.loggedInUser = false;
    })
  }

}]);
