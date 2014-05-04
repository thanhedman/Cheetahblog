//if you select a speech while the timer is at 0, cleans up other columns
//sets up new input field
$(".speech").click( function() {
	if ($("timer").getTime() = 0) {
		duration = $(this).data("duration");
		$("timer").setTime( duration );
		if ( $(".current").text.length > 0 ) {
			$(".current").keypress(13);
		}
		$(".current").remove();
		$("<br><input type='text' class='current'></input>").after( $(this) );
	}
		
//timer start
$("#startButton").click( function() {
	$("#timer").start();
	}
//on enter in current argument field, send ajax for tweet, transform current space,
//create new current argument field
$(".current").keypress( function(e) {
	argument = $(this).text();
	if (argument.length>0) {
		speech = $(this).parent().attr('id');
		time = $("#timer").getTime();
		//ajax call, on complete add shortened link as .data("link", value)
		$(this).replaceWith("<button>" + argument + "</button>" );
		$(this).removeClass("current").addClass("argText");
		$("<br><input type='text' class='current'></input>").after( $(this) );
	}
});

//for once we have a link return function, remove test from query line
//on click on old argument, inserts A2: and link to the argument
$(".argTextTest").click( function() {
	link = $(this).data("link");
	if ($(".current").text().length>0) {
		$(".current").text(" A2" + link + ": ");
	} else {
		$(".current").text("A2" + link + ": ");
	}
});

