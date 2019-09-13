import React from 'react'


const TodoItem = ({
    id, userId, name, description,
    deleteTodo,
}) => (
    <div key={id}>
        <button
            onClick={e => {
                e.preventDefault()
                deleteTodo(id)
            }}
        >
            {'x'}
        </button>
        <span title={id}>{userId}</span>
        <span>: </span>
        <strong>{name}</strong>
        <span>: </span>
        <span>{description}</span>
    </div>
)


export default TodoItem