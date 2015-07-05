require("../css/style.css");
require("../css/pure-offset.css");
require("./map.js");

$(function() {
    $('#fullPage').fullpage({
        //Navigation
        menu: false,
        lockAnchors: false,
        showActiveTooltip: false,

        //Scrolling
        css3: true,
        scrollingSpeed: 700,
        autoScrolling: true,
        fitToSection: true,
        scrollBar: false,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        continuousVertical: false,
        normalScrollElements: '#element1, .element2',
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

        //events
        onLeave: function(index, nextIndex, direction) {},
        afterLoad: function(anchorLink, index) {},
        afterRender: function() {},
        afterResize: function() {},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
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
