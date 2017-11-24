import Vue from 'vue';
import VueRouter from 'vue-router';

//vue-routerをVueで使うことを宣言
Vue.use(VueRouter);

// components読み込み
// ページ遷移で書き換えられるコンポーネントは全てここで読み込む
import App from './App.vue';
import ShowItem from './components/ShowItem.vue';
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
      { path: '', components: { ShowItem } },
      { path: 'add', components: { AddItem } },
      { path: 'update', components: { UpdateItem } },
      { path: 'delete', components: { DeleteItem } }
    ]
  }
]

// VueRouterインスタンスを作成して定義したroutesを渡す
const router = new VueRouter({
  routes // `routes: routes` の短縮表記
})

// Vueインスタンスを作成してrouterをインジェクト？する
new Vue({
  router
}).$mount('#app')
