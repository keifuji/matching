import React from 'react';
import logo from './logo.svg';
import './App.css'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import awsconfig from './aws-exports'

//import withCognitoCredentials from './auth/hocs/withCognitoCredentials'
import withCognitoUserIfno from './auth/hocs/withCognitoUserInfo'
import ObjectViewer from './lib/components/ObjectViewer'
import Todos from './pages/todos'


/**
 * AWS Amplify
 */
Amplify.configure(awsconfig)

interface Props {
  title?: string,
  credentials?: {},
  children?: React.ReactNode,
  userInfo?: {
    username?: string,
    attributes?: {},
  },
}

const Component: React.ComponentType<Props> = ({
  title,
  children,
  credentials,
  userInfo,
}: Props) => {
  const { username, attributes } = userInfo || {}
  return (
    <div>
      <h1>{title}</h1>
      <p>{children}</p>
      <div>
        <h3>{username}</h3>
      </div>
      <div>
        <ObjectViewer {...attributes} />
      </div>
    </div>
  )
}

const WrappedComponent: React.ComponentType<Props> = withCognitoUserIfno(Component)

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div>
          <Todos />
        </div>

        <WrappedComponent title="Credentials">
          テスト2
        </WrappedComponent>

      </header>
    </div>
  );
}

export default withAuthenticator(App, true)