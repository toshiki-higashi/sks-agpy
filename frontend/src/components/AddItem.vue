<template lang="pug">
div
  h2 アイテムの追加
  form
    div.form-group
      //- labelタグの後のforの値とinputタグのidの値を揃えると、labelタグを選択してもinputタグがフォーカスされる
      label(for="inputName") アイテム名
      //- v-on:input="name = $event.target.value"で、
      //- タグの中身($event.target.value)が書き込まれる(input)たびにその値をnameに代入している
      input.form-control#inputName(type="text",placeholder="本のタイトル,家電の型番など",v-on:input="name = $event.target.value")

      label(for="inputOwner") 所有者
      input.form-control#inputOwner(type="text",placeholder="個人名,組織名など",v-on:input="owner = $event.target.value")

      label(for="inputCategory") カテゴリ
      select.form-control#inputCategory
        option 本

      label(for="inputGetdate") 取得日
      input.form-control#inputGetdate(type="date",v-on:input="getdate = $event.target.value")

  button(v-on:click="registerItem").btn.btn-outline-primary.btn-sm 登録
  router-link(to="/item" tag="button").btn.btn-outline-primary.btn-sm キャンセル
</template>

<script>
export default {
  data () {
    return {
      name : '',
      owner : '',
      category : 'book',
      getdate : '',
    }
  },
  methods: {
    registerItem: function(event) {
      // ここでaxiosを使用してフォームのデータをPOSTする
      // 今はとりあえずフォームデータを正しく取得できていることの確認まで
      console.log(this.name);
      console.log(this.owner);
      console.log(this.category);
      console.log(this.getdate);
    }
	},

}
</script>

<style lang="scss">
</style>
