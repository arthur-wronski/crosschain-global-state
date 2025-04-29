const INFURA_KEY = process.env.INFURA_PROJECT_ID;

export const FULL_CHAIN_CONFIG: Record<string, {
    chainSelector: string;
    linkTokenAddress: string;
    routerAddress: string;
    rpcUrl: string;
  }> = {
    ethereum: {
      chainSelector: '16015286601757825753',
      linkTokenAddress: '0x779877A7B0D9E8603169DdbD7836e478b4624789',
      routerAddress: '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59',
      rpcUrl: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    },
    arbitrum: {
      chainSelector: '3478487238524512106',
      linkTokenAddress: '0xb1D4538B4571d411F07960EF2838Ce337FE1E80E', 
      routerAddress: '0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165',
      rpcUrl: `https://arbitrum-sepolia.infura.io/v3/${INFURA_KEY}`,
    },
    avalanche: {
      chainSelector: '14767482510784806043',
      linkTokenAddress: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
      routerAddress: '0xF694E193200268f9a4868e4Aa017A0118C9a8177',
      rpcUrl: `https://avalanche-fuji.infura.io/v3/${INFURA_KEY}`,
    },
    base: {
      chainSelector: '10344971235874465080',
      linkTokenAddress: '0xE4aB69C077896252FAFBD49EFD26B5D171A32410',
      routerAddress: '0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93',
      rpcUrl: `https://base-sepolia.infura.io/v3/${INFURA_KEY}`,
    },
    binance: {
      chainSelector: '13264668187771770619',
      linkTokenAddress: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
      routerAddress: '0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f',
      rpcUrl: `https://bsc-testnet.infura.io/v3/${INFURA_KEY}`,
    },
    optimism: {
      chainSelector: '5224473277236331295',
      linkTokenAddress: '0xE4aB69C077896252FAFBD49EFD26B5D171A32410', 
      routerAddress: '0x114A20A10b43D4115e5aeef7345a1A71d2a60C57',
      rpcUrl: `https://optimism-sepolia.infura.io/v3/${INFURA_KEY}`,
    },
    polygon: {
      chainSelector: '16281711391670634445',
      linkTokenAddress: '0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904',
      routerAddress: '0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2',
      rpcUrl: `https://polygon-amoy.infura.io/v3/${INFURA_KEY}`,
    },
  };