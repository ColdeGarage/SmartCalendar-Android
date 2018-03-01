<?php
session_start();

// $dbhost = "192.168.0.2";
// $dbuser = "OnlineTodo";
// $dbpass = "30R2Ww";
// $dbname = "OnlineTodo";

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "";
$dbname = "OnlineTodo";

$action = $_REQUEST["action"];
	
if($action == "login"){
	
	// get name and password
	$obj = json_decode($_POST["mes"]);
	//print_r($obj);
	//echo $_POST["mes"];
	$name = $obj->name;
	$password = $obj->password;
	
	// connect to database
	$mysqli = new mysqli($dbhost, $dbuser,$dbpass, $dbname);
	if ($mysqli->connect_errno) {
		echo $mysqli->connect_error;
		exit();
	}
	
	//find the password
	$sql = "SELECT `ID`,`password` FROM `account` WHERE `name` = ? ";
	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param('s',$name);
	$stmt->execute();
	
	
	//get password
	$stmt->bind_result($ID,$dbhash);
	if($stmt->fetch()==0){
		echo -2;
	}
	else if(password_verify($password, $dbhash)){
		$_SESSION["login"] = $name;
		$_SESSION["ID"] = $ID;
		echo 1;
	}
	else{
		echo -1;
	}
	$mysqli->close();
}

else if($action == "isLogin"){
	if(isset($_SESSION["login"]))		
		echo $_SESSION["login"];
	else
		echo "";
}

else if($action == "logout"){
	if(isset($_SESSION["login"])){
		unset($_SESSION["login"]);
		unset($_SESSION["ID"]);
	}
		 
}

?>