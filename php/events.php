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

$eventProperty = array(
	"ID",
	"accountID",
	"title",
	"content",
	"priority",
	"startTime",
	"notiTime",
	"emoji",
	"categoryID"
);

$action = $_REQUEST["action"];

if($action == "loadEvents"){
	if(isset($_SESSION["login"])==0){
		echo "not yet login";
	}
	else{
		$mysqli = new mysqli($dbhost, $dbuser,$dbpass, $dbname);
		if ($mysqli->connect_errno) {
			echo $mysqli->connect_error;
		}
		
		$ID = $_SESSION["ID"];
		//echo $ID;
		$mysqli->query("SET NAMES `UTF8`");
		$sql = "SELECT * FROM `event` WHERE `accountID` = $ID ORDER BY priority DESC,startTime";
		$result = mysqli_query($mysqli, $sql);
		//$result = mysqli_query($mysqli, $sql);

		$events = array();
		$i = 0;

		while($arr=mysqli_fetch_row($result)){
			for($j=0;$j<count($arr);$j++){
				$arr[$eventProperty[$j]] = $arr[$j];
				unset($arr[$j]);
			}
			$events[$i] = $arr;
			$i++;
		}
		echo mysqli_error($mysqli);
		echo json_encode($events);
	}
}
else if($action == "saveEvent"){
	echo $_POST["mes"];
	$event = json_decode($_POST["mes"]);
	
	if($event->ID==0){// it a new event
		print_r($event);
		$mysqli = new mysqli($dbhost, $dbuser,$dbpass, $dbname);
		$mysqli->query("SET NAMES `UTF8`");
		$sql = "INSERT INTO `event` (`ID`, `accountID`, `title`, `content`, `priority`, `startTime`, `notiTime`, `emoji`, `categoryID`) 
			VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?)";
		$stmt = $mysqli->prepare($sql);
		echo $event->title;
		$stmt->bind_param('ississsi',$_SESSION["ID"], $event->title, $event->content, $event->priority, 
			$event->startTime, $event->notiTime, $event->emoji, $event->categoryID);
		$stmt->execute();
		echo mysqli_error($mysqli);
		
		// "INSERT INTO `event` (`ID`, `accountID`, `title`, `content`, `priority`, `endTime`, `notiTime`, `emoji`, `categoryID`) 
			// VALUES (NULL, '1', '4545', '45454', '2', '2018-01-23 02:19:00', '2018-01-23 04:12:00', '', '')";	
	}
	else{
		echo "already have!!\n";
		print_r($event);
		$mysqli = new mysqli($dbhost, $dbuser,$dbpass, $dbname);
		$mysqli->query("SET NAMES `UTF8`");
		$sql = "UPDATE `event` SET `title` = ?, `content` = ?,`priority` = ?, `startTime` = ?, `notiTime` = ?, `emoji` = ?,`categoryID` = ? WHERE `event`.`ID` = $event->ID ";

		$stmt = $mysqli->prepare($sql);
		$stmt->bind_param('ssisssi', $event->title, $event->content, $event->priority, 
			$event->startTime, $event->notiTime, $event->emoji, $event->categoryID);
		$stmt->execute();
		echo mysqli_error($mysqli);			
		// UPDATE `event` SET `title` = 'change event', `content` = 'sdsdssd', 
		// `priority` = '5', `startTime` = '2018-01-19 09:41:57', 
		// `notiTime` = '2018-01-24 09:41:57', `emoji` = 'sdasdsadsa', 
		// `categoryID` = '2' WHERE `event`.`ID` = 10 
	}	
}
else if($action == "removeEvent"){
	print_r($_POST);
	$ID = $_POST["mes"];
	$mysqli = new mysqli($dbhost, $dbuser,$dbpass, $dbname);
	$sql = "DELETE FROM `event` WHERE `event`.`ID` = $ID";
	$result = mysqli_query($mysqli, $sql);
	echo mysqli_error($mysqli);
	//DELETE FROM `event` WHERE `event`.`ID` = 2 
}

?>