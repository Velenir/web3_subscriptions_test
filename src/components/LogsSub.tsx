import React, { useState, useEffect, FC } from "react";

import Web3 from "web3";
import { Log } from "web3-core";

const useLogsSub = (web3: Web3) => {
  const [logs, setLogs] = useState<Log | {}>({});
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const subscription = web3.eth
      .subscribe("logs", {}, function (error, result) {
        if (!error) {
          console.log("CB:logs:result", result);
          return;
        }

        console.error("CB:logs:error", error);
        setError(error);
      })
      .on("connected", function (subscriptionId) {
        console.log("connected:logs:id", subscriptionId);
        setId(subscriptionId);
      })
      .on("changed", function (data) {
        console.log("changed:logs:id", data);
      })
      .on("data", function (blockHeader) {
        console.log("data:logs:blockHeader", blockHeader);
        setLogs(blockHeader);
        setError(null);
      })
      .on("error", error => {
        console.error("error:logs", error);
        setError(error);
      });

    return () => { subscription.unsubscribe(); }
  }, [web3]);

  return {
    logs,
    error,
    subscriptionId: id
  };
};

const LogsSub: FC<{ web3: Web3 }> = ({ web3 }) => {
  const { logs, error, subscriptionId } = useLogsSub(web3);

  return (
    <div>
      <h3>Subscribed to logs, id: {subscriptionId}</h3>
      {error && (
        <pre>
          Error subscribing to logs [[ {error.message || JSON.stringify(error)}{" "}
          ]]
        </pre>
      )}
      {logs && <pre>Latest Log:: {JSON.stringify(logs, null, 1)}</pre>}
    </div>
  );
};

export default LogsSub;
