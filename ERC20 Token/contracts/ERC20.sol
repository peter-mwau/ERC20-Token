//SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    uint256 public constant MAX_SUPPLY = 10000 * 10 ** 18;
    uint256 public constant INITIAL_SUPPLY = 1000 * 10 ** 18;
    uint256 public constant CREATE_PERSON = 5 * 10 ** 18;
    address public owner;

    //person class
    struct Person{
        string name;
        uint256 age;
        string idNumber;
        bool married;
    }

    //list of people
    Person[] public listofPeople;

    mapping(address => uint256) public Amount;
    mapping(string => Person) public personObject;

    //event for successful transfer
    event TransferSuccess(address indexed _from, address indexed _to, uint246 _amount);
    //event for successful creation of person
    event CreatePersonSuccess(string _name, string_idNumber);

    //modifier to restric access to owner
    modifier onlyOwner(){
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    //constructor
    constructor() ERC20("ERC20Token", "TTKN") {
        owner = msg.sender;
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    //function to create a person
    function addPerson(string memory _name, uint256 _age, string memory _idNumber, bool _married) public {
        require(CREATE_PERSON <= balanceOf(owner), "Amount is more than available");
        Person memory newPerson = Person(_name, _age, _idNumber, _married);
        listofPeople.push(newPerson);
        personObject[_name] = newPerson;
        transfer(msg.sender, CREATE_PERSON);

        emit CreatePersonSuccess(_name, _idNumber);
    }

    //function to transfer token
    function transfer(address _to, uint256 _amount) public override returns(bool){
        require(_amount <= INITIAL_SUPPLY, "Amount is more than the available");
        _transfer(_msgSender(), _to, _from);

        emit TransferSuccess(_from, _to, _amount);
    }

    //function to mint tokens
    function mintToken(address _to, uint256 _amount) internal {
        require(totalSupply() + _amount <= MAX_SUPPLY, "Amount is more than the available");
        _mint(_to, _amount);
    }
}