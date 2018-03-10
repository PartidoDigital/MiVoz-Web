/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
	var modal = this;
	var hash = modal.id;
	window.location.hash = hash;
	window.onhashchange = function() {
		if (!location.hash){
			$(modal).modal('hide');
		}
	}
});

var RSSParserOptions = {
    customFields: {
      item: ['dc:creator', 'category']
    }
  };

  const CORS_PROXY = "http://cors-anywhere.herokuapp.com/"

  RSSParser.parseURL('https://debate.partidodigital.org.uy/c/ideas.rss', RSSParserOptions, function (err, parsed) {
    if (err) {
      console.log(err);
      return;
    }
    for (var i = 0; i <= 2; i++) {
      var e = parsed.feed.entries[i];
      var title = '"' + e.title + '"';
      var autor = e["dc:creator"].split(" ");
      $('#ideas').append("<p>" + "<img class='rounded-circle autor' title='" + autor[1] + "' src='https://debate.partidodigital.org.uy/user_avatar/debate.partidodigital.org.uy/" + autor[0].substr(1) + "/30/1.png'/><a target='_blank' href='" + e.link + "'>" + title + "</a> en " + e.category + "</p>");
    }
    $('#ideas').slick({
      vertical: true,
      autoplay: true,
      autoplaySpeed: 3000,
      speed: 300,
      arrows: false
    });
  });