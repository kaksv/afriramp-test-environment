import { PropsWithChildren, useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Web3Provider } from './connect/Web3Provider.tsx';
import { BigScreenProvider } from './connect/BigScreenProvider.tsx';
// import FrameSDK from '@farcaster/frame-sdk';
import { sdk } from '@farcaster/miniapp-sdk'



function FarcasterFrameProvider({children}: PropsWithChildren) {
  useEffect(() => {
    const load = async () => {
      // FrameSDK.actions.ready()
      await sdk.actions.ready();
    }
    load();
  }, []);

  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BigScreenProvider>
      <Web3Provider>
        <FarcasterFrameProvider>
          <App />
          </FarcasterFrameProvider>
        </Web3Provider>  
    </BigScreenProvider>
  </StrictMode>
);


// "@web3modal/wagmi": "^4.0.11",