import React from 'react'
import { compose } from 'recompose'
import withCognitoUserInfo from '../auth/hocs/withCognitoUserInfo'
//import ConnectTodos from './ConnectTodos'
//import TodoForm from './components/TodoForm'
import SyncTodoList from './components/SyncTodoList'
//import { SyncRoot } from '../appsync/initialize'

const Todos = ({
    todos,
    getTodos,
    userInfo,
}) => {

    const { username }= userInfo || {}

    return (
        <div>
            <div style={{border: 'solid 1px grey'}}>
                <SyncTodoList />
            </div>
            <p>username: {username}</p>
            {/*
            <div style={{border: 'solid 1px grey'}}>
                <SyncRoot />
            </div>
            <h3>Todo Form</h3>
            <TodoForm userId={username} />
            <h3>ConnectTodos</h3>
            <ConnectTodos />
            */}
        </div>
    )
}


const wrapper = compose(
    withCognitoUserInfo,
)

export default wrapper( Todos )
