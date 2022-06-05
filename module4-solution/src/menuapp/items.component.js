(function () {
'use strict';

angular.module('data')
.component('itemsData', {
  templateUrl: 'src/menuapp/templates/itemsData.template.html',
  bindings: {
    items: '<'
  }
});

})();
