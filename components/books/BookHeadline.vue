<template>
  <b-container>
    <div class="message_block">
      <h2>Books</h2>
      <p>
        iOSアプリ開発のトピックの中でも、これまでデザイナー → Webエンジニア → iOSアプリエンジニアという経験を経てきたということを生かしアプリUIの実装方法に関するTIPSを解説した書籍を執筆しています。<br>
        また今後に付きましては新刊の執筆に加えまして掲載サンプルのバージョンアップ等にも順次着手していく予定です。<br>
        ※ サンプルコード等の不具合を発見した場合はGithubのIssueやPullRequestも受け付けておりますのでご活用下さい。
      </p>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'BookHeadline'
}
</script>

<style>
.message_block {
  padding-top: 80px;
}
.message_block h2 {
  padding: 0 0 20px 0;
  color: #444444;
  font-size: 26px;
  font-family: 'Palatino', 'Helvetica Neue', Arial, sans-serif;
}
</style>
