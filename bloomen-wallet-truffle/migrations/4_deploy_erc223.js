var SafeMath = artifacts.require("../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol");
var Address = artifacts.require("../node_modules/openzeppelin-solidity/contracts/utils/Address.sol");
var MovementHistory = artifacts.require("./bloomen/token/MovementHistory.sol");
var ERC223 = artifacts.require("./bloomen/token/ERC223");

 module.exports = function(deployer) {     
     deployer
     .then(() => deployer.link(SafeMath, ERC223))
     .then(() => deployer.link(Address, ERC223))
     .then(() =>MovementHistory.deployed())
     .then( (instance) => {        
        return deployer.deploy(ERC223,"BloomenCoin","BLO",0,instance.address);
      });
     
 };
