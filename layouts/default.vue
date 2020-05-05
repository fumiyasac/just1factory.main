<template>
  <div id="wrapper">
    <NavigationBar />
    <nuxt />
    <FooterBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import NavigationBar from '~/components/global/NavigationBar.vue'
import FooterBar from '~/components/global/FooterBar.vue'

@Component({
  components: {
    NavigationBar,
    FooterBar
  }
})

export default class extends Vue {}
</script>
