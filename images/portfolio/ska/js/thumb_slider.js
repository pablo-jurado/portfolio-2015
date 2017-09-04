// PRELOAD FUNCTION //
			(function($) {
				$.fn.preload = function(options) {
					var opts 	= $.extend({}, $.fn.preload.defaults, options),
						o		= $.meta ? $.extend({}, opts, this.data()) : opts;
					return this.each(function() {
						var $e	= $(this),
							t	= $e.attr('rel'),
							i	= $e.attr('href'),
							l	= 0;
						$('<img/>').load(function(i){
							++l;
							if(l==2) o.onComplete();
						}).attr('src',i);	
						$('<img/>').load(function(i){
							++l;
							if(l==2) o.onComplete();
						}).attr('src',t);	
					});
				};
				$.fn.preload.defaults = {
					onComplete	: function(){return false;}
				};
			})(jQuery);
		
			$(function() {
				// THE MAIN ELEMENTS //
				var $slider_container		= $('#slider_container'),
					$slider_image_wrapper 	= $slider_container.find('.slider_image_wrapper'),
					$slider_next			= $slider_container.find('.slider_next'),
					$slider_prev			= $slider_container.find('.slider_prev'),
					$slider_nav				= $slider_container.find('.slider_nav'),
					$tooltip			= $slider_container.find('.slider_preview'),
					$slider_preview_wrapper = $tooltip.find('.slider_preview_wrapper'),
					$links				= $slider_nav.children('li').not($tooltip),
					total_images		= $links.length,
					currentHovered		= -1,
					current				= 0,
					$loader				= $('#loader');
				
				// CHECK IF YOU ARE USING A BROWSER //	
				var ie 				= false;
				if ($.browser.msie) {
					ie = true;
				}
				if(!ie)
					$tooltip.css({
						opacity	: 0
					}).show();
					
					
				// FIRST PRELOAD IMAGES THUMB AND BIG IMAGE //
				var loaded	= 0;
				$links.each(function(i){
					var $link 	= $(this);
					$link.find('a').preload({
						onComplete	: function(){
							++loaded;
							if(loaded == total_images){
								// ALL IMAGES PRELOADED //
								// SHOW SLIDER_CONTAINER AND INITIALIZE EVENTS //
								$loader.hide();
								$slider_container.show();
								// ON MOUSE OVER SHOW TOOLTIP //
								// ON MOUSE OUT HIDE TOOLTIP //
								//ON CLICK WILL SHOW IMAGE //	
								$links.bind('mouseenter',showTooltip)
									  .bind('mouseleave',hideTooltip)
									  .bind('click',showImage);
								// NAV THROUGH THE IMAGES //
								$slider_next.bind('click',nextImage);
								$slider_prev.bind('click',prevImage);
							}
						}
					});
				});
				
				function showTooltip(){
					var $link			= $(this),
						idx				= $link.index(),
						linkOuterWidth	= $link.outerWidth(),
						// THIS HOLDS THE LEFT VALUE FOR THE NEXT POSITION OF THE TOOLTIP //
						left			= parseFloat(idx * linkOuterWidth) - $tooltip.width()/2 + linkOuterWidth/2,
						// THUMB IMAGE SOURCE //
						$thumb			= $link.find('a').attr('rel'),
						imageLeft;
					
					// IF NOT HOVERING CURRENT THUMB //
					if(currentHovered != idx){
						// IF WE'LL ANIMATE LEFT->RIGHT or RIGHT->LEFT //
						if(currentHovered != -1){
							if(currentHovered < idx){
								imageLeft	= 75;
							}
							else{
								imageLeft	= -75;
							}
						}
						currentHovered = idx;
						
						// THE NEXT THUMB IN THE TOOLTIP //
						var $newImage = $('<img/>').css('left','0px')
												   .attr('src',$thumb);
						
						//IF THERE IS MORE THAN 1 IMAGE
						// REMOVE THE LAST ONE //
						if($slider_preview_wrapper.children().length > 1)
							$slider_preview_wrapper.children(':last').remove();
						
						// PREPEND THE NEXT IMAGE //
						$slider_preview_wrapper.prepend($newImage);
						
						var $tooltip_imgs		= $slider_preview_wrapper.children(),
							tooltip_imgs_count	= $tooltip_imgs.length;
							
						// IF THERE IS 2 IMAGES ON THE TOOLTIP //
						// ANIMATE THE CURRENT ONE OUT, AND ANIMTE THE NEW ONE IN //
						if(tooltip_imgs_count > 1){
							$tooltip_imgs.eq(tooltip_imgs_count-1)
										 .stop()
										 .animate({
											left:-imageLeft+'px'
										  },800,function(){
												//remove the old one
												$(this).remove();
										  });
							$tooltip_imgs.eq(0)
										 .css('left',imageLeft + 'px')
										 .stop()
										 .animate({
											left:'0px'
										  },400);
						}
					}
					//IF WE ARE NOT USING A "BROWSER", ONLY SHOW THE TOOLTIP, //
					// OTHERWISE FADE IT //
					
					if(ie)
						$tooltip.css('left',left + 'px').show();
					else
					$tooltip.stop()
							.animate({
								left		: left + 'px',
								opacity		: 1
							},300);
				}
				
				function hideTooltip(){
					// HIDE / FADE OUT TOOLTIP FUNCTION //
					if(ie)
						$tooltip.hide();
					else
					$tooltip.stop()
						    .animate({
								opacity		: 0
							},300);
				}
				// SHOW IMAGE FUNCTION //
				function showImage(e){
					var $link				= $(this),
						idx					= $link.index(),
						$image				= $link.find('a').attr('href'),
						$currentImage 		= $slider_image_wrapper.find('img'),
						currentImageWidth	= $currentImage.width();
					
					// IF WE CLICK THE CURRENT ONE, RETURN //
					if(current == idx) return false;
					
					// ADD CLASS SELECTED TO CURRENT PAGE / DOT //
					$links.eq(current).removeClass('selected');
					$link.addClass('selected');
					
					// THE NEW IMAGE ELEMENT //
					var $newImage = $('<img/>').css('left',currentImageWidth + 'px')
											   .attr('src',$image);
					
					// IF THE WRAPPER HAS MORE THAN ONE IMAGE, REMOVE LAST //
					if($slider_image_wrapper.children().length > 1)
						$slider_image_wrapper.children(':last').remove();
					
					// PREPEND NEW IMAGE //
					$slider_image_wrapper.prepend($newImage);
					
					// NEW IMAGE WIDTH //
					//THIS WILL BE THE NEW WIDTH OF THE SLIDER_IMAGE_WRAPPER //
					var newImageWidth	= $newImage.width();
				
					// CHECK THE DIRECTION OF THE ANIMATION //
					if(current > idx){
						$newImage.css('left',-newImageWidth + 'px');
						currentImageWidth = -newImageWidth;
					}	
					current = idx;
					// ANIMATE THE NEW WIDTH OF THE SLIDER_IMAGE_WRAPPER //
					//(SAME AS A NEW IMAGE WIDTH) //
					$slider_image_wrapper.stop().animate({
					    width	: newImageWidth + 'px'
					},700);
					// ANIMATE NEW IMAGE IN //
					$newImage.stop().animate({
					    left	: '0px'
					},700);
					// ANIMATE LAST IMAGE OUT //
					$currentImage.stop().animate({
					    left	: -currentImageWidth + 'px'
					},700);
				
					e.preventDefault();
				}				
				// NEXT IMAGE FUNCTION //
				function nextImage(){
					if(current < total_images){
						$links.eq(current+1).trigger('click');
					}
				}
				// PREVIOUS IMAGE FUNCTION //
				function prevImage(){
					if(current > 0){
						$links.eq(current-1).trigger('click');
					}
				}
			});