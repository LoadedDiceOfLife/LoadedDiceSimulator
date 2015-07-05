require("../css/style.css");
require("../css/pure-offset.css");
require("./lib/jquery.slimscroll.min.js");
require("underscore");
require("./map.js");

$(function() {
    $('#fullPage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
        sectionsColor: ['#F5F4F0', '#EF8E59', '#F2A649', '#F7DAB6'],
        scrollOverflow: true,
        paddingTop: '1em'
    });

    $(document).ready(function() {
        init_map();
        $("#roll-the-dice-button").click(function() {
            $.fn.fullpage.moveSectionDown();
        });
    });

    $(document).ready(function() {
        $.getJSON('assets/strings/names.json').then(function(json) {
            var names = json.names;
            $('.presentation-name-a').html(_.sample(names));
            $('.presentation-name-b').html(_.sample(names));
        });

        $.getJSON('assets/strings/descriptions.json').then(function(json) {
            var descriptions = json.descriptions;
            $('.presentation-description-a').html(_.sample(descriptions));
            $('.presentation-description-b').html(_.sample(descriptions));
        });
    });
});