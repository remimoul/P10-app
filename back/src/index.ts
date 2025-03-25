import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { resolvers } from './resolvers';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}))

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
