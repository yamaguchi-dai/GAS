function getFetchDelayInfoMessage(){
   //電車遅延情報をJSON形式で取得
  var json = JSON.parse(UrlFetchApp.fetch("https://rti-giken.jp/fhc/api/train_tetsudo/delay.json").getContentText());
  var delayInfo = [];
  var useStationNameList = ['半蔵門線','東上本線','丸ノ内線'];
  
   for each(var obj in json){
     for each(var stationName in useStationNameList){
       if(obj.name === stationName){
         delayInfo.push(obj.name);
       }
     }
  }
  
  var message;
  if(delayInfo.length){
    message = 'あ！';
    for each(var info in delayInfo){
     message += info 
    }
    message += 'で遅延しているみたいですよ！';
  }else{
    message = null;
  }
  
  return message;
}
