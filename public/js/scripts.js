/* globals jQuery: false, $: false */


// SELECTED CLASS ON SCROLLING 

var header_height = $('#nav').outerHeight();
var sections = [];
$('#nav a').each(function(){    
    var section = $(this.hash).offset()
    sections.push({
        'link':$(this).parent(),
        'top' : $(this.hash).offset().top-header_height,
        'bottom' : $(this.hash).offset().top + $(this.hash).outerHeight() -header_height
    });
});

$('#nav a, #tab a').click(function(e) {
    e.preventDefault();
    $('html,body').animate({
        scrollTop: $(this.hash).offset().top - header_height
    }, 500);
});
    
    
$(window).scroll(function(){   
    for(var i = 0; i < sections.length; i++)
        if($(window).scrollTop() >= sections[i].top &&
           $(window).scrollTop() <= sections[i].bottom){
            sections[i].link.addClass('selected')
                .siblings().removeClass('selected');
        }
});


/* -- STICKY NAV -- */

$(document).ready(function() {
	$('.my-sticky-nav').waypoint('sticky');
});


/* -- ROLES OF HEADER -- */

var current = 1; 
var height = $('.roles').height(); 
var numberDivs = $('.roles').children().length; 
var first = $('.roles div:nth-child(1)'); 
setInterval(function() {
    var number = current * -height;
    first.css('margin-top', number + 'px');
    if (current === numberDivs) {
        first.css('margin-top', '0px');
        current = 1;
    } else current++;
}, 2000);


/* -- MOBILE NAVIGATION -- */

	 $(function() {
	   
      $("#menu-icon").click(function() {
        $("nav ul").slideToggle();
      });
      $("nav li").click(function() {
        //Make sure the menu is there
        if ($("menu-icon").css("display") !== "none") {
          $("nav ul").slideToggle();
        }
      });
      
	 });
