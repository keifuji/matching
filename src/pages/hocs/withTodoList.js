//import React from 'react'
import { compose,  withHandlers, withState } from 'recompose'
import { API, graphqlOperation } from 'aws-amplify'
import { listTodos } from '../../graphql/queries'


const withList = withHandlers({
    getTodos: ({setTodos, filter}) => async () => {
        const options = filter ? { filter } : {}
        const result = await API.graphql(graphqlOperation(listTodos, options))
        //filter: {
        //    description: {
        //        contains: '追加'
        //    }
        //},
        const { items } = result.data.listTodos
        console.log('getTodos items', { items, filter })
        setTodos(items)
    },
})

const withFilter = withState('filter', 'setFilter', null)

const withTodos = withState('todos', 'setTodos', null)


const withTodoList = compose(
    withTodos,
    withFilter,
    withList,
)

export default withTodoList