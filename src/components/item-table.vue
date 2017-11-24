<!--
アイテム一覧表示用コンポーネント
用途：DBに格納されたアイテムの一覧を表示する
親コンポーネント：ShowItem.vue
受け取る
  columns: Object テーブルのヘッダ行の表示に必要。key：英語項目、value：日本語項目
  lists: Array テーブルのデータ行の表示に必要。配列の中身はオブジェクトでkey：英語項目、value：予約の値
-->
<template lang="pug">
div
  table#example.display
    thead.table-primary
      tr
        th(v-for="(value, key) in columns",v-bind:key="value.id",) {{ value }}
    tbody
      tr(v-for="entry in lists",:key="entry.id")
        td(v-for="(value, key) in columns",:key="value.id",@click="clicked(entry.id)") {{ entry[key] }}
        router-link(to="add" tag="button").btn.btn-outline-primary.btn-sm 更新
        router-link(to="add" tag="button").btn.btn-outline-danger.btn-sm 削除
</template>

<script>
export default {
  props: {
    columns: Object,
    lists: Array
  },
  data: function () {
    return {}
  },
  computed: {},
  methods: {
    // 選択された項目をソートのキーに指定し、
    // 昇順/降順のための値を反転
    sortBy: function (selected) {
      this.sortKey = selected;
      this.sortOrders[selected] = this.sortOrders[selected] * -1;
    },
    // selected-rsvイベント?により親コンポーネントのgetRsvDetailを、
    // 選択された行のrsvNumを投げつつ発火させる
    showDetail: function (key) {
      this.$emit('selected-rsv', key.rsvNum);
    },
    clicked: function (key) {
      console.log(key);
    }
  }
}
</script>

<style lang="scss">
</style>
