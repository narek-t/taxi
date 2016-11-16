$ = jQuery;

$(document).ready(function () {
    $(".faq-list__link").click(function(event) {
        event.preventDefault();
        $('html,body').animate({scrollTop: $(this.hash).offset().top - 10}, 600);
    });


	$(".toggle-marker").click(function(event) {
		event.preventDefault();
		$('.map-wrap .map-marker-content').removeClass('visible');
		$(this).parents(".map-marker").find('.map-marker-content').addClass('visible');
	});
});
