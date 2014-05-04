var clock = $('.clock').FlipClock({
	autostart: 'false',
	countdown: 'true',
	onCreate: function() {
		clock.setTime(300);
	}
});