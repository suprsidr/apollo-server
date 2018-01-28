import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import resolvers from './resolvers';
//import mocks from "./mocks";

const typeDefs = `
type Query {
  student(sid: ID): Student
  allStudents: [Student]
}
type Student {
  name: Name
  dob: String
  picture: Picture
  location: Location
  phone: String
  cell: String
  email: String
  registered: Int
  major: String
  gpa: String
  sid: ID!
  modified: Float
  mdifiedby: String
}
type Name {
  first: String
  last: String
}
type Picture {
  large: String
}
type Location {
  street: String
  city: String
  state: String
  postcode: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// addMockFunctionsToSchema({ schema, mocks });

export default schema;
