<template>
  <div class="container">
    <div class="book_information_block">
      <h2>書籍・プロダクトのご紹介</h2>
      <b-row>
        <b-col cols="3">
          <div>
            <b-img thumbnail fluid class="img-responsive" src="/books/ui_recipt_book.jpg" /> 
          </div>
        </b-col>
        <b-col cols="9">
          <div class="container">
            <h4 class="developer_name">iOSアプリ開発「UI実装であると嬉しいレシピブック」</h4>
            <p>
              <span class="small">頒布イベント</span>: <b-badge pill variant="info">技術書典5</b-badge>
            </p>
          </div>
          <hr>
          <div class="container">
            <p>
              <span class="small">販売価格</span>: <strong class="large text-danger">¥1,000</strong><br>
              <span class="small">※ 現在は電子版のみの販売になります。改訂版につきましては11月中旬に販売予定です。</span>
            </p>
          </div>
          <hr>
          <div class="container">
            <p>「少しの工夫とアイデアでできる表現集」として、これまでサンプル開発や実務の中で培ったノウハウ等から、UI実装いくつかのまとまったサンプル実装を例にUI構築をする上で重要な実装ポイントやアイデアを紹介していく形式にしてみました。</p>
            <p>これからiOS アプリを本格的に開発していこうと考えている方や、UI実装や表現に関する部分にさらなる磨きをかけていきたい方にとって本書が少しでもお役に立つことができれば幸いです。</p>
          </div>
          <hr>
          <div class="container text-center">
            <ul class="list-unstyled list-inline">
              <li class="list-inline-item">
                <b-button class="mt0" href="https://booth.pm/ja/items/1021745" target="_blank">電子版の販売ページ</b-button>
              </li>
            </ul>
          </div>
          <hr>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookInformation'
}
</script>

<style>
.book_information_block {
  padding-top: 80px;
}
.book_information_block h2 {
  padding: 0 0 20px 0;
  color: #444444;
  font-size: 26px;
}
</style>
