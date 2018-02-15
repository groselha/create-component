import React from 'react';
import renderer from 'react-test-renderer';

import <%= componentName %> from './<%= fileName %>';

describe('<%= componentName %>', () => {
  it('renders <%= componentName %>', () => {
    const component = renderer.create(<<%= componentName %> />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
