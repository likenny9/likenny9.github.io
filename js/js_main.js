$(document).ready(function() {

    //Smooth scrolling for each section
    var $root = $('html, body');
    $('a[href*=#]').on('click', function(event) {
        event.preventDefault();
        var selectorName = $($.attr(this, 'href')).selector; //Gets correct anchor tag
        selectorName = selectorName.substr(1,selectorName.length); //removes # from anchor
        $root.animate({
            scrollTop: $('[name='+selectorName+']').offset().top
        }, 700);
        return false;
    });

});

//Angular
(function() {
    var app = angular.module('kennyApp', []);

    app.controller('kennyController', function () {

    });
})();


$(window).load(function() {
	//do something
});
