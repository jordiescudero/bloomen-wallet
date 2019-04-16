require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");

var Web3 = require('web3');

module.exports = {

  networks: {
    development: {
      provider: () =>{ 
        return new HDWalletProvider(process.env.DEVELOPMENT_MNEMONIC, "http://"+process.env.DEVELOPMENT_HOST+":"+ process.env.DEVELOPMENT_PORT);     
      },
      gasPrice: 0,     
      type: "quorum",
      network_id: '*'     
    }
  },
  compilers: {
    solc: {
      version: '0.5.7',
    },
  }
};
