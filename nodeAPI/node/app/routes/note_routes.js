const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const bodyParser = require('body-parser')
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



module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: true }));
    app.post('/asset', (req, res) => {
        var {user_id, asset_id,activity_date,present_activity} = req.body;
        contractInstance.setAssetData(user_id,asset_id,activity_date,present_activity,{from: web3.eth.accounts[0],gas:4700000});
        res.send({status:"success"});
    });

    app.get('/asset/:id', (req, res) => {
        var id = req.params.id;
        var assetData = contractInstance.getAssetData(id,{from:web3.eth.accounts[0],gas:4700000})
        var assetHistory = [];
        var activityHistory = [];
        console.log(assetData[1].length)
        for(var i =0 ; i < assetData[1].length;i++){
        assetHistory.push(assetData[1][i].toNumber());
        activityHistory.push((web3.toAscii(assetData[2][i])));
    }
    var assetObj = {
      owner : assetData[0],
      assetHistory : assetHistory,
      activityHistory : activityHistory
  }
          res.send(JSON.stringify(assetObj))
      });
  
  

    app.post('/activity', (req, res) => {
        const {asset_id, user_id, present_activity, activity_date} = req.body;
        contractInstance.addActivity(asset_id,present_activity,activity_date,{from: web3.eth.accounts[0],gas:4700000});
    });

    app.post('/changeOwner', (req, res) => {
        const {asset_id,owner_id,present_activity,activity_date} = req.body;
        contractInstance.changeOwnership(owner_id,asset_id,activity_date,present_activity,{from: web3.eth.accounts[0],gas:4700000});
    });
  }
