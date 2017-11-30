# バックエンド設計

## API

### Overview

* [API Gateway with CloudFormation](https://dev.classmethod.jp/cloud/aws/cfn-support-api-gateway/)
* JSONインジェクション対策として、リストを返す際は{}で包む

### Detail

* /items/
    * GET
        * 資産一覧を取得
        * Response
            ```
            {
                [
                    {
                        "id": 1,
                        "name": "The Great Gatsby",
                        "owner": "John Smith",
                        "category": "Book",
                        "holder": "Adam Anderson",
                        "checkout date": "2017-11-23",
                        "due date": "2017-11-30"
                    },
                    {
                        "id": 2,
                        "name": "Software Design 2017/12",
                        "owner": "Tom Brown",
                        "category": "Book",
                        "holder": null,
                        "checkout date": null,
                        "due date":null
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
                "name": "Pride and Prejudice",
                "owner": Yang Meiling,
                "category": "Book",
            }
            ```
        * Response
* /items/{id}/
    * GET
        * 資産情報を1件取得
        * Response
            ```
            {
                "id": 2,
                "name": "Software Design 2017/12",
                "owner": "Tom Brown",
                "category": "Book",
                "holder": null,
                "checkout date": null,
                "due date":null
            }
            ```
    * PUT
        * ステータス更新
        * Request
            ```
            {
                "name": "Software Design 2017/12",
                "owner": "Tom Brown",
                "category": "Book",
                "holder": null,
                "checkout date": null,
                "due date":null
            }
            ```
        * Response
            ```
            {
                "id": 2,
                "name": "Software Design 2017/12",
                "owner": "Tom Brown",
                "category": "Book",
                "holder": null,
                "checkout date": null,
                "due date":null
            }
            ```
    * DELETE
        * 資産を削除
        * Response
            * 成功時
                ```
                204
                ```
* /users/
    * GET
        * ユーザ一覧を取得
        * Response
            ```
            {
                [
                    {
                        "id": 1,
                        "name": "Tom Brown"
                    },
                    {
                        "id": 2,
                        "name": "Bob Hunter"
                    }
                ]
            }
            ```
    * POST
        * ユーザの追加
            * 自動採番(UUID)する
        * Request: Query stringなしの普通のURL
           ```
           {
               "name": "Edward Elric"
           }
           ```
        * Response
           ```
           {
               "id" : 3,
               "name": "Edward Elric"
           }
           ```
* /users/{id}/
    * GET
        * ユーザ情報の取得
        * Response
            ```
            {
                "id": 123,
                "name": Larry Carlton,
                "checkout":[
                    {
                        "id": 1,
                        "name": "The Great Gatsby",
                        "checkout date" : "2017-12-1",
                        "due date": "2017-12-7"
                    },
                    {
                        "id": 45,
                        "name": "Harry Potter and the Chamber of Secrets",
                        "checkout date" : "2017-12-1",
                        "due date": "2017-12-7"
                    }
            }
            ```
    * PUT
        * ユーザー情報の更新
        * Request
           ```
           {
               "checkout": null
           }
           ```
        * Response
           ```
           {
               "id": 5,
               "name": "Winry Rockbell",
               "checkout": null
           }
           ```
    * DELETE
        * ユーザの削除
            * かならずしも本当にDeleteItemしなくてもよい?
            * ある資産の所有者が退会した場合、その資産はどうするか
                * 削除
                * 所有者を指定して引き継がせる
        * Response
             ```
             204
             ```

## DynamoDB

* Global v. Local Secondary index
    * Global: 柔軟だけど厳密でない
        * あとでいろいろいじれ(最初は作れない)
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
