<template>
  <b-container>
    <div class="message_block">
      <h2 class="message_text">プロダクトや書籍のサポートに関して</h2>
      <p>
        これまで自分が公開ないしは販売をしたプロダクトや書籍に関するアフターケアに関する情報を掲載するためのページになります。<br>
        更新に関するロードマップや書籍の正誤表の掲示・不具合を随時行う予定です。<br>
        ※ サンプルコード等の不具合を発見した場合はGithubのIssueやPullRequestも受け付けておりますのでご活用下さい。
      </p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'SupportHeadline'
}
</script>

<style>
.message_block {
  padding-top: 80px;
}
.message_block h2 {
  padding: 0 0 20px 0;
  color: #444444;
  font-size: 24px;
  font-family: 'Palatino', "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
</style>
