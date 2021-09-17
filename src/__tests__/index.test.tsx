import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import HichlightCore from '../components/HighlightCore/index'

describe('unit test...', () => {
  test('renders correctly', () => {
    const Wrapper = render(<HichlightCore />);
    expect(Wrapper).toMatchInlineSnapshot()
  });
});
