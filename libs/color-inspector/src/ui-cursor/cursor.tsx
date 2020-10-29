import React from 'react';

/* eslint-disable-next-line */
export interface CursorProps {}

export const Cursor = (props: CursorProps) => {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to cursor!</h1>
    </div>
  );
};

export default Cursor;
