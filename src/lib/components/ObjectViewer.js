import React from 'react'


const ObjectViewer = ({
    root = 'ul',
    item = 'li',
    ...props,
}) => {
    const Root = root
    const Item = item
    return (
        <Root style={{textAlign: 'left'}}>
            {Object.keys(props).map(key => {
                const value = props[key]
                return (
                    <Item key={key}>
                        <span>{ key }</span>
                        <span>:&nbsp;</span>
                        <strong>{ value.toString() }</strong>
                    </Item>
                )
            })}
        </Root>
    )
}

export default ObjectViewer