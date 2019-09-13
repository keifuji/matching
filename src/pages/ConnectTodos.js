import React from 'react'
import { graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'

import * as queries from '../graphql/queries'
import * as subscriptions from '../graphql/subscriptions'

import TodoList from './components/TodoList'

const ConnectTodos = () => (
    <div>
        <Connect
            query={graphqlOperation(queries.listTodos)}
            // 複数のsubscriptionを受け取ることは可能か？
            // onDeleteTodoにも反応させたいのだが
            // それともConnectを使うなら二段階にしないといけないのか？
            subscription={graphqlOperation(subscriptions.onCreateTodo)}
            onSubscriptionMsg={(prev, { onCreateTodo }) => {
                console.log('onCreateTodo', { prev, onCreateTodo })
                return prev
            }}
        >
            {({ data: { listTodos }, loading, errors }) => {
                if(errors && errors.length > 0) {
                    console.warn('errors', { errors, listTodos, loading })
                    return (
                        <h3>Error</h3>
                    )
                }
                if(loading) return (
                    <h3>Loading...</h3>
                )
                console.log('ConnectTodos', {listTodos})
                return (
                    <TodoList items={listTodos.items} />
                )
            }}
        </Connect>
    </div>
)


export default ConnectTodos