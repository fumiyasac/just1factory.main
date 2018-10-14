<template>
  <div id="wrapper">
    <navigation-bar />
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
import NavigationBar from '~/components/global/NavigationBar.vue'
import FooterBar from '~/components/global/FooterBar.vue'

export default {
  components: {
    NavigationBar,
    FooterBar,
  }
}
</script>
