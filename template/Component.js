import React from 'react';
<% if (css) { %>
import './<%= fileName %>.<%= css %>';
<% } %>
const <%= componentName %> = () => (
  <div>
    <h1><%= componentName %></h1>
  </div>
);

export default <%= componentName %>;
