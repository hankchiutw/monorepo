import React from 'react';
import { render } from '@testing-library/react';

import ColorInspector from './color-inspector';

describe('ColorInspector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ColorInspector />);
    expect(baseElement).toBeTruthy();
  });
});
