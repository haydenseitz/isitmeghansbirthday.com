var debug = false;
debug = true;

// set cache
sessionStorage.setItem('bday','false');

/// countdown timer ///
var day = '16';
var month = '8'; // august
// fix month to match function returns
month--;

//testing date
//day = '2';
//month = '7'; // jan

function fadeInContent() {

	$("#textbox").delay(500).fadeIn("slow");
	$("#countdownbox").delay(1000).fadeIn(5000);
}

function make_bday() {

	sessionStorage.setItem('bday','true');

	//set background color to white
	$('body').removeClass('black');
	$('body').addClass('white');

	// set #text class to yestext and html to YES
	$('#text').removeClass('notext');
	$('#text').addClass('yestext');
	$('#text').html('YES')

	// set #countdown class to yestext and set text
	$('#countdown').removeClass('notext');
	$('#countdown').addClass('yestext');
	$('#countdown').html("Happy Birthday!");

	// clear out countdown times 
	$('.time').hide();

	// fadeIn 
	fadeInContent();

	// add conjetti scripts
	$.getScript('js/confetti.js');
	$.getScript('js/animate_rainbow.js');
	$.getScript('js/animate_rainbow_background.js');

	// load and play audio
	play_horn();
}

function make_countdown(now) {
	// set #text class and html
	$('#text').addClass('notext');
	$('#text').html('NO');

	// set #countdown class
	$('.time').addClass('notext');

	// unhide content
	fadeInContent();

	// Set the date we're counting down to
	var year = now.getFullYear();
	if(debug) console.log("now: " + now);


	// correct month if we are in same year
	// if target date is before curr month, do nothing
	// if target date later than curr month, add year
	// if target date same as curr month, check day
	// 	if target date is earlier than curr (bday has past), add year
	if(debug){
		console.log("month: " + month);
		console.log("now.getMonth: " + now.getMonth());
		console.log("day: " + (day));
		console.log("now.getDate: " + now.getDate());
	}
	if ( now.getMonth() > month ) { // if month is target month or earlier
		year += 1; 
		if(debug) console.log("target month is earlier than current month, adding a year");
	} else if ( now.getMonth() < month ) {
		if(debug) console.log("target month is later than current month, continuing");
	} else {
		if ( now.getDate() > day ) {
			year += 1;
			if(debug) console.log("target date is earlier than current day, adding a year");
		} else {
			if(debug) console.log("target date is later than current day, continuing");
		}
	}

	var countdown_date = new Date(year,month,day);
	// testing countdown timer
	//countdown_date = new Date(year,month,'1','16','00')
	if (debug) console.log('countdown date: ' + countdown_date.toString());

	//var countDownDate = new Date().getTime();
	var countDownDate = countdown_date.getTime();

	if (debug) console.log('starting countdown');	

	// Update the count down every 1 second
	var x = setInterval(function() {
		
		// Get todays date and time
		var time = new Date;

		// Find the distance between now an the count down date
		var distance = countDownDate - time.getTime();

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		if ( hours < 10 ) {
			hours = "0" + hours;
		}
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		if ( minutes < 10 ) {
			minutes = "0" + minutes;
		}
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		if ( seconds < 10 ) {
			seconds = "0" + seconds;
		}

		// Output the result in an element with id="demo"
		//document.getElementById("countdown").innerHTML = days + "." + hours + ":" + minutes + ":" + seconds;
		//$('#countdown').html(days + "." + hours + ":" + minutes + ":" + seconds);
		$('#days').html(days+'d ');
		$('#hours').html(hours+'h');
		$('#minutes').html(minutes+'m');
		$('#seconds').html(seconds+'s');
		
		if (debug) console.log(days + "." + hours + ":" + minutes + ":" + seconds);

		// If the count down is over, write some text 
		if (distance <= 1000) {
		if (debug) console.log('distance: ' + distance);
		clearInterval(x);
		$("#textbox").fadeOut(1000);
		$("#countdownbox").fadeOut(1000);
		setTimeout(make_bday(),1000);
		}

	}, 1000);  // end of setInterval
}  // end of make_countdown

function play_horn() {
	// stop all other audio
	$('audio').each(function(){
		this.pause();
	});
	var audio = new Audio('dj-airhorn-sound-effect.mp3');
	audio.play();
}

function check_countdown(now) {
	// first, check if today is the day
	if ( now.getMonth() == month && now.getDate() == day ) {

		if (debug) console.log('today is the day');
		make_bday();

	} else {  // day and month do not match now

		if (debug) console.log('today is NOT the day');
		make_countdown(now);

	} // end of today check
}  // end of check_countdown


/// MAIN ///

$(document).ready(function(){
	if (debug) console.log('ready');
	
	// play horn when click on bday
	$(window).click(function(){
		if (debug) console.log('click');
		if ( sessionStorage.getItem('bday') === 'true' ) {
			play_horn();
		}
	});

	// play horn when tap (mobile) on bday
	$(window).on(
		{ 'touchstart': function(){
			if (debug) console.log('tap');
			if ( sessionStorage.getItem('bday') === 'true' ) {
				play_horn();
			}
		}
	});

	var now = new Date();
	//now = new Date(2018,month,'1','00','00')
	check_countdown(now);
});
