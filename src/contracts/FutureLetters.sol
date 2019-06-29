pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract FutureLetters is Ownable {
    enum status {
        Scheduled,
        Delivered,
        Canceled
    }

    struct Letter {
        bytes32 hash;
        address sender;
        uint256 status;
    }

    mapping (bytes32 => Letter) letters;

    bytes32[] lettersList;

    function getScheduledLetters() public view returns(Letter[]) {
        bytes32[] memory letters;

        for (uint256 i = 0; i < lettersList.length; i++) {
            Letter memory letter = letters[lettersList[i]];

            if (letter.status == Scheduled) {
                letters.push(letter.hash);
            }
        }

        return letters;
    }

    function getLetterSender(bytes32 hash) public view returns (address) {
        Letter memory letter = letters[hash];

        return letter.sender;
    }

    function getLetterStatus(bytes32 hash) public view returns (uint256) {
        Letter memory letter = letters[hash];

        return letter.hash;
    }

    function scheduleLetter(bytes32 hash, address sender) onlyOwner {
        Letter memory letter = Letter(hash, sender, Scheduled);

        letters[hash] = letter;

        lettersList.push(hash);

        emit ScheduleLetter(hash);
    }

    function deliverLetter(bytes32 hash) onlyOwner {
        letters[hash].status = Delivered;

        emit DeliverLetter(hash);
    }

    function cancelLetter(bytes32 hash) onlyOwner {
        letters[hash].status = Canceled;

        emit CancelLetter(hash);
    }

    event ScheduleLetter(bytes32 hash);
    event DeliverLetter(bytes32 hash);
    event CancelLetter(bytes32 hash);
}
