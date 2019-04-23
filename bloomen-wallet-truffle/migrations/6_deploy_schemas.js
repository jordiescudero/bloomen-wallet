
var RLPReader = artifacts.require("../node_modules/solidity-rlp/contracts/RLPReader.sol");
var Schemas = artifacts.require("./bloomen/Schemas");

module.exports = function(deployer) {
    deployer
    .then(() => deployer.link(RLPReader, Schemas))
    .then(() => {
        return deployer.deploy(Schemas);
      });
    
 };
