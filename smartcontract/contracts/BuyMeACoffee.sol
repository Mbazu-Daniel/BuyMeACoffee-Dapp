// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract BuyMeACoffee {
    // Event to emit when a Memo is created

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    // Memo struct
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // State Variables

    // List of all memos received from friends
    Memo[] memos;

    // Address of contract deployer
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev buy a coffee for contract owner
     * @param _name name of the coffee buyer
     * @param _message a nice message from the coffee buyer
     */

    function buyCoffee(string memory _name, string memory _message)
        public
        payable
    {
        require(msg.value > 0, "Can't buy coffee with 0 eth");

        // Add memo to storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        //    emit the Event
        emit NewMemo(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev Send the entire balance stored in this contract to the owner
     */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /**
     * @dev retrieve all the memos recieved and store on the blockchain
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
