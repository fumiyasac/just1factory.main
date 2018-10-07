<template>
  <section class="hero is-fullheight is-default is-bold">
    <navigation-bar/>
    <nuxt/>
    <footer-bar/>
  </section>
</template>

<script>
import NavigationBar from '~/components/NavigationBar.vue'
import FooterBar from '~/components/FooterBar.vue'
export default {
  components: {
    NavigationBar,
    FooterBar
  }
}
</script>
