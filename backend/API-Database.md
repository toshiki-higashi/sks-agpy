# バックエンド設計

## API

### Overview

* [API Gateway with CloudFormation](https://dev.classmethod.jp/cloud/aws/cfn-support-api-gateway/)

### Detail

* /items/
    * GET
        * 資産一覧を取得
        * Request
        * Response
* /items/{id}/
    * GET
        * 資産情報を取得
        * Request
        * Response
    * PUT
        * ステータス更新
            * 自分の所有物ではないので、貸出状態の更新のみ?
        * Request
        * Response
* /users/{id}/
    * GET
        * ユーザ一覧を取得
        * Request
        * Response
* /users/{id}/
    * GET
        * ユーザ情報の取得
        * Request
        * Response
    * POST
        * ユーザの追加
            * 自動採番なら{id}はいくつになる?
        * Request
        * Response
    * DELETE
        * ユーザの削除
            * かならずしも本当にDeleteItemしなくてもよい?
        * Request
        * Response
* /users/{id}/items/
    * GET
        * ユーザの所有する資産の一覧を取得
        * Request
        * Response
* /users/{id}/items/{id}/
    * GET
        * 所有する資産の詳細を取得
        * Request
        * Response
    * POST
        * 資産を新たに追加
            * 自動採番なら{id}はいくつになる?
            * ユーザにぶら下げてやるか、/items/{id}/でやるか
            * 所有者が退会した場合、その資産はどうするか
                * 削除
                * 所有者をだれかしていさせて引き継がせる
        * Request
        * Response
    * PUT
        * ステータス更新
            * 自分の所有物なので、詳細を変更可能にする?
        * Request
        * Response
    * DELETE
        * 資産を削除
            * かならずしも本当にDeleteItemしなくてもよい?
            * ユーザにぶら下げてやるか、/items/{id}/でやるか
        * Request
        * Response

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
