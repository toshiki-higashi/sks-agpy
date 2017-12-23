import Vue from 'vue';
import VueRouter from 'vue-router';

//vue-routerをVueで使うことを宣言
Vue.use(VueRouter);

// components読み込み
// ページ遷移で書き換えられるコンポーネントは全てここで読み込む
import App from './App.vue';
import ShowItems from './components/ShowItems.vue';
import ShowItemDetails from './components/ShowItemDetails.vue';
import AddItem from './components/AddItem.vue';
import UpdateItem from './components/UpdateItem.vue';
import DeleteItem from './components/DeleteItem.vue';

// vue-routerによるルーティングの情報を定義
const routes = [
  {
    path: '/',
    component: App,
    props: true,
    children: [
      { path: 'item', components: { ShowItems } },
      { path: 'item/details/:id', components: { ShowItemDetails }, props: true },
      { path: 'item/add', components: { AddItem } },
      { path: 'item/update', components: { UpdateItem } },
      { path: 'item/delete', components: { DeleteItem } }
    ]
  }
];

// VueRouterインスタンスを作成して定義したroutesを渡す
const router = new VueRouter({
  routes // `routes: routes` の短縮表記
});

// Vueインスタンスを作成してrouterをインジェクト？する
new Vue({
  router // `router: router` の短縮表記
}).$mount('#app')
