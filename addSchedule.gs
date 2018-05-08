
function addSchedule(inpMsg){
  var TESTID = '';
  var PrivateCalendarId = '';
  var sheet = SpreadsheetApp.openById(TESTID).getSheets()[0];
  var vals = sheet.getDataRange().getValues();
  
  
  //[0]開始日時　[1]終了日時 [2]タイトル
  var eventInfo = getFormatArraySchedule(inpMsg);
  
  //テストの為にシート書き込み
  sheet.appendRow(eventInfo)
  //カレンダーに予定追加
  var calendar = CalendarApp.getCalendarById(PrivateCalendarId);
  calendar.createEvent(eventInfo[2], eventInfo[0], eventInfo[1]);
  
  return getReturnMessage(eventInfo);
  
}

function getFormatArraySchedule(inpMsg){
  
  //月指定があれば取得。ないなら今月
  if(inpMsg.indexOf('月') != -1){
    var M = inpMsg.slice(0,inpMsg.indexOf('月'))-1;
    inpMsg = inpMsg.slice(inpMsg.indexOf('月')+1);
  }else{
    var M= new Date().getMonth();
  }
  
  //日にち指定があれば取得ないなら今日
  if(inpMsg.indexOf('日') != -1){
    var d = inpMsg.slice(0,inpMsg.indexOf('日'));
    inpMsg = inpMsg.slice(inpMsg.indexOf('日')+1);
  }else{
    var d= new Date().getDate();
    
  }
  
  var h = inpMsg.slice(0,inpMsg.indexOf('時'));
  inpMsg = inpMsg.slice(inpMsg.indexOf('時')+1);
  
  
  if(inpMsg.indexOf('分') != -1){
    var m = inpMsg.slice(0,inpMsg.indexOf('分'));
    inpMsg = inpMsg.slice(inpMsg.indexOf('分')+1);
  }else{
    var m = 0;
  }
  
  
  inpMsg = inpMsg.slice(inpMsg.indexOf('から')+2);
  
  var eh = inpMsg.slice(0,inpMsg.indexOf('時'));
  inpMsg = inpMsg.slice(inpMsg.indexOf('時')+1);
  
  
  if(inpMsg.indexOf('分') != -1){
    var em = inpMsg.slice(0,inpMsg.indexOf('分'));
    inpMsg = inpMsg.slice(inpMsg.indexOf('分')+1);
  }else{
    var em = 0; 
  }
  
  
  //まで以降を取得
  var title = inpMsg.slice(inpMsg.indexOf('まで')+2);
  var date = new Date(2017,M,d,h,m);
  var endDate = new Date(2017,M,d,eh,em);
  return  [date,endDate,title];
  
}


  
  //[0]開始日時　[1]終了日時 [2]タイトル
function getReturnMessage(eventInfo){
  
  var msg =Utilities.formatDate(eventInfo[0], 'JST', 'M月d日HH:mmから');
  msg += Utilities.formatDate(eventInfo[1], 'JST', 'M月d日HH:mmまで');
  msg += eventInfo[2]+'で予定を追加しました';
  
  return msg;
  
}
