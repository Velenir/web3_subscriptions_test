import React, { useState, useEffect, FC } from "react";

import Web3 from "web3";
import {
  provider,
  HttpProvider,
  IpcProvider,
  WebsocketProvider
} from "web3-core";

interface ClientVersion {
  id?: number;
  jsonrpc?: string;
  result: string;
}

const useClientVersion = (provider: HttpProvider | IpcProvider | WebsocketProvider) => {
  const [clientVersion, setClientVersion] = useState<ClientVersion | {}>({});
  const [error, setError] = useState<Error | null>();

  useEffect(() => {
    provider.send(
      {
        method: "web3_clientVersion",
        jsonrpc: "2.0",
        params: []
      },
      (e, clientVersion) => {
        if (e) {
          setError(e);
          setClientVersion({});
          return;
        }

        if (!clientVersion) return

        setClientVersion(clientVersion);
        setError(null);
      }
    );
  }, [provider]);

  return { clientVersion, error };
};

export const DisplayClientVersion: FC<{
  provider: HttpProvider | IpcProvider | WebsocketProvider;
}> = ({ provider }) => {
  const { clientVersion, error } = useClientVersion(provider);

  return (
    <div>
      {error && (
        <pre>
          Error getting client version [[{" "}
          {error.message || JSON.stringify(error)} ]]
        </pre>
      )}
      {clientVersion && (
        <pre>ClientVersion: {JSON.stringify(clientVersion, null, 1)}</pre>
      )}
    </div>
  );
};

const useAccounts = (web3: Web3) => {
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    web3.eth.getAccounts().then(setAccounts);
  }, [web3]);

  return accounts;
};

export const DisplayAccounts: FC<{ web3: Web3 }> = ({ web3 }) => {
  const accounts = useAccounts(web3);

  return <p>Accounts: {accounts}</p>;
};

type Network = "mainnet" | "ropsten" | "rinkeby" | "goerli" | "kovan";

const id2Network: { [K: number]: Network } = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan"
};

const useNetwork = (web3: Web3) => {
  const [network, setNetwork] = useState<Network>();

  useEffect(() => {
    web3.eth.net.getId().then(id => setNetwork(id2Network[id]));
  }, [web3]);

  return network;
};

export const DisplayNetwork: FC<{ web3: Web3 }> = ({ web3 }) => {
  const network = useNetwork(web3);

  return <p>Network: {network}</p>;
};

const useChainId = (web3: Web3) => {
  const [ChainId, setChainId] = useState<number>();

  useEffect(() => {
    web3.eth.net.getId().then(setChainId);
  }, [web3]);

  return ChainId;
};

export const DisplayChainId: FC<{ web3: Web3 }> = ({ web3 }) => {
  const ChainId = useChainId(web3);

  return <p>ChainId: {ChainId}</p>;
};

const useBalance = (web3: Web3) => {
  const [balance, setBalance] = useState("");
  const [account] = useAccounts(web3);

  useEffect(() => {
    account && web3.eth.getBalance(account).then(setBalance);
  }, [web3, account]);

  return balance;
};

export const DisplayBalance: FC<{ web3: Web3 }> = ({ web3 }) => {
  const balance = useBalance(web3);

  return <p>Balance: {+balance / 1e18} ETH</p>;
};
