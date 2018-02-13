import React from 'react';
<% if (css) { %>
import './<%= name.componentName %>.<%= css %>';
<% } %>
const <%= name.componentName %> = () => (
  <div>
    <h1><%= name.componentName %></h1>
  </div>
);

export default <%= name.componentName %>;
