<template lang="pug">
div
  h2 資産一覧
  //- v-bind:」は「:」に、「v-on:」は「@」に省略できる
  item-table(:columns="columns",:lists="lists")
</template>

<script>
// 子コンポーネント呼び出し手順①
import ItemTable from './item-table.vue';

export default {
  // 子コンポーネント呼び出し手順②
  components: {
    ItemTable
  },
  props: {
    columns: Array,
    lists: Array
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
