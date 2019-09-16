import React, { useContext, useEffect, useState } from 'react';
import { getApolloContext } from 'react-apollo';
import AWSAppSyncClient from 'aws-appsync';

const Rehydrated = ({ children }) => {
  const { client } = useContext(getApolloContext());
  const [rehydrated, setState] = useState(false);

  useEffect(() => {
    if (client instanceof AWSAppSyncClient) {
      (async () => {
        await client.hydrated();
        setState(true);
      })();
    }
  }, [client]);
  return rehydrated ? <>{children}</> : null;
};

/**
 * react-apollo 3.0ではcontentの"clietn"がないと言われてしまう
 * https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/448
 * ここからlauribという人の解決策を借用
 */
export default Rehydrated;