<template>
  <div id="wrapper">
    <NavigationBar />
    <nuxt />
    <FooterBar />
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
