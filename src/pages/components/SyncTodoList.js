import React from 'react'
import { compose, mapProps, lifecycle } from 'recompose'
import gql from 'graphql-tag'
import { graphql, ApolloConsumer, Query } from 'react-apollo'
//import { graphqlMutation } from 'aws-appsync-react'
import { buildSubscription } from 'aws-appsync'
import { withApolloProvider } from '../../appsync/initialize'
import { listTodos } from '../../graphql/queries'
//import { deleteTodo } from '../../graphql/mutations'
import { onCreateTodo, onDeleteTodo } from '../../graphql/subscriptions'
import TodoItem from './TodoItem'
import { withDeleteTodo } from '../hocs/withTodoMutations'
import TodoForm from './TodoForm'



const List = ({
    todos,
    loading,
    error,
    deleteTodo,
    ...others,
}) => {
    console.log('Sync List todos', {
        todos,
        loading,
        error,
        deleteTodo,
        others,
    })

    if(loading) return (<div>loading</div>)
    if(error) return (<div>error</div>)
    if(!todos) return (<div>No todos</div>)
    return (
        <div style={{textAlign: 'left'}}>
            {todos.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    deleteTodo={id => deleteTodo({input: {id}})}
                    {...todo} 
                /> ))}
        </div>
    )
}


const withListTodos = graphql(gql( listTodos ), {
    options: {
        fetchPolicy: 'cache-and-network',
    },
    props: props => { 
        return ({
            todos: props.data.listTodos ? props.data.listTodos.items : []
        })
    },
})

const WrappedList = withListTodos(List)

const withData = mapProps(({
    data,
    loading,
    error,
    subscribeToMore,
    ...others,
}) => { 
    if(loading || error) {
        return {
            loading,
            error,
            todos: [],
        }
    }
    const { listTodos } = data || {}
    return {
        loading,
        error,
        todos: listTodos ? listTodos.items : [],
        subscribeToMore,
    }
})

const withSubscription = lifecycle({
    componentDidMount() {
        const { subscribeToMore } = this.props
        if(subscribeToMore) {
            const res = subscribeToMore(
                buildSubscription(gql(onDeleteTodo), gql(listTodos))
            )
            const res2 = subscribeToMore(
                buildSubscription(gql(onCreateTodo), gql(listTodos))
            )
            // さらにonUpdateTodoを追加する
            console.log('Subscription done', { res, res2 })
        }
    }
})

/**
 * やること:
 * - ローカルのステートで、特定のtodoを選択可能にする
 * - 選択したtodoをフォームで編集してupdateできるように
 * - onUpdateTodoをsubscriptionする
 */

const AdaptedList = compose(
    withData,
    withSubscription,
    withDeleteTodo,
)(List)

const SyncTodoList = () => {

    return (
        <div>
            <h3>
                SyncTodoList
            </h3>
            <div>
                <TodoForm />
            </div>
            {/**
            <div>
                <ApolloConsumer>
                    {client => { console.log('ApolloConsumer [client]', client) ; return 'ApolloConsumer OK'}}
                </ApolloConsumer>
            </div>
            */}
            <div>
                <h5>Query</h5>
                <div>
                    <Query
                        query={gql( listTodos )}
                        fetchPolicy={ 'cache-and-network' }
                    >
                        {props => (<AdaptedList {...props}/>)}
                    </Query>
                    {/*
                    */}
                </div>

                <div>
                    {/**
                    <h5>WrappedList</h5>
                    <WrappedList />
                     */}
                </div>
            </div>
            <div>
                <List />
            </div>
        </div>
    )
}


export default withApolloProvider( SyncTodoList )
