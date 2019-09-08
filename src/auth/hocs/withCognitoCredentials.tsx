import React from 'react'
import { withState, compose } from 'recompose'
import { Auth } from 'aws-amplify'

interface CompProps {
    credentials: {},
}

interface Props {
    credentials: {},
    setCredentials: (credentials: {}) => void,
}


const withCredentialSetter = ( Comp: React.ComponentType<CompProps> ) => {

    class CredentialSetter extends React.Component<Props, {}> {

        set = async () => {
            const { setCredentials } = this.props
            const currentCredentials = await Auth.currentCredentials()
            if(currentCredentials) {
                console.log('Set currentCredentials', currentCredentials)
                setCredentials(currentCredentials)
            }
        }

        render() {
            const { credentials, setCredentials, ...otherProps } = this.props
            if(!credentials) {
                this.set()
            }

            return (
                <Comp credentials={credentials} {...otherProps} />
            )
        }
    }

    return CredentialSetter

}

interface Inner {
}
interface Outer {
    //title: string,
    credentials?: {},
    //children: React.ReactNode,
}

const withCognitoCredentials = compose<Outer, Inner>(
    withState('credentials', 'setCredentials', null),
    withCredentialSetter,
    //lifecycle<Props, {}>({
    //    async componentDidMount() {
    //        const { credentials, setCredentials } = this.props
    //        if(!credentials) {
    //            const newCredentials = await Auth.currentCredentials() || {}
    //            setCredentials(credentials)
    //        }
    //    }
    //}),
)

export default withCognitoCredentials