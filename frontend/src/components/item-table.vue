<template lang="pug">
div
  table#datatables.display
    thead.table-primary
      tr
        th(v-for="(value, key) in itemListsColumns",v-bind:key="value.id",) {{ value }}
    tbody
      //- クリックされたレコードのidの値を拾ってshowDetailに投げている
      tr(v-for="entry in itemLists",:key="entry.id",@click="showDetail(entry.id)")
        td(v-for="(value, key) in itemListsColumns",:key="value.id") {{ entry[key] }}
        router-link(to="/item/update" tag="button").btn.btn-outline-primary.btn-sm 借りる
</template>

<script>
import $ from 'jquery';
import dt from 'datatables.net';

export default {
  props: {
    itemListsColumns: Array,
    itemLists: Array
  },
  methods: {
    showDetail: function (key) {
      // 関数内でrouter-linkする方法。まだ良くわかってない
      this.$router.push("/item/details/" + key);
    }
  },
  // vueによる描画が全て終わった後で実行される。
  // ここではdatatableプラグインをtableに適用している
  beforeMount: function () {
    console.log("fuga");
    this.$nextTick(function () {
        $('#datatables').DataTable();
    })
  }
}
</script>

<style lang="scss">
</style>
