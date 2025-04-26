import { deployParentContract, deployProxyContract, sendLink } from './helpers/deployContract';

interface ChainConfig {
  name: string;
  chainSelector: bigint;
  linkTokenAddress: string;
}

interface DeploymentRequest {
  parentChain: ChainConfig;
  proxyChains: ChainConfig[];
  parentCompiled: {
    abi: any;
    bytecode: string;
  };
  proxyCompiled: {
    abi: any;
    bytecode: string;
  };
}

export async function deployGlobalState(deploymentRequest: DeploymentRequest) {
  const { parentChain, proxyChains, parentCompiled, proxyCompiled } = deploymentRequest;

  // Deploy Parent
  const parentDeployment = await deployParentContract(
    parentChain.name,
    parentCompiled.abi,
    parentCompiled.bytecode
  );

  if (!parentDeployment.success) {
    throw new Error(`Parent contract deployment failed: ${parentDeployment.error}`);
  }

  const proxyDeployments = [];

  for (const proxyChain of proxyChains) {
    const proxyDeployment = await deployProxyContract(
      proxyChain.name,
      proxyCompiled.abi,
      proxyCompiled.bytecode,
      proxyChain.linkTokenAddress,
      parentDeployment.contractAddress,
      parentChain.chainSelector
    );

    if (!proxyDeployment.success) {
      throw new Error(`Proxy deployment failed: ${proxyDeployment.error}`);
    }

    await sendLink(
      proxyChain.name,
      proxyChain.linkTokenAddress,
      proxyDeployment.contractAddress
    );

    proxyDeployments.push({
      chain: proxyChain.name,
      address: proxyDeployment.contractAddress,
    });
  }

  return {
    success: true,
    parent: {
      chain: parentChain.name,
      address: parentDeployment.contractAddress,
    },
    proxies: proxyDeployments,
  };
}
