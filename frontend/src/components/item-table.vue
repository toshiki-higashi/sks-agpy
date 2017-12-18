<template lang="pug">
div
  table#example.display
    thead.table-primary
      tr
        th(v-for="(value, key) in columns",v-bind:key="value.id",) {{ value }}
    tbody
      //- クリックされたレコードのidの値を拾ってshowDetailに投げている
      tr(v-for="entry in lists",:key="entry.id",@click="showDetail(entry.id)")
        td(v-for="(value, key) in columns",:key="value.id") {{ entry[key] }}
        router-link(to="/item/update" tag="button").btn.btn-outline-primary.btn-sm 借りる
</template>

<script>
export default {
  props: {
    columns: Array,
    lists: Array
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
