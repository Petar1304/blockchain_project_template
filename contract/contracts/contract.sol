// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Contract {

    function withdraw(uint256 amount) external {
    	(bool success, ) = msg.sender.call{value: amount}("");
    	require(success, "Error: Transfer failed.");
    }


    function compareStrings(string memory str1, string memory str2) public pure returns (bool) {
            if (bytes(str1).length != bytes(str2).length) {
                    return false;
            }
            return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }

}
