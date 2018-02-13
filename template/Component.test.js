import React from 'react';
import { shallow } from 'enzyme';

import <%= name.componentName %> from './<%= name.componentName %>';

describe('<%= name.componentName %>', () => {
  it('renders <%= name.componentName %>', () => {
    const component = shallow(<<%= name.componentName %> />);

    expect(component).toMatchSnapshot();
  });
});
