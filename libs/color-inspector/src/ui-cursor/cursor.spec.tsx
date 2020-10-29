import React from 'react';
import { render } from '@testing-library/react';

import Cursor from './cursor';

describe('Cursor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Cursor />);
    expect(baseElement).toBeTruthy();
  });
});
