// controll all event form index.html
var account;
var events;

function loadPage(){ // do this when load page    
    //get the button ID
    console.log("run load page");
    var login;
    var logout; 
    
    login = document.getElementById("Login");
    logout = document.getElementById("Logout");
    
    account = new Account();
    account.isLogin(function(fg){
        if (fg == ""){
            alert("尚未登入");
        }
        else{
            //alert("歡迎進入 EASY TO DO LIST!");
            login.style.display = "none";
            logout.style.display = "block";
            events = new Events;
            events.load(function(){
                update();
            });
        }
    });
    nowTime();
}

function clickLogin(){ // do this when click login button 
    console.log("run clickLogin");
    //get the button ID
    var login;
    var logout;
    
    // get name and password
    var name;
    var password;
    
    login = document.getElementById("Login");
    logout = document.getElementById("Logout");

    name = document.getElementById("acc").value;
    password = document.getElementById("pas").value;

    //ask the server
    // do after receiving status
    account.login(name, password, function(fg){
        //alert("Welcome to do list.");
        if (fg == -2){
            alert("無此帳號");
        }
        else if (fg == -1){
            alert("密碼錯誤");
        }
        else if (fg == 1){
            //alert("歡迎進入 EASY TO DO LIST!");
            login.style.display = "none";
            logout.style.display = "block";
            loadPage();
        }
    });
}
function clickLogout(){   
    //get the button ID
    var login;
    var logout;
    
    var empty_message = document.getElementById("empty-message");
    var todo_table = document.getElementById("todo-list-table");
    
    empty_message.removeAttribute("style");
    for (var i = 0; i < events.arr.length; i++){
        todo_table.rows[i + 1].style.display = "none";
    }
    login = document.getElementById("Login");
    logout = document.getElementById("Logout");

    login.style.display = "block";
    logout.style.display = "none";
    
    account.logout();
}

function clickAddTodo(){
    
}

function clickEditTodo(ID){
    
}

function clickFinishTodo(ID){
    
}

function clickDeleteTodo(ID){
    
}

function update(){
    var todo_table = document.getElementById("todo-list-table");
    console.log("Is correct?");
    // put new list
    console.log(events.arr.length);
	for(var i = 0; i < events.arr.length; i++){
		var sigevent = events.arr[i];
        var priority = sigevent.obj.priority;
        
        var row = todo_table.insertRow(i+1);
		var cell_id = row.insertCell(0);
		var cell_title = row.insertCell(1);
		var cell_priority = row.insertCell(2);
        var cell_startTime = row.insertCell(3);
		var cell_btn = row.insertCell(4);
		
        var empty_message = document.getElementById("empty-message");
        
        empty_message.style.display = "none";
        
		cell_id.innerHTML = i + 1;
		cell_title.innerHTML = sigevent.obj.title;
        console.log(priority);
        if (priority == 1){
            cell_priority.innerHTML = "不重要";
        }
        else if (priority == 2){
            cell_priority.innerHTML = "普通";
        }
        else if (priority == 3){
            cell_priority.innerHTML = "重要";
        }
        console.log(sigevent.obj.endTime);
        cell_startTime.innerHTML = sigevent.obj.endTime;
		cell_btn.innerHTML = '<a href="#" class="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#editModal" onclick="">Edit</a>';
		cell_btn.innerHTML += '<a href="#" class="btn btn-sm btn-outline-success" onclick="">Finish</a>';
	}
}

// for datetime picker
    $(function() {
        $('.mydate').datetimepicker({
            "dateFormat": "yy-mm-dd",
            "timeFormat": "HH:mm"
        });
        //$('#mydate').timepicker({"timeFormat": "HH:mm"}); //只有 時、分、秒 用 timepicker
    });
