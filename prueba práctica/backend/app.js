const express = require('express');
const app = express();
const morgan=require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

require('dotenv/config');
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

mongoose
  .connect(    
    process.env.CONNECTION_STRING,
    {
      useNewUrlParser:true,
      useUnifiedTopology:true,
      dbName:process.env.DB_Name
    }
  )
  .then(() => {
    const PORT=process.env.PORT || 3000;
    app.listen(PORT,()=>{
      console.log('server is running http://localhost:3000');});
  })
  .catch((err) => console.log(err));
