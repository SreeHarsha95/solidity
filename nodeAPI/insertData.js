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

  var instance = web3.eth.contract(contractABI).at(contractAddress);

  var date = new Date();
  date.setDate(10);
var DateInUnixTimestamp = date / 1000;
var res = instance.setAssetData.call(4,101,DateInUnixTimestamp,"ownership",{from: web3.eth.accounts[0],gas:4700000});
instance.setAssetData(4,101,DateInUnixTimestamp,"ownership",{from: web3.eth.accounts[0],gas:4700000});
 
console.log(res)
//instance.changeOwnership(2,101,DateInUnixTimestamp,"ownership",{from: web3.eth.accounts[0],gas:4700000});
  var date1 = new Date();
  date1.setDate(15);
var DateInUnixTimestamp1 = date1 / 1000;

 // instance.addActivity(101,"maintenance",DateInUnixTimestamp1,{from: web3.eth.accounts[0],gas:4700000})
 var res = instance.getAssetData.call(101);

//   console.log(res[0].toNumber());

//  var validatedDate = res[1];
// var dates = new Date(validatedDate * 1000);
// console.log(dates)

// console.log(web3.toAscii(res[2][0]))

console.log(res[1].length)
console.log(res[0].toNumber())
console.log(web3.toAscii(res[2][0]))
console.log(web3.toAscii(res[2][1]))
