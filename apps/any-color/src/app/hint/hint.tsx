import React, { FunctionComponent } from 'react';

/* eslint-disable-next-line */
export interface HintProps {
  visible: boolean;
}

export const Hint: FunctionComponent<HintProps> = ({ children, visible }) => {
  return (
    <div className="host">
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
          transition: opacity 0.15s;
          pointer-events: none;
          opacity: ${visible ? 1 : 0};
        }

        .content {
          display: flex;
          align-items: center;
          height: 100%;
        }
      `}</style>
      <div className="content">{children}</div>
    </div>
  );
};

export default Hint;
