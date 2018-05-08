
function getWikiData(keyword) {
  
  keyword = keyword.slice(0,keyword.indexOf('ってなに'));
  
  Logger.log(keyword);
  var url = "http://wikipedia.simpleapi.net/api?keyword="+ keyword +"&output=json";
  // JSONデータを取得
  var json = UrlFetchApp.fetch(url).getContentText();
  var jsonData = JSON.parse(json);
  
  if(jsonData == null||jsonData[0] == null||jsonData[0]["body"] == null){
    var ary = ['うーんちょっとわかりませんね、、、',
               'ごめんなさいわからないです、',
               'そんなことしりません！！',
               '自分で調べてください！',
               '教えてあげません！'];
    var random = ary[Math.floor(Math.random() * ary.length)];
    
    
    return random;
  }else{
    return jsonData[0]["body"]+'\n\rっだそうです～';
  }
  
}
