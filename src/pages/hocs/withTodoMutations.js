import { withHandlers } from 'recompose'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'


const withTodoMutations = withHandlers({
    deleteTodo: () => async (id) => {
        const options = {
            input: {
                id,
            }
        }
        const res = await API.graphql(graphqlOperation(mutations.deleteTodo, options))

        console.log(`DELETE: ${id}`, res)
    },

    addTodo: ({userId}) => async (todo) => {
        if(!userId) {
            throw new Error('withTodoMutations.addTodo: userIdがありません！')
        }
        try {
            const input = {
                userId,
                ...todo,
            }
            const newTodo = await API.graphql(graphqlOperation(mutations.createTodo, {input}))
            return newTodo
        } catch(err) {
            console.log(err)
            alert('Caught an error!')
        }
    },
})

export default withTodoMutations