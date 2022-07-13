> Note: this repo has been archived. For Apollo Server v4, our intention was to publish this package separately. We have since decided to no longer support the idea of a DataSource interface at all, since it's a very light abstraction that isn't really necessary. For more details, see https://github.com/apollographql/apollo-server/issues/6047

# Apollo DataSource

The `@apollo/datasource` package exports an `abstract class` to be implemented by `DataSource` authors. An implementation of a `DataSource` is simply a means for fetching data. Aside from the `initialize` function (used to provide `cache` and `context` objects), `ApolloServer` is agnostic to _how_ a `DataSource` is used and how it goes about fetching data.

Visit [the documentation](https://www.apollographql.com/docs/apollo-server/data/data-sources/) for information on how `DataSource`s are used and implemented.
