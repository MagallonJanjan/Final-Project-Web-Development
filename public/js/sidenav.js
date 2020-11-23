$(document).ready(function () {
    var owl = $('#collection-slider');
    owl.owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsiveBaseElement: '.main-content',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    });


    $(".toggle-sidenav").click(function (event) {
        /* Act on the event */
        $("#two-col-layout").toggleClass("toggle-content");
        $('.main-content').one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function (event) {
            owl.trigger('refresh.owl.carousel');
        });
    });

});