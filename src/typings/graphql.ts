import type { DataSource } from '..';

declare module 'graphql' {
  interface GraphQLResolveInfo {
    dataSources: Map<string, DataSource>;
  }
}
