import React from 'react'
import { withState, compose } from 'recompose'
import { Auth } from 'aws-amplify'

interface CompProps {
    userInfo?: {},
}

interface Props {
    userInfo: {},
    setUserInfo: (userInfo: {}) => void,
}


const withUserInfoGetter = ( Comp: React.ComponentType<CompProps> ) => {

    class UserInfoGetter extends React.Component<Props, {}> {

        set = async () => {
            const { setUserInfo } = this.props
            const currentUserInfo = await Auth.currentUserInfo()
            if(currentUserInfo) {
                console.log('Set currentUserInfo', currentUserInfo)
                setUserInfo(currentUserInfo)
            }
        }

        render() {
            const { userInfo, setUserInfo, ...otherProps } = this.props
            if(!userInfo) {
                this.set()
            }

            return (
                <Comp userInfo={userInfo} {...otherProps} />
            )
        }
    }

    return UserInfoGetter

}

interface Inner {
}

interface Outer {
    userInfo?: {},
}

const withCognitoUserInfo = compose<Outer, Inner>(
    withState('userInfo', 'setUserInfo', null),
    withUserInfoGetter,
)

export default withCognitoUserInfo