// controll all event form index.html
var account;
var events;

function loadPage(){ // do this when load page    
    //get the button ID
    console.log("run load page");
    var login;
    var identity;
    var logout;
    
    login = document.getElementById("Login");
    identity = document.getElementById("Identity");
    logout = document.getElementById("Logout");
    
    //moment.locale('zh-tw');     //***不能放在這裡!!***//
    
    console.log(identity);
    account = new Account();
    account.isLogin(function(fg){
        if (fg == ""){
            alert("尚未登入");
        }
        else{
            //alert("歡迎進入 EASY TO DO LIST!"); 
            login.style.display = "none";
            identity.style.display = "block";
            //console.log(fg);
            identity.innerHTML = fg;
            logout.style.display = "block";
            events = new Events;
            events.load(function(){ //*** do after login ***//
                update();
                //notiTime();
                //notiFirst();
                //subTime();
            });
        }
    });
    //nowTime();
    //immnoti();
}

function clickLogin(){ // do this when click login button 
    console.log("run clickLogin");
    //get the button ID
    var login;
    var identity;
    var logout;
    
    // get name and password
    var name;
    var password;
    
    login = document.getElementById("Login");
    identity = document.getElementById("Identity");
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
            identity.style.display = "block";
            identity.innerHTML = name;
            logout.style.display = "block";
            loadPage();
        }
    });
}
function clickLogout(){   
    //get the button ID
    var login;
    var identity;
    var logout;
    
    var empty_message = document.getElementById("empty-message");
    var todo_table = document.getElementById("todo-list-table");
    
    empty_message.removeAttribute("style");
    //console.log(events.arr.length);
    for (var i = 0; i < events.arr.length; i++){
        todo_table.rows[i + 1].style.display = "none";
    }
    login = document.getElementById("Login");
    identity = document.getElementById("Identity");
    logout = document.getElementById("Logout");

    login.style.display = "block";
    identity.style.display = "none";
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

//function update(){
//    var todo_table = document.getElementById("todo-list-table");
//    console.log("Is correct?");
//    // put new list
//    console.log(events.arr.length);
//	for(var i = 0; i < events.arr.length; i++){
//        console.log("Is correct?");
//		var singevent = events.arr[i];
//        var priority = singevent.obj.priority;
//        
//        var row = todo_table.insertRow(i+1);
//		var cell_id = row.insertCell(0);
//		var cell_title = row.insertCell(1);
//		var cell_priority = row.insertCell(2);
//        var cell_startTime = row.insertCell(3);
//		var cell_btn = row.insertCell(4);
//		
//        var empty_message = document.getElementById("empty-message");
//        
//        empty_message.style.display = "none";
//        
//		cell_id.innerHTML = i + 1;
//		cell_title.innerHTML = singevent.obj.title;
//        console.log(priority);
//        if (priority == 1){
//            cell_priority.innerHTML = "不重要";
//        }
//        else if (priority == 2){
//            cell_priority.innerHTML = "普通";
//        }
//        else if (priority == 3){
//            cell_priority.innerHTML = "重要";
//        }
//        console.log(singevent.obj.endTime);
//        cell_startTime.innerHTML = singevent.obj.endTime;
//		cell_btn.innerHTML = '<a href="#" class="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#editModal" onclick="">Edit</a>';
//		cell_btn.innerHTML += '<a href="#" class="btn btn-sm btn-outline-success" onclick="">Finish</a>';
//	}
//}

function update(){
    var todo_table = document.getElementById("todo-list-table");
    var ifnoti = [];
    var numnoti = 0;
    console.log("Is correct?");
    // put the new list
    //console.log(events.arr.length);
	for(var i = 0; i < events.arr.length; i++){
        //console.log("Is correct?");
		var singevent = events.arr[i];
        var priority = singevent.obj.priority;
        
//        判斷是否要提醒
        var nowtime = new Date();
        var notitime;
//        判斷是否要提醒
        
        var row;
		var cell_id;
		var cell_title;
		var cell_priority;
        var cell_startTime;
		var cell_btn;
        
        var empty_message = document.getElementById("empty-message");
        
//        判斷是否要提醒
        nowtime = nowtime.valueOf();
        notitime = new Date(singevent.obj.endTime);
        notitime = notitime.valueOf();
        notitime = notitime - 60 * 60 * 1000;
//        判斷是否要提醒
        
        if (nowtime >= notitime) {
            ifnoti[i] = 1;
            numnoti++;
            
            row = todo_table.insertRow(numnoti);
            //cell_id = row.insertCell(0);
            cell_title = row.insertCell(0);
            cell_priority = row.insertCell(1);
            cell_startTime = row.insertCell(2);
            cell_btn = row.insertCell(3);
            
            //cell_id.innerHTML = i + 1;
            cell_title.innerHTML = singevent.obj.title;
            //console.log(priority);
            if (priority == 1){
                cell_priority.innerHTML = "不重要";
            }
            else if (priority == 2){
                cell_priority.innerHTML = "普通";
            }
            else if (priority == 3){
                cell_priority.innerHTML = "重要";
            }
            //console.log(singevent.obj.endTime);
            cell_startTime.innerHTML = moment(new Date(singevent.obj.startTime)).fromNow();
            cell_btn.innerHTML = '<a href="#" class="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#editModal" onclick="">Edit</a>';
            cell_btn.innerHTML += '<a href="#" class="btn btn-sm btn-outline-success" onclick="">Finish</a>';

            empty_message.style.display = "none";
        }
        else{
            ifnoti[i] = 0;
        }
	}
    for (var j = 0; j < events.arr.length; j++){
        var singevent = events.arr[j];
        var priority = singevent.obj.priority;
        
        var row;
        var cell_id;
        var cell_title;
        var cell_priority;
        var cell_startTime;
        var cell_btn;

        var empty_message = document.getElementById("empty-message");
        
        if (ifnoti[j] == 0){
            numnoti++;
            
            row = todo_table.insertRow(numnoti);
            //cell_id = row.insertCell(0);
            cell_title = row.insertCell(0);
            cell_priority = row.insertCell(1);
            cell_startTime = row.insertCell(2);
            cell_btn = row.insertCell(3);
            
            //cell_id.innerHTML = j + 1;
            cell_title.innerHTML = singevent.obj.title;
            //console.log(priority);
            if (priority == 1){
                cell_priority.innerHTML = "不重要";
            }
            else if (priority == 2){
                cell_priority.innerHTML = "普通";
            }
            else if (priority == 3){
                cell_priority.innerHTML = "重要";
            }
            //console.log(singevent.obj.endTime);
            cell_startTime.innerHTML = moment(new Date(singevent.obj.startTime)).fromNow();
            cell_btn.innerHTML = '<a href="#" class="btn btn-sm btn-outline-primary" data-toggle="modal" data-target="#editModal" onclick="">Edit</a>';
            cell_btn.innerHTML += '<a href="#" class="btn btn-sm btn-outline-success" onclick="">Finish</a>';

            empty_message.style.display = "none";
        }
    }
}

//function immnoti(){
//    console.log(ifnoti[1]);
//	for(var i = 0; i < events.arr.length; i++){
//        console.log(ifnoti[i]);
//		var singevent = events.arr[i];
//
////        判斷是否要提醒
//        var nowtime = new Date();
//        var notitime;
////        判斷是否要提醒
//        
////        判斷是否要提醒
//        nowtime = nowtime.valueOf();
//        notitime = new Date(singevent.obj.endTime);
//        notitime = notitime.valueOf();
//        notitime = notitime - 60 * 60 * 1000;
////        判斷是否要提醒
//
//        console.log(ifnoti[i]);
//        if (nowtime >= notitime && ifnoti[i] == 1) {
//            //console.log("Is correct?");
//            update();
//            ifnoti[i] = 1;
//            //console.log("Is correct?");
//        }
//    }
//    //setTimeout(immnoti(), 1000);
//}
// for datetime picker
    $(function() {
        $('.mydate').datetimepicker({
            "dateFormat": "yy-mm-dd",
            "timeFormat": "HH:mm"
        });
        //$('#mydate').timepicker({"timeFormat": "HH:mm"}); //只有 時、分、秒 用 timepicker
    });