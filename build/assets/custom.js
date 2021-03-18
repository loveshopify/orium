$('.ik-marquee h2').marquee({
	speed: 200,
	gap: 300,
	delayBeforeStart: 0,
	direction: 'left',
	duplicated: true,
	pauseOnHover: false
});

$('.home-slider-wrapper .main-pane').slick({
	rows: 2,
	dots: false,
	arrows: false,
	infinite: true,
	speed: 300,
	slidesToShow: 3,
	slidesToScroll: 4,
	centerMode: true,
	centerPadding: '70px',
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 990,
			settings: {
				arrows: false,
				centerPadding: '15px',
				slidesToShow: 1
			}
		}
	]
});

$(".ik-product-accord .item-title").click(function () {
	$(this).next().slideToggle();
	$(this).toggleClass("is--active");
});

$(".ik-product-landing .img_slider").slick({
	dots: false,
	arrows: false,
	infinite: true,
	speed: 300,
	slidesToShow: 2,
	slidesToScroll: 1,
	centerMode: true,
	centerPadding: '70px',
	adaptiveHeight: true,
	responsive: [
		{
			breakpoint: 990,
			settings: {
				centerPadding: '30px',
				slidesToShow: 1
			}
		}
	]
})

$(".ik-sub-wrap .ik-item .wrapper").click(function() {
	$(this).closest(".ik-sub-wrap").find(".ik-item").removeClass("is_active");;
	$(this).closest(".ik-item").addClass("is_active");
	// subscription_item
	// onetime_item
	if($(this).closest(".ik-item").attr("id") == "subscription_item") {
		$("[data-selector-subsave]").find(".rc_widget__option__label").click();
	} else {
		$("[data-selector-onetime]").find(".rc_widget__option__label").click();
	}
});

$(".variant_wrap .variant_item").click(function() {
	$(this).closest(".variant_wrap").find(".input_option").removeClass("is_active");;
	$(this).find(".input_option").addClass("is_active");
});