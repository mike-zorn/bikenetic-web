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
	   
      // Create the dropdown base
      $("<select />").appendTo("#nav");
      
      // Create default option "Go to..."
      $("<option />", {
         "selected": "selected",
         "value"   : "",
         "text"    : ""
      }).appendTo("nav select");
      
      // Populate dropdown with menu items
      $("nav a").each(function() {
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo("nav select");
      });
      
	   // To make dropdown actually work
      $("nav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });
	 
	 });
