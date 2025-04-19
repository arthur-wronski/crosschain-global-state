// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract ParentCounter is CCIPReceiver {
    
    constructor(address _router) CCIPReceiver(_router) {}
uint256 public count;

    event CountIncremented(uint256 newCount);

    function increment() external {
        count += 1;
        emit CountIncremented(count);
    }

    function getCount() external view returns (uint256) {
        return count;
    }
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (bool success, ) = address(this).call(message.data);
        require(success, "CCIP message execution failed");
    }
}