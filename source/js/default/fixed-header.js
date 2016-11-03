(function () {

    'use strict';

    var $header = $('.user-control');
    var $body = $('body');
    var $filter = $('user-filter')

    var headerHeight  = $header.outerHeight(true);
    var filterHeight = $filter.innerHeight();
    var threshold = headerHeight - filterHeight;
    //var navHeight = $('.main-navigation').innerHeight();
    //var threshold = headerHeight - navHeight;
    var currentState = '';

    $body.scroll(function(e) {
        fixedScroll();
    });

    var fixedScroll = function() {
        var scrolled = $body.scrollTop();

        if(scrolled > threshold) {
            setFixed('fixed')
            //$('.submenu').css('margin-top',(scrolled - threshold ) + 'px')
        } else {
            setFixed('not-fixed')
        }
    }

    var setFixed = function(state) {
        if(currentState != state) {
            currentState = state;
            if(state == 'fixed') {
                $body.addClass('___header-is-fixed');
                //$('.main').css('margin-top',headerHeight + 'px')
            } else {
                $body.removeClass('___header-is-fixed');
                //$('.main').css('margin-top','0px')
                //$('.submenu').css('margin-top','0px')
            }
        }
    }

    /*$(window).resize(function(){
        headerHeight  = $header.innerHeight();
        navHeight = $('.main-navigation').innerHeight();
        threshold = headerHeight - navHeight;
        fixedScroll();
    });

    $(window).scroll(function(e) {
        fixedScroll();
    });

    var fixedScroll = function() {
        var scrolled = $(window).scrollTop();

        if(scrolled > threshold) {
            setFixed('fixed')
            $('.submenu').css('margin-top',(scrolled - threshold ) + 'px')
        } else {
            setFixed('not-fixed')
        }
    }

    var setFixed = function(state) {
        if(currentState != state) {
            currentState = state;
            if(state == 'fixed') {
                $body.addClass('___header-is-fixed');
                $('.main').css('margin-top',headerHeight + 'px')
            } else {
                $body.removeClass('___header-is-fixed');
                $('.main').css('margin-top','0px')
                $('.submenu').css('margin-top','0px')
            }
        }
    }*/


})();
