import React from 'react';
import { render } from '@testing-library/react';

import InspectorProvider from './inspector-provider';

describe('InspectorProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InspectorProvider />);
    expect(baseElement).toBeTruthy();
  });
});
