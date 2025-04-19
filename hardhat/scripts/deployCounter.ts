import { ethers } from "hardhat";

const ROUTER_ADDRESS = "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59";

async function main() {
  const Counter = await ethers.getContractFactory("ParentCounter");
  const counter = await Counter.deploy(ROUTER_ADDRESS);

  await counter.waitForDeployment();

  console.log("✅ Counter deployed at:", await counter.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
