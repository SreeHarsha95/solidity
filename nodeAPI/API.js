const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contractABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "userID",
          "type": "uint256"
        },
        {
          "name": "Assetid",
          "type": "uint256"
        },
        {
          "name": "activityDate",
          "type": "uint256"
        },
        {
          "name": "presentAct",
          "type": "bytes32"
        }
      ],
      "name": "setAssetData",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "Assetid",
          "type": "uint256"
        }
      ],
      "name": "getAssetData",
      "outputs": [
        {
          "name": "owner",
          "type": "uint256"
        },
        {
          "name": "assetHistory",
          "type": "uint256[]"
        },
        {
          "name": "activityHistory",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwnerId",
          "type": "uint256"
        },
        {
          "name": "Assetid",
          "type": "uint256"
        },
        {
          "name": "activityDate",
          "type": "uint256"
        },
        {
          "name": "presentAct",
          "type": "bytes32"
        }
      ],
      "name": "changeOwnership",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "Assetid",
          "type": "uint256"
        },
        {
          "name": "activityName",
          "type": "bytes32"
        },
        {
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "addActivity",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
]

  var contractAddress ='0x21f0e23baeba9f96849bb959d862c14b3343d2e1'

contractInstance = web3.eth.contract(contractABI).at(contractAddress);

//get data about the history
var assetData = contractInstance.getAssetData(101,{from:web3.eth.accounts[0],gas:4700000})
var assetHistory = [];
var activityHistory = [];
console.log(assetData[1].length)
for(var i =0 ; i < assetData[1].length;i++){
    assetHistory.push(assetData[1][i].toNumber());
    activityHistory.push((web3.toAscii(assetData[2][i])));
    // activityHistoryString[i] = activityHistory[i].split("\\")[0];
    // console.log(activityHistory[i].split("\\"))
}
var assetObj = {
    owner : assetData[0],
    assetHistory : assetHistory,
    activityHistory : activityHistory
}



//set the data to blockchain