import { buildSchema } from "graphql";
import fs from 'fs';

let fileData = '';

try {
  const data = fs.readFileSync('src/schema.gql', 'utf8');
  fileData = data;
} catch (err) {
  console.error(err);
}

const schema = buildSchema(fileData);

export default schema;
