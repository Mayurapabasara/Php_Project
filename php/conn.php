<?php
	$servername = "localhost";
	$username = "mayuura";
	$password = "MayuraPassword";
	
	$conn = mysqli_connect($servername,$username,$password);
			
	if(!$conn){
		die("Connection Unsuccessful".mysqli_connect_error());
	}
	else{
		echo "Connection Successfully.";
	}

?>
