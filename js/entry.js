require("../css/style.css");
require("../css/pure-offset.css");
require("./lib/jquery.slimscroll.min.js");
require("underscore");
require("./map.js");

$(function() {
    $('#fullPage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
        sectionsColor: ['#F5F4F0', '#F7DAB6', '#F2A649', '#EF8E59'],
        scrollOverflow: true
    });

    $(document).ready(function() {
        init_map();
    });

    $(document).ready(function() {
        $.getJSON('assets/strings/names.json').then(function(json) {
            var names = json.names;
            $('.presentation-name').each(function(index, element) {
                $(element).html(_.sample(names));
            });
        });

        $.getJSON('assets/strings/descriptions.json').then(function(json) {
            var descriptions = json.descriptions;
            $('.presentation-description').each(function(index, element) {
                $(element).html(_.sample(descriptions));
            });
        });
    });
});
