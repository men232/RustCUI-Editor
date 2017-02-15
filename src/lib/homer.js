/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */

let HEADER_H = 62;

$(document).ready(function () {

    // Set minimal height of #wrapper to fit the window
    fixWrapperHeight();

    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

});

$(window).bind("load", function () {

    // Remove splash screen after load
    $('.splash').css('display', 'none')
});

$(window).bind("resize click", function () {

    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});

function fixWrapperHeight() {
    // Get and set current height
    var navigationH = $("#navigation").height();
    var contentH = $(".content").height();

    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH + 'px');
    }

    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - HEADER_H  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - HEADER_H + 'px');
    }
}


function setBodySmall() {
    if ($(window).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}

module.exports = {
    fixWrapperHeight: fixWrapperHeight,
    setBodySmall: setBodySmall,
    setHeaderH: (v) => {
        HEADER_H = v;
    },
};