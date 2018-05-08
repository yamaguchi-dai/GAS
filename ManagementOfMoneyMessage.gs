function getManagementOfMoneyMessage(userMessage,Spreadsheet) {
  var mainSheet = Spreadsheet.getSheetByName('main');
  var sumSheet = Spreadsheet.getSheetByName('sum');
  
  //合計と入力されたなら合計金額を表示
  if(userMessage=='合計'){
    var message = getSum(sumSheet);
  //ヘルプが入力されたらヘルプを表示
  }else if(userMessage == 'help'||userMessage=='へるぷ'||userMessage=='ヘルプ'){
    var message = getHelpMessage(sumSheet);
  }else{
    var message = writeSheet(mainSheet,sumSheet,userMessage);
  }
  return message;
}


function writeSheet(sheet,sumSheet,message){
  var values = sheet.getDataRange().getValues();
  //今ある最後の行
  var lastRow = values.length;
  var lastRowValues = values[lastRow-1];
  
  
  //品名登録か金額登録か
  if(lastRowValues[2].length != 0){
    if(isRegisteredCategoryItems(message,sumSheet)){
      sheet.appendRow([new Date(),message]);
      return message+'の金額を入力してください';
    }else{
      return message+'は対象カテゴリではありません（ヘルプ）';
    }
  }else{
    if(message == '削除'){
      sheet.deleteRow(lastRow);
      return 'さくじょったぜ';
    }
    
    if(isNaN(message)){
      //数値以外なら数値を入力しろっていう
      return sheet.getRange(lastRow, 1).getValue()+'の金額を入力してください';
    }
    
    sheet.getRange(lastRow, 3).setValue(message);
    return '記入しておきました';
  }
 
}


//明細出力
function getSum(sheet){ 
  var values = sheet.getDataRange().getValues();
  var returnMsg = values[0][0]+':'+values[0][1]+'円\n\r';
  returnMsg += '内訳\n\r';
  values.shift();
  for each(var value in values){
    returnMsg += value[0]+':'+value[1]+'円\n\r';
  }
  return returnMsg;
}


//ヘルプメッセージ
function getHelpMessage(sumSheet){
  return　'ヘルプ\n\r'+
  '入力キーワード\n\r'+
  '合計:合計金額を表示\n\r'+
  '削除:金額入力前なら削除が可能\n\r'+
  '入力可能カテゴリ：'+getCategoryNameList(sumSheet);
  
}

//対象カテゴリか、否か
function isRegisteredCategoryItems(targetItem,sumSheet){
  for each(var category in getCategoryNameList(sumSheet)){
    if(category == targetItem){
      return true;
    }
  }
  return false;
}

//カテゴリ名取得
function getCategoryNameList(sheet){
  var values = sheet.getDataRange().getValues();
  //合計を削除
  values.shift();
  var categoryNameList = [];
  for each(var val in values){
   categoryNameList.push(val[0]); 
  }
  return categoryNameList;
}


