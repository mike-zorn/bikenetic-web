/* globals $: false */

function shiftBanner(first, numberDivs, currentShift, divIndex) {
  console.log(currentShift, numberDivs, divIndex);
  if (divIndex === numberDivs) {
    first.css('margin-left', '0px');
    setTimeout(shiftBanner, 2000, first, numberDivs, 0, 0);
  } else {
    var shift = currentShift - 
      $('.banner-images img:nth-child(' + (divIndex + 1) + ')').width();
    first.css('margin-left', shift + 'px');
    setTimeout(shiftBanner, 2000, first, numberDivs, shift, divIndex + 1);
  }
}

function getPictures(token) {
  var pictureGetUrl = '/photo_headlines.json';
  $.ajax({
    url: pictureGetUrl
  }).done(function(data){
    data.forEach(function(item) {
      var imgDiv = $("<img></img>")
        .attr('src', item.image);
      imgDiv.appendTo('.banner-images');
    });

    shiftBanner($('.banner-images img:nth-child(1)'), 
      $('.banner-images').children().length, 0, 0); 
  });
}

$(getPictures);
