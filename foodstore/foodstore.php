<?php
header('Content-Type: text/xml');
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';

echo '<response>';
$food = $_GET['food'];
$foodArray = ['tuna', 'chicken', 'beef', 'loaf', 'mutton'];
if (in_array($food, $foodArray))
	echo 'We do have ' . $food . '!';
else if ($food === '')
	echo 'Enter name of a food.';
else
	echo 'We do not have ' . $food . '!';
echo '</response>';
