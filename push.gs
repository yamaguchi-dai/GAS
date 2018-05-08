var CHANNEL_ACCESS_TOKEN = '';
var LineId = '';
var DayList = ['日', '月', '火', '水', '木', '金', '土'];


function morningMessage(){
  var morningMessage = 
    'おはようございます。\n\r'+
    DayList[new Date().getDay()]+'曜日です！';
  push(morningMessage);
  
  //予定
  var scheduleMessage = getScheduleMessage();
  push(scheduleMessage);
  //天気
  var weatherMessage = getWeatherMessage();
  push(weatherMessage);
  //遅延
  var fetchDelayInfoMessage = getFetchDelayInfoMessage()
  //遅延情報があるなら通知
  if(fetchDelayInfoMessage){
    push(fetchDelayInfoMessage);
  }
  
}


//PUSHする
function push(text) {
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  
  var postData = {
    "to" : LineId,
    "messages" : [
      {
        'type':'text',
        'text':text,
      }
    ]
  };
  
  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };

  UrlFetchApp.fetch(url, options);  
}
