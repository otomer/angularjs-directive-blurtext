var myApp = angular.module("myApp", []);

// Blur Text directive // by O.Tomer
// *********************************
myApp.directive("blurText", ['$sce', function($sce) {
  return {
    restrict: "E", //Element only
    scope: {
      text: "=", //Text content
      minlength: "@", //Minimum length of text for dissapearing
      disappearingchars: "@", //Number of characters to disappear
      elementclass: "@"
    },
    template: '<div class="blurtext {{elementclass}}" ng-bind-html="safeDissapearingText"></div>',
    replace: true,
    transclude: false,
    link: function(scope, element, attrs) {
      var minLength = parseInt(scope.minlength);
      var numOfOpacityChars = parseInt(scope.disappearingchars);
      numOfOpacityChars = numOfOpacityChars > 0 ? numOfOpacityChars : 15;
      var textLength = scope.text.length;
      var textCopy = scope.text;
      var textResult = textCopy;

      if (textLength >= minLength) {
        var textStart = textCopy.substring(0, textLength - numOfOpacityChars);
        var textEnd = textCopy.substring(textLength - numOfOpacityChars, textLength);
        textResult = "<span>" + textStart + "</span>";

        for (var i = 0, len = textEnd.length; i < len; i++)
          textResult += "<span>" + textEnd[i] + "</span>";
      } else {
        textResult = textCopy;
      }

      scope.safeDissapearingText = $sce.trustAsHtml(textResult);
    }
  }
}]);

myApp.controller("myCtrl", function($scope) {
  $scope.messageContent = "Directives are the most important components of any AngularJS application. Although AngularJS ships with wide range of directives, you will often need to create application specific directives. This tutorial will give an overview of custom directives and explain how to use them in real world Angular projects. At the end of the tutorial, I will guide you through the creation of a simple note taking app with the help of Angular directives.";
});
