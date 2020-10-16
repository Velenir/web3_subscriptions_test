import React, { useState, useMemo, useRef, FC } from "react";
import "./styles.css";

import Web3 from "web3";
import { provider as Web3Provider, AbstractProvider } from "web3-core";

import {
  DisplayAccounts,
  DisplayClientVersion,
  DisplayNetwork,
  DisplayChainId,
  DisplayBalance
} from "./components/DisplayComponents";
import LatestBlockPoll from "./components/LatestBlockPoll";
import LatestBlockSub from "./components/LatestBlockSub";
import LogsSub from "./components/LogsSub";
import PendingTransactionsSub from "./components/PendingTransactionsSub";
import SyncingSub from "./components/SyncingSub";

type Provider = Exclude<Web3Provider, AbstractProvider | null>
window.Web3 = Web3;

declare global {
  interface Window {
    ethereum: any;
    provider: any;
    web3: any;
    web3c: any;
    Web3: any;
  }
}

const enableProvider = async (): Promise<Provider> => {
  if (!window.ethereum)
    throw new Error("No provider available on window.ethereum");

  const accounts = await window.ethereum.enable();
  console.log("accounts:", accounts);

  return window.ethereum;
};

const useProvider = () => {
  const [provider, setProvider] = useState<Provider | null>(null);
  const [error, setError] = useState<Error | null>();

  window.provider = provider;

  return {
    provider,
    setProvider,
    enableProvider: async () => {
      try {
        const provider = await enableProvider();

        setProvider(provider);
        setError(null);
      } catch (error) {
        setError(error);
        setProvider(null);
      }
    },
    error
  };
};

const useWeb3 = (provider: Provider | null): { web3: null | Web3; error: Error | null } => {
  return useMemo(() => {
    if (!provider) return { web3: null, error: null };

    if (typeof provider === "string") {
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
      provider = /^wss?:\/\/.*/.test(provider)
        ? new Web3.providers.WebsocketProvider(provider, {
            timeout: 15000, // ms
            // Enable auto reconnection
            reconnect: {
              auto: true,
              delay: 5000, // ms
              maxAttempts: undefined,
              onTimeout: true
            }
          })
        : new Web3.providers.HttpProvider(provider);
    }

    window.provider = provider;

    try {
      const web3 = (window.web3c = new Web3(provider));
      return { web3, error: null };
    } catch (error) {
      return { web3: null, error };
    }
  }, [provider]);
};

const ReloadButton: FC = () => {
  return (
    <div className="reload">
      <button onClick={() => window.location.reload()}>↻</button>
    </div>
  );
};

export default function App() {
  const {
    provider,
    setProvider,
    error: ProviderError,
    enableProvider
  } = useProvider();

  const input = useRef<HTMLInputElement>(null);

  const connectProvider = () => {
    if (input.current?.value) setProvider(input.current.value);
  };

  const { web3, error: Web3Error } = useWeb3(provider);

  const resetProvider = () => setProvider(null);

  let [key, setKey] = useState(0);
  const resetChildren = () => setKey((oldKey) => oldKey + 1);

  return (
    <div className="App">
      {!provider && (
        <>
          <button onClick={enableProvider}>connect to injected provider</button>
          {" | or | "}
          <input type="text" placeholder="input provider url" ref={input} />
          <button onClick={connectProvider}>connect</button>
        </>
      )}
      {provider && <button onClick={resetProvider}>reset</button>}
      {provider && <button onClick={resetChildren}>reset subs</button>}
      {ProviderError && (
        <pre>
          Error enabling provider: {JSON.stringify(ProviderError, null, 1)}
        </pre>
      )}
      {Web3Error && (
        <pre>
          Error instantiating Web3: {JSON.stringify(Web3Error, null, 1)}
        </pre>
      )}
      {web3 && (
        <>
          <DisplayAccounts web3={web3} key={key+'DA'} />
          <DisplayNetwork web3={web3} key={key+'DN'} />
          <DisplayChainId web3={web3} key={key+'DC'} />
          <DisplayBalance web3={web3} key={key+'DB'} />
          <hr />
          {provider && typeof provider !== "string" && (
            <DisplayClientVersion provider={provider} key={key+'DCV'} />
          )}
          <hr />
          <LatestBlockSub web3={web3} key={key+'LBS'} />
          <hr />
          <LatestBlockPoll web3={web3} interval={8000} key={key+'LBP'} />
          <hr />
          <LogsSub web3={web3} key={key+'LS'} />
          <hr />
          <PendingTransactionsSub web3={web3} key={key+'PTS'} />
          <hr />
          <SyncingSub web3={web3} key={key+'SS'} />
          <hr />
        </>
      )}
      <ReloadButton />
    </div>
  );
}
