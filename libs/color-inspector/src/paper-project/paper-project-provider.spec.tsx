import React from 'react';
import { render } from '@testing-library/react';

import PaperProjectProvider from './paper-project-provider';

describe('PaperProjectProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PaperProjectProvider />);
    expect(baseElement).toBeTruthy();
  });
});
