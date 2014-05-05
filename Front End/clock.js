var timer = $('.clock').FlipClock({
	autostart: 'false',
	countdown: 'true',
	clockFace: 'MinuteCounter'
});

//timer start
$("#start").click( function() {
	timer.start();
	});

//timer clear
$("#stop").click( function() {
	timer.stop();
	timer.setTime(0);
});