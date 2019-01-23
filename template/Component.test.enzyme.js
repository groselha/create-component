import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import <%= componentName %> from './<%= fileName %>';

Enzyme.configure({ adapter: new Adapter() })

describe('<%= componentName %>', () => {
  it('renders <%= componentName %>', () => {
    const component = Enzyme.shallow(<<%= componentName %> />);

    expect(component).toMatchSnapshot();
  });
});
