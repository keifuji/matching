#マッチングアプリのひな型(またはサンプル)
* ユーザーどうしのマッチング
* 同形の相手を探す場合もあるが、ここでは非対称なバージョンで考える。(その方が多い)
    * ただし、いずれもユーザーである。
    * 対称的な場合は、その特殊な例と考えればよい。

##手続きtodo
+ create-react-appでひな型を作成
    *  --typescriptを利用
- amplify
    - cognitoで認証
    - apiでgraphQL、DynamoDBと接続
        ? スキーマをどこで作るのか？
- git
    * githubにしておく？
    * memo.mdはignoreしておこう。
- amplify consoleでdeployしたい
    ? gitに登録して、あとはビルドコマンドを与えるのか...?

##パッケージ
* いれるもの
    - react-router-dom
    ? redux