<template lang="pug">
div#wrapper.container-fluid
  //- Pug(旧Jade)で分かりにくくなっているが
  //- Headerが展開されると<Header></Header>となり、
  //- ここにheader.vueのtemplateの内容がレンダリングされる
  div.row
    div#header.col-12
      Header
  div.row
    div#menu.col-12
      Menu
  div.row
    div#contents.col-12
      router-view(name='ShowItems',:itemListsColumns="itemListsColumns",:itemLists="itemLists")
      //- 下のprops: ['id']で取得したidの情報をちゃんと投げる
      router-view(name='ShowItemDetails',:itemListsColumns="itemListsColumns",:itemLists="itemLists",:id="id")
      router-view(name='AddItem')
      router-view(name='UpdateItem')
      router-view(name='DeleteItem')
</template>

<script>
import axios from 'axios';
// 子コンポーネント呼び出し手順1
import Header from './components/header.vue';
import Menu from './components/menu.vue';

export default {
  // item/details/:id にアクセスした時の:idの値をここに格納
  props: ['id'],
  // 子コンポーネント呼び出し手順2
  components: {
    Header, // `Header: Header` の短縮表記
    Menu // `Menu: Menu` の短縮表記
  },
  data() {
    return {
      // 表のヘッダー行項目一覧
      // (表の日本語は、フロント側が明示的に持つ)
      itemListsColumns: {
        // id: 'ID', //データとして存在するしAPIの結果には帰ってくるが、表には表示しない
        category: 'カテゴリ',
        name: '名前',
        location: '建物',
        place:'場所',
        getDate: '取得日',
        owner: '持ち主',
        borrower: '借りる人',
        borrowDate: '借りる日',
        returnDate: '返す日',
      },
      // 表のデータ(APIを叩いた結果をここに格納)
      itemLists: []
    }
  },
  // 検証環境ではnpmパッケージjson-serverを叩いて、db.jsonファイルの中身を取り出している
  // `node .\node_modules\json-server\bin\index.js --watch .\db.json`
  // beforeMountが良いかは検討の余地あり
  // 詳細はVue.js公式ドキュメントのライフサイクルフックを参照
  beforeMount: function () {
    // let url = "http://localhost:3000/itemLists";
    let url = "https://1b6f9yise0.execute-api.ap-northeast-1.amazonaws.com/Prod/items";
    axios.get(url).then((response) => {
      console.log(response.data);
      this.itemLists = response.data;
    }).catch( error => {
      console.log(error);
    });
  }
}
</script>

<style lang="scss">
  // 開発用
  // @import './styles/styleDev.scss';
</style>
