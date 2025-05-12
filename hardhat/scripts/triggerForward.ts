import { ethers } from "hardhat";

const PROXY_ADDRESS = "0x4d0A0B319C1D375B13E988FD814083DEB31A23ee";

async function main() {
  const [signer] = await ethers.getSigners();
  const proxy = await ethers.getContractAt("CCIPProxy", PROXY_ADDRESS, signer);
  

  const tx = await proxy.forward();
  const receipt = await tx.wait();

  console.log("✅ forward() sent");
  console.log("🧾 Transaction hash:", receipt?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
