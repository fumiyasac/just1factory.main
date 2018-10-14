<template>
  <div class="container">
    <div class="develop_loadmap_block">
      <h2>書籍・プロダクトの開発ロードマップやお知らせ</h2>
      <b-list-group>
        <b-list-group-item class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Just1factoryのサイトを公開しました！</h5>
            <small>2018/10/15</small>
          </div>
          <small>サイトからの公式情報</small>
        </b-list-group-item>
        <b-list-group-item class="flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">新刊: iOSアプリ開発「UI実装であると嬉しいレシピブック」の情報を公開しました！</h5>
            <small>2018/10/08</small>
          </div>
          <small>書籍に関するお知らせ</small>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DevelopLoadmap'
}
</script>

<style>
.develop_loadmap_block {
  padding-top: 80px;
}
.develop_loadmap_block h2 {
  padding: 0 0 20px 0;
  color: #444444;
  font-size: 26px;
}
</style>
