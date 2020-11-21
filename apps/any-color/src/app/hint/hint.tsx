import React, { forwardRef, MutableRefObject } from 'react';

/* eslint-disable-next-line */
export interface HintProps {
  content: string;
}

const Hint = (props: HintProps, ref: MutableRefObject<HTMLDivElement>) => {
  return (
    <div className="host" ref={ref}>
      <style jsx>{`
        .host {
          position: fixed;
          top: 10px;
          right: 10px;
          background: #323232;
          padding: 6px 16px;
          border-radius: 4px;
          z-index: ${Number.MAX_SAFE_INTEGER};
          box-sizing: border-box;
          height: 48px;
          color: white;
          opacity: 0;
          transition: opacity 0.15s;
          pointer-events: none;
        }

        .host(.visible) {
          opacity: 1;
        }

        .content {
          display: flex;
          align-items: center;
          height: 100%;
        }
      `}</style>
      {props.content}
    </div>
  );
};

const _Hint = forwardRef(Hint);
export { _Hint as Hint };
export default Hint;
