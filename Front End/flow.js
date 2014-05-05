//set speech data values
$(document).ready( function() {
	$("#flowTable").data("times", { "1AC": 420, "1NC": 480, "2AC": 480, "2NC": 480, "1NR": 240, "1AR": 300});
});

//send ajax for tweet, transform current space,
//create new current argument field
function submitArgument(e) {
	if (e.which == 13) {
		argument = $(this).val();
		if (argument.length>0) {
			speech = $(this).parent().attr('id');
			secondTotal = timer.getTime();
			if (secondTotal > 0) {
				var minutes = Math.floor( secondTotal / 60 );
				var seconds = secondTotal % 60;
				time = "(" + minutes + ":" + seconds + ")";
			}
			else {
				time = '';
			}
			tweet = speech + ": " + time + argument;
			argumentPost(tweet);
			$("<input type='text' class='current form-control'></input>").insertAfter( $(this) );
			$(this).off().replaceWith("<button class='argument'>" + argument + "</button>" );
			$(this).removeClass("current").addClass("argText");
			$(".current").focus();
			$(".current").on('keypress', submitArgument);
		}
	}
}

//if you select a speech while the timer is at 0, cleans up other columns
//sets up new input field
function setSpeech(e) {
	curspeech = $(".current").parent().attr('id');
	curduration = $("#flowTable").data("times")[curspeech];
	if (timer.getTime() <= 0 || timer.getTime() == curduration) { //isRunning would be better
		speech = $(this).parent().attr('id');
		duration = $("#flowTable").data("times")[speech];
		timer.setTime( duration );
		if ( $(".current").text.length > 0 ) {
			var event = jQuery.Event("keypress");
			event.which = 13;
			$(".current").trigger(e);
		}
		$(".speech").removeClass("btn-success").addClass("btn-default");
		$(this).removeClass("btn-default").addClass("btn-success");
		$(".current").off().remove();
		$("<input type='text' class='current form-control'></input>").insertAfter( $(this).parent().children().last() );
		$(".current").focus();
		$(".current").on('keypress', submitArgument);
	}
	//$(".speech").on('click', setSpeech);
}

//current argument submission listener
$(".current").keypress( submitArgument );

//speech button listener
$(".speech").click( setSpeech );





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

function argumentPost( tweet ){
	$.ajax({
		type: "POST",
		url: "tweet",
		data: { argument: tweet }
	});
}