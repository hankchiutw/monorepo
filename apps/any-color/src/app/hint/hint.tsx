import React from 'react';

/* eslint-disable-next-line */
export interface HintProps {}

export const Hint = (props: HintProps) => {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to hint!</h1>
    </div>
  );
};

export default Hint;
