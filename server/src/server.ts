require('dotenv').config()

import express, { Request, Response } from 'express';
import cors from 'cors';
import { injectCCIPReceiver } from './helpers/injectCCIPReceiver';
import { compileContract } from './helpers/compileContract';
import { generateProxyContract } from './helpers/generateProxyContract';
import { deployGlobalState } from './deployGlobalState';
import { FULL_CHAIN_CONFIG } from './helpers/chainConfig';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/deploy', async (req: Request, res: Response): Promise<any> => {
  const { primaryChain, secondaryChains, functionsToCopy, contract } = req.body;

  if (!primaryChain || !secondaryChains || !functionsToCopy || !contract) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Deployment request received:', {
    primaryChain,
    secondaryChains,
    functionsToCopy,
    contract,
  });

  try {
    const parentConfig = FULL_CHAIN_CONFIG[primaryChain];
    const secondaryConfigs = secondaryChains.map((chain: string) => FULL_CHAIN_CONFIG[chain]);

    if (!parentConfig || secondaryConfigs.some((c: string) => !c)) {
      return res.status(400).json({ message: 'Unsupported chain(s) specified' });
    }

    const injectedContract = injectCCIPReceiver(contract, functionsToCopy);
    console.log("Injected parent contract:", injectedContract);

    const parentCompileResult = compileContract(injectedContract);
    if (!parentCompileResult.success) {
      console.log("Parent compile result:", parentCompileResult.errors);
      return res.status(400).json({ message: 'Parent contract compilation failed', errors: parentCompileResult.errors });
    }

    console.log("✅ Parent contract compiled successfully");

    const proxyContractCode = generateProxyContract(functionsToCopy);
    console.log("Generated Proxy Contract:\n", proxyContractCode);

    const proxyCompileResult = compileContract(proxyContractCode);
    if (!proxyCompileResult.success) {
      console.log("Proxy compile result:", proxyCompileResult.errors);
      return res.status(400).json({ message: 'Proxy contract compilation failed', errors: proxyCompileResult.errors });
    }
    
    console.log("✅ Proxy contract compiled successfully");

    const deploymentResult = await deployGlobalState({
      parentChain: {
        name: primaryChain,
        chainSelector: BigInt(parentConfig.chainSelector),
        linkTokenAddress: parentConfig.linkTokenAddress,
      },
      proxyChains: secondaryChains.map((chainName: string) => ({
        name: chainName,
        chainSelector: BigInt(FULL_CHAIN_CONFIG[chainName].chainSelector),
        linkTokenAddress: FULL_CHAIN_CONFIG[chainName].linkTokenAddress,
      })),
      parentCompiled: {
        abi: parentCompileResult.abi,
        bytecode: parentCompileResult.bytecode,
      },
      proxyCompiled: {
        abi: proxyCompileResult.abi,
        bytecode: proxyCompileResult.bytecode,
      }
    });

    return res.status(200).json(deploymentResult);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Deployment failed', error });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
