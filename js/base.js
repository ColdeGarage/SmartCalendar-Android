// controll all event form index.html
var account;
var events;
var file;

moment.locale('zh-tw'); 

function loadPage(){  // do this when load page    
    //get the button ID
    console.log("run load page");
    var login;
    var identity;
    var logout;
    
    var Edit = document.getElementById("Edit");
    
    login = document.getElementById("login-btn");
    identity = document.getElementById("Identity");
    logout = document.getElementById("Logout");    
    
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
            Edit.style.display = "block";
            events = new Events;
            events.load(function(){ //*** do after login ***//
                update();
                setInterval(update,1000);
                $('#startTime').val(moment().format("YYYY-MM-DD HH:mm"));
				$('#notiTime').val(moment().format("YYYY-MM-DD HH:mm"));
                //notiTime();
                //notiFirst();
                //subTime();
            });
        }
    });
    //nowTime();
    //immnoti();
}

function homePage(){     //點選標題進入原首頁畫面
    var input = document.getElementById("input");
    var calendar = document.getElementById("calendar");
    
    input.style.display = "none";
    calendar.style.display = "block";
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
    
    var Edit = document.getElementById("Edit");
    
    loginBtn = document.getElementById("login-btn");
    accountBtn = document.getElementById("account-btn");

    name = document.getElementById("modal-account").value;
    password = document.getElementById("modal-password").value;
    
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
            loginBtn.style.display = "none";
            accountBtn.style.display = "block";
            accountBtn.innerHTML = name;
            loadPage();
        }
    });
}

function clickLogout(){  //do this when click logout button
    //get the button ID
    var login;
    var identity;
    var logout;
    
    // var empty_message = document.getElementById("empty-message");
    // var todo_table = document.getElementById("todo-list-table");
    
    // var input = document.getElementById("input");
    // var calendar = document.getElementById("calendar");
    
    // var Edit = document.getElementById("Edit");
    
    empty_message.removeAttribute("style");
    //console.log(events.arr.length);
    for (var i = 0; i < events.arr.length; i++){
        todo_table.rows[i + 1].style.display = "none";
    }

    // change header
    loginBtn = document.getElementById("login-btn");
    accountBtn = document.getElementById("account-btn");
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
    
    // input.style.display = "none";
    // calendar.style.display = "block";
    
    // Edit.style.display = "none";
    
    account.logout(function(){
        events = "undefined";
    });
}

function clickAddTodo(){     //按下新增按鈕進入編輯畫面
    var title = document.getElementById("title");
    var categoryID = document.getElementById("categoryID");
    var priority = document.getElementsByName("priority");
    var startTime = document.getElementById("startTime");
    var spinner1 = document.getElementById("spinner1");
    var spinner2 = document.getElementById("spinner2");
    var content = document.getElementById("content");
    
    var btn_Add = document.getElementById("btn_Add");
    var btn_Edit = document.getElementById("btn_Edit");
    
    var input = document.getElementById("input");
    var calendar = document.getElementById("calendar");
    
    title.value = " ";
    categoryID.value = " ";
    priority[1].checked = 1;
    //startTime.value = " ";
    spinner1.value = "1";
    spinner2.value = "0";
    content.value = " ";
    
    btn_Add.style.display = "block";
    btn_Edit.style.display = "none";
    
    input.style.display = "block";
    calendar.style.display = "none";
}

function clickAddNewTodo(){     //傳入並顯示新增代辦選項
    var title = document.getElementById("title").value;
    var categoryID = document.getElementById("categoryID").value;
    var priority = document.getElementsByName("priority");
    var importance;
    var startTime = document.getElementById("startTime").value;
    var start;
    var notiDay = document.getElementById("spinner1").value;
	var notiHour = document.getElementById("spinner2").value;
    //var notiTime = document.getElementById("notiTime").value;
    var content = document.getElementById("content").value;
    
    if (priority[0].checked){
        importance = 3;
    }
    else if (priority[1].checked){
        importance = 2;
    }
    else if (priority[2].checked){
        importance = 1;
    }
    
    //console.log(title + categoryID + importance+ startTime + notiTime + content);
    file = new Event();
    file.obj.title = title;
    file.obj.categoryID = categoryID;
    file.obj.priority = importance;
    file.obj.startTime = startTime;
    
    console.log(startTime);
    start = new Date(startTime);
    console.log(start);
    var notiTime = moment(start).subtract(notiDay,'days').subtract(notiHour,'hours');
    console.log(notiTime);
    file.obj.notiTime = notiTime;
    file.obj.content = content;
    
    file.save(function(){
        events.load(function(){}); 
    });
    console.log(file.obj.title);
}

function clickEditTodo(index){     //修改代辦選項
    //console.log(ID);
    var title = document.getElementById("title");
    var categoryID = document.getElementById("categoryID");
    var priority = document.getElementsByName("priority");
    var startTime = document.getElementById("startTime");
    var start;
    var spinner1 = document.getElementById("spinner1");
    var spinner2 = document.getElementById("spinner2");
    var noti;
    var content = document.getElementById("content");
    var remIndex = document.getElementById("index");
    
    var btn_Add = document.getElementById("btn_Add");
    var btn_Edit = document.getElementById("btn_Edit");
    
    var input = document.getElementById("input");
    var calendar = document.getElementById("calendar");
    
    singevent = events.arr[index];
    title.value = singevent.obj.title;
    categoryID.value = singevent.obj.categoryID;
    if (singevent.obj.priority == 3){
        priority[0].checked = 1;
    }
    else if (singevent.obj.priority == 2){
        priority[1].checked = 1;
    }
    else if (singevent.obj.priority == 1){
        priority[2].checked = 1;
    }
    startTime.value = singevent.obj.startTime;
    start = new Date(singevent.obj.startTime);
    noti = new Date(singevent.obj.notiTime);
    spinner1.value = moment(start).subtract(noti).format("DD");
    spinner2.value = moment(start).subtract(noti).format("HH");
    //notiTime.value = singevent.obj.notiTime;
    content.value = singevent.obj.content;
    remIndex.value = index;

    btn_Add.style.display = "none";
    btn_Edit.style.display = "block";
    
    input.style.display = "block";
    calendar.style.display = "none";
}

function clickAddEditedTodo(){     //傳入並顯示修改代辦選項
    var title = document.getElementById("title").value;
    var categoryID = document.getElementById("categoryID").value;
    var priority = document.getElementsByName("priority");
    var startTime = document.getElementById("startTime").value;
    var notiDay = document.getElementById("spinner1").value;
	var notiHour = document.getElementById("spinner2").value;
    var content = document.getElementById("content").value;
    var remIndex = document.getElementById("index").value;
    
    var file = events.arr[remIndex];
    
    file.obj.title = title;
    file.obj.categoryID = categoryID;
    if (priority[0].checked){
        file.obj.priority = 3;
    }
    else if (priority[1].checked){
        file.obj.priority = 2;
    }
    else if (priority[2].checked){
        file.obj.priority = 1;
    }
    file.obj.startTime = startTime;
    var notiTime = moment(startTime).subtract(notiDay,'days').subtract(notiHour,'hours');
    console.log(notiTime);
    file.obj.notiTime = notiTime;
    file.obj.content = content;
    
    file.save(function(){
        events.load(function(){}); 
    });
}

function clickDeleteTodo(index){
    events.arr[index].remove(function(){
		events.arr.splice(index,1);
        events.load(function(){});
	});
}

function update(){
	var todo_table = document.getElementById("todo-list-table");
	var empty_message = document.getElementById("empty-message");	
	// clear the table
	if(events.arr.length == 0){
		if(todo_table.rows.length==3){
			todo_table.deleteRow(1);
		}
		empty_message.removeAttribute("style");
		return;
	}
	var table_length = todo_table.rows.length;
	for(var i=1; i<table_length-1; i++){
		todo_table.deleteRow(1);
	}	
	
	// 把要提醒的抓上來
	var ifnoti = [];
	var numnoti = 0;
	
	for(var i = 0; i < events.arr.length; i++){		
		var evt = events.arr[i];		
		// Is in notiTime
        var nowtime = new Date();
        var notitime = new Date(evt.obj.notiTime);
		nowtime = nowtime.valueOf();
		notitime = notitime.valueOf();
		
		if (nowtime >= notitime) {
            ifnoti[i] = 1;
            numnoti++;
			putEvent(evt,i,numnoti,1);
		}
		else{
			ifnoti[i] = 0;
		}
	}
	for (var i = 0; i < events.arr.length; i++){
		var evt = events.arr[i];
        if (ifnoti[i] == 0){
			numnoti++;
			putEvent(evt,i,numnoti,0);
		}
	}
    //console.log("Is updating?");
}

function putEvent(evt,index,offset,isnoti){ // 把 event 放在 table上

	var todo_table = document.getElementById("todo-list-table");
	var empty_message = document.getElementById("empty-message");
	
	row = todo_table.insertRow(offset);
    
    if(isnoti==1){
		row.style.backgroundColor = "#ffe944";
	}
	cell_title = row.insertCell(0);
	cell_priority = row.insertCell(1);
	cell_startTime = row.insertCell(2);
	cell_btn = row.insertCell(3);
	
	cell_title.innerHTML = evt.obj.title;
	//console.log(evt.obj.priority);
	if (evt.obj.priority == 1){
		cell_priority.innerHTML = "不重要";
	}
	else if (evt.obj.priority == 2){
		cell_priority.innerHTML = "普通";
	}
	else if (evt.obj.priority == 3){
		cell_priority.innerHTML = "重要";
	}

	cell_startTime.innerHTML = moment(new Date(evt.obj.startTime)).fromNow();
	cell_btn.innerHTML 
        = '<a href="#" class="btn btn-sm btn-outline-primary" onclick="clickEditTodo('+ index +')">Edit</a>';
	cell_btn.innerHTML 
        += '<a href="#" class="btn btn-sm btn-outline-success" onclick="clickDeleteTodo('+ index +')">Finish</a>';
	empty_message.style.display = "none";
    //console.log("Is updating?");
}

// for datetime picker
// for datetime picker
    $(function() {
        $('#startTime').datetimepicker({
            "dateFormat": "yy-mm-dd",
            "timeFormat": "HH:mm"
        });
        // $('.mydate').timepicker({"timeFormat": "HH:mm"}); //只有 時、分、秒 用 timepicker
    });
    $(function() {
        $('#notiTime').datetimepicker({
            "dateFormat": "yy-mm-dd",
            "timeFormat": "HH:mm"
        });
        // $('.mydate').timepicker({"timeFormat": "HH:mm"}); //只有 時、分、秒 用 timepicker
    });	
	// for spiner
  $( function() {
    var spinner = $( "#spinner1" ).spinner({
		min: 0
	});
	var spinner = $( "#spinner2" ).spinner({
		min: 0,
		max: 24
	});
  } );