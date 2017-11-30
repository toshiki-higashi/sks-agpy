<template lang="pug">
div#wrapper.container-fluid
  //- Pug(旧Jade)で分かりにくくなっているが
  //- Headerが展開されると<Header></Header>となり、
  //- ここにheader.vueのtemplateの内容がレンダリングされる
  div.row
    div#header.col-12
      Header
  div.row
    div#menu.col-12
      Menu
  div.row
    div#contents.col-12
      router-view(name='ShowItem')
      router-view(name='AddItem')
      router-view(name='UpdateItem')
      router-view(name='DeleteItem')
</template>

<script>
// 子コンポーネント呼び出し手順1
import Header from './components/header.vue';
import Menu from './components/menu.vue';
// 子コンポーネント呼び出し手順2
export default {
  components: {
    Header, // `Header: Header` の短縮表記
    Menu // `Menu: Menu` の短縮表記
  }
}
</script>

<style lang="scss">
  // 開発用
  // @import './styles/styleDev.scss';
</style>
