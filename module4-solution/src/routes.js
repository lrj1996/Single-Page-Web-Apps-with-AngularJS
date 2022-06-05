(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Premade list page
  .state('category', {
    url: '/category',
    templateUrl: 'src/menuapp/templates/categories.template.html',
    controller: 'CategoryController as categoryList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService){
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Item detail
  .state('items',{
    url: '/items/{itemsCategory}',
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: 'ItemController as itemDetails',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
              function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.itemsCategory);
              }]
    }
  });

}

})();
