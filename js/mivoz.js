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
            if(item.name != "Sin categoría" && item.name != "Contenido censurado" && item.name != "Feedback") {
                $("#lista_categorias").append("<span class='label' style='background-color: #"+item.color+"'><a href='https://digo.mivoz.uy/new-topic?category="+item.name.replace(" ", "+")+"&title=Escribe+un+t%C3%ADtulo+aqu%C3%AD+y+escribe+tu+idea+debajo'>"+item.name.replace("💡", "")+"</a></span> ");
            }
        });
    });

    $.ajax('https://digo.mivoz.uy/tags.json').success(function(res) {
        $.each(res.extras.tag_groups, function(i, tag_group){
            if(tag_group.id === 4) {
                $.each(tag_group.tags, function(j, tag){
                    var nameTag = $("svg#mapa-uy path name:contains('"+tag.text.replace(/-/g, " ")+"')");
                    var path = nameTag.parents("path");
                    nameTag.attr("data-count", tag.count);
                    nameTag.attr("data-taglink", "https://digo.mivoz.uy/tags/"+tag.text);
                    if(tag.count != 0) {
                        path[0].classList.add("enabled");
                    }
                });
            }
        });
        tippy('svg#mapa-uy path', {
            content: function(reference) {
                var name = $(reference).find('desc name');
                var count = name.data("count");
                var out = "";
                out += name[0].innerText + " (" + (count === 0 ? "no hay propuestas aún)" : (count === 1 ? count + " propuesta)" : count + " propuestas)"));
                out += "<br><i class='small'>" + (count > 0 ? (count === 1 ? "Click para ver propuesta</i>" : "Click para ver propuestas</i>") : "Click para agregar propuesta</i>");
                return out;
            },
            //followCursor: true,
            theme: 'light',
            followCursor: true,
            placement: "bottom",
            touch: "hold"
        });
        $("svg#mapa-uy path").click(function() {
            window.open($(this).find("desc name").data("taglink"));
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
