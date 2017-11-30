<template lang="pug">
div
  h4
    br
    | 資産一覧
  //- v-bind:」は「:」に、「v-on:」は「@」に省略できる
  item-table(v-bind:columns="listsColumns",v-bind:lists="lists")
</template>

<script>
// 子コンポーネント呼び出し手順①
import ItemTable from './item-table.vue';

export default {
  // 子コンポーネント呼び出し手順②
  components: {
    ItemTable
  },
  // ※本来は空っぽを定義だけして、
  // APIを叩いて取ってきたデータを格納する
  data() {
    return {
      // --- ここから要検討 ---
      // APIをだれが叩くか問題。今回のように複数の子コンポーネントが使用するデータは
      // 親コンポーネントが取りに行くのが正しい気がする。

      // 表のヘッダー行(項目一覧)
      listsColumns: {
        id: 'ID',
        category: 'カテゴリ',
        name: '名前',
        getDate: '取得日',
        owner: '持ち主',
        borrower: '借りる人',
        borrowDate: '借りる日',
        returnDate: '返す日',
      },
      // 表のデータ
      lists: [
        {
          id: '100123',
          category: '本',
          name: '仕事に必要なことはすべて映画で学べる  映画監督 押井守',
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
          getDate: '2017/11/10',
          owner: '第1チーム',
          borrower: '',
          borrowDate: '',
          returnDate: ''
        }
      ]
      // --- ここまで要検討 ---
    }
  },
  // vueによる描画が全て終わった後で実行される。
  // ここではdatatableプラグインをtableに適用している
  mounted: function () {
    this.$nextTick(function () {
        $('#example').DataTable();
    })
  }
}
</script>

<style lang="scss">
</style>
