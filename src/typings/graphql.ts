import type { DataSource } from '..';

declare module 'graphql' {
  interface GraphQLResolveInfo {
    // too bad we can't get TContext here
    dataSources: Map<string, DataSource<any>>;
  }
}
