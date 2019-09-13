import React from 'react'
import withTodoMutations from '../hocs/withTodoMutations'
import TodoItem from './TodoItem'

const TodoList = ({
    items = [],
    deleteTodo,
}) => {
    console.log('TodoList.items', items)
    return (
        <div style={{textAlign: 'left'}}>
            {items.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    deleteTodo={deleteTodo}
                    {...todo}
                />
            ))}
        </div>
    )
}

// 削除等のハンドラを渡す

export default withTodoMutations( TodoList )