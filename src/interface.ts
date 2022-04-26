import type Keyv from 'keyv';

export interface DataSourceConfig<TContext> {
  contextValue: TContext;
  cache: Keyv<string>;
}

export abstract class DataSource<TContext = any> {
  initialize?(config: DataSourceConfig<TContext>): void | Promise<void>;
}
