import { ethers } from "hardhat";

const ROUTER_ADDRESS = "0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165"; // Arb Sepolia
const LINK_TOKEN = "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E";
const TARGET_COUNTER_ADDRESS = "0x4d0A0B319C1D375B13E988FD814083DEB31A23ee"; // 👈 Sepolia Counter
const SEPOLIA_SELECTOR = "16015286601757825753"; // Sepolia chain selector

async function main() {
  const Proxy = await ethers.getContractFactory("ProxyCounter");

  const proxy = await Proxy.deploy(
    ROUTER_ADDRESS,
    LINK_TOKEN,
    TARGET_COUNTER_ADDRESS,
    SEPOLIA_SELECTOR
  );

  await proxy.waitForDeployment();

  console.log("✅ Proxy deployed at:", await proxy.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
