pragma solidity ^0.5.2;

contract ERC223ReceivingContract { 
  function tokenFallback(address _from, uint _value, uint256 _data) public;
}