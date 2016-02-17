(function() {

	var app = angular.module("borrowsimply", []);

	var $baseUrl = "services/";
	var $username = "vengerov";

	app.factory("itemsService", function($http) {
		return {
			getItems: function() {
				return $http.get($baseUrl + "getItems.php");
			},
			takeItem: function(item) {
				return $http({
				    method: "POST",
				    url: $baseUrl + "takeItem.php",
					 data: {
					 	id: item.id,
					 	status: "Taken by " + $username
					 },
					 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			},
			freeItem: function(item) {
				return $http({
				    method: "POST",
				    url: $baseUrl + "freeItem.php",
					 data: item.id,
					 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				});
			}
		};
	});

	app.controller("ItemController", function($scope, itemsService, $interval) {

		var getItems = function() {
				itemsService.getItems().success(function(data) {
					//Updating model on change only
					if (!angular.equals($scope.items, data))
					{
						$scope.items = data;
					}
				});
		}

		$scope.takeItem = function(item) {
			itemsService.takeItem(item).success(getItems);
		};

		$scope.freeItem = function(item) {
			itemsService.freeItem(item).success(getItems);
		};

		$scope.getStatus = function(item) {
			var status = item.status;
			if (status == "Free") {
				return status;
			}
			else {
				// Format date into readable format
				var date = new Date(item.date);
				var hh = date.getHours();
				var mm = date.getMinutes();
				if (mm < 10) {
				    mm = '0' + mm
				}
				var hhmm = hh + ":" + mm;

				var dd = date.getDate();
				var nn = date.getMonth() + 1;
				var yyyy = date.getFullYear();
				var ddnnyyyy = dd + "/" + nn + "/" + yyyy;

				return status + " at " + hhmm + " on " + ddnnyyyy;
			}
		}

		//TODO reloading for all the clients
		$interval(function() {
			getItems();
		}, 1000);

		getItems();
	});
})();

