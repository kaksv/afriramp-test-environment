import React from 'react';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';
// import { mainnet, base, celo } from "wagmi/chains";
import { defineChain } from 'viem';
// import MyCustomAvatar from '../connect/MyCustomAvatar';
// import { farcasterFrame } from '@farcaster/frame-wagmi-connector';

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
})


const config = createConfig(
  getDefaultConfig({
    
    chains: [ binance],
    // connectors: [farcasterFrame(), ],

    transports: {
      
      [binance.id]: http(),
      // [base.id]: http(),
      // [mainnet.id]: http(),
      
    },

    appName: 'AfriRamp',
    appDescription: 'Access to the Onchain Economy through Binance',
    appUrl: 'https://www.afriramp.xyz',
    
    walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID! || 'aa51d05f03cacb17680bb46a725c6032',
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
         theme='midnight'
         options={{
          // customAvatar: MyCustomAvatar,
          embedGoogleFonts: true,
          disclaimer: 'Welcome to AfriRamp! Enjoy your experience!',


         }}
         mode='auto'
          customTheme={{
            accentColor: '#2563eb',
            accentColorForeground: 'white',
            borderRadius: '8px',
            fontStack: 'system',
            overlayBlur: 'small',
            
          }}
          // defaultChain={base}
          // chains={[mainnet, base]}
          // walletConnectProjectId={import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'aa51d05f03cacb17680bb46a725c6032'}
         >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};