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