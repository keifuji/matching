import { getClient } from './initialize'
import gql from 'graphql-tag'
import { listTodos } from '../graphql/queries'

const client = getClient()

export const queryListTodos = () => {
    client.query({
        query: gql(listTodos)
    }).then(({ data: { listTodos }}) => {
        console.log('queryListTodos RESULT', {
            items: listTodos.items
        })
    }).catch(e => {
        console.log('queryListTodos ERROR', e)
    })
}