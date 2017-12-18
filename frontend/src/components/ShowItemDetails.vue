<template lang="pug">
div
  h4 資産詳細
  //- item-detail-tableのlistsに対して、getSelectedItemDetail(id)の結果を投げている
  item-detail-table(:columns="columns",:lists="getSelectedItemDetail(id)")
  router-link(to="/item/update" tag="button").btn.btn-outline-primary.btn-sm 資産更新
  router-link(to="/item/delete" tag="button").btn.btn-outline-danger.btn-sm 資産削除
</template>

<script>
// 子コンポーネント呼び出し手順①
import ItemDetailTable from './item-detail-table.vue';

export default {
  // 親コンポーネントから受け取るデータを、自分たちでも定義しておく必要がある
  props: {
    id: String,
    columns: Array,
    lists: Array
  },
  // 子コンポーネント呼び出し手順②
  components: {
    ItemDetailTable
  },
  methods: {
    // 受け取ったidと一致したidを持つlists内のデータを返す
    getSelectedItemDetail: function (id) {
      const matchedData = this.lists.filter(function(item) {
        if (item.id == id) return true;
      });
      return matchedData[0];
    }
  }
}
</script>

<style lang="scss">
</style>
