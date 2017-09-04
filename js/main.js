$(function() {
	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){

		$('.main-slider').addClass('animate-in');
		$('.preloader').remove();
		//End Preloader

		if( $('.masonery_area').length ) {
			$('.masonery_area').masonry();//Masonry
		}

		var $portfolio_selectors = $('.portfolio-filter >li>a');

		if($portfolio_selectors.length) {

			var $portfolio = $('.portfolio-items');
			$portfolio.isotope({
				itemSelector : '.portfolio-item',
				layoutMode : 'fitRows'
			});

			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
		}

	});


	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
		$('body').on('click', '.page-scroll a', function(event) {
				var $anchor = $(this);
				$('html, body').stop().animate({
						scrollTop: $($anchor.attr('href')).offset().top
				}, 1500, 'easeInOutExpo');
				event.preventDefault();
		});
});

// Floating label headings for the contact form
$(function() {
		$("body").on("input propertychange", ".floating-label-form-group", function(e) {
				$(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
		}).on("focus", ".floating-label-form-group", function() {
				$(this).addClass("floating-label-form-group-with-focus");
		}).on("blur", ".floating-label-form-group", function() {
				$(this).removeClass("floating-label-form-group-with-focus");
		});
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
		target: '.navbar-collapse'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
		$('.navbar-toggle:visible').click();
});

// nav active
$('.navbar li').click(function(e) {
		$('.navbar li.active').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
				$this.addClass('active');
		}
		e.preventDefault();
});
