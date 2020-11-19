import React from 'react';
import { render } from '@testing-library/react';

import Hint from './hint';

describe('Hint', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hint />);
    expect(baseElement).toBeTruthy();
  });
});
