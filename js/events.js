function Event(){ // one event
	this.obj = new Object();
	this.obj.ID = 0;
	this.obj.accountID = 0;
	this.obj.title = "";
	this.obj.emoji = "";
	this.obj.notiTime = moment().format('YYYY-MM-DD hh:mm:ss');
	this.obj.startTime = moment().format('YYYY-MM-DD hh:mm:ss');
	this.obj.priority = 0;
	this.obj.content = "";
	this.obj.categoryID = 0;
	
	this.save = function(callback){ // 把event存回資料庫，如果ID=0或是還沒set，代表是新的event
		// Jorden 
		console.log("run save event");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log("receive "+this.responseText+"from saveEvent");
				callback();
			}
		}
		xhttp.open("POST", "./php/events.php?action=saveEvent", true);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("mes=" + JSON.stringify(this.obj)); 
	}
	this.remove = function(callback){ // 把event從資料庫刪掉
		// Jorden 
		console.log("run event remove");
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.log("receive "+this.responseText+"from removeEvent");
				callback();
			}
		}
		xhttp.open("POST", "./php/events.php?action=removeEvent", true);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("mes=" + JSON.stringify(this.obj.ID)); 	
		
		
		// clear all obj;
		this.obj = new Object();
		this.obj.ID = 0;
		this.obj.accountID = 0;
		this.obj.title = "";
		this.obj.emoji = "";
		this.obj.notiTime = moment().format('YYYY-MM-DD hh:mm:ss');
		this.obj.startTime = moment().format('YYYY-MM-DD hh:mm:ss');
		this.obj.priority = 0;
		this.obj.content = "";
		this.obj.categoryID = 0;
	}
}

// events.load(){}
// events.show(){}

// // 當我案新增的時候
// newEvent = new Event();
// ... getElementById
// newEvent.set();
// newEvent.save();
// events.arr += newEvent;
// eventsUpadate(){}

function Events(){ // many event
	this.arr = [];
	
	// this function change arr return error
	this.load = function(callback){
		console.log("run events.load");
		var events = this;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status==200) {
				// 收到 json 後存入
				console.log("receive "+this.responseText+" from loadEvents");
				var arr;
				arr = JSON.parse(this.responseText);
				//console.log(arr);
				// put arr.object to events.event
				for(var i=0; i<arr.length;i++){
					var newevent = new Event();
					newevent.obj = arr[i];
					events.arr[i] = newevent;
				}
				//console.log(events.arr);
				callback();
			}	
		}
		
		xhttp.open("GET", "./php/events.php?action=loadEvents", true);
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send();
	}
	
	this.update = function(){ //把所有資料放到上面
		// todo
	}
	this.add = function(evt){ //加入一個event
		// todo
	}
}