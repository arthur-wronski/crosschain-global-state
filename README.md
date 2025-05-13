# Cross-Chain Global State Framework

This project enables cross-chain function execution using Solidity smart contracts and Chainlink CCIP. It allows you to input a standard Solidity contract, choose function(s) to replicate, and deploy a parent contract with CCIP logic, along with proxy contracts on other chains that forward specific function calls to the parent.

## 🚀 Features

- Upload and parse Solidity smart contracts.
- Select functions to replicate.
- Choose a parent chain and multiple secondary chains.
- Injects `ccipReceive` logic into the parent contract.
- Deploys parent and proxy contracts automatically.
- Proxy contracts forward whitelisted function calls via `solidity call`.

## 🧰 How It Works

1. **Frontend**: Allows contract upload, function selection, and chain selection.
2. **Backend**: 
   - Injects CCIP logic into the parent.
   - Generates proxy contracts.
   - - Compiles contracts.
   - Deploys all contracts and relays addresses to frontend.
3. **Proxy Contracts**:
   - Forward encoded function calls to the parent.
   - Only whitelisted function calls are allowed to enhance security.

## ⚙️ Setup Instructions

### Prerequisites

- Node.js
- npm or yarn
- Hardhat
- Infura API Key
- Wallet private key with testnet native coins for deployments & LINK for each proxy testnet (sends 1 LINK as default, can be changed)

### Environment Variables

Create a `.env` file in the `server` directories:

```env
INFURA_PROJECT_ID=your_infura_project_id
DEPLOYER_PRIVATE_KEY=your_wallet_private_key
```

Make sure your wallet is funded with:
- tesnet native tokens to pay for deployments 
- LINK tokens for CCIP messaging fees for all selected proxy chains

### Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### Start the Application

In two terminals:

```bash
# Terminal 1: Frontend
cd client
npm run dev

# Terminal 2: Backend
cd server
npm run dev
```

## 🧪 Testing with Hardhat

You can simulate function calls and deployment logic using Hardhat:

```bash
cd hardhat
npx hardhat run scripts/checkCounter.ts --network <your_testnet>
```

Replace `<your_testnet>` with the network defined in your `hardhat.config.ts`.

## 📝 Notes

- Only selected and whitelisted functions are callable via proxy contracts.
- You must run both the frontend and backend simultaneously for proper operation.
- Ensure Infura and wallet credentials are valid and funded before deploying.

## 📄 License

MIT License
