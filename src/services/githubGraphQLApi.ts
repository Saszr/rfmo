import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const rfmo = localStorage.getItem('rfmo')!;
const access_token = JSON.parse(rfmo).token;
const authorization = `token ${access_token}`;

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization,
  },
});

export const delete_issue_gql = gql`
  mutation DeleteIssue($node_id: String!) {
    deleteIssue(input: { issueId: $node_id }) {
      repository {
        id
      }
    }
  }
`;
