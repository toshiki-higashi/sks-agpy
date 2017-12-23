<template lang="pug">
div
  table.table
    //- 項目名が縦に並ぶテーブルなので、thとtdを一行のtrにまとめている
    tr(v-for="(value, key) in itemListsColumns", :key="value.id")
      th.table-primary {{ value }}
      td {{ selectedItemDetail[key] }}
</template>

<script>
export default {
  props: {
    itemListsColumns: Array,
    selectedItemDetail: Array
  },
}
</script>

<style lang="scss">
</style>
