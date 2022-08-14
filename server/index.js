const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const users = [
  { id: 1, username: 'Misha', age: 19 },
  { id: 2, username: 'Misha', age: 19 },
]
const schema = require('./schema')

const app = express()
app.use(cors())

const createUser = input => ({ id: Date.now(), ...input })

const root = {
  getAllUsers: () => {
    return users
  },
  getUser: ({ id }) => {
    return users.find(user => user.id == id)
  },
  createUser: ({ input }) => {
    const user = createUser(input)
    users.push(user)
    return user
  },
}

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: { headerEditorEnabled: true },
    schema,
    rootValue: root,
  })
)

app.listen(5000, () => console.log('Server running on 5000'))
