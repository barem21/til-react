import { useState } from "react";

const Sample5 = () => {
  const [voteCount, setVoteCount] = useState(0);
  const [notVoteCount, setNotVoteCount] = useState(0);

  const vote = () => {
    setVoteCount(voteCount + 1);
  };

  /*
  const notVote = () => {
    setNotVoteCount(notVoteCount + 1);
  };
  */

  return (
    <>
      <div>
        <span>좋아요{voteCount}</span>
      </div>
      <div>
        <span>싫어요{notVoteCount}</span>
      </div>
      <div>
        <button onClick={vote}>좋아요</button>
        <button onClick={() => setNotVoteCount(notVoteCount + 1)}>
          싫어요
        </button>
      </div>
    </>
  );
};

export default Sample5;
