# バックエンド設計

## API

### Overview

* [API Gateway with CloudFormation](https://dev.classmethod.jp/cloud/aws/cfn-support-api-gateway/)

### Detail

* /items/
    * GET
        * 資産一覧を取得
        * Request: Query stringなしの普通のURL
        * Response
            ```
            {
                [
                    {
                        "id": {},
                        "name": {},
                        "owner": {},
                        "category": {},
                        "holder": {},
                        "checkout date": {},
                        "due date":{}
                    },
                    {
                        "id": {},
                        "name": {},
                        "owner": {},
                        "category": {},
                        "holder": {},
                        "checkout date": {},
                        "due date":{}
                    }
                ]
            }
            ```
    * POST
        * 資産を新たに追加
            * 自動採番(UUID)する
        * Request
            ```
            {
                "name": {},
                "owner": {},
                "category": {},
            }
            ```
        * Response
* /items/{id}/
    * GET
        * 資産情報を1件取得
        * Request: Query stringなしの普通のURL
        * Response
            ```
            {
                "id": {},
                "name": {},
                "owner": {},
                "category": {},
                "holder": {},
                "checkout date": {},
                "due date":{}
            }
            ```
    * PUT
        * ステータス更新
        * Request
            ```
            {
                "name": {},
                "owner": {},
                "category": {},
                "holder": {},
                "checkout date": {},
                "due date":{}
            }
            ```
        * Response
    * DELETE
        * 資産を削除
        * Request: Query stringなしの普通のURL
        * Response
            * 成功時
                ```
                204
                ```
* /users/
    * GET
        * ユーザ一覧を取得
        * Request
        * Response
* /users/{id}/
    * GET
        * ユーザ情報の取得
        * Request: Query stringなしの普通のURL
        * Response
    * POST
        * ユーザの追加
            * 自動採番(UUID)する
        * Request
        * Response
    * DELETE
        * ユーザの削除
            * かならずしも本当にDeleteItemしなくてもよい?
            * ある資産の所有者が退会した場合、その資産はどうするか
                * 削除
                * 所有者を指定して引き継がせる
        * Request: Query stringなしの普通のURL
        * Response
            ```
            {
                "target":<id>,
                "status":<status>
            }
            ```

## DynamoDB

* Global v. Local Secondary index
    * Global: 柔軟だけど厳密でない
        * あとでいろいろいじれる
        * 射影した値しか取れない
    * Local: 厳密だけど変更が効かない
        * テーブル作成時に決定
        * 他の属性もごっそりとれる
* ConsistentReadOption
    * 3つのレプリケーションのうち二つから読む
        * 一致すれば値を返す
        * 一致しなければ、残り一つのレプリケーションから読み一致するものを返す
    * 別にGlobal Secondary Indexでも対応はしてる
        * > Global secondary indexes support eventually consistent reads, each of which consume one half of a read capacity unit. This means that a single global secondary index query can retrieve up to 2 × 4 KB = 8 KB per read capacity unit.
