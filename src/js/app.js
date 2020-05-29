var defferredaPrompt ;
var enableNotifiaction = document.querySelectorAll('.enable-notifications');

if('serviceWorker' in navigator){
    navigator.serviceWorker
    .register('/sw.js')
    .then(function(){
        console.log("Service Worker rregistered")
    })
}

window.addEventListener('beforeinstallprompt',function(event){
    event.preventDefault();
    defferredaPrompt =event;
    return false;
})

function displayNotification(){
    if('serviceWorker' in navigator){
        var options={
            body:"Testing Notification.. SW.",
            icon:"/src/images/icons/app-icon-96x96.png",
            image:"/src/images/icons/app-icon-96x96.png",
            dir:'ltr',
            lang:'en-US',
            vibrate:[100,50,200],
            badge:"/src/images/icons/app-icon-96x96.png",
            tag:'confirm-notificaion',
            renotify:true,
            action:[
            {action:'confirm',title:'Okay',icon:"/src/images/icons/app-icon-96x96.png"},
            {action:'cancel',title:'Not Okay',icon:"/src/images/icons/app-icon-96x96.png"}
            ]
        }
        navigator.serviceWorker.ready
        .then(function(swReg){
            swReg.showNotification('Successfully Subscribed',options)
        })
    }
    // new Notification('Successfully Subscribed',options)
}
function askForNotification(){
    Notification.requestPermission(function(result){
        console.log("User Choic Result");
        if(result!=='granted'){
            console.log(" No Notification Granted")
        }else{
            displayNotification();
        }
    })
}


if('Notification' in window){
    for(var i=0;i<enableNotifiaction.length;i++){
        enableNotifiaction[i].style.display = "inline-block";
        enableNotifiaction[i].addEventListener('click',askForNotification)
    }
}


self.addEventListener('notificationclick',function(event){
    var Notification = even.Notification;
    var action = event.action;

    console.log("Notification ",Notification);
    if(action==='confirm'){
        console.log("Confirm was chosen");
        Notification.close();
    }else{
        console.log(action);
        Notification.close();

    }
})

self.addEventListener('notificationclose',function(event){
    console.log("Notification was close  ",event)
})
