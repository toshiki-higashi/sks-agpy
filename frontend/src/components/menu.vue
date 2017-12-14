<template lang="pug">
div.row
  div#menu.col-12
    router-link(to="/item" tag="button").btn.btn-primary 資産一覧
    router-link(to="/item/add" tag="button").btn.btn-primary 資産登録
    button.btn.disabled 資産検索
</template>

<script>
</script>

<style lang="scss">
  #menu {padding-bottom: 10px; }
  .btn { margin-right: 10px; }
</style>
