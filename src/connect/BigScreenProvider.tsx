import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia, base, baseSepolia, celo, celoAlfajores } from 'wagmi/chains';
import { defineChain } from 'viem';
// Create the query client
const queryClient = new QueryClient();

const binance = defineChain({
  id: 56,
  name: 'BNB Smart Chain Mainnet',
  nativeCurrency: { name: 'BNB Chain Native Token', symbol: 'BNB', decimals: 18 },
  rpcUrls: {
    default: { http: [
    'https://bsc-dataseed1.bnbchain.org',
    'https://bsc-dataseed2.bnbchain.org',
    'https://bsc-dataseed3.bnbchain.org',
    'https://bsc-dataseed4.bnbchain.org',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed2.defibit.io',
    'https://bsc-dataseed3.defibit.io',
    'https://bsc-dataseed4.defibit.io',
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed2.ninicoin.io',
    'https://bsc-dataseed3.ninicoin.io',
    'https://bsc-dataseed4.ninicoin.io',
    'https://bsc-rpc.publicnode.com',
    'wss://bsc-rpc.publicnode.com',
    'wss://bsc-ws-node.nariox.org'
  ] },
  },
  blockExplorers: {
    default: { name: 'bscscan', url: 'https://bscscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 16267741,
    },
  },
});

// Create the Wagmi config
const config = createConfig({
  chains: [
    // mainnet, 
    // sepolia, 
    binance, 
    // baseSepolia, 
    // celo, 
    // celoAlfajores, 
    // lisk
  ],
  transports: {
    // [mainnet.id]: http(),
    // [sepolia.id]: http(),
    [binance.id]: http(),
    // [base.id]: http(),
    // [baseSepolia.id]: http(),
    
    // [celoAlfajores.id]: http(),
    // [lisk.id]: http(),
  },
});

// Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  // projectId: 'YOUR_WEB3MODAL_PROJECT_ID', // Replace with your Web3Modal project ID
  projectId: 'aa51d05f03cacb17680bb46a725c6032',
  enableAnalytics: false,
  themeMode: 'dark',
  themeVariables: {
    // ... existing variables
    '--w3m-modal-z-index': '1000', // Ensure proper stacking
    '--w3m-modal-mobile-max-width': '100%', // Fix mobile width
    '--w3m-modal-mobile-min-width': '100%', // Ensure full width on mobile
    '--w3m-modal-max-width': '360px', // Desktop width
    '--w3m-modal-min-width': '360px', // Desktop width
    '--w3m-modal-border-radius': '12px', // Match your theme
  },
  // Add mobile-specific config
  mobileWallets: [
    {
      id: 'metamask',
      name: 'MetaMask',
      links: {
        native: 'metamask://',
        universal: 'https://metamask.app.link',
      },
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      links: {
        native: 'coinbasewallet://',
        universal: 'https://go.cb-w.com',
      },
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      links: {
        native: 'trust://',
        universal: 'https://link.trustwallet.com',
      },
    },
  ],                                                                                                                    
  
  defaultChain: celo,
});
export const BigScreenProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
