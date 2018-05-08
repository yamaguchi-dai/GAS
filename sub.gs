var CHANNEL_ACCESS_TOKEN = '';


function getUserName(userId){
  var url = 'https://api.line.me/v2/bot/profile/'+userId;
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  
  var options = {
    "method" : "get",
    "headers" : headers,
  };
  
  var returnObject = UrlFetchApp.fetch(url, options);  
  return JSON.parse(returnObject).displayName;
}



//PUSHする
function rerararearew(text) {
  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  
  var postData = {
    "to" : '',
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



function ttttttrrrr(){
  var message = '農林';
  
  var url = 'https://api.a3rt.recruit-tech.co.jp/text_classification/v1/classify';
  var sendData = {
    apikey:'vAIbhUJ7fELX7tJfXrVTKE66Ch4ZbJfl',
    model_id:'default',
    text:message
  }
  
   var options = {
    'method' : 'post',
    'payload' : sendData
  }
  var resultData = UrlFetchApp.fetch(url,options);
  var rep = JSON.parse(resultData);
  Logger.log(rep);
  /*ここまで*/ 
}




/*
 var postData  = {
    'to': IDIDIDIDIDIIDIDII,
    'messages':[
      {
        "type": "template",
        "altText": "this is a confirm template",
        "template": {
          "type": "confirm",
          "text": "Are you sure?",
          "actions": [
            {
              "type": "message",
              "label": "Yes",
              "text": "yes"
            },
            {
              "type": "message",
              "label": "No",
              "text": "no"
            }
          ]
        }
      }
      ]
  };

*/
