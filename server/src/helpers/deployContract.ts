import { ethers } from 'ethers';

type DeploymentResult =
  | { success: true; contractAddress: string }
  | { success: false; error: string };

const ROUTER_ADDRESS_MAP: Record<string, string> = {
  ethereum: '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59',
  arbitrum: '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165',
  avalanche: '0xF694E193200268f9a4868e4Aa017A0118C9a8177',
  base: '0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93',
  optimism: '0x114A20A10b43D4115e5aeef7345a1A71d2a60C57',
  polygon: '0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2'
};

const INFURA_KEY = process.env.INFURA_PROJECT_ID;

const RPC_URLS: Record<string, string> = {
    ethereum: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    polygon: `https://polygon-amoy.infura.io/v3/${INFURA_KEY}`,
    arbitrum: `https://arbitrum-sepolia.infura.io/v3/${INFURA_KEY}`,
    avalanche: `https://avalanche-fuji.infura.io/v3/${INFURA_KEY}`,
    base: `https://base-sepolia.infura.io/v3/${INFURA_KEY}`,
    optimism: `https://optimism-sepolia.infura.io/v3/${INFURA_KEY}`,
};

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

export async function deployParentContract(
  chainKey: string,
  abi: any,
  bytecode: string,
  maxPlayers: number
): Promise<DeploymentResult> {
    if (!PRIVATE_KEY) {
      return { success: false, error: 'Deployer private key not set' };
    }

    const router = ROUTER_ADDRESS_MAP[chainKey];
    const rpcUrl = RPC_URLS[chainKey];

    if (!router || !rpcUrl) {
      return { success: false, error: `Unsupported chain: ${chainKey}` };
    }

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    const contract = await factory.deploy(maxPlayers, router);
    await contract.deployed();
    const contractAddress = contract.address;
    console.log("Contract address: ", contractAddress)

    return {
      success: true,
      contractAddress: contractAddress,
    };
}
