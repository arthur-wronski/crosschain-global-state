import { ethers } from 'ethers';
import { FULL_CHAIN_CONFIG } from './chainConfig';

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;

type DeploymentResult =
  | { success: true; contractAddress: string }
  | { success: false; error: string };

export async function deployParentContract(
  chainKey: string,
  abi: any,
  bytecode: string
): Promise<DeploymentResult> {
  if (!PRIVATE_KEY) {
    return { success: false, error: 'Deployer private key not set' };
  }

  const config = FULL_CHAIN_CONFIG[chainKey];

  if (!config) {
    return { success: false, error: `Unsupported chain: ${chainKey}` };
  }

  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  const contract = await factory.deploy(config.routerAddress); // ONLY router address needed
  await contract.deployed();
  console.log("✅ Parent Contract deployed at:", contract.address);

  return { success: true, contractAddress: contract.address };
}

export async function deployProxyContract(
  chainKey: string,
  abi: any,
  bytecode: string,
  linkTokenAddress: string,
  parentAddress: string,
  destinationChainSelector: bigint
): Promise<DeploymentResult> {
  if (!PRIVATE_KEY) {
    return { success: false, error: 'Deployer private key not set' };
  }

  const config = FULL_CHAIN_CONFIG[chainKey];

  if (!config) {
    return { success: false, error: `Unsupported chain: ${chainKey}` };
  }

  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const factory = new ethers.ContractFactory(abi, bytecode, wallet);

  const contract = await factory.deploy(
    config.routerAddress,
    linkTokenAddress,
    parentAddress,
    destinationChainSelector.toString()
  );

  await contract.deployed();
  console.log(`✅ Proxy Contract deployed at:`, contract.address);

  return { success: true, contractAddress: contract.address };
}


export async function sendLink(
  chainKey: string,
  linkTokenAddress: string,
  recipient: string,
  amount = ethers.utils.parseUnits('1', 18)
) {
  if (!PRIVATE_KEY) {
    throw new Error('Deployer private key not set');
  }

  const config = FULL_CHAIN_CONFIG[chainKey];

  if (!config) {
    throw new Error(`Unsupported chain for LINK transfer: ${chainKey}`);
  }

  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const linkAbi = [
    'function transfer(address to, uint256 value) public returns (bool)'
  ];

  const linkTokenContract = new ethers.Contract(linkTokenAddress, linkAbi, wallet);

  const tx = await linkTokenContract.transfer(recipient, amount);
  console.log(`🚀 Sending ${ethers.utils.formatUnits(amount, 18)} LINK to ${recipient} on ${chainKey}...`);

  await tx.wait();
  console.log(`✅ LINK sent successfully! Transaction Hash: ${tx.hash}`);
}
