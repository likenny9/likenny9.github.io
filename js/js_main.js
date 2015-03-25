$(document).ready(function() {
	setTimeout(function() {
   		$('.loading-image').fadeOut(1000, function() {
     		$('.loading-text').fadeOut(1000, function() {});
   		});

   		$('.loading-container').fadeOut(1000,function() {});

 	}, 2500);
});


//Angular Tab Controller
(function () {
    var app = angular.module('websiteApp', []);

    app.controller('TabController', function () {
        this.tab = 1;

        this.setTab = function (tabId) {
            this.tab = tabId;
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };
    });
})();


$(window).load(function() {

	
});
