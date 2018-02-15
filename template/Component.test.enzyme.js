import React from 'react';
import { shallow } from 'enzyme';

import <%= componentName %> from './<%= fileName %>';

describe('<%= componentName %>', () => {
  it('renders <%= componentName %>', () => {
    const component = shallow(<<%= componentName %> />);

    expect(component).toMatchSnapshot();
  });
});
