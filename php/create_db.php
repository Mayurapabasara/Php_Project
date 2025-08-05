<?php
	include("conn.php");

	$result = mysqli_query($conn,"CREATE DATABASE IF NOT EXISTS TOURISUM");
	
	if(!$result){
		die("Invalied Query".mysqli_error());
	}
	else{
		echo "<br/>Database is Created.";
	}
	
	mysqli_close($conn);

?>
