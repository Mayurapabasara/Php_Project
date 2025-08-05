<?php
	include("conn.php");
	mysqli_select_db($conn,"TOURISUM");
	
	
	$sql1 = "CREATE TABLE IF NOT EXISTS user (
		Uname varchar(50) PRIMARY KEY, 
		Email varchar(200), 
		Tel varchar(20),
		Password varchar(20))";
	
	$sql2 = "CREATE TABLE IF NOT EXISTS Appartment (
		Uname varchar(50) PRIMARY KEY,
		Appartment_name varchar(50),
		room_type varchar(50),
		members number)";
		
		

	$result1 = mysqli_query($conn,$sql1);
	$result2 = mysqli_query($conn,$sql2);



	if(!$result1){
		die("Invalid Query".mysqli_error());
	}
	else {
		echo "<br/>User Table Create Successfully.";
	}
	
	if(!$result2){
		die("Invalid Query".mysqli_error());
	}
	else {
		echo "<br/>Appartment Table Create Successfully.";
	}


?>
