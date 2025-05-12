import { ethers } from "hardhat";

const LINK_TOKEN = "0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846"; // Arbitrum Sepolia LINK
const PROXY_ADDRESS = "0xFC45994753607B1dE7499669f38cFfcD423e8a6b";
const AMOUNT = ethers.parseEther("1.0"); // 1 LINK

async function main() {
  const [signer] = await ethers.getSigners();
  const link = await ethers.getContractAt("IERC20", LINK_TOKEN, signer);

  const tx = await link.transfer(PROXY_ADDRESS, AMOUNT);
  await tx.wait();

  console.log(`✅ Sent ${ethers.formatEther(AMOUNT)} LINK to proxy at ${PROXY_ADDRESS}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});