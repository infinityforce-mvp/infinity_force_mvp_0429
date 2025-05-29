import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useSetRecoilState } from 'recoil';
import { isConnectPopoverOpen } from '@/store/web3/state';

export default function withWalletGuard<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return function WalletProtectedComponent(props: P) {
    const { isConnected } = useAccount();
    const setPopoverOpen = useSetRecoilState(isConnectPopoverOpen);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
      setHasMounted(true);
    }, []);

    if (!hasMounted) return null;

    return (
      <>
        {isConnected ? (
          <WrappedComponent {...props} />
        ) : (
          <div className="flex justify-center items-center py-20 px-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-lg blur opacity-75"></div>
              <div className="relative bg-gray-900 rounded-lg p-8 text-center max-w-md shadow-lg">
                <div className="w-12 h-12 rounded-full bg-pink-400/30 text-pink-400 mx-auto flex items-center justify-center text-2xl font-bold mb-4">
                  ✖
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Access Denied</h3>
                <p className="text-gray-400 mb-6">Please connect your wallet using the button in the header.</p>
                <button
                  onClick={() => setPopoverOpen(true)}
                  className="w-full py-2 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 transition"
                >
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
}
