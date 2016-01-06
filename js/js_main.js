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

    //Add horizontal line under nav bar after scrolling past home section
    var hrAdded = false;
    $(window).on('scroll',function() {
        var scrolltop = $(this).scrollTop();
        var $about = $('#about');

        if ((scrolltop >= $about.offset().top + $about.height() - 2) && !hrAdded) {
            $('.container-fluid').after('<hr style="margin: 0">');
            hrAdded = true;
        }
        else if ((scrolltop < $about.offset().top + $about.height() - 2) && hrAdded) {
            $('.container-fluid + hr').remove();
            hrAdded = false;
        }
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
