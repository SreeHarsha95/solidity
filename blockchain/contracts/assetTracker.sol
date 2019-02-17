pragma solidity ^0.4.22;


contract assetTracker {
  // constructor() {
  // }
  
struct activity {
  bytes32 activityName;
  uint timestamp;
}

  struct asset{
    uint ownerID;
    uint AssetId;
    uint[] history;
    bytes32[] activityHistory;
  }

  
  mapping(uint=>asset) idToassetMapping;
  mapping(uint=>uint) ownerOfAsset;
  //modifier ownerOnly{if(msg.sender == idToassetMapping[Assetid].owner)_;else{ revert();}}
  function setAssetData(uint userID,uint Assetid,uint activityDate,bytes32 presentAct) public returns(bool){

    idToassetMapping[Assetid].ownerID = userID;
    idToassetMapping[Assetid].AssetId = Assetid;
    idToassetMapping[Assetid].history.push(activityDate);
    idToassetMapping[Assetid].activityHistory.push(presentAct);
    ownerOfAsset[Assetid] = userID;
    return true;
}

function getAssetData(uint Assetid) public view returns(uint owner,uint[] assetHistory,bytes32[] activityHistory){
  owner =  idToassetMapping[Assetid].ownerID;
  assetHistory =  idToassetMapping[Assetid].history;
  activityHistory =  idToassetMapping[Assetid].activityHistory;
}

function changeOwnership(uint newOwnerId,uint Assetid,uint activityDate,bytes32 presentAct) public returns(bool){
  idToassetMapping[Assetid].ownerID = newOwnerId;
  idToassetMapping[Assetid].history.push(activityDate);
  idToassetMapping[Assetid].activityHistory.push(presentAct);
  return true;
}

function addActivity(uint Assetid,bytes32 activityName,uint timestamp) public{
   idToassetMapping[Assetid].history.push(timestamp);
   idToassetMapping[Assetid].activityHistory.push(activityName);
}


}
