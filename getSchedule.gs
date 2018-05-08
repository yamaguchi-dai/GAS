var PrivateCalendarId = '';//gmail


//引数textに応じて、スケジュールメッセージを返却
function getScheduleMessage(message){
  if(message == null){
    message = '';
  }
  if(message.indexOf('明日') != -1){
    return getTmorrowScheduleMessage();
    
    
  }else if(message.indexOf('今週') != -1){
    return getTargetPeriodScheduleMessage(7);
  }else if(message.indexOf('来週') != -1){
    return getTargetPeriodScheduleMessage(14);
  }else{
    return getTodayScheduleMessage();
  }
}

//今日の予定メッセージ取得
function getTodayScheduleMessage(){
  var targetDay = new Date();
  
  var privateCalendar = CalendarApp.getCalendarById(PrivateCalendarId);
  var privateEvents = privateCalendar.getEventsForDay(targetDay);
  
  var message = '';
  if(privateEvents.length){
    message +='今日の予定は\n\r';
    
    message = addFormatEvents(message,privateEvents)
    
    message += 'です！';
  }else{
    message =  '今日の予定はとくにありません！';
  }
  return message;
}

//明日の予定を取得
function getTmorrowScheduleMessage(){
  var today = new Date();
  var year = today.getYear();
  var month = today.getMonth();
  var date = today.getDate();
  var tommorow = new Date(year,month,date+1);
  
  var privateCalendar = CalendarApp.getCalendarById(PrivateCalendarId);
  var privateEvents = privateCalendar.getEventsForDay(tommorow);
  
  var message = '';
  if(privateEvents.length){
    message +='明日の予定は\n\r';
    
    message = addFormatEvents(message,privateEvents)
    
    message += 'です！';
  }else{
    message =  '明日の予定はとくにありません！';
  }
  return message;
}



//[イベント情報]を時刻を付けて整形して返す。
function addFormatEvents(message,events){
  for each(var event in events){
    if(event.isAllDayEvent()){
      message += '終日'+event.getTitle()+'\n\r';
    }else{
      var startTime = Utilities.formatDate(event.getStartTime(), 'JST', 'HH:mm')
      message += startTime+'から'+event.getTitle()+'\n\r';
    }
  }
  return message;
}




//指定日後までのスケジュールメッセージを取得
function getTargetPeriodScheduleMessage(addDay){
  var targetDay = new Date();
  var privateCalendar = CalendarApp.getCalendarById(PrivateCalendarId);
  var privateEvents = privateCalendar.getEvents(targetDay,getEndDate(addDay));
  
  var message = '';
  var day = null;
  
  for each (var event in privateEvents){
    //日付ごとにまとめる
    if(day != Utilities.formatDate(event.getStartTime(),'JST','d')){
      message +=  Utilities.formatDate(event.getStartTime(),'JST','d日')+'\n\r';
      day = Utilities.formatDate(event.getStartTime(),'JST','d');
    }
    
    
    if(event.isAllDayEvent()){
      message += '　終日'+event.getTitle()+'\n\r';
    }else{
      var startTime = Utilities.formatDate(event.getStartTime(), 'JST', 'HH:mm')
      message += '　'+startTime+':'+event.getTitle()+'\n\r';
    }
  }
  return message;
}


//引数日　後の23:59:59のDateを取得
function getEndDate(addDay){
  var targetDay = new Date();
  var year = targetDay.getYear();
  var month = targetDay.getMonth();
  var date = targetDay.getDate()+addDay;
  
  return new Date(year,month,date,23,59,59);
}





