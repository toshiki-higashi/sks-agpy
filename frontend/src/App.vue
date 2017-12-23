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
      // 表のデータ※本来はここをAPIで引っ張ってくる
      itemLists: [
        {
          id: '100123',
          category: '本',
          name: '仕事に必要なことはすべて映画で学べる  映画監督 押井守',
          location: '本社',
          place:'8F本棚A-1',
          getDate: '2017/10/01',
          owner: 'A氏',
          borrower: 'B氏',
          borrowDate: '2017/10/31',
          returnDate: '2017/11/10'
        },
        {
          id: '100288',
          category: '本',
          name: 'Web API: The Good Parts  水野 貴明',
          location: '本社',
          place:'8F本棚C-8',
          getDate: '2017/11/10',
          owner: 'C氏',
          borrower: 'D氏',
          borrowDate: '2017/11/08',
          returnDate: '2017/11/15'
        },
        {
          id: '200288',
          category: 'PC',
          name: 'raspberry pi 3',
          location: '本社',
          place:'第1倉庫室',
          getDate: '2017/11/10',
          owner: '第1チーム',
          borrower: 'E氏',
          borrowDate: '2017/11/13',
          returnDate: '2017/11/17'
        },
        {
          id: '200456',
          category: 'PC',
          name: 'mac mini',
          location: '大阪オフィス',
          place:'第1倉庫室',
          getDate: '2017/11/10',
          owner: '第1チーム',
          borrower: '',
          borrowDate: '',
          returnDate: ''
        },
        {
          id: '300789',
          category: 'その他',
          name: '寝袋',
          location: '大阪オフィス',
          place:'第1倉庫室',
          getDate: '2017/11/10',
          owner: '第1チーム',
          borrower: 'imada',
          borrowDate: '2017/11/10',
          returnDate: '2017/11/11'
        },
        {
          id: '300288',
          category: 'その他',
          name: '掃除機',
          location: '大阪オフィス',
          place:'第1倉庫室',
          getDate: '2017/11/10',
          owner: '第1チーム',
          borrower: '',
          borrowDate: '',
          returnDate: ''
        }
      ],
    }
  }
}
</script>

<style lang="scss">
  // 開発用
  // @import './styles/styleDev.scss';
</style>
