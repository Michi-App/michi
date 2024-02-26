// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "pendlefinance/contracts/contracts/interfaces/IPYieldToken.sol";

contract MockYT is ERC20 {
    constructor() ERC20("MockYT", "MYT") {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
