import React, { useState, useEffect, FC } from "react";

import Web3 from "web3";
import { BlockHeader } from "web3-eth";

const useLatestBlockSub = (web3: Web3) => {
  const [block, setBlock] = useState<BlockHeader>();
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = web3.eth
      .subscribe("newBlockHeaders", function (error, result) {
        if (!error) {
          console.log("CB:newBlockHeaders:result", result);
          return;
        }

        console.error("CB:newBlockHeaders:error", error);
        setError(error);
      })
      .on("connected", function (subscriptionId) {
        console.log("connected:newBlockHeaders:id", subscriptionId);
        setId(subscriptionId);
      })
      .on("changed", function (data) {
        console.log("changed:newBlockHeaders:id", data);
      })
      .on("data", function (blockHeader) {
        console.log("data:newBlockHeaders:blockHeader", blockHeader);
        setBlock(blockHeader);
        setError(null);
      })
      .on("error", error => {
        console.error("error:newBlockHeaders", error);
        setError(error);
      });

    return () => { subscription.unsubscribe(); }
  }, [web3]);

  return {
    block,
    error,
    subscriptionId: id
  };
};

const LatestBlockSub: FC<{ web3: Web3 }> = ({ web3 }) => {
  const { block, error, subscriptionId } = useLatestBlockSub(web3);

  return (
    <div>
      <h3>Subscribed to newBlockHeaders, id: {subscriptionId}</h3>
      {block && <h4>Current block: {block.number}</h4>}
      {error && (
        <pre>
          Error subscribing to newBlockHeaders [[{" "}
          {error.message || JSON.stringify(error)} ]]
        </pre>
      )}
      {block && <pre>Block Header:: {JSON.stringify(block, null, 1)}</pre>}
    </div>
  );
};

export default LatestBlockSub;
