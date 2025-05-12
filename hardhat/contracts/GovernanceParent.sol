// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract Governance is CCIPReceiver {
    mapping(bytes4 => bool) public whitelist;

    function initializeWhitelist() internal {
        whitelist[bytes4(0x1579f9b6)] = true;
        whitelist[bytes4(0x94619c5c)] = true;
        whitelist[bytes4(0xdf5636a0)] = true;
    }
  constructor(address _router) CCIPReceiver(_router) {}struct Poll {
        string question;
        string[] options;
        mapping(uint => uint) votes;
        address creator;
        bool open;
    }

    uint public pollCount;
    mapping(uint => Poll) public polls;

    event PollCreated(uint pollId, string question);
    event Voted(uint pollId, uint option);
    event PollClosed(uint pollId);

    function createPoll(string memory _question, string[] memory _options) external {
        require(_options.length > 1, "At least two options required.");
        Poll storage poll = polls[pollCount++];
        poll.question = _question;
        poll.options = _options;
        poll.creator = msg.sender;
        poll.open = true;

        emit PollCreated(pollCount - 1, _question);
    }

    function vote(uint _pollId, uint _option) external {
        Poll storage poll = polls[_pollId];
        require(poll.open, "Poll is closed.");
        require(_option < poll.options.length, "Invalid option.");
        poll.votes[_option]++;
        
        emit Voted(_pollId, _option);
    }

    function closePoll(uint _pollId) external {
        Poll storage poll = polls[_pollId];
        require(poll.open, "Poll already closed.");
        require(msg.sender == poll.creator, "Only creator can close the poll.");
        poll.open = false;

        emit PollClosed(_pollId);
    }

    function getVotes(uint _pollId, uint _option) external view returns (uint) {
        Poll storage poll = polls[_pollId];
        return poll.votes[_option];
    }
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
      bytes memory _data = message.data;
      bytes4 selector;
      assembly {
          selector := mload(add(_data, 32))
      }
      require(whitelist[selector], "Function not whitelisted");

      (bool success, ) = address(this).call(_data);
      require(success, "CCIP message execution failed");
  }
  }