require("../css/style.css");
require("../css/pure-offset.css");

require("underscore");

$(function() {
    $('#fullPage').fullpage({
        //Navigation
        menu: false,
        lockAnchors: false,
        showActiveTooltip: false,

        //Scrolling
        css3: true,
        scrollingSpeed: 900,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        continuousVertical: false,
        normalScrollElements: '.log',
        scrollOverflow: false,
        touchSensitivity: 15,
        normalScrollElementTouchThreshold: 5,

        //Accessibility
        keyboardScrolling: true,
        recordHistory: true,

        //Design
        controlArrows: true,
        verticalCentered: true,
        resize: false,
        sectionsColor: ['#ccc', '#fff'],
        paddingTop: '3em',
        paddingBottom: '10px',
        fixedElements: '#header, .footer',
        responsiveWidth: 0,
        responsiveHeight: 0,

        //Custom selectors
        sectionSelector: '.section',
        slideSelector: '.slide',
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
