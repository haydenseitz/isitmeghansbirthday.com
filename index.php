<html>
<?php
/*  ### 2018-01-22 - updating code to do all calc in js

#echo date("m-d");
$date = date("m-d");
 
#if ( $date == '08-16' ) {
if ( $date == '01-22' ) {
	$birthday = true;
	$textclass = 'yestext';
} else {
	$birthday = false;
	$textclass = 'notext';
}

*/
?>

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css?family=Raleway:400,900" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/page.css" />
</head>

<body class="black<?php #echo (( $birthday ) ? 'white' : 'black' ) ?>">

<canvas id="canvas"></canvas>

<div id="textbox"><p id="text" class="<?php #echo $textclass; ?>"><?php # echo (( $birthday) ? "YES" : "NO" ); ?></p></div>

<div id="countdownbox">
	<div id="countdownboxinner">
		<span id="countdown" class="<?php # echo $textclass; ?>"></span>
		<span id="days" class="time"></span>
		<span id="hours" class="time"></span>
		<span id="minutes" class="time"></span>
		<span id="seconds" class="time"></span>
	</div>
</div>

</body>
<?php
/*  ### 2018-01-22 - updating code to do all calc in js

if ( $birthday ) {
	echo '<script src="js/confetti.js"></script>';
	echo '<script src="js/animate_rainbow.js"></script>';
	echo '<script src="js/animate_rainbow_background.js"></script>';
}

*/
?>

<script src="js/jquery.min.js"></script>
<script src="js/main.js"></script>
</html>
