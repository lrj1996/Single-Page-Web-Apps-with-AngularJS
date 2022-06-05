(function () {
'use strict';

angular.module('data')
.controller('ItemController', ItemController);


ItemController.$inject = ['items'];
function ItemController(items) {
  var itemDetails = this;
  itemDetails.contents = items;
  console.log(items);
}

})();
