(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  list1.items = ShoppingListCheckOffService.getItemsToBuy();


  list1.checkOff = function (itemIndex) {
    ShoppingListCheckOffService.checkOff(itemIndex);
  };
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  list2.items = ShoppingListCheckOffService.getItemsBought();
console.log(list2.items)
}


// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [];
  var itemsBought = [];

  var item = {
    name: "cookie",
    quantity: "10"
  };
  itemsToBuy.push(item);
  var item = {
    name: "coke",
    quantity: "6"
  };
  itemsToBuy.push(item);
  var item = {
    name: "milk tea",
    quantity: "6"
  };
  itemsToBuy.push(item);
  var item = {
    name: "Oreo",
    quantity: "1"
  };
  itemsToBuy.push(item);
  service.checkOff = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex]);
    itemsToBuy.splice(itemIndex,1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
}


})();
