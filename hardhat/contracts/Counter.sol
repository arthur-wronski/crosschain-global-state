// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public count;

    event CountIncremented(uint256 newCount);

    function increment() external {
        count += 1;
        emit CountIncremented(count);
    }

    function getCount() external view returns (uint256) {
        return count;
    }
}
