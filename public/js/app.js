
const app = angular.module('MyApp', []);

app.controller('MyController', ['$http', function ($http) {
  this.area = null;
  this.description = null;
  this.zip = null;
  this.loggedInUser = false;
  this.indexOfEditFormToShow = null;
  this.loginShow = false;
  this.searchZip = "";

  const controller = this;

  this.signup = function () {
    $http({
      url: '/users',
      method: 'POST',
      data: {
        username: this.signupUsername,
        password: this.signupPassword
      }
    }).then(
      function (response) {
      controller.loggedInUser = response.data;
    },
      (error)=>{
        console.log(error);
      }

    )
  }

  this.showLogin = () =>{
    this.loginShow = !this.loginShow
  }

  this.login = function () {
    $http({
      url: '/sessions',
      method: 'POST',
      data: {
        username: this.logInUsername,
        password: this.logInPassword
      }
    }).then(function (response) {
      if (response.data.username) {
        controller.loggedInUser = response.data
      } else {
        controller.logInUsername = null;
        controller.logInPassword = null;
      }
    },
    (error)=>{
      console.log(error);
    });
  }

  this.createHate = function () {
    $http({
      method: 'POST',
      url: '/hate',
      data: {
        area: this.area,
        description: this.description,
        zip: this.zip
      }
    }).then(
      function (response) {
        controller.area = null;
        controller.description = null;
        controller.zip = null;
        controller.getHate();
      },
      function (error) {
        console.log(error);
      }
    )
  }

  this.deleteHate = function (hate) {
    $http({
      method: 'DELETE',
      url: '/hate/' + hate._id
    }).then(
      function () {
        controller.getHate();
      },
      function (error) {
        console.log(error);
      }
    )
  }

  this.editHate = function (hate) {
    $http({
      method: 'PUT',
      url: '/hate/' + hate._id,
      data: {
        area: this.updatedArea,
        description: this.updatedDescription,
        zip: this.updatedZip
      }
    }).then(
      function (response) {
        controller.updatedArea = null;
        controller.updatedDescription = null;
        controller.updatedZip = null;
        controller.indexOfEditFormToShow = null;
        controller.getHate();
      },
      function (error) {
        console.log(error);
      }
    )
  }

  this.getHate = function () {
    $http({
      method: 'Get',
      url: '/hate',
    }).then(
      function (response) {
        controller.hates = response.data;
      },
      function (error) {
        console.log(error);
      }
    )
  }

  this.getHate();

  $http({
    method: 'GET',
    url: '/sessions'
  }).then(function (response) {
    if (response.data.username) {
      controller.loggedInUser = response.data;
    }
  })

  this.logout = function () {
    $http({
      url: '/sessions',
      method: 'DELETE'
    }).then(function () {
      controller.loggedInUser = false;
    })
  }

  this.zipSearch = function () {
    controller.searchZip = this.myZip;
  }

}]);
