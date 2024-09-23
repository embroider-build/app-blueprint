import { pageTitle } from 'ember-page-title';
<% if (welcome) {%>import { WelcomePage } from 'ember-welcome-page';<% } %>

export default Route(
  <template>
    {{pageTitle "<%= namespace %>"}}
    <% if (welcome) { %>
    {{outlet}}

    {{! The following component displays Ember's default welcome message. }}
    <WelcomePage />
    {{! Feel free to remove this! }}<% } else { %>
    <h2 id="title">Welcome to Ember</h2>

    {{outlet}}<% } %>
  </template>
);
