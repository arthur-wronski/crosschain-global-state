import { ethers } from "hardhat";

const PROXY_ADDRESS = "0x71Dff170ddD7Ca66A2275074DB9114B297ebf9B1";

async function main() {
  const [signer] = await ethers.getSigners();
  const proxy = await ethers.getContractAt("Governance", PROXY_ADDRESS, signer);

  const pollId = 0; 
  const option = 2; // Replace with the index of the selected option

  const tx = await proxy.vote(pollId, option);
  const receipt = await tx.wait();

  console.log("✅ vote() sent");
  console.log("🧾 Transaction hash:", receipt?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});