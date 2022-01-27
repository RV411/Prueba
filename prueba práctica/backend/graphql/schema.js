const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type User {
    _id: ID!
    nombre: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    telefono: String!
    calle: String!
    codigoPostal: String!
    ciudad: String!
    pais: String!
  }
  type UserData {
    users: [User!]!
  }
  input UserInputData {
    nombre: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    telefono: String!
    calle: String!
    codigoPostal: String!
    ciudad: String!
    pais: String!
  }
  type RootQuery {
    users: UserData!
  }
  type RootMutation {
    createUser(userInput: UserInputData): User!
    updateUser(id: ID!, userInput: UserInputData): User!
    deleteUser(id: ID!): User!
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
