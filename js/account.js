function Account(){
	// account name
	this.name = "";
	
	// login account retrun flag	
	this.login = function(name,password,callback){
		var account = this;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//console.log(this.responseText);
				if(this.responseText==1){ // if login is success
					console.log("success");
					account.name = name;
				}
				callback(this.responseText);
			}
		}
		xhttp.open("POST", "./php/account.php?action=login", true);
		var obj = { "name":name, "password":password};
		
		xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhttp.send("mes=" + JSON.stringify(obj)); 	
	}
	
	// is account login ? 順便set name，return name
	this.isLogin = function(callback){
		var account = this;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				account.name = this.responseText;
				callback(this.responseText);
			}
		}
		xhttp.open("POST", "./php/account.php?action=isLogin", true);
		xhttp.send();
	}
	
	// logout account
	this.logout = function(callback){
		var xhttp = new XMLHttpRequest();
		this.name = "";
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				callback();
			}
		}
		xhttp.open("GET", "./php/account.php?action=logout", true);
		xhttp.send();
	}

}