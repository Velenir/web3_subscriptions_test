import React, { useState, useEffect, FC } from "react";

import Web3 from "web3";
import { Syncing } from "web3-eth";

const useSyncingSub = (web3: Web3) => {
  const [syncing, setSyncing] = useState<Syncing>();
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = web3.eth
      .subscribe("syncing", function (error, result) {
        if (!error) {
          console.log("CB:syncing:result", result);

          return;
        }

        console.error("CB:syncing:error", error);
        setError(error);
      })
      .on("connected", function (subscriptionId) {
        console.log("connected:syncing:id", subscriptionId);
        setId(subscriptionId);
      })
      .on("changed", function (data) {
        console.log("changed:syncing:id", data);
      })
      .on("data", function (blockHeader) {
        console.log("data:syncing:blockHeader", blockHeader);
        setSyncing(blockHeader);
        setError(null);
      })
      .on("error", error => {
        console.error("error:syncing", error);
        setError(error);
      });

    return () => { subscription.unsubscribe(); }
  }, [web3]);

  return {
    syncing,
    error,
    subscriptionId: id
  };
};

const SyncingSub: FC<{ web3: Web3 }> = ({ web3 }) => {
  const { syncing, error, subscriptionId } = useSyncingSub(web3);

  return (
    <div>
      <h3>Subscribed to syncing, id: {subscriptionId}</h3>
      {error && (
        <pre>
          Error subscribing to syncing [[{" "}
          {error.message || JSON.stringify(error)} ]]
        </pre>
      )}
      {syncing !== undefined && (
        <pre>Logs:: {JSON.stringify(syncing, null, 1)}</pre>
      )}
    </div>
  );
};

export default SyncingSub;
