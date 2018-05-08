var CHANNEL_ACCESS_TOKEN = '';
var LSID = "";
function doPost(e) {
  var event = JSON.parse(e.postData.contents).events[0];
  var userId = event.source.userId;
  var reply_token= event.replyToken;
  var type = event.type;
  
  //新規フォローイベント
  if(type == "follow"){
    newRegist(userId);
    reply(reply_token,"登録ありがとうございます");
    return;
  }
  
  if (typeof reply_token === 'undefined') {
    return;
  }
  
  var moneySheet = getThisMonthFile(userId);
  
  //入力メッセージ
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  
  var message = '';
  if(userMessage.indexOf('から') != -1&&userMessage.indexOf('まで') != -1){
    message= addSchedule(userMessage);
  }else if(userMessage.indexOf('予定') != -1){
    message = getScheduleMessage(userMessage);
  }else if(userMessage.indexOf('遅延') != -1){
    var deleyMsg = getFetchDelayInfoMessage();
    if(deleyMsg){
      message = deleyMsg;
    }else{
      message = '遅延情報は特にありません'; 
    }
  }else if(userMessage.indexOf('天気') != -1){
    message = getWeatherMessage(userMessage);
  }else if(userMessage.indexOf('ってなに？') != -1 ){
    message = getWikiData(userMessage);
  }else{
    message = getManagementOfMoneyMessage(userMessage,moneySheet);
  }
  //返信
  reply(reply_token,message);
}


//今月分の家計簿シートを取得
function getThisMonthFile(userId){
  var userFolders = DriveApp.getFoldersByName(userId);
  var userfolder = userFolders.next();
  var files = userfolder.getFiles();
  var newFile = undefined;
  var newTime = 0;
  
  while(files.hasNext()){
    var file = files.next();
    if(newTime < file.getDateCreated().getTime()){
      newTime = file.getDateCreated().getTime();
      newFile = file;
    }
  }
  return SpreadsheetApp.openById(newFile.getId());
}




//リプライ送信用
function reply(reply_token,message){
  var url = 'https://api.line.me/v2/bot/message/reply';
  var option = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
    
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  };
  
  UrlFetchApp.fetch(url,option);
}



