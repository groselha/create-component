import React from 'react';
import { storiesOf } from '@storybook/react';
import <%= name.componentName %> from './<%= name.componentName %>';

storiesOf('<%= name.componentName %>', module)
  .add('default', () => (
    <<%= name.componentName %> />
  ));
