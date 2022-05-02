import type { BaseContext } from '@apollo/server';
import type Keyv from 'keyv';

export interface DataSourceConfig<TContext extends BaseContext> {
  contextValue: TContext;
  cache: Keyv<string>;
}

export abstract class DataSource<TContext extends BaseContext> {
  initialize?(config: DataSourceConfig<TContext>): void | Promise<void>;
}
