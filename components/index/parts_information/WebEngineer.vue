<!-- Template -->
<template>
  <b-card title="Web Application" img-src="/summaries/card_image2.jpg" img-alt="Server" img-top>
    <div slot="header">
      <small class="text-muted">PHP / Ruby / Go / Kotlin</small>
    </div>
    <p class="card-text">
      20代後半にWebエンジニアになり、その際には主に大規模Webサービスやゲームのバックエンド側の開発を経験しました。
    </p>
    <div slot="footer">
      <small class="text-muted">Since: 2012</small>
    </div>
  </b-card>
</template>

<!-- Script -->
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component

export default class WebEngineer extends Vue {}
</script>
