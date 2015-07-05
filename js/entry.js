require("../css/style.css");
require("../css/pure-offset.css");
require("./lib/jquery.slimscroll.min.js");
require("underscore");

$(function() {
    $('#fullPage').fullpage({
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
        sectionsColor: ['#4A6FB1', '#939FAA', '#323539'],
        scrollOverflow: true
    });

function populateLog(log){
    $(log).append()
}

    $(document).ready(function() {
        // TODO: implement the real GET function to retrieve areas
        var response = {
            "areas": [{
                "code":  1,
                "name": "Wellington"
            }, {
                "code":  2,
                "name": "Whanganui"
            }, {
                "code":  3,
                "name": "Hamilton"
            }, ]
        };
        response.areas.forEach(function(area) {
            console.log(area)
            $(".select-area").append('<option value=' + area.code + '>' + area.name + '</option>');
        });
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
