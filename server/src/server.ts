import express, { Request, Response } from 'express';
import cors from 'cors';
import { injectCCIPReceiver } from './helpers/injectCCIPReceiver';
import { compileContract } from './helpers/compileContract';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express + TypeScript!');
});

app.post('/api/deploy', (req: Request, res: Response) => {
  const { primaryChain, secondaryChain, functionToCopy, contract } = req.body;

  if (!primaryChain || !secondaryChain || !functionToCopy || !contract) {
    res.status(400).json({ message: 'Missing required fields' });
  }

  console.log('Deployment request received:', {
    primaryChain,
    secondaryChain,
    functionToCopy,
    contract,
  });

  // inject CCIP code into parent contract -> imports + Contract is CCIPReceiver + constructor change + ccipReceive
  // deploy to primary chain and store contract address
  // construct proxy contract
  // deploy on all the secondary chains, load up some LINK on each, call joinLottery to see if it propagates to parent contract

  const injectedContract = injectCCIPReceiver(contract);
  console.log("Injected parent contract: ", injectedContract)
  const compileResult = compileContract(injectedContract);

  if (!compileResult.success) {
    console.log("Compile result: ", compileResult)
    res.status(400).json({ message: 'Compilation failed' });
  }

  console.log("---------- PARENT CONTRACT SUCCESSFULLY COMPILED ----------")

  res.status(200).json({ message: 'Deployment successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
