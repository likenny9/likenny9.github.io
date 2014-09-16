$(document).ready(function() {
	setTimeout(function() {
		$("#about_button").click(function() {
			$('html').animate({
				scrollTop : $("#section_4").offset().top
			}, 700);
		});
	}, 5000);
});