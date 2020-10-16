import React, { useState, useEffect, FC } from "react";

import Web3 from "web3";

const MAX_TSX_TO_DISPLAY = 10

const usePendingTransactionsSub = (web3: Web3) => {
  const [pendingTransactions, setPendingTransactions] = useState<string[]>([]);
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = web3.eth
      .subscribe("pendingTransactions", function(error, result) {
        if (!error) {
          console.log("CB:pendingTransactions:result", result);
          return;
        }

        console.error("CB:pendingTransactions:error", error);
        setError(error);
      })
      .on("connected", function(subscriptionId) {
        console.log("connected:pendingTransactions:id", subscriptionId);
        setId(subscriptionId);
      })
      .on("changed", function(data) {
        console.log("changed:pendingTransactions:id", data);
      })
      .on("data", function(tx) {
        console.log("data:pendingTransactions:tx", tx);
        setPendingTransactions(oldTxs => oldTxs.concat(tx).slice(-MAX_TSX_TO_DISPLAY));
        setError(null);
      })
      .on("error", error => {
        console.error("error:pendingTransactions", error);
        setError(error);
      });

    return () => {subscription.unsubscribe();}
  }, [web3]);

  return {
    pendingTransactions,
    error,
    subscriptionId: id
  };
};

const PendingTransactionsSub: FC<{ web3: Web3 }> = ({ web3 }) => {
  const {
    pendingTransactions,
    error,
    subscriptionId
  } = usePendingTransactionsSub(web3);

  return (
    <div>
      <h3>Subscribed to pendingTransactions, id: {subscriptionId}</h3>
      {error && (
        <pre>
          Error subscribing to pendingTransactions [[{" "}
          {error.message || JSON.stringify(error)} ]]
        </pre>
      )}
      {pendingTransactions && (
        <pre>
          Pending Transactions:: {JSON.stringify(pendingTransactions, null, 1)}
        </pre>
      )}
    </div>
  );
};

export default PendingTransactionsSub;
