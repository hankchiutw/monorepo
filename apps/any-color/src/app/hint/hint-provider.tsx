import React, { FunctionComponent, useState } from 'react';
import { Hint } from './hint';
import { HintContext } from './hint-context';

const DURATION = 4000;

/* eslint-disable-next-line */
export interface HintProviderProps {}

export const HintProvider: FunctionComponent<HintProviderProps> = (props) => {
  const [content, setContent] = useState('');
  const [visible, setVisible] = useState(false);

  let timerId = null;
  const context = {
    open: ({ content }) => {
      window.clearTimeout(timerId);
      setContent(content);
      setVisible(true);
      timerId = window.setTimeout(() => {
        setVisible(false);
      }, DURATION);
    },
  };

  return (
    <HintContext.Provider value={context}>
      {props.children}
      <Hint visible={visible}>{content}</Hint>
    </HintContext.Provider>
  );
};

export default HintProvider;
