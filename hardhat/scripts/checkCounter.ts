import { ethers } from "hardhat";

const COUNTER_ADDRESS = "0x4d0A0B319C1D375B13E988FD814083DEB31A23ee"; // deployed Counter on Sepolia

async function main() {
  const [signer] = await ethers.getSigners();
  const counter = await ethers.getContractAt("ParentCounter", COUNTER_ADDRESS, signer);

  const count = await counter.getCount();
  console.log("🔢 Current count:", count.toString());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
