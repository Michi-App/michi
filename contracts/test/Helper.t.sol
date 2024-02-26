pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "erc6551/ERC6551Registry.sol";

import "tokenbound/src/AccountV3.sol";
import "tokenbound/src/AccountProxy.sol";

import "./TestContracts/MockYT.sol";

import "src/MichiBackpack.sol";
import {MichiHelper} from "src/MichiHelper.sol";

contract MichiHelperTestFuzz is Test {
    MichiBackpack public michiBackpack;
    MichiHelper public michiHelper;
    MockYT public mockYT;
    AccountV3 public implementation;
    ERC6551Registry public registry;

    function setUp() public {
        address feeRecipient = vm.addr(5);

        michiBackpack = new MichiBackpack(0, 0);
        registry = new ERC6551Registry();
        implementation = new AccountV3(address(1), address(1), address(1), address(1));
        mockYT = new MockYT();
        michiHelper =
            new MichiHelper(address(registry), address(implementation), address(michiBackpack), feeRecipient, 0, 10000);
    }

    function testCreateBackpack(uint256 quantity) public {
        vm.assume(quantity > 0);
        vm.assume(quantity < 10);
        address user1 = vm.addr(1);
        uint256 firstIdMinted = michiBackpack.currentIndex();

        vm.prank(user1);
        michiHelper.createBackpack(quantity);

        uint256 nextId = michiBackpack.currentIndex();

        for (uint256 i = firstIdMinted; i < nextId; i++) {
            // check that nft is minted to user1
            assertEq(michiBackpack.ownerOf(i), user1);

            address computedAddress =
                registry.account(address(implementation), 0, block.chainid, address(michiBackpack), i);

            // check that predicted address is owned by user1
            AccountV3 account = AccountV3(payable(computedAddress));
            assertEq(account.owner(), user1);
        }
    }

    function testDepositAndWithdraw(uint256 amount) public {
        vm.assume(amount < 100000 ether);
        address user1 = vm.addr(1);
        address user2 = vm.addr(2);
        uint256 index = michiBackpack.currentIndex();

        // compute predicted address using expected id
        address computedAddress =
            registry.account(address(implementation), 0, block.chainid, address(michiBackpack), index);

        vm.prank(user1);
        michiHelper.createBackpack(1);

        // mint mock YT tokens
        mockYT.mint(user1, amount);
        mockYT.mint(user2, amount);
        assertEq(mockYT.balanceOf(user1), amount);
        assertEq(mockYT.balanceOf(user2), amount);

        // add test YT to approved tokens list
        michiHelper.addApprovedToken(address(mockYT));
        assertEq(michiHelper.approvedToken(address(mockYT)), true);

        uint256 totalDepositAmount = amount;
        uint256 feeAmount = totalDepositAmount * michiHelper.depositFee() * michiHelper.feePrecision();
        uint256 depositAmountAfterFees = totalDepositAmount - feeAmount;

        // user2 should fail to deposit YT
        vm.prank(user2);
        mockYT.approve(address(michiHelper), amount);
        vm.prank(user2);
        vm.expectRevert(abi.encodeWithSelector(MichiHelper.UnauthorizedUser.selector, user2));
        michiHelper.depositYT(address(mockYT), computedAddress, amount, true);

        // user1 should succeed in depositing YT

        vm.prank(user1);
        mockYT.approve(address(michiHelper), amount);
        vm.prank(user1);
        michiHelper.depositYT(address(mockYT), computedAddress, amount, true);

        assertEq(mockYT.balanceOf(computedAddress), depositAmountAfterFees);
        assertEq(mockYT.balanceOf(michiHelper.feeReceiver()), feeAmount);
        assertEq(michiHelper.depositsByAccountByToken(computedAddress, address(mockYT)), depositAmountAfterFees);
        assertEq(michiHelper.depositsByToken(address(mockYT)), depositAmountAfterFees);
        assertEq(michiHelper.feesCollectedByToken(address(mockYT)), feeAmount);

        // user2 should fail transfering out YT
        AccountV3 account = AccountV3(payable(computedAddress));
        bytes memory transferCall = abi.encodeWithSignature("transfer(address,uint256)", user1, depositAmountAfterFees);
        vm.prank(user2);
        vm.expectRevert(NotAuthorized.selector);
        account.execute(address(mockYT), 0, transferCall, 0);

        // user1 should success transfering out YT
        vm.prank(user1);
        account.execute(address(mockYT), 0, transferCall, 0);
        assertEq(mockYT.balanceOf(user1), depositAmountAfterFees);
    }
}
