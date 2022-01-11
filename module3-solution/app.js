(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', foundItemsDirective);

function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: foundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function foundItemsDirectiveController() {
  var list = this;

  list.foundIsEmpty = function () {
    if (list.items === undefined || list.items.length == 0)
      return true;
    else
      return false;
  };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowCtrl = this;

  narrowCtrl.searchItems = function () {
    if (narrowCtrl.searchTerm ==="" || narrowCtrl.searchTerm === undefined){
      narrowCtrl.found = [];
    } else {
      MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
      .then( function (result) {
        narrowCtrl.found = result;
      });
    }
  }

  narrowCtrl.removeItem = function (itemIndex) {
    narrowCtrl.found.splice(itemIndex,1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
      var allItems = result.data.menu_items;
      var foundItems=[];
      for (var i = 0; i < allItems.length; i++){
        if (allItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0)
          foundItems.push(allItems[i]);
      }
      return foundItems;
    });
  };

}

})();
