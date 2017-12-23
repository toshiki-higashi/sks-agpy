<template lang="pug">
div
  table#example.display
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
  }
}
</script>

<style lang="scss">
</style>
