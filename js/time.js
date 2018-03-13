var notiEvent = [];
var nonNotiEvent = [];

function nowTime(){
    document.getElementById("nowTime").innerHTML = new Date();
    setTimeout("nowTime()", 1000);
}

function notiTime(){
    var notitime;
    
    console.log(events.arr[0].obj.endTime);
    notitime = events.arr[0].obj.endTime;
    document.getElementById("notiTime").innerHTML = notitime.substr(0, 11);
}

function notiFirst(){
    var nowtime = new Date();
    var notitime;
    
//    var notiEvent[];
//    var nonNotiEvent[];
    
    nowtime = nowtime.valueOf();
    //nowtime = Date(nowtime);
    //console.log(nowtime);
    for (var i = 0, j = 0, k = 0; i < events.arr.length; i++){
        var singevent = events.arr[i];
        
        notitime = new Date(singevent.obj.endTime);
        notitime = notitime.valueOf();
        notitime = notitime - 60 * 60 * 1000;
        //notitime = new Date(notitime);
        //notitime = notitime.valueOf();
        //console.log(nowtime);
        //console.log(notitime);
        if (nowtime <= notitime){
            console.log("Need notify.");
            notiEvent[++j] = events.arr[i];
        }
        else{
            console.log("Need not notify.")
            nonNotiEvent[++k] = events.arr[i];
        }
    }
    //setTimeout("notiFirst()", 1000);
}

function subTime(){
    var time1 = new Date(events.arr[0].obj.endTime);
    var time2 = new Date(events.arr[1].obj.endTime);
    var subtime;
    
    console.log(moment(time1).fromNow());
    console.log(time1);
    console.log(time2);
    time1 = time1.valueOf();
    time2 = time2.valueOf();
    subtime = time2 - time1;
    console.log(time1);
    console.log(time2);
    console.log(subtime);
    subtime = new Date(subtime);
    console.log(subtime);
}