<template lang="pug">
div.row
  div#menu.col-12
    router-link(to="/" tag="button").btn.btn-primary 資産一覧
    router-link(to="add" tag="button").btn.btn-primary 資産登録
    button.btn.disabled 資産検索
</template>

<script>
</script>

<style lang="scss">
  .btn { margin-right: 10px; }
</style>
