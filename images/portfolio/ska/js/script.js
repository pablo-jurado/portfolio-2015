
$(document).ready(function() {
	
	    //news slider
		$('#slider2').tinycarousel({display:1,interval:true,intervaltime:5000});
		
		//twitter reader
		$("#twitter").getTwitter({userName:"Lementstudios",numTweets:3,loaderText:"Loading tweets...",slideIn:true,showHeading:false,showProfileLink:false})
		
		//for prettyPhoto
	jQuery('a[rel^="prettyPhoto"]').prettyPhoto({theme:'facebook'});

	// rumble animation
	$('.close, #logo, #slider2 .overview li em, #slider1 h6, .lightbox-image').jrumble({
		rangeX: 2,
		rangeY: 2,
		posX: 'right',
		posY: 'top',
		rumbleSpeed: 50,
		rangeRot: 1
	});
	
	//gallery2
	$('#gallery2').cycle({
			fx:    'scrollHorz',
			timeout: false, // milliseconds between slide transitions (0 to disable auto advance)
			mouseWheel: true,
			speed: 1000, // speed of the transition (any valid fx speed value)
			pager: '.pagination', // selector for element to use as pager container
			activePagerClass: 'active', // class name used for the active pager link
   			prev: '.gallery_prev',  // selector for element to use as event trigger for previous slide 
    		next: '.gallery_next'  // selector for element to use as event trigger for next slide 
	});
	
	var Img='#'+$(".folio .active").attr('id')
	$(".folio .dt > div").css({opacity:'0', display:'none'});
	$(".folio .dt > div.active").css({opacity:'1', display:'block'});
	$(".folio ul li a").click(function(){
  		var ImgId = $(this).attr("href");
		$('.folio dd li a').removeClass('active')
		$(this).addClass('active');
		$('.folio dd li a').not('.active').find('.img_act').stop().animate({opacity:'0'})
  		if (ImgId!=Img) {
			$(".folio .dt .active").animate({ opacity: "0" }, 600,function(){
				 $(this).css({display:'none'})
				 $(this).removeClass('active');
			})
				 $(ImgId).css({display:'block'}).animate({ opacity: "1" }, 600).addClass('active');
		}
		Img=ImgId;
  	  return false;
   })

	$('.folio dd .img_act').css({opacity:'0'});
	$('.folio dd .active .img_act').css({opacity:'1'});
	$('.folio dd li a').hover(function(){
			$(this).find('.img_act').stop().animate({opacity:'1'})
	}, function(){
		if (!$(this).hasClass('active')) {
			$(this).find('.img_act').stop().animate({opacity:'0'})
		}
	})
	
	Cufon.now(); 	

	
	$('.list3 a').hover(function(){
		$(this).stop().animate({paddingLeft:'32px'}, 500)
	}, function(){
		$(this).stop().animate({paddingLeft:'22px'}, 500)
	})
	
	$('#button .img_act').css({opacity:'0'})
	
	$('#button').hover(function(){
		$(this).find('.img_act').stop().animate({opacity:1}, function(){$(this).css({opacity:'none'})})		
		$(this).find('.img').stop().animate({opacity:0})					
	}, function(){
		$(this).find('.img_act').stop().animate({opacity:0})	
		$(this).find('.img').stop().animate({opacity:1}, function(){$(this).css({opacity:'none'})})							
	})
	
	// trigger button
	$('.trigger nav').css({width:0, right:20})
	
	$('#button').click(function(){
		if ($(this).hasClass('clicked')) {
			$(this).removeClass('clicked');
			$(this).parent().find('nav').stop().animate({width:0, right:32})
		} else {
			$(this).addClass('clicked');
			$(this).parent().find('nav').stop().animate({width:400, right:32})
		}
		return false
	})
	
	// icons
	$('.icons .img_act').css({opacity:0})
	
	$('.icons a').hover(function(){
		$(this).find('.img_act').stop().animate({opacity:1})						 
	}, function(){
		$(this).find('.img_act').stop().animate({opacity:0})						 
	})
	
	$('.dark').css({opacity:0, display:'none'})
	
	$('.button1 span').css({opacity:0, display:'none'})
	
	// button 1
	$('.button1, .button2, .button3').hover(function(){
		$(this).find('span').css({display:'block'}).stop().animate({opacity:1}, function(){$(this).css({opacity:'none'})})						 
	}, function(){
		$(this).find('span').stop().animate({opacity:0}, function(){$(this).css({display:'none'})})						 
	})
	///////////////// buton hover animations ///////////////////////////////
	// close
	$('.close').css({opacity:1.0})
	
	// close hover
	$('.close').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})
	
	// news arrow button
	$('#slider2 .buttons').css({opacity:1.0})
	
	// news arrow button hover
	$('#slider2 .buttons').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})
	
	// blog arrow button
	$('.prev, .next').css({opacity:1.0})
	
	// blog arrow button hover
	$('.prev, .next').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})
	
	// calendar arrow button
	$('.prev, .next').css({opacity:1.0})
	
	// calendar arrow button hover
	$('.prev3, .next3').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})
	
	// gallery1 arrow button
	$('.prev, .next').css({opacity:1.0})
	
	// gallery1 arrow button hover
	$('.gallery_prev, .gallery_next').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})
	
	// gallery3  button
	$('.roundabout .pagination a').css({opacity:1.0})
	
	// gallery3  button hover
	$('.roundabout .pagination a').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})
	
	// gallery3  button
	$('#pagination a').css({opacity:1.0})
	
	// gallery3  button hover
	$('#pagination a').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})	
	
	// thumbslider  button
	$('ul.slider_nav li a').css({opacity:1.0})
	
	// thumbslider  button hover
	$('ul.slider_nav li a').hover(function(){
		$(this).stop().animate({opacity:0.5})					   
	}, function(){
		$(this).stop().animate({opacity:1.0})					   
	})	
	////////////////////////// button hover animation end ////////////////////////
	
	// menu
	$('ul#menu').superfish({
      delay:       600,
      animation:   {height:'show'},
      speed:       600,
      autoArrows:  false,
      dropShadows: false
    });
	
	
	// accordion
	$(".accordion dd").hide();
	//$(".accordion dt").eq(2).addClass("active").find('span').stop().animate({opacity:0});
	//$(".accordion dd").eq(2).show();

	$(".accordion dt").click(function(){
		$(this).next(".accordion dd").slideToggle("slow")
		.siblings(".accordion dd:visible").slideUp("slow");
		$(this).toggleClass("active");
		if ($(this).hasClass('active')) {
			$(this).find('span').stop().animate({opacity:0})
		} else {
			$(this).find('span').stop().animate({opacity:1})
		}
		$(this).siblings(".accordion dt").removeClass("active").find('span').stop().animate({opacity:1});
		return false;
	});
	
	$(".accordion dt").hover(function(){
		$(this).find('em').stop().animate({opacity:0})
	}, function(){
		$(this).find('em').stop().animate({opacity:1})
	})
	
	// tabs 
	tabs.init();
	
	
	$('.nav .selected span').css({width:'100%'})
	
	$('.nav a').hover(function(){
		$(this).parent().find('span').stop().animate({width:'100%'})
	}, function(){
		if (!$(this).parent().hasClass('selected')) $(this).parent().find('span').stop().animate({width:0})
	})
		
 });
// bg slideshow
$(window).load(function() {	
						
	$('#bgStretch').bgStretch({
			align:'leftTop',
			navigs:$('#pagination').navigs(),
			autoPlay:true,
			duration:1000,
			sleep:300
		})
		.sImg({
			spinner:$('<div class="bgspinner"></div>').css({opacity:.7}).hide()
	})
	
	$('#pagination li').eq(0).addClass('active');	
	

	
	// scroll VERTICAL
	$('.scroll').cScroll({
		duration:700,
		step:100,
		trackCl:'track',
		shuttleCl:'shuttle'
	})	
	
	// contact form
	$('#ContactForm, #BlogContactForm').forms({
		ownerEmail:'#'
	})
	
	// content switch
	var content=$('#content'),
		nav=$('.menu');
	nav.navs({
		useHash:true
	})	
	nav.navs(function(n, _){
		content.cont_sw(n);
		Cufon.replace('#menu > li > a', { fontFamily: 'Oswald', hover:true });
	})
	content.cont_sw({
		showFu:function(){
			var _=this			
			$.when(_.li).then(function(){
				_.next.css({display:'block'}).stop().animate({top:0},400,'easeOutCirc');	
				$('.dark').css({display:'block'}).stop().animate({opacity:0.88})
			});
		},
		hideFu:function(){
			var _=this
			_.li.stop().animate({top:1000},600,'easeInCirc', function(){
				_.li.css({display:'none',top:-1500});
				$('.dark').stop().animate({opacity:0}, function(){
					$(this).css({display:'none'})
				})
			})
						
		},
		preFu:function(){
			var _=this
			_.li.css({position:'absolute', display:'none'});
		}
	})
	
	// center content
	var h_cont=900;
	function centre() {
		var h=$(document).height();
		if (h>h_cont) {
			m_top=~~(h-h_cont)/2;
		} else {
			m_top=0;
		}
		$('#content').stop().animate({top:m_top},1000, 'easeOutCirc')
	}
	centre();
	$(window).resize(centre);
	
})

