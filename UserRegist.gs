var MSID = "";
function newRegist(userId){
  var userRootFolder = DriveApp.getFolderById("");
  var userFolders = userRootFolder.getFolders();
  
  var isFolder = false
  
  while(userFolders.hasNext()){
    var folder = userFolders.next();
    if(folder.getName() == userId){
      isFolder = true;
    }
  }
  
  //すでに登録済みのユーザーなら終了
  if(isFolder){
    return;
  }
  
  var userFolder = userRootFolder.createFolder(userId);
  var fomatStringDate = Utilities.formatDate( new Date(), 'Asia/Tokyo', 'yyyyMM');
  DriveApp.getFileById(MSID).makeCopy(fomatStringDate, userFolder)
  
  
}





