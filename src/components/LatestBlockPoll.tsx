import React, { useState, useEffect, useCallback, FC } from "react";

import Web3 from "web3";
import { BlockHeader } from "web3-eth";

const useInterval = (cb: Function, interval: number) => {
  useEffect(() => {
    cb();
    const intervalId = setInterval(cb, interval);
    return () => clearInterval(intervalId);
  }, [cb, interval]);
};

const useLatestBlockPoll = (web3: Web3, interval = 8000) => {
  const [block, setBlock] = useState<BlockHeader>();
  const [error, setError] = useState<Error | null>(null);

  const getLatestBlock = useCallback(
    () =>
      web3.eth
        .getBlock("latest")
        .then(bl => {
          setBlock(bl);
          setError(null);
        })
        .catch(setError),
    [web3]
  );

  useInterval(getLatestBlock, interval);

  return {
    block,
    error
  };
};

const LatestBlockPoll: FC<{ web3: Web3; interval: number }> = ({
  web3,
  interval
}) => {
  const { block, error } = useLatestBlockPoll(web3, interval);

  return (
    <div>
      <h3>Polling Latest Block every {interval / 1000} sec</h3>
      {block && <h4>Current block: {block.number}</h4>}
      {error && (
        <pre>
          Error getting client version [[{" "}
          {error.message || JSON.stringify(error)} ]]
        </pre>
      )}
      {block && <pre>Block: {JSON.stringify(block, null, 1)}</pre>}
    </div>
  );
};

export default LatestBlockPoll;
