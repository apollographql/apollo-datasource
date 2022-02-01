# Apollo DataSource

The `@apollo/datasource` package exports an `abstract class` to be implemented by `DataSource` authors. An implementation of a `DataSource` is simply a means for fetching data. Aside from the `initialize` function (used to provide `cache` and `context` objects), `ApolloServer` is agnostic to _how_ a `DataSource` is used and how it goes about fetching data.

Visit [the documentation](https://www.apollographql.com/docs/apollo-server/data/data-sources/) for information on how `DataSource`s are used and implemented.