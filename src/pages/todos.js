import React from 'react'
import { compose } from 'recompose'
import withCognitoUserInfo from '../auth/hocs/withCognitoUserInfo'
import TodoList from './TodoList'
import ConnectTodos from './ConnectTodos'
import TodoForm from './components/TodoForm'

const Todos = ({
    todos,
    getTodos,
    userInfo,
}) => {

    const { username }= userInfo || {}

    return (
        <div>
            <h3>Todo Form</h3>
            <p>username: {username}</p>
            <TodoForm userId={username} />
            <div>
                <TodoList />
            </div>
            <h3>ConnectTodos</h3>
            <ConnectTodos />
        </div>
    )
}


const wrapper = compose(
    withCognitoUserInfo,
)

export default wrapper( Todos )
