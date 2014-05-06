var timer = $('.clock').FlipClock({
	autostart: 'false',
	countdown: 'true',
	clockFace: 'MinuteCounter'
});

//timer start
$("#start").click( function() {
	timer.start();
	timer.running = true;
	$(".current").focus();
	});

//timer stop
$("#stop").click( function() {
	timer.stop();
	timer.running = false;
});

//timer clear
$("#clear").click( function() {
	if (timer.running) {
		timer.stop();
		timer.running = false;
	}
	timer.setTime(0);
});