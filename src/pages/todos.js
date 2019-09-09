import React from 'react'
import { compose, withStateHandlers, withHandlers } from 'recompose'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import withCognitoUserInfo from '../auth/hocs/withCognitoUserInfo'
import TodoList from './TodoList'


const Input = ({
    type,
    name,
    label,
    value,
    onChange,
}) => { 
    //console.log(`Input: [${name}]: ${value}`)
    return (
        <div>
            <label>
                {`${ label }: `}
                <input 
                    id={name}
                    type="text" 
                    name={name}
                    value={value}
                    onChange={(e) => {
                        onChange(name, e.target.value)
                    }}
                />
            </label>
        </div>
    )
}

const Form = ({
    currentTodo,
    onChange,
    onSubmit,
}) => { 
    //console.log('currentTodo', currentTodo)
    const { name, description } = currentTodo || {}
    return (
        <div>
            <form onSubmit={onSubmit}>
                <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={name || ''}
                    onChange={onChange}
                />
                <Input
                    label="Description"
                    type="text"
                    name="description"
                    value={description || ""}
                    onChange={onChange}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    ) 
}

const withAddTodo = withStateHandlers({ currentTodo: {} }, {
    onSubmit: ({currentTodo}, {userId}) => async (e) => {
        e.preventDefault()
        //const base = Math.random().toString(36).slice(-8)
        const input = {
            userId,
            ...currentTodo,
        }
        try {
            console.log('add new Todo', input)
            const newTodo = await API.graphql(graphqlOperation(createTodo, {input}))
            if(newTodo) {
                console.log(newTodo)
                alert('Success')
                return {
                    currentTodo: {} // asyncだから効かないので、一つ上の階層にする必要がある
                }
            }
        } catch(err) {
            console.error(err)
            alert('Caught an error')
        }
    },
    onChange: ({currentTodo}) => (key, value) => ({ 
        currentTodo: {
            ...currentTodo,
            [key]: value,
        }
    }),
})


const TodoForm = withAddTodo(Form)

const Todos = ({
    todos,
    getTodos,
    userInfo,
}) => {

    console.log('Todos', todos)

    const { username }= userInfo || {}

    return (
        <div>
            <h3>Todo Form</h3>
            <p>username: {username}</p>
            <TodoForm userId={username} />
            <div>
                <TodoList />
            </div>
            <h3>Todos</h3>
            <button onClick={getTodos}>Get</button>
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

const withListTodos = withHandlers({
    getTodos: ({setTodos}) => async e => {
        e.preventDefault()
        const result = await API.graphql(graphqlOperation(listTodos))
        const { items } = result.data.listTodos
        console.log('getTodos items', items)
        setTodos(items)
    },
})

const withTodos = withStateHandlers({ todos: [] }, {
    setTodos: () => (newData) => ({
        todos: newData,
    })
})


const wrapper = compose(
    withCognitoUserInfo,
    withTodos,
    withListTodos,
)

export default wrapper( Todos )
