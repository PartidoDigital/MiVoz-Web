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
            scrollTop: $($anchor.attr('href')).offset().top - 40
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $.ajax('https://digo.mivoz.uy/categories.json').success(function(res) {
        $.each(res.category_list.categories, function(index, item){
            if(item.name != "Sin categoría" && item.name != "Contenido censurado") {
                $(".lista_categorias").append("<span class='label' style='background-color: #"+item.color+"'>"+item.name+"</span> ");
            }
        });
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
        if (!location.hash) {
            $(modal).modal('hide');
        }
    }
});

var RSSParserOptions = {
    customFields: {
        item: ['dc:creator', 'category']
    }
};

RSSParser.parseURL('https://digo.mivoz.uy/tags/web.rss', RSSParserOptions, function(err, parsed) {
    if (err) {
        console.log(err);
        return;
    }
    for (var i = 0; i < parsed.feed.entries.length; i++) {
        var e = parsed.feed.entries[i];
        var title = '"' + e.title + '"';
        var autor = e["dc:creator"].split(" ");
        $('#ideas').append("<p>" + "<img class='rounded-circle autor' title='" + autor[1] + "' src='https://digo.mivoz.uy/user_avatar/digo.mivoz.uy/" + autor[0].substr(1) + "/30/1.png'/><a target='_blank' href='" + e.link + "'>" + title + "</a> en " + e.category + "</p>");
    }
    $('#ideas').slick({
        vertical: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 300,
        arrows: false
    });
});
