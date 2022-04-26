import type { DataSource } from '.';
import type { ApolloServerPlugin } from '@apollo/server';

export function dataSourcePlugin<TContext>(
  dataSources: Map<string, DataSource<TContext>>,
): ApolloServerPlugin<TContext> {
  return {
    async requestDidStart() {
      return {
        async executionDidStart({ contextValue, cache }) {
          const initializers: any[] = [];
          for (const dataSource of dataSources.values()) {
            if (dataSource.initialize) {
              initializers.push(
                dataSource.initialize({
                  contextValue,
                  cache,
                }),
              );
            }
          }

          await Promise.all(initializers);
          return {
            willResolveField({ info }) {
              info.dataSources = dataSources;
            },
          };
        },
      };
    },
  };
}
