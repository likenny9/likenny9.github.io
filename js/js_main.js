$(document).ready(function() {
	/** Section redirect buttons **/
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
	$("#work_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_5").offset().top
		}, 700);
	});
	$("#contact_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_6").offset().top
		}, 700);
	});
	$("#top_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_1").offset().top
		}, 700);
	});
	setTimeout(function() {
	
	}, 500);
	
			//$('#main_wrapper_2').fadeIn(5500);	

			/**$( "#section_2" ).show( "slow", function() {
				
			});*/
	var prevScrollTop = 0;
	var animate = false;
	var percent5 = 5 + "%";
	var percent10 = 10 + "%";
	var percent80 = 80 + "%";
	var percent90 = 90 + "%";
	var percent100 = 100 + "%";
	var headerTop = 220;
	var headerMargin = 20;
	
	function wrapperLocation(curr_scroll, prev_scroll, topPixel) {
		//scrolling down
		if(curr_scroll > prev_scroll) {
			if(curr_scroll < topPixel ) { //not yet at correct pixel
				animate = false;
			} else if(curr_scroll > topPixel && prev_scroll <= topPixel) { //got there!
				animate = true;
			} else { //don't keep animating - only want to animate once
				animate = false;
			}
		}
		//scrolling up
		else {
			if(curr_scroll >= topPixel) {
				animate = false;
			} else if(curr_scroll <= topPixel && prev_scroll > topPixel) {
				animate = true;
			} else {
				animate = false;
			}
		}
	}
	$(window).on("scroll", function() {
		var currScrollTop = $(this).scrollTop(); //sets scrolltop
		var pixelsScrolled = currScrollTop - prevScrollTop;
		
		if ($(window).scrollTop() > headerTop ) {
			$('#main_wrapper_1').stop().animate({
				marginTop: headerMargin+=pixelsScrolled
			}, 0);
		}
		else {
			var mTop = parseInt($('#main_wrapper_1').css('margin-top'));
			if(mTop > 0) {
				$('#main_wrapper_1').stop().animate({
					marginTop: 0
				}, 1000);
				headerMargin = 20;
			}
		}

		if ($(window).scrollTop() > 699) {
			$('#top_button').css('display','block');			
		} else {
			$('#top_button').css('display','none');
		}
		
		prevScrollTop = currScrollTop; //done with scrolltop
	});

});