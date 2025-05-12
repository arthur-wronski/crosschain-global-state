import { ethers } from "hardhat";

const PROXY_ADDRESS = "0xFC45994753607B1dE7499669f38cFfcD423e8a6b";

async function main() {
  const [signer] = await ethers.getSigners();
  const proxy = await ethers.getContractAt("Governance", PROXY_ADDRESS, signer);

  const pollId = 0; 

  const tx = await proxy.closePoll(pollId);
  const receipt = await tx.wait();

  console.log("✅ vote() sent");
  console.log("🧾 Transaction hash:", receipt?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});