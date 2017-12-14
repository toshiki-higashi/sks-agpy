<template lang="pug">
div
  table.table
    //- 項目名が縦に並ぶテーブルなので、thとtdを一行のtrにまとめている
    tr(v-for="(value, key) in columns", :key="value.id")
      th.table-primary {{ value }}
      td {{ lists[key] }}
</template>

<script>
export default {
  props: {
    columns: Array,
    lists: Array
  },
}
</script>

<style lang="scss">
</style>
