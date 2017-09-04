/* ------------------------------------------------------------------------
	Do it when you're ready dawg!
------------------------------------------------------------------------- */

	

	tabs = {
  init : function(){
   $('.tabs').each(function(){

    var th=$(this),
     tContent=$('.tab-content',th),
     navA=$('.nav a',th)

	$('.nav .selected span').stop().animate({width:'100%'})
    tContent.not(tContent.eq(1)).hide()

    navA.click(function(){
     var th=$(this),
      tmp=th.attr('href')
     tContent.not($(tmp.slice(tmp.indexOf('#'))).fadeIn(600)).hide()
	 $(th).parent().addClass('selected').siblings().removeClass('selected').find('span').stop().animate({width:0});
	 
     return false;
    });
   });

  }
 }