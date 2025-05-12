import { ethers } from "hardhat";

const PROXY_ADDRESS = "0xFC45994753607B1dE7499669f38cFfcD423e8a6b";

async function main() {
  const [signer] = await ethers.getSigners();
  const proxy = await ethers.getContractAt("CCIPProxy", PROXY_ADDRESS, signer);

  const question = "What's your favorite season?";
  const options = ["Spring", "Summer", "Autumn", "Winter"];

  const tx = await proxy.createPoll(question, options);
  const receipt = await tx.wait();

  console.log("✅ createPoll() sent");
  console.log("🧾 Transaction hash:", receipt?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

