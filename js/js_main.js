$(document).ready(function() {
	/** Section redirect buttons **/
	setTimeout(function() {
		$("#about_button").click(function() {
			$('html,body').animate({
				scrollTop : $("#section_2").offset().top
			}, 700);
		});
		$("#education_button").click(function() {
			$('html,body').animate({
				scrollTop : $("#section_3").offset().top
			}, 700);
		});
		$("#coding_button").click(function() {
			$('html,body').animate({
				scrollTop : $("#section_4").offset().top
			}, 700);
		});
		$("#contact_button").click(function() {
			$('html,body').animate({
				scrollTop : $("#section_5").offset().top
			}, 700);
		});
	}, 500);
});