import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ALL_USERS, GET_USER } from './graphql/query/user'
import './App.css'
import { CREATE_USER } from './graphql/mutation/user'

function App() {
  const {
    data: allLoadedUsers,
    loading: usersLoading,
    refetch,
  } = useQuery(GET_ALL_USERS)
  const { data: user, loading: userLoading } = useQuery(GET_USER, {
    variables: { id: 1 },
  })
  console.log('App -> user', user)
  const [createUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [age, setAge] = useState(0)

  useEffect(() => {
    console.log(allLoadedUsers)

    if (!usersLoading) {
      setUsers(allLoadedUsers.getAllUsers)
    }
  }, [allLoadedUsers, usersLoading])

  async function addUser() {
    const user = await createUser({
      variables: {
        input: { username, age },
      },
    })
    // setUsers((oldUsers)=> [...oldUsers])
  }

  async function getAllLoadedUsers() {
    await refetch()
  }

  if (usersLoading) {
    return <h1>usersLoading...</h1>
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <input
          type='text'
          placeholder='username'
          name='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='number'
          placeholder='age'
          name='age'
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <div className='btns'>
          <button onClick={addUser}>Create</button>
          <button onClick={getAllLoadedUsers}>Get</button>
        </div>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.id}: {user.username} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
