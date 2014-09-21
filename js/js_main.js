$(document).ready(function() {

	/**** Section redirect buttons ****/
	$(".about_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_2").offset().top
		}, 700);
	});
	$(".education_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_3").offset().top
		}, 700);
	});
	$(".coding_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_4").offset().top
		}, 700);
	});
	$(".work_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_5").offset().top
		}, 700);
	});
	$(".contact_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_6").offset().top
		}, 700);
	});
	$("#top_button").click(function() {
		$('html,body').animate({
			scrollTop : $("#section_1").offset().top
		}, 700);
	});
	
	/**** Toggle left slider ****/
	var sliderOut = true;
	$("#button_toggle").click(function() {
		if(sliderOut) {
			$('.button_edit').dequeue().stop().animate({
				width: 0
			}, 0);
			$('#button_toggle').dequeue().stop().animate({
				left: 4
			}, 0);
			
			$('#button_toggle span').html('&gt;&gt;');
			sliderOut = false;
		}
		else {
			$('.button_edit').dequeue().stop().animate({
				width: 50
			}, 0);
			$('#button_toggle').dequeue().stop().animate({
				left: 50
			}, 0);

			$('#button_toggle span').html('&lt;&lt;');
			sliderOut = true;
		}	
	});
	
	//$('#main_wrapper_2').fadeIn(5500); examples	

	/**$( "#section_2" ).show( "slow", function() {
		
	});*/
	var prevScrollTop = 0;
	var animatedBefore = false;
	var runElseStatement = false;
	var animate = false;
	var percent5 = 5 + "%";
	var percent10 = 10 + "%";
	var percent80 = 80 + "%";
	var percent90 = 90 + "%";
	var percent100 = 100 + "%";
	var headerTop = 220;
	var headerMargin = 20;
	
	/****
		Function ensures animation only once when passing a certain point.
	****/
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
		
		/**** Moves header for parallax effect ****/
		if ($(window).scrollTop() > headerTop ) {
			$('#main_wrapper_1').dequeue().stop().animate({
				marginTop: headerMargin+=pixelsScrolled
			}, 0);
		}
		else {
			var mTop = parseInt($('#main_wrapper_1').css('margin-top'));
			if(mTop > 0) {
				$('#main_wrapper_1').dequeue().stop().animate({
					marginTop: 0
				}, 1000);
				headerMargin = 20;
			}
		}

		/**** Button animation effects ****/
		wrapperLocation(currScrollTop,prevScrollTop, 695);
		if ($(window).scrollTop() > 695) {
		
			$('#top_button').css('display','block');
			$('#secondary_buttons').css('display','block');
			$('#secondary_buttons').addClass('buttons_fixed');
			$('#button_toggle').css('opacity','0');
			
			if(animate && !animatedBefore) {
				animatedBefore = true;
				
				$('.buttons_fixed').dequeue().stop().animate({
					opacity: 0.9
				}, 1000, function() {
				
					$('.button_edit').dequeue().stop().animate({
						width: 0,
						padding: 0
					}, 0);
					
					$('.buttons_fixed').dequeue().stop().animate({
						minWidth: 0,
						left: 0
					}, 500, function() {
					
						$('.buttons_fixed').dequeue().stop().animate({
							top: 50,
							width: 0
						}, 200, function() {
						
							$('.button_edit').dequeue().stop().animate({
								width: 50,
								height: 75,
								fontSize: 9.5 
							}, 0, function() {
								runElseStatement = true;
							});
							
							setTimeout(function() {
								if($(window).scrollTop() > 695) { //Ensure user hasn't scrolled up
									$('#button_toggle').css('opacity','1').css('display','block');
								}
							}, 400);
						});
					});
				});	
			}
			else if (animatedBefore && runElseStatement) {
				$('#button_toggle').css('opacity','1').css('display','block');			
			}
			
		} else {
			$('#top_button').css('display','none');
			$('#button_toggle').css('display','none');
			$('#secondary_buttons').css('display','none');
		}
		
		prevScrollTop = currScrollTop; //done with scrolltop
	});

});
