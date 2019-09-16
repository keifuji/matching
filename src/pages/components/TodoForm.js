import React from 'react'
import { compose, withStateHandlers } from 'recompose'
//import withTodoMutations from '../hocs/withTodoMutations'
import { withCreateTodo } from '../hocs/withTodoMutations'
import withCognitoUserInfo from '../../auth/hocs/withCognitoUserInfo'


const Input = ({
    type,
    name,
    label,
    value,
    onChange,
}) => { 
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
    reset,
}) => { 
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
                <button type="button" onClick={reset}>
                    Reset
                </button>
            </form>
        </div>
    ) 
}

const withAddTodo = withStateHandlers({ currentTodo: {} }, {
    onSubmit: ({currentTodo}, {createTodo, userInfo }) => async (e) => {
        e.preventDefault()
        try {
            const { username } = userInfo || {}
            if(!username) {
                alert('ユーザーがログインしていません')
                return
            }
            const input = {
                userId: username,
                ...currentTodo,
            }
            console.log('onSubmit', { input } )
            const newTodo = await createTodo({ input })
            console.log('newTodo', input)
        } catch(err) {
            console.warn('onSubmit error', err)
        }
        return { currentTodo: {} }
    },
    onChange: ({currentTodo}) => (key, value) => ({ 
        currentTodo: {
            ...currentTodo,
            [key]: value,
        }
    }),
    reset: () => e => {
        e.preventDefault()
        return { currentTodo: {} }
    },
})

const formWrapper = compose(
    //withTodoMutations,
    withCognitoUserInfo,
    withCreateTodo,
    withAddTodo,
)

const TodoForm = formWrapper(Form)

export default TodoForm