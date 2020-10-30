import React from 'react';
import { render } from '@testing-library/react';

import Inspector from './inspector';

describe('Inspector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Inspector />);
    expect(baseElement).toBeTruthy();
  });
});
