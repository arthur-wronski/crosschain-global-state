import { ethers } from "hardhat";

const LINK_TOKEN = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E"; // Arbitrum Sepolia LINK
const PROXY_ADDRESS = "0x35FC45F203e031DdafB02766DEdFCC9063afdE56";
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
