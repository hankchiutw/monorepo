import React, { FunctionComponent, useRef, useState } from 'react';
import { Hint } from './hint';
import { HintContext } from './hint-context';

/* eslint-disable-next-line */
export interface HintProviderProps {}

export const HintProvider: FunctionComponent<HintProviderProps> = (props) => {
  const [content, setContent] = useState('');
  const ref = useRef();

  const context = {
    open: ({ content }) => {
      setContent(content);
    },
  };

  return (
    <HintContext.Provider value={context}>
      {props.children}
      <Hint content={content} ref={ref}></Hint>
    </HintContext.Provider>
  );
};

export default HintProvider;
