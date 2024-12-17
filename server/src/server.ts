import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express + TypeScript!');
});

app.post('/api/deploy', (req: Request, res: Response)=> {
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

  res.status(200).json({ message: 'Deployment successful' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
