import { ethers } from "hardhat";

const PROXY_ADDRESS = "0x35FC45F203e031DdafB02766DEdFCC9063afdE56";

async function main() {
  const [signer] = await ethers.getSigners();
  const proxy = await ethers.getContractAt("ProxyCounter", PROXY_ADDRESS, signer);

  const tx = await proxy.forward();
  const receipt = await tx.wait();

  console.log("✅ forward() sent");
  console.log("🧾 Transaction hash:", receipt?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
