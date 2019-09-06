import React from 'react';
import logo from './logo.svg';
import './App.css'
import Amplify from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import awsconfig from './aws-exports'

/**
 * AWS Amplify
 */
Amplify.configure(awsconfig)

const Component = ({
  title,
  children,
}: { title: string, children: any}) => (
  <div>
    <h1>{title}</h1>
    <p>{children}</p>
  </div>
)

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Component title="タイトル">
          テスト
        </Component>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>テスト...</p>
      <div>Emmet Abbreviation</div>
      </header>
    </div>
  );
}

export default withAuthenticator(App, true)
