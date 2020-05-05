<!-- Template -->
<template>
  <b-card title="UI/UX Design" img-src="/summaries/card_image3.jpg" img-alt="Design" img-top>
    <div slot="header">
      <small class="text-muted">Adobe XD / Photoshop / Illustrator</small>
    </div>
    <p class="card-text">
      キャリアの始まりはここからでした。シンプルかつ適度なアニメーションやインタラクションがあるものが個人的に好きです。
    </p>
    <div slot="footer">
      <small class="text-muted">Since: 2008</small>
    </div>
  </b-card>
</template>

<!-- Script -->
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component

export default class Designer extends Vue {}
</script>

<!-- Style -->
<style>
.card-title {
  font-family: 'Palatino', 'Helvetica Neue', Arial, sans-serif;
}
</style>
