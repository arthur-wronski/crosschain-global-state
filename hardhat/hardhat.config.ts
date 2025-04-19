import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    ethereum: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string],
    },
    polygon: {
      url: `https://polygon-amoy.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string],
    },
    arbitrum: {
      url: `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string],
    },
  },
};

export default config;

// parent: 0x4d0A0B319C1D375B13E988FD814083DEB31A23ee -> ethereum sepolia
// proxy: 0x35FC45F203e031DdafB02766DEdFCC9063afdE56 -> arbitrum sepolia