import { ethers } from "hardhat";

const PROXY_ADDRESS = "0xff4a01b9CDDD9097474cd2F6c73176EE66A5B4e2";

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
