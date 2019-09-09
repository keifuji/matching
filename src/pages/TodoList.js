import React from 'react'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { API, graphqlOperation } from 'aws-amplify'
import { onCreateTodo } from '../graphql/subscriptions'

const TodoList = ({
    todos,
}) => {
    return (
        <div>
            <h4>Todo List</h4>
            {todos.map(({ id, userId, name, description}) => (
                <div key={id}>
                    <strong title={id}>{userId}</strong>
                    <span>: </span>
                    <span>{name}</span>
                    <span>: </span>
                    <span>{description}</span>
                </div>
            ))}
        </div>
    )
}


const withSubscriptionState = withStateHandlers({
    subscription: null,
    todos: [],
}, {
    setSbuscription: () => subscription => ({
        subscription
    }),
    setTodo: ({todos}) => (todo) => ({ 
        todos: [ 
            ...todos,
            todo,
        ]
    }),
})

const withSubscribe = lifecycle({
    componentDidMount() {
        const { setSbuscription, setTodo } = this.props
        const subscription = API.graphql(
            graphqlOperation(onCreateTodo)
        ).subscribe({
            //next: (todoData) => console.log('subscribe:next', todoData)
            next: data => {
                console.log('subscription[createTodo]', data)
                console.log(JSON.stringify(data))
                const newTodo = data.value.data.onCreateTodo
                setTodo(newTodo)
            }
        })
        setSbuscription(subscription)
    },
    componentWillUnmount() {
        const { subscription } = this.props
        if(subscription) {
            subscription.unsubscribe()
        }
    }
})


const wrapper = compose(
    withSubscriptionState,
    withSubscribe,
)

export default wrapper(TodoList)