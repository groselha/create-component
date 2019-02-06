import React from 'react';
import Enzyme from 'enzyme';

import <%= componentName %> from './<%= fileName %>';

describe('<%= componentName %>', () => {
  it('renders <%= componentName %>', () => {
    const component = Enzyme.shallow(<<%= componentName %> />);

    expect(component).toMatchSnapshot();
  });
});
