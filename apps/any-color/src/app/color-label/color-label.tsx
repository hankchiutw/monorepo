import React, { FunctionComponent } from 'react';

/* eslint-disable-next-line */
export interface ColorLabelProps {
  color: string;
}

export const ColorLabel: FunctionComponent<ColorLabelProps> = ({
  children,
  color,
}) => {
  return (
    <>
      <style jsx>
        {`
          .spot {
            box-sizing: border-box;
            display: block;
            border-radius: 3px;
            width: 20px;
            height: 20px;
            margin-right: 6px;
            background-color: ${color};
          }
        `}
      </style>
      <div className="spot"></div>
      <div>{children || color}</div>
    </>
  );
};

export default ColorLabel;
