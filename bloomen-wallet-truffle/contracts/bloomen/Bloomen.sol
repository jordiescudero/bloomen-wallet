pragma solidity ^0.5.2;

import "../../node_modules/openzeppelin-solidity/contracts/access/roles/WhitelistedRole.sol";

contract Bloomen is WhitelistedRole{

  address[] private _dapps;

  function addDapp(address _dappAddress) onlyWhitelistAdmin public {
    _dapps.push(_dappAddress);
  }

  function deleteDapp(uint _index) onlyWhitelistAdmin public {
    for (uint i = _index; i < _dapps.length-1;i++){
      _dapps[i] = _dapps[i+1];
    }
    _dapps.length--;
  }

  function setDapp(uint _index, address _newAddress) onlyWhitelistAdmin public {
    _dapps[_index]=_newAddress;
  }

  function getDapps() view public returns(address[] memory) {
    return _dapps;
  }

}