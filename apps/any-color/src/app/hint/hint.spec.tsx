import { render } from '@testing-library/react';
import React from 'react';

import Hint from './hint';

describe('Hint', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hint visible={true} />);
    expect(baseElement).toBeTruthy();
  });
});
