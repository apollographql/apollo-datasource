import { ApolloServer } from '@apollo/server';
import gql from 'graphql-tag';
import Keyv from 'keyv';
import { DataSource, dataSourcePlugin } from '..';

class SpyDataSource extends DataSource {
  constructor(spy?: jest.Mock) {
    super();
    this.initialize = spy;
  }
}

describe('dataSourcePlugin', () => {

  let server: ApolloServer;
  afterEach(async () => {
    await server.stop();
  });

  it('provides `dataSources` to the `info` object in resolvers', async () => {
    const dataSourceMap = new Map();
    server = new ApolloServer({
      typeDefs: gql`
        type Query {
          hello: String!
        }
      `,
      resolvers: {
        Query: {
          hello(_, __, ___, info) {
            // ensure the object we passed to the plugin is the same one we see on `info`
            expect(info.dataSources).toBe(dataSourceMap);
            return 'world';
          },
        },
      },
      plugins: [dataSourcePlugin(dataSourceMap)],
    });
  
    await server.start();
    await server.executeOperation({ query: `{ hello }` });

    expect.assertions(1);
  });

  it('calls `initialize` on its dataSources at the beginning of execution', async () => {
    const initializeSpy = jest.fn();
    const mySpyDataSource = new SpyDataSource(initializeSpy);

    const server = new ApolloServer({
      typeDefs: gql`
        type Query {
          hello: String!
        }
      `,
      resolvers: {
        Query: {
          hello() {
            return 'world';
          },
        },
      },
      plugins: [dataSourcePlugin(new Map([['spy', mySpyDataSource]]))],
    });

    await server.start();
    await server.executeOperation({ query: `{ hello }` });

    expect(initializeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        cache: expect.any(Keyv),
        contextValue: {},
      }),
    );

    await server.stop();
  });
});
