import React from 'react'
import AWSAppSyncClient/*, { AUTH_TYPE }*/ from 'aws-appsync'
import { Auth } from 'aws-amplify'
import awsconfig from '../aws-exports'
import { ApolloProvider } from 'react-apollo'
import { Rehydrated } from 'aws-appsync-react'
//import Rehydrated from './Rehydrated'

const params = {
    url: awsconfig.aws_appsync_graphqlEndpoint,
    region: awsconfig.aws_appsync_region,
    disableOffline: false,
    auth: {
        //type: AUTH_TYPE.API_KEY,
        //apiKey: awsconfig.aws_appsync_apiKey,
        type: awsconfig.aws_appsync_authenticationType,
        // ↓のは、Amplifyの公式のドキュメントには載っていなかった
        jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
    },
}

console.log('Connect AWSAppSyncClient', params)

const client = new AWSAppSyncClient(params)

export const getClient = () => client

// 続きは、ここからProviderをセットする
// https://github.com/awslabs/aws-mobile-appsync-sdk-js
// これのReactのところを見る
// 
// Apollo3.0に対応していないので、以下だとエラーがでる。
// 解消するには、面倒なようで、
// https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/448
// ここの解決法によるしかない？
//      カスタムなRehydrateコンポーネントを使うという方法 -> ダメ
//      npmにはresolutionsがない？ yarnならどうか...?
//
// これでも上手くいかないので、バージョンを戻すことにする


export const withApolloProvider = Comp => props => { 
    //console.log('withApolloProvider', {client})
    return (
        <ApolloProvider client={client}>
            <Rehydrated>
                <Comp {...props} />
            </Rehydrated>
        </ApolloProvider>
    )
}

export const SyncRoot = () => {
    return (
        <ApolloProvider client={client}>
            <Rehydrated>
                <div>SyncRoot</div>
            </Rehydrated>
        </ApolloProvider>
    )
}