// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentRegistration {

    struct Student {
        string name;
        uint256 rollNumber;
    }

    mapping(uint256 => Student) public students;

    function registerStudent(
        string memory _name,
        uint256 _rollNumber
    ) public {
        students[_rollNumber] = Student(_name, _rollNumber);
    }

    function getStudent(uint256 _rollNumber)
        public
        view
        returns (string memory, uint256)
    {
        Student memory student = students[_rollNumber];

        return (student.name, student.rollNumber);
    }
}
