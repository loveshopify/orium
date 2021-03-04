$('.ik-marquee h2').marquee({
	speed: 200,
	gap: 300,
	delayBeforeStart: 0,
	direction: 'left',
	duplicated: true,
	pauseOnHover: true
});

$('.home-slider-wrapper .main-pane').slick({
	rows: 2,
	dots: false,
	arrows: true,
	infinite: true,
	speed: 300,
	slidesToShow: 2,
	centerMode: true,
	centerPadding: '50px'
});
